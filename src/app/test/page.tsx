"use client"

import { Label } from "@/components/ui/label"

import { VerticalContainer } from "@/components/containers/vertical"
import { ButtonLink } from "@/components/_universal/link"

export default function TestPage() {
  return (
    <VerticalContainer>
      <Label className={"text-2xl"}>Test Page</Label>

      <ButtonLink href={"/test/oss"}>OSS</ButtonLink>

      <ButtonLink href={"/test/clipboard"}>Clipboard</ButtonLink>

      <ButtonLink href={"/test/pay"}>Pay</ButtonLink>
    </VerticalContainer>
  )
}
