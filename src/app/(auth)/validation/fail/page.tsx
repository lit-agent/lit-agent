"use client"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useUser } from "@/hooks/use-user"

export default function ValidateFail() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className={"text-lg"}>抱歉，通过失败！</CardTitle>

        <CardDescription className={"flex flex-col gap-2"}>
          你不算姑的friend哦，想加入再去刷刷姑的视频吧。
        </CardDescription>
      </CardHeader>

      <CardFooter>
        <Button
          className={"w-full"}
          onClick={async (event) => {
            event.preventDefault() // ref: https://stackoverflow.com/a/72021918
            location.reload()
          }}
        >
          重试
        </Button>
      </CardFooter>
    </Card>
  )
}
