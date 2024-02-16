"use client"

import CreateFormPage from "@/components/create-page"
import {
  createProductData,
  createTaskData,
} from "@/app/(authed)/(sub)/create/config"
import { api } from "@/lib/trpc/react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { createProductSchema } from "@/schema/product"
import { createTaskSchema } from "@/schema/task"

enum CreateType {
  product = "product",
  task = "task",
}

export default function CreateProductPage() {
  return (
    <Tabs defaultValue={CreateType.task} className={""}>
      <TabsList className={"grid grid-cols-2 m-1"}>
        <TabsTrigger value={CreateType.task}>发布任务</TabsTrigger>
        <TabsTrigger value={CreateType.product}>发布产品</TabsTrigger>
      </TabsList>

      <TabsContent value={CreateType.task} className={"mt-0"}>
        <CreateFormPage
          route={api.task}
          data={createTaskData}
          schema={createTaskSchema}
          callbackUrl={"/task"}
        />
      </TabsContent>

      <TabsContent value={CreateType.product} className={"mt-0"}>
        <CreateFormPage
          route={api.product}
          data={createProductData}
          schema={createProductSchema}
          callbackUrl={"/product"}
        />
      </TabsContent>
    </Tabs>
  )
}
