import Assets from "@/components/assets";

export const navs = [
  { Icon: Assets.Menu1Icon, alt: "1" },
  { Icon: Assets.FireIcon, alt: "2" },
  { Icon: Assets.Menu3Icon, alt: "3" },
];

export const tasks = [
  { name: "在途任务", cnt: 6, hasReminder: true },
  { name: "完成的任务", cnt: 11 },
  { name: "失败的任务", cnt: 11 },
];

export type BgModel = "plain" | "mirror";
