"use client"

import { Label } from "@/components/ui/label"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { VerticalContainer } from "@/providers/containers"

export default function TestPage() {
  return (
    <VerticalContainer>
      <Label className={"text-2xl"}>Test Page</Label>

      <Link href={"/test/oss"}>
        <Button>OSS</Button>
      </Link>

      <Link href={"/test/clipboard"}>
        <Button>Clipboard</Button>
      </Link>
    </VerticalContainer>
  )
}
