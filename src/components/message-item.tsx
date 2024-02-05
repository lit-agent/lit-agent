"use client";

import { BsThreeDots } from "react-icons/bs";
import { BaseClientUser } from "src/ds/user";
import { MessageType } from "@/ds/message.base";
import { cn } from "src/lib/utils";
import { PropsWithChildren, useState } from "react";
import { Badge } from "src/components/ui/badge";
import { BloggerContainer } from "src/containers/blogger";
import { Checkbox } from "src/components/ui/checkbox";
import { MyMarkdown } from "@/containers/markdown";
import { Label } from "@/components/ui/label";
import { UserComp } from "@/components/user";
import { IMessageBody } from "@/ds/message";

export interface IMessageContainer {
  user: BaseClientUser;
  body: IMessageBody;
  onValueChange?: (v: any) => void;
}

export const MessageContainer = ({
  user,
  children,
}: { user: BaseClientUser } & PropsWithChildren) => {
  // console.log("-- user in chat item container: ", user);

  return (
    <div className={"relative flex gap-2 "}>
      {user.type === "user" ? (
        <UserComp user={user} />
      ) : (
        <BloggerContainer className={"flex items-start"}>
          <UserComp user={user} />
        </BloggerContainer>
      )}

      <div className={"flex grow flex-col gap-2"}>
        <div className={"flex items-center gap-1 text-xs text-gray-400"}>
          {user.name}
          {user.type === "blogger" && (
            <Badge
              className={"rounded-sm bg-green-800 px-1 py-0 text-gray-200"}
            >
              博主
            </Badge>
          )}
        </div>
        {children}
      </div>

      {user.type === "assistant" && (
        <BsThreeDots className={cn("text-muted-foreground absolute right-2")} />
      )}
    </div>
  );
};

export function Message({ user, body, onValueChange }: IMessageContainer) {
  return (
    <MessageContainer user={user}>
      <MessageBody body={body} onValueChange={onValueChange} />
    </MessageContainer>
  );
}

export const MessageBody = ({
  body,
  onValueChange,
}: {
  body: IMessageBody;
  onValueChange?: (v: any) => void;
}) => {
  const [imageIndex, setImageIndex] = useState(`0`);
  const [checks, setChecks] = useState<number[]>([]);
  const [submitted, setSubmitted] = useState(false);

  switch (body.type) {
    case MessageType.Plain:
      return <MyMarkdown>{body.title ?? ""}</MyMarkdown>;

    case MessageType.TextChoices:
      return (
        <div className={"flex w-full flex-col"}>
          {body.title && <MyMarkdown>{body.title}</MyMarkdown>}

          {body.choices.map(({ value }, index) => (
            <Label
              className={cn(
                "flex items-center gap-2 py-1 hover:bg-primary/25 rounded",
                !checks.includes(index) && "brightness-50",
              )}
              key={index}
            >
              <Checkbox
                value={`${index}`}
                checked={checks.includes(index)}
                disabled={submitted}
                onCheckedChange={(checked) => {
                  // console.log("-- content: ", content);

                  const newChecks = !body.multiple
                    ? // 单选
                      [index]
                    : // 多选
                      checked
                      ? [...checks, index].sort()
                      : checks.filter((c) => c !== index);

                  // console.log("-- newChecks: ", newChecks);
                  onValueChange && onValueChange(newChecks);
                  setChecks(newChecks);
                }}
              />

              <span>{value}</span>
            </Label>
          ))}
        </div>
      );

    case MessageType.GroupLink:
    // return (
    //   <div className={"flex flex-col gap-1 rounded-lg bg-[#3D3847] p-3"}>
    //     <div className={"flex items-center justify-between"}>
    //       <div className={"flex items-center gap-1"}>
    //         <NotificationIcon />
    //         邀你加入限时群聊
    //       </div>
    //       <ArrowRightIcon />
    //     </div>
    //
    //     <div className={"flex items-center justify-between"}>
    //       <div className={"flex -space-x-4"}>
    //         {body.memberAvatars?.slice(0, 6).map((avatar, index: number) => (
    //           <Avatar key={index}>
    //             <AvatarImage src={avatar} />
    //           </Avatar>
    //         ))}
    //       </div>
    //
    //       <div>{body.membersCount}人已加入</div>
    //     </div>
    //   </div>
    // );

    case MessageType.ImageChoices:
    // return (
    //   <div className={"flex flex-col gap-2"}>
    //     <RadioGroup
    //       className={"flex gap-2"}
    //       value={imageIndex}
    //       onValueChange={setImageIndex}
    //     >
    //       {body.questions.map((image, index) => (
    //         <div
    //           className={cn(
    //             "flex flex-col items-center gap-2",
    //             `${index}` !== imageIndex && "brightness-50",
    //           )}
    //           key={index}
    //         >
    //           <Image
    //             src={image}
    //             alt={image}
    //             key={index}
    //             width={160}
    //             height={240}
    //           />
    //           <RadioGroupItem value={`${index}`} />
    //         </div>
    //       ))}
    //     </RadioGroup>
    //
    //     <Button>已提交</Button>
    //   </div>
    // );

    // case MessageType.Task:
    // return (
    //   <div className={"flex flex-col gap-2 rounded-lg bg-[#3D3847] p-3"}>
    //     <div className={"flex items-center justify-between"}>
    //       <div>帮作品传播</div>
    //
    //       <Hot value={body.hotValue} />
    //     </div>
    //
    //     <div className={"flex overflow-hidden rounded-lg"}>
    //       <Image
    //         src={CoverSmImage.src}
    //         alt={"cover"}
    //         width={120}
    //         height={160}
    //         className={"shrink-0"}
    //       />
    //       <div
    //         className={"flex grow flex-col justify-between bg-[#2A2434] p-3"}
    //       >
    //         <div>{body.title}</div>
    //
    //         <div className={"flex justify-between"}>
    //           <div className={"flex items-center gap-1"}>
    //             <WechatMPIcon />
    //             视频号
    //           </div>
    //           <div>{moment(body.datetime ?? new Date()).fromNow()}发布</div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // );
    case MessageType.ProductLink:
    // return (
    //   <div className={"flex flex-col gap-2"}>
    //     <div className={"flex justify-between rounded-lg bg-[#3D3847] p-2"}>
    //       <div className={"flex items-center gap-2"}>
    //         <div className={"w-[80px] "}>
    //           <AspectRatio ratio={1}>
    //             <Image
    //               src={body.cover!}
    //               alt={"cover"}
    //               fill
    //               className="rounded-md object-cover"
    //             />
    //           </AspectRatio>
    //         </div>
    //
    //         <div className={"flex grow flex-col gap-2"}>
    //           <div>{body.title}</div>
    //           <Hot value={body.hotValue} />
    //         </div>
    //       </div>
    //     </div>
    //
    //     <div className={"text-muted-foreground text-xs"}>
    //       来自{body.source}
    //     </div>
    //   </div>
    // );

    case MessageType.Others:

    default:
      return body.type;
  }
};

export default Message;
