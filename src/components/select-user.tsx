import { api } from "@/trpc/react";
import { userJiugu } from "@/ds/mock";
import { useUserData } from "@/hooks/use-user-data";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { ChevronLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export const SelectUser = ({ withBack }: { withBack?: boolean }) => {
  const { data: users = [] } = api.user.list.useQuery();
  const { targetUser = userJiugu, setTargetUser } = useUserData();
  const router = useRouter();

  // console.log("-- target user: ", targetUser);

  return (
    <Select
      onValueChange={(v) => setTargetUser(users.find((u) => u.id === v)!)}
    >
      <div className={"relative w-full flex justify-center "}>
        {withBack && (
          <ChevronLeftIcon
            className={
              "absolute left-2 top-1/2 -translate-y-1/2 w-6 h-6 rounded hover:bg-gray-800 p-1 transition-all"
            }
            onClick={(event) => {
              router.back();
            }}
          />
        )}

        <SelectTrigger
          id={"header"}
          className={
            "flex items-center justify-center gap-1 p-2 border-none focus:ring-0 focus:ring-offset-0 rounded-none"
          }
        >
          <Avatar className={"h-5 w-5"}>
            <AvatarImage src={targetUser?.image ?? undefined} />
            <AvatarFallback>
              {(targetUser?.name ?? targetUser?.id ?? "U")[0]}
            </AvatarFallback>
          </Avatar>

          <div>{targetUser?.name ?? targetUser?.id}</div>
        </SelectTrigger>
      </div>

      <SelectContent>
        <SelectGroup>
          {users.map((user) => (
            <SelectItem value={user.id} key={user.id}>
              <div className={"flex items-center gap-2"}>
                <div
                  className={cn(
                    "w-2 h-2 rounded-full",
                    user.status === "online" && "bg-green-500",
                    user.status === "offline" && "bg-gray-500",
                    user.status === "busy" && "bg-yellow-500",
                  )}
                />
                <div>
                  {user.id}({user.phone})
                </div>
              </div>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
