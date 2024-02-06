import { last } from "lodash"
import { v4 } from "uuid"
import { oss } from "../config"

export const uploadFile = async (file: File) => {
  const { name } = file
  const suffix = last(name.split(".")) ?? ""
  const id = `${v4()}.${suffix}`
  console.log("-- uploading: ", { name, id })
  await oss.put(id, Buffer.from(await file.arrayBuffer()))
  return id
}
