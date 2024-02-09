import { FormControl } from "@/components/ui/form"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import Image from "next/image"
import moment, { DATETIME_FORMAT } from "@/lib/datetime"
import { uploadFilesV2 } from "@/lib/oss/upload/client"

export const NumberControl = ({ field }) => {
  return (
    <FormControl>
      <Input
        type={"number"}
        {...field}
        onChange={(event) => {
          field.onChange(Number(event.currentTarget.value))
        }}
      />
    </FormControl>
  )
}
export const ImagesControl = ({ field }) => {
  return (
    <FormControl>
      <div className={"flex flex-col gap-2"}>
        <Input
          type={"file"}
          accept={"image/*"}
          multiple
          onChange={async (event) => {
            const files = event.currentTarget.files
            if (!files?.length) return
            const result = await uploadFilesV2(files)
            console.log("-- result: ", result)
            if (result.success) field.onChange(result.data)
          }}
        />

        <div className={"flex items-center gap-2"}>
          {field.value?.map((image, index) => (
            <div className={"w-12"} key={index}>
              <AspectRatio ratio={1}>
                <Image
                  src={image}
                  alt={`${index}`}
                  fill
                  sizes={"100%"}
                  className={"rounded"}
                />
              </AspectRatio>
            </div>
          ))}
        </div>
      </div>
    </FormControl>
  )
}

export const InputControl = ({ field }) => (
  <FormControl>
    <Input placeholder="" {...field} />
  </FormControl>
)

export const TextareaControl = ({ field }) => (
  <FormControl>
    <Textarea placeholder="" {...field} />
  </FormControl>
)

export const SwitchControl = ({ field }) => (
  <FormControl className={"bg-magenta-500"}>
    <Switch checked={field.value} onCheckedChange={field.onChange} />
  </FormControl>
)

export const DateControl = ({ field }) => (
  <FormControl>
    <Input
      type={"datetime-local"}
      value={moment(field.value).format(DATETIME_FORMAT)}
      onChange={(event) => {
        field.onChange(moment(event.currentTarget.value).toDate())
      }}
    />
  </FormControl>
)
