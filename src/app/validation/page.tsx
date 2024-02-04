"use client";

import { Avatar, AvatarImage } from "src/components/ui/avatar";
import MessageComp from "@/components/message-item";
import { IoMenuOutline } from "react-icons/io5";
import { BloggerContainer } from "src/containers/blogger";
import { Button } from "../../components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { api } from "@/trpc/react";
import { useValidation } from "@/hooks/use-validation";

import { guidanceItems } from "@/config";
import Assets from "@/components/assets";

type Validation = Record<number, number[]>;

export default function ValidationPage() {
  const [validating, setValidating] = useState(false);
  const [answer, setAnswer] = useState<Validation>({
    4: [],
    5: [],
    6: [],
    7: [],
  });

  const [validationResult, setValidationResult] = useState<ValidationResult>(
    ValidationResult.unknown,
  );

  const validate = api.user.validate.useMutation();

  const router = useRouter();

  return (
    <div className={"flex h-full flex-col"}>
      <div className={"flex items-center justify-center gap-1 p-2"}>
        <Avatar className={"h-5 w-5"}>
          <AvatarImage src={Assets.JiuguImage.src} />
        </Avatar>

        <div>玖姑</div>
      </div>

      <div className={"flex grow flex-col gap-4 overflow-auto p-4"}>
        {
          // sampleChatItems
          guidanceItems.map((chatItem, index) => (
            <MessageComp
              {...chatItem}
              key={index}
              onValueChange={(v) => {
                setAnswer({ ...answer, [index]: v });
              }}
            />
          ))
        }

        {validationResult === ValidationResult.unknown && (
          <Button
            disabled={
              validating || Object.values(answer).some((v) => !v.length)
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
                // 在错误的时候重新允许validate，正确的时候会直接飞走
                setValidating(false);
              } else {
                toast.success(
                  "你果然是姑的friend，恭喜你获得火伴身份！",
                  // todo: 更友好的显示
                  // "以及我们赠送的10火值，你可以在xxx查看你的火值数额，并在xxx进行兑换。"
                );
                void router.push("/");
              }
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

enum ValidationResult {
  unknown,
  ok,
  failed,
}
