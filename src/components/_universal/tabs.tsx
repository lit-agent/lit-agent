import { Dispatch, ReactNode, SetStateAction } from "react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"

/**
 * 用于 task, user-task, product, user-product, bill 等的筛选
 *
 * @param title
 * @param filters
 * @param setFilter
 * @param children
 * @constructor
 */
export const UniversalTabs = <T extends string>({
  title,
  filters,
  filter,
  setFilter,
  children,
}: {
  title: string
  filters?: Readonly<T[]>
  filter?: T
  setFilter?: Dispatch<SetStateAction<T>>
  children: ReactNode
}) => {
  return (
    <Tabs className={"flex flex-col gap-2 py-4"} value={filter}>
      <div className={"flex justify-between items-center"}>
        <Label className={"text-primary text-2xl shrink-0"}>{title}</Label>

        <TabsList className={"overflow-auto"}>
          {filters?.map((filter) => (
            <TabsTrigger
              className={
                "px-1 data-[state=active]:bg-transparent data-[state=active]:underline data-[state=active]:text-primary data-[state=active]:underline-offset-4"
              }
              key={filter}
              value={filter}
              onClick={() => {
                setFilter && setFilter(filter)
              }}
            >
              {filter}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>

      {children}
    </Tabs>
  )
}
