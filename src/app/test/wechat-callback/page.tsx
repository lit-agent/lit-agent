"use client"
import { VerticalContainer } from "@/components/containers/vertical"
import { api } from "@/lib/trpc/react"
import { useEffect, useState } from "react"

import { useSearchParams } from "next/navigation"

export default function Page() {
  const params = useSearchParams()
  const code = params.get("code")
  const state = params.get("state")

  const [accessStates, setAccessStates] = useState(0)
  const bind = api.wechat.bindWxOpenIdToUser.useMutation()

  useEffect(() => {
    console.log("--code", code)

    if (code) {
      bind.mutate(
        { code },
        {
          onSuccess: (data) => {
            console.log("OpenId bound successfully", data)
            setAccessStates(1)
          },
          onError: (error) => {
            console.error("Error binding OpenId", error)
            setAccessStates(-1)
          },
        },
      )
    }
  }, [])

  let content
  if (accessStates === 1) {
    content = <p>授权成功</p>
  } else if (accessStates === -1) {
    content = <p>授权失败</p>
  } else {
    content = <p>授权中，请稍等......</p>
  }

  return <VerticalContainer>{content}</VerticalContainer>
}
