import { getServerAuthSession } from "@/server/auth";
import Home_ from "@/app/page_";

export default async function HomePage() {
  const session = await getServerAuthSession();

  if (!session || !session.user) return null;

  return <Home_ user={session.user} />;
}
