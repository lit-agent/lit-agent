import { ElementType } from "react"
import {
  DateControl,
  ImagesControl,
  InputControl,
  NumberControl,
  SwitchControl,
  TextareaControl,
} from "@/components/controls"

export type FormFieldType =
  | "string"
  | "text"
  | "images"
  | "number"
  | "boolean"
  | "date"

export const FormFieldControlMap: Record<FormFieldType, ElementType> = {
  string: InputControl,
  images: ImagesControl,
  text: TextareaControl,
  boolean: SwitchControl,
  number: NumberControl,
  date: DateControl,
}
