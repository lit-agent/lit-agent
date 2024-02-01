import { unstable_noStore as noStore } from "next/cache";
import HomePage from "@/components/home";

export default async function Home() {
  noStore();

  return <HomePage />;
}
