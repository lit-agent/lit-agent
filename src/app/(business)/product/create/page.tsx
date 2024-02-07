import CreateProductPage from "@/components/product-create"
import { ensureServerUser } from "@/lib/auth"

export default async function CreateProductServerPage() {
  const user = await ensureServerUser()

  return <CreateProductPage user={user} />
}
