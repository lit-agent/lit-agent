// ref: https://stackoverflow.com/a/68581336
import "dotenv/config"

import { createReadStream } from "fs"
import { oss } from "@/lib/oss/config"

import { LocalFileData } from "get-file-object-from-local-path"

const filepath = "/Users/mark/@LitAgent/lit-agent/scripts/data/test-put-lg.png"

const testStream = async () => {
  const res = await oss.put(
    "ossdemo/readstream.txt",
    createReadStream(filepath),
  )
  console.log(res)
}

const testArraybuffer = async () => {
  const file = (await new LocalFileData(filepath)) as File
  console.log({ file })

  const bytes = await file.arrayBuffer()
  console.log({ bytes })
}

testArraybuffer()
