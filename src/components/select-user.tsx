import { api } from "@/trpc/react";
import { userJiugu } from "@/ds/mock";
import { useUser } from "@/hooks/use-user";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

export const SelectUser = () => {
  const { data: users = [] } = api.user.list.useQuery();
  const { targetUser = userJiugu, setTargetUser } = useUser();

  // console.log("-- target user: ", targetUser);
  const { user } = useUser();

  return (
    <Select
      onValueChange={(v) => setTargetUser(users.find((u) => u.id === v)!)}
    >
      <SelectTrigger
        id={"header"}
        className={"flex items-center justify-center gap-1 p-2 relative"}
      >
        <div
          className={"absolute left-0 top-1/2 -translate-y-1/2 text-red-500"}
        >
          [{user?.phone}]
        </div>

        <Avatar className={"h-5 w-5"}>
          <AvatarImage src={targetUser?.image ?? undefined} />
          <AvatarFallback>
            {(targetUser?.name ?? targetUser?.id ?? "U")[0]}
          </AvatarFallback>
        </Avatar>

        <div>{targetUser?.name ?? targetUser?.phone ?? targetUser?.id}</div>
      </SelectTrigger>

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
