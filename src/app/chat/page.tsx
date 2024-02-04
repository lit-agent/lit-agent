"use client";

import { useEffect, useRef, useState } from "react";
import { useUser } from "@/hooks/use-user";
import { ClientMessage } from "@/ds/user";
import { api } from "@/trpc/react";
import { pusherClient } from "@/lib/pusher";
import { SelectUser } from "@/components/select-user";
import ChatItemDetail, { ChatItemContainer } from "@/components/chat-item";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { BloggerContainer } from "@/containers/blogger";
import { IoMenuOutline } from "react-icons/io5";
import { $Enums, MessageType } from "@prisma/client";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import TaskType = $Enums.TaskType;

export default function ChatPage({
  params: { roomId, withBack },
}: {
  params: {
    roomId: string;
    withBack?: boolean;
  };
}) {
  const refInput = useRef<HTMLInputElement>(null);
  const { user, targetUser } = useUser();

  const [messages, setMessages] = useState<ClientMessage[]>([]);
  const fetchMessages = api.message.fetch.useMutation();
  const sendMessage = api.message.send.useMutation();

  useEffect(() => {
    if (!roomId) return;

    fetchMessages
      .mutateAsync({ roomId })
      .then((messages) => setMessages(messages));

    pusherClient.subscribe(roomId);
    Object.values(MessageType).map((messageType) => {
      pusherClient.bind(messageType, (message: ClientMessage) => {
        setMessages((messages) => [...messages, message]);
      });
    });

    return () => {
      pusherClient.unsubscribe(roomId);
      Object.values(MessageType).map((messageType) =>
        pusherClient.unbind(messageType),
      );
    };
  }, [roomId]);

  const submitMessage = () => {
    if (!refInput.current || !user) return;

    const text = refInput.current.value;
    if (!text) return;

    console.log("-- sending: ", { text });

    // todo: 思考要不要做上屏优化
    sendMessage.mutate({
      text,
      type: MessageType.Plain,
      roomId: `${user!.id}-jiugu`,
      toUserIds: [user!.id],
    });

    refInput.current.value = "";
  };

  console.log(`-- messages: `, messages);

  useEffect(() => {}, [roomId]);

  const refBottom = useRef<HTMLDivElement>(null);
  useEffect(() => {
    refBottom.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);

  return (
    <div className={"flex h-full flex-col overflow-hidden"}>
      <SelectUser withBack={withBack} />

      <div className={"flex grow flex-col gap-4 overflow-auto p-4"}>
        {messages.map((message, index) => (
          <RenderChatItem
            message={message}
            key={index}
            roomId={roomId}
            userId={user!.id}
          />
        ))}
        <div ref={refBottom} />
      </div>

      <div className={"relative px-4 py-2"}>
        <Input
          ref={refInput}
          className={cn(
            "bg-[#463F4F] ",
            "focus-visible:ring-0",
            "focus-visible:ring-offset-0",
          )}
          onKeyDown={(event) => {
            if (event.key === "Enter" && !event.nativeEvent.isComposing) {
              submitMessage();
            }
          }}
        />

        <BloggerContainer
          className={
            "absolute bottom-0 right-5 top-0 my-auto h-6 w-6 text-gray-400"
          }
        >
          <IoMenuOutline />
        </BloggerContainer>
      </div>
    </div>
  );
}

const RenderChatItem = ({
  roomId,
  userId,
  message,
}: {
  roomId: string;
  userId: string;
  message: ClientMessage;
}) => {
  const [chosen, setChosen] = useState<string | undefined>(undefined);
  const sendMessage = api.message.send.useMutation();

  switch (message.type) {
    case "NewTask":
      if (!message.task) return;

      return (
        <ChatItemContainer user={message.fromUser}>
          <div>
            <div>{message.task.title}</div>

            {message.task.type === TaskType.broadcast && (
              <div>{message.task.content}</div>
            )}

            {message.task.type === TaskType.textChoices && (
              <>
                <RadioGroup
                  className={"gap-0"}
                  value={chosen}
                  onValueChange={setChosen}
                >
                  {message.task.choices.map((choice, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-2 hover:bg-gray-900 px-2 rounded-lg"
                    >
                      <RadioGroupItem
                        value={choice.id}
                        id={choice.id}
                        className={"shrink-0"}
                      />
                      <Label
                        htmlFor={choice.id}
                        className={cn(
                          "grow p-2 rounded",
                          chosen !== choice.id && "text-white/50",
                        )}
                      >
                        {choice.content}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>

                <Button
                  className={"w-full"}
                  size={"sm"}
                  onClick={(event) => {
                    if (!chosen) {
                      void toast.error("请先选择");
                      event.preventDefault();
                      return;
                    }
                    sendMessage.mutate({
                      type: MessageType.Plain,
                      roomId: `${userId}-jiugu`,
                      toUserIds: [userId],
                      text: `我选了：${message.task?.choices.find((choice) => choice.id === chosen)!.content}`,
                    });
                  }}
                >
                  提交
                </Button>
              </>
            )}
          </div>
        </ChatItemContainer>
      );

    case "Plain":
    default:
      return (
        <ChatItemDetail
          user={message.fromUser}
          segments={[{ type: "text", content: message.text }]}
        />
      );
  }
};
