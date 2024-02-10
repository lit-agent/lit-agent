"use client"
import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { UPLOAD_FORM_ID } from "@/lib/oss/const"
import Image from "next/image"

import { VerticalContainer } from "@/providers/containers"

export default function TestOssPage() {
  const [file, setFile] = useState<string | null>(
    "/image/example/image-choices-1.png",
  )

  return (
    <VerticalContainer>
      <Label htmlFor={"u1"}>服务端签证，客户端直传</Label>
      <Input
        id={"u1"}
        type={"file"}
        accept={"image/*"}
        multiple
        onChange={async (event) => {
          const files = event.currentTarget.files
          if (!files) return
          const file = files[0]!

          fetch(`/api/oss/upload`, {})
            .then((res) => res.json())
            .then((data) => {
              const signatureUrl = data.data.signatureUrl
              const fileUrl = signatureUrl.split("?")[0] ?? signatureUrl
              console.log({ signatureUrl, url: fileUrl })
              fetch(signatureUrl, {
                method: "PUT",
                headers: new Headers({
                  "Content-Type": "image/png",
                }),
                body: file,
              }).then((res) => {
                console.log("[OSS] upload result: ", res)
                if (!res.ok) return toast.error("上传失败！")
                setFile(fileUrl)
                toast.success("上传成功")
              })
            })
        }}
      />

      <Label htmlFor={"u2"}>服务端存储，服务端流传</Label>
      <Input
        id={"u2"}
        type={"file"}
        accept={"image/*"}
        onChange={async (event) => {
          const files = event.currentTarget.files
          if (!files) return
          const file = files[0]!

          const formData = new FormData()
          formData.append(UPLOAD_FORM_ID, file)
          fetch("/api/oss/upload", {
            method: "POST",
            body: formData,
          })
            .then((res) => {
              if (!res.ok) return toast.error("上传失败！")
              res.json().then((res) => {
                setFile(res.data[0])
              })
            })
            .catch(console.error)
        }}
      />

      <div className={"mx-auto"}>
        {file && (
          <div className={"relative w-80 h-80"}>
            <Image src={file} alt={"file"} fill className={"object-contain"} />
          </div>
        )}
      </div>
    </VerticalContainer>
  )
}
