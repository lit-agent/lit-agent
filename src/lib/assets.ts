"use client"

import Menu1Icon from "../../public/image/icon/menu-l.svg"
import FireIcon from "../../public/image/icon/fire.svg"
import Menu3Icon from "../../public/image/icon/menu-r.svg"
import RingIcon from "../../public/image/icon/ring.svg"
import AwardFillIcon from "../../public/image/icon/award-fill.svg"
import DirectBoxSendIcon from "../../public/image/icon/directbox-send.svg"
import WechatMPIcon from "../../public/image/icon/wechat-mp.svg"
import NotificationIcon from "../../public/image/icon/notification.svg"
import CallIcon from "../../public/image/icon/call.svg"
import Honor1SVG from "../../public/image/honor/honor-1.svg"
import Honor2SVG from "../../public/image/honor/honor-2.svg"
import Honor3SVG from "../../public/image/honor/honor-3.svg"
import Honor4SVG from "../../public/image/honor/honor-4.svg"
import Honor5SVG from "../../public/image/honor/honor-5.svg"
import TaskCardSVG from "../../public/image/bg/task-card.svg"

import CoverSmImage from "../../public/image/user/jiugu-cover-sm.png"
import CoverMdImage from "../../public/image/user/jiugu-cover-md.png"
import JiuguImage from "../../public/image/user/jiugu-avatar.png"
import HadingImage from "../../public/image/user/hading-avatar.png"
import SampleUser1Image from "../../public/image/user/example-avatar.png"
import BgCircleImage from "../../public/image/icon/bg-circle.png"
import BroadcastImage from "../../public/image/icon/broadcast.png"
import Choice1Image from "../../public/image/example/image-choices-1.png"
import Choice2Image from "../../public/image/example/image-choices-2.png"
import XiaohongshuBrandImage from "../../public/image/brand/xiaohongshu.png"
import DouyinBrandImage from "../../public/image/brand/douyin.png"
import ShipinhaoBrandImage from "../../public/image/brand/shipinhao.png"
import KuaishouBrandImage from "../../public/image/brand/kuaishou.png"
import CoverTextBigImage from "../../public/image/landing/cover-text-big.jpg"
import LitBrandImage from "../../public/image/brand/lit.png"
import RankingImage from "../../public/image/illustrator/ranking.png"

import { HonorType } from "@prisma/client"

export {
  BroadcastImage,
  Menu1Icon,
  FireIcon,
  Menu3Icon,
  RingIcon,
  AwardFillIcon,
  DirectBoxSendIcon,
  WechatMPIcon,
  NotificationIcon,
  CallIcon,
  CoverSmImage,
  CoverMdImage,
  JiuguImage,
  HadingImage,
  BgCircleImage,
  SampleUser1Image,
  Choice1Image,
  Choice2Image,
  Honor1SVG,
  Honor2SVG,
  Honor3SVG,
  Honor4SVG,
  Honor5SVG,
  TaskCardSVG,
  ShipinhaoBrandImage,
  DouyinBrandImage,
  KuaishouBrandImage,
  XiaohongshuBrandImage,
  CoverTextBigImage,
  LitBrandImage,
  RankingImage,
}

export const honorDict: Record<HonorType, string> = {
  NewUser: Honor1SVG,
  GoodFriend: Honor2SVG,
  HotFriend: Honor3SVG,
  GoodFriendEver: Honor4SVG,
  HotFriendEver: Honor5SVG,
  NewTask: Honor1SVG,
}
