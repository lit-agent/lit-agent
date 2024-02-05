import { BaseClientUser } from "@/ds/user"
import { IMessageContainer } from "@/components/message-item"
import {
  Choice1Image,
  Choice2Image,
  HadingImage,
  JiuguImage,
  SampleUser1Image,
} from "@/lib/assets"

export const userJiuguAI: BaseClientUser = {
  id: "jiugu-ai",
  name: "玖姑的AI助理",
  image: JiuguImage.src,
  type: "assistant",
}

export const userJiugu: BaseClientUser = {
  id: "jiugu",
  name: "玖姑",
  image: JiuguImage.src,
  type: "blogger",
}

export const userHading: BaseClientUser = {
  id: "hading",
  name: "哈丁",
  image: HadingImage.src,
  type: "user",
}

export const userSample: BaseClientUser = {
  id: "demo",
  name: "demo",
  image: SampleUser1Image.src,
  type: "user",
}

export const genUsers = (n: number) => new Array(n).fill(userSample)

export const sampleImageItems = [Choice1Image.src, Choice2Image.src]

// export const sampleChatItems: IMessageContainer[] = [
//
//   {
//     user: userJiugu,
//     body: [
//       {
//         type: "plain",
//         content: "新作封面二选一，你喜欢哪个？",
//       },
//       {
//         type: "image-choices",
//         content: {
//           images: sampleImageItems,
//         },
//       },
//     ],
//   },
//
//   {
//     user: userHading,
//     body: [
//       {
//         type: "plain",
//         content: "我选了左边的",
//       },
//     ],
//   },
//
//   {
//     user: userJiuguAI,
//     body: [
//       {
//         type: "plain",
//         content:
//           "感谢！\n" +
//           "你也可以来群里看看别人是怎么选的，说不定你们能碰撞出更牛逼的点子💡",
//       },
//       {
//         type: "group-link",
//         content: {
//           members: genUsers(93),
//         },
//       },
//     ],
//   },
//
//   {
//     user: userJiugu,
//     body: [
//       {
//         type: "plain",
//         content: "下一期的选题，你更想看哪个？",
//       },
//       {
//         type: "text-choices",
//         content: ["玖姑开喷程前", "继续diss东方甄选", "分享更多个人生活"],
//       },
//     ],
//   },
//
//   {
//     user: userHading,
//     body: [
//       {
//         type: "plain",
//         content: "我选了：玖姑开喷程前",
//       },
//     ],
//   },
//
//   {
//     user: userJiuguAI,
//     body: [
//       {
//         type: "plain",
//         content:
//           "啊哈！\n" + "你也选了这个？\n" + "来群里看看别人都选了什么吧！",
//       },
//       {
//         type: "group-link",
//         content: {
//           members: genUsers(1231),
//         },
//       },
//     ],
//   },
//
//   {
//     user: userJiugu,
//     body: [
//       {
//         type: "plain",
//         content: "想看喷程前的直接速速来点赞评论转发！",
//       },
//       {
//         type: "task",
//         content: {
//           value: 10,
//           title: "我会在本周连续讨论一些愚蠢的常见性别话术#服美...",
//           cover: "/cover-jiugu.png",
//           datetime: 1706372922,
//           members: genUsers(183),
//         },
//       },
//     ],
//   },
//
//   {
//     user: userHading,
//     body: [
//       {
//         type: "plain",
//         content: "上传了作品截图",
//       },
//       {
//         type: "images",
//         content: {
//           images: sampleImageItems,
//         },
//       },
//     ],
//   },
//
//   {
//     user: userJiuguAI,
//     body: [
//       {
//         type: "plain",
//         content: "买这个",
//       },
//       {
//         type: "goods-link",
//         content: {
//           title: "1对1深度咨询",
//           value: 800,
//           cover: sampleImageItems[0],
//           source: "火值兑换商城",
//         },
//       },
//     ],
//   },
// ];
