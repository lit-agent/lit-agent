import { cn } from "@/lib/utils";

export const Dot = ({
  status = "online",
  size = "sm",
}: {
  status?: "online" | "offline" | "busy";
  size?: "sm" | "lg";
}) => {
  return (
    <div
      className={cn(
        "rounded-full",
        status === "online" && "bg-green-600",
        status === "offline" && "bg-gray-600",
        status === "busy" && "bg-yellow-600",
        size === "sm" && "h-3 w-3",
        size === "lg" && "h-6 w-6",
      )}
    />
  );
};
