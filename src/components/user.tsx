import { BaseClientUser } from "@/ds/user";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const UserComp = ({ user }: { user: BaseClientUser }) => (
  <Avatar className={"h-8 w-8"}>
    <AvatarImage src={user.image!} />
    <AvatarFallback className={"bg-gray-600"}>
      {(user.name ?? user.id)[0]}
    </AvatarFallback>
  </Avatar>
);
