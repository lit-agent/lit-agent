import { ElementType } from "react"
import {
  ImagesControl,
  InputControl,
  NumberControl,
  SwitchControl,
  TextareaControl,
} from "@/components/controls"

export type FormFieldType = "string" | "text" | "images" | "number" | "boolean"

export const formFieldControlMap: Record<FormFieldType, ElementType> = {
  string: InputControl,
  images: ImagesControl,
  text: TextareaControl,
  boolean: SwitchControl,
  number: NumberControl,
}
