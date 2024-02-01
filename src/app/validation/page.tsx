"use client";

import JiuguImage from "../../../public/user-jiugu.png";
import { Avatar, AvatarImage } from "src/components/ui/avatar";
import ChatItem from "src/components/chat-item";
import { IoMenuOutline } from "react-icons/io5";
import { cn } from "src/lib/utils";
import { BloggerContainer } from "src/containers/blogger";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from "src/components/ui/select";
import { Button } from "../../components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { useUser } from "../../hooks/use-user";
import { useRouter } from "next/navigation";
import { api } from "@/trpc/react";
import { useValidation } from "@/hooks/use-validation";

import { guidanceItems } from "@/config";

enum ValidationResult {
  unknown,
  ok,
  failed,
}

export default function ValidationPage() {
  const { user } = useUser();
  const { data: users = [] } = api.user.list.useQuery();
  const { answer, validating, setValidating } = useValidation();

  const [validationResult, setValidationResult] = useState<ValidationResult>(
    ValidationResult.unknown,
  );

  // console.log("-- validation: ", { answer: JSON.stringify(answer) });
  const validate = api.user.validate.useMutation();

  const router = useRouter();

  return (
    <div className={"flex h-full flex-col"}>
      <Select>
        <SelectTrigger
          id={"header"}
          className={"flex items-center justify-center gap-1 p-2"}
        >
          <Avatar className={"h-5 w-5"}>
            <AvatarImage src={JiuguImage.src} />
          </Avatar>

          <div>玖姑</div>
        </SelectTrigger>

        <SelectContent>
          <SelectGroup>
            {users.map((item, index) => (
              <SelectItem value={`${index}`} key={index}>
                <div className={"flex items-center gap-2"}>
                  <div
                    className={cn(
                      "w-2 h-2 rounded-full",
                      item.status === "online" && "bg-green-500",
                      item.status === "offline" && "bg-gray-500",
                      item.status === "busy" && "bg-yellow-500",
                    )}
                  />
                  <div>{item.phone}</div>
                </div>
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      <div className={"flex grow flex-col gap-4 overflow-auto p-4"}>
        {
          // sampleChatItems
          guidanceItems.map((chatItem, index) => (
            <ChatItem {...chatItem} key={index} />
          ))
        }

        {validationResult === ValidationResult.unknown && (
          <Button
            disabled={
              validating || "1234".split("").some((s) => !answer[`q${s}`])
            }
            onClick={async () => {
              setValidating(true);
              console.log("-- answer: ", JSON.stringify(answer));
              const result = await validate.mutateAsync({
                answer: JSON.stringify(answer),
              });
              console.log("-- result: ", result);

              if (!result) {
                toast.error("你不算姑的friend哦，想加入再去刷刷姑的视频吧……");
              } else {
                toast.success(
                  "你果然是姑的friend，恭喜你获得火伴身份！",
                  // todo: 更友好的显示
                  // "以及我们赠送的10火值，你可以在xxx查看你的火值数额，并在xxx进行兑换。"
                );
                void router.push("/chat");
              }
              setValidating(false);
            }}
          >
            提交
          </Button>
        )}
      </div>

      <div className={"relative px-4 py-1"}>
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
