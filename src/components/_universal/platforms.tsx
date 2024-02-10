import {
  DouyinBrandImage,
  ShipinhaoBrandImage,
  XiaohongshuBrandImage,
} from "@/lib/assets"
import Image, { StaticImageData } from "next/image"

export const Platforms = () => {
  return (
    <div className={"flex items-center gap-2"}>
      <Platform asset={DouyinBrandImage} />
      <Platform asset={ShipinhaoBrandImage} />
      <Platform asset={XiaohongshuBrandImage} />
    </div>
  )
}

const Platform = ({ asset, alt }: { asset: StaticImageData; alt?: string }) => (
  <Image src={asset} alt={alt ?? "platform"} width={24} height={24} />
)
