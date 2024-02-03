import { BgModel } from "@/ds/system";
import { IChatItem } from "@/components/chat-item";
import { userJiugu, userJiuguAI } from "@/ds/mock";

export const bloggerPhone = "17766091857";

export const bgModel: BgModel = "plain";

export const guidanceItems: IChatItem[] = [
  {
    user: userJiugu,
    segments: [
      {
        type: "text",
        content: "Hello，我是玖姑。欢迎加入我的朋友圈。",
      },
    ],
  },

  {
    user: userJiugu,
    segments: [
      {
        type: "text",
        content:
          "我就是玖姑本姑。因为找我的人太多，我做了个AI助理，帮我处理一些简单问题，比如售后、基本信息。同时我也也会在后台看到你的所有信息，并记录你给我的所有贡献。",
      },
    ],
  },

  {
    user: userJiuguAI,
    segments: [
      {
        type: "text",
        content:
          "Hi 我是姑的AI助理。如果我回答不了你的问题，我会收集整理告诉姑。如果你想直接迅速找到姑，可以花一些火值。你可以通过帮姑把内容转评赞、或完成一些指定任务来获得火值。火值也可以用来兑换其他姑提供的产品和服务。",
      },
    ],
  },

  {
    user: userJiuguAI,
    segments: [
      {
        type: "text",
        content: "首先我先帮姑筛选一下真正的姑的friend。请回答以下几个问题：",
      },
    ],
  },

  {
    id: "q1",
    user: userJiuguAI,
    segments: [
      {
        type: "text",
        content: "玖姑为什么不化妆？（多选）",
      },

      {
        type: "text-choices",
        content: {
          choices: ["懒的化", "对颜值自信", "挑战公众对女性的束缚"],
          multiple: true,
          answer: [0, 1, 2],
        },
      },
    ],
  },

  {
    id: "q2",
    user: userJiuguAI,
    segments: [
      {
        type: "text",
        content: "玖姑的立场是？",
      },

      {
        type: "text-choices",
        content: {
          choices: ["厌男", "厌女", "厌蠢"],
          answer: [2],
        },
      },
    ],
  },
  {
    id: "q3",
    user: userJiuguAI,
    segments: [
      {
        type: "text",
        content: "玖姑是否支持彩礼？",
      },

      {
        type: "text-choices",
        content: {
          choices: ["是", "否", "无所谓"],
          answer: [2],
        },
      },
    ],
  },
  {
    id: "q4",
    user: userJiuguAI,
    segments: [
      {
        type: "text",
        content: "玖姑的目标是什么？",
      },

      {
        type: "text-choices",
        content: {
          choices: ["成为世界巨星", "赚一个小目标", "环游世界"],
          answer: [0],
        },
      },
    ],
  },
];
