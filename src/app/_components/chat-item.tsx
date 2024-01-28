import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { BsThreeDots } from "react-icons/bs";
import { IUser } from "@/ds/user";
import { ChatType } from "@/ds/chat";
import { cn } from "@/lib/utils";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";
import Assets from "@/app/_components/assets";
import { markdownComponents } from "@/lib/markdown";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { PRIMARY_COLOR } from "@/const";
import { Badge } from "@/components/ui/badge";

export interface IChatItem {
  user: IUser;
  segments: {
    type: ChatType;
    content: any;
  }[];
}

export const Hot = ({ value }: { value: number }) => (
  <div className={"text-primary flex items-center"} color={PRIMARY_COLOR}>
    <div className={"h-4 w-4"}>
      <Assets.FireFillIcon />
    </div>

    {value}
  </div>
);

export default function ChatItem({ user, segments }: IChatItem) {
  const [imageIndex, setImageIndex] = useState(`0`);

  return (
    <div className={"relative flex gap-2"}>
      <Avatar className={"h-8 w-8"}>
        <AvatarImage src={user.avatar} />
      </Avatar>

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

        {segments.map(({ type, content }, index) => (
          <div key={index}>
            {type === "text" && (
              <Markdown
                remarkPlugins={[remarkGfm]}
                components={markdownComponents}
                key={index}
                className={cn(
                  "whitespace-pre-wrap ",
                  user.type === "user" && "text-primary",
                )}
              >
                {content.replace(
                  /(#\S+)/g,
                  (match, tag) => `[${tag}](/tag/${tag})`,
                )}
              </Markdown>
            )}

            {type === "group-link" && (
              <div
                className={"flex flex-col gap-1 rounded-lg bg-[#3D3847] p-3"}
              >
                <div className={"flex items-center justify-between"}>
                  <div className={"flex items-center gap-1"}>
                    <Assets.NotificationIcon />
                    邀你加入限时群聊
                  </div>
                  <Assets.ArrowRightIcon />
                </div>

                <div className={"flex items-center justify-between"}>
                  <div className={"flex -space-x-4"}>
                    {content.members
                      .slice(0, 6)
                      .map((user: IUser, index: number) => (
                        <Avatar key={index}>
                          <AvatarImage src={user.avatar} />
                        </Avatar>
                      ))}
                  </div>

                  <div>{content.members.length}人已加入</div>
                </div>
              </div>
            )}

            {type === "image-choices" && (
              <div className={"flex flex-col gap-2"}>
                <RadioGroup
                  className={"flex gap-2"}
                  value={imageIndex}
                  onValueChange={setImageIndex}
                >
                  {(content.images as string[]).map((image, index) => (
                    <div
                      className={cn(
                        "flex flex-col items-center gap-2",
                        `${index}` !== imageIndex && "brightness-50",
                      )}
                      key={index}
                    >
                      <Image
                        src={image}
                        alt={image}
                        key={index}
                        width={160}
                        height={240}
                      />
                      <RadioGroupItem value={`${index}`} />
                    </div>
                  ))}
                </RadioGroup>

                <Button>已提交</Button>
              </div>
            )}

            {type === "text-choices" && (
              <div className={"flex w-full flex-col gap-2"}>
                <RadioGroup
                  className={"flex flex-col gap-2"}
                  value={imageIndex}
                  onValueChange={setImageIndex}
                >
                  {(content as string[]).map((text, index) => (
                    <div
                      className={cn(
                        "flex items-center gap-2",
                        `${index}` !== imageIndex && "brightness-50",
                      )}
                      key={index}
                    >
                      <RadioGroupItem value={`${index}`} />

                      <div>{text}</div>
                    </div>
                  ))}
                </RadioGroup>

                <Button>已提交</Button>
              </div>
            )}

            {type === "task" && (
              <div
                className={"flex flex-col gap-2 rounded-lg bg-[#3D3847] p-3"}
              >
                <div className={"flex items-center justify-between"}>
                  <div>帮作品传播</div>

                  <Hot value={content.value} />
                </div>

                <div className={"flex overflow-hidden rounded-lg"}>
                  <Image
                    src={Assets.CoverImage.src}
                    alt={"cover"}
                    width={120}
                    height={160}
                    className={"shrink-0"}
                  />
                  <div
                    className={
                      "flex grow flex-col justify-between bg-[#2A2434] p-3"
                    }
                  >
                    <div>{content.title}</div>

                    <div className={"flex justify-between"}>
                      <div className={"flex items-center gap-1"}>
                        <Assets.WechatMPIcon />
                        视频号
                      </div>
                      <div>{content.datetime}发布</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {type === "goods-link" && (
              <div className={"flex flex-col gap-2"}>
                <div
                  className={"flex justify-between rounded-lg bg-[#3D3847] p-2"}
                >
                  <div className={"flex items-center gap-2"}>
                    <div className={"w-[80px] "}>
                      <AspectRatio ratio={1}>
                        <Image
                          src={content.cover}
                          alt={"cover"}
                          fill
                          className="rounded-md object-cover"
                        />
                      </AspectRatio>
                    </div>

                    <div className={"flex grow flex-col gap-2"}>
                      <div>{content.title}</div>
                      <Hot value={content.value} />
                    </div>
                  </div>
                </div>

                <div className={"text-muted-foreground text-xs"}>
                  来自{content.source}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {user.type === "assistant" && (
        <BsThreeDots className={cn("text-muted-foreground absolute right-2")} />
      )}
    </div>
  );
}
