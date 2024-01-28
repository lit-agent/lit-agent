import { useSystem } from "@/hooks/use-system";
import { navs } from "@/ds/system";
import { cn } from "@/lib/utils";

export const BottomNavbar = () => {
  const { nav, setNav } = useSystem();

  return (
    <div
      id={"nav"}
      className={"flex w-full shrink-0 justify-evenly bg-black py-2"}
    >
      {navs.map(({ Icon, alt }, index) => (
        <div
          key={index}
          className={cn(
            "shrink-0 rounded-[16px] p-2",
            index === nav && "bg-orange-500",
            "transition-all",
          )}
          onClick={() => {
            setNav(index);
          }}
        >
          <div className={"h-6 w-6"}>
            <Icon key={index} />
          </div>
        </div>
      ))}
    </div>
  );
};
