import { BgModel } from "@/ds/system";
import { IMessageContainer } from "@/components/message-item";
import { userJiugu, userJiuguAI } from "@/ds/mock";
import { MessageType } from "@/ds/message";

export const bloggerPhone = "17766091857";

export const bgModel: BgModel = "plain";

export const guidanceItems: IMessageContainer[] = [
  {
    user: userJiugu,
    body: {
      type: MessageType.Plain,
      title: "Hello，我是玖姑。欢迎加入我的朋友圈。",
    },
  },

  {
    user: userJiugu,
    body: {
      type: MessageType.Plain,
      title:
        "我就是玖姑本姑。因为找我的人太多，我做了个AI助理，帮我处理一些简单问题，比如售后、基本信息。同时我也也会在后台看到你的所有信息，并记录你给我的所有贡献。",
    },
  },

  {
    user: userJiuguAI,
    body: {
      type: MessageType.Plain,
      title:
        "Hi 我是姑的AI助理。如果我回答不了你的问题，我会收集整理告诉姑。如果你想直接迅速找到姑，可以花一些火值。你可以通过帮姑把内容转评赞、或完成一些指定任务来获得火值。火值也可以用来兑换其他姑提供的产品和服务。",
    },
  },

  {
    user: userJiuguAI,
    body: {
      type: MessageType.Plain,
      title: "首先我先帮姑筛选一下真正的姑的friend。请回答以下几个问题：",
    },
  },

  {
    user: userJiuguAI,
    body: {
      type: MessageType.TextChoices,
      title: "玖姑为什么不化妆？（多选）",
      questions: ["懒的化", "对颜值自信", "挑战公众对女性的束缚"],
      answer: [0, 1, 2],
    },
  },

  {
    user: userJiuguAI,
    body: {
      type: MessageType.TextChoices,
      title: "玖姑的立场是？",
      questions: ["厌男", "厌女", "厌蠢"],
      answer: [2],
    },
  },
  {
    user: userJiuguAI,
    body: {
      type: MessageType.TextChoices,
      title: "玖姑是否支持彩礼？",

      questions: ["是", "否", "无所谓"],
      answer: [2],
    },
  },
  {
    user: userJiuguAI,
    body: {
      type: MessageType.TextChoices,
      title: "玖姑的目标是什么？",
      questions: ["成为世界巨星", "赚一个小目标", "环游世界"],
      answer: [0],
    },
  },
];
