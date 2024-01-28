import { IUser } from "@/ds/user";
import { IChatItem } from "@/app/_components/chat-item";

export const userJiuguAI: IUser = {
  name: "玖姑的AI助理",
  avatar: "/user-jiugu.png",
  type: "assistant",
};

export const userJiugu: IUser = {
  name: "玖姑",
  avatar: "/user-jiugu.png",
  type: "blogger",
};

export const userHading: IUser = {
  name: "哈丁",
  avatar: "/user-hading.png",
  type: "user",
};

export const userSample: IUser = {
  name: "demo",
  avatar: "/user-sample-1.png",
  type: "user",
};

export const genUsers = (n: number) => new Array(n).fill(userSample);

export const sampleImageItems = [
  "/image-choices-1.png",
  "/image-choices-2.png",
];

export const sampleChatItems: IChatItem[] = [
  {
    user: userJiuguAI,
    segments: [
      {
        type: "text",
        content:
          "Yo！恭喜你成为姑的Friend！\n\n" +
          "在这里你可以随时跟我的AI替身闲聊（放心它不会瞎编），所有的聊天记录我都能看到，如果有值得回复的问题我会亲自回复\n\n" +
          "商务合作留言请加 #合作 标签\n" +
          "商品售后留言请加 #售后 标签\n\n" +
          "常见问题：\n" +
          "[如何直接联系玖姑本人？](https://baidu.com)\n" +
          "[什么是火值？如何赚火值？](https://baidu.com)",
      },
    ],
  },

  {
    user: userJiugu,
    segments: [
      {
        type: "text",
        content: "新作封面二选一，你喜欢哪个？",
      },
      {
        type: "image-choices",
        content: {
          images: sampleImageItems,
        },
      },
    ],
  },

  {
    user: userHading,
    segments: [
      {
        type: "text",
        content: "我选了左边的",
      },
    ],
  },

  {
    user: userJiuguAI,
    segments: [
      {
        type: "text",
        content:
          "感谢！\n" +
          "你也可以来群里看看别人是怎么选的，说不定你们能碰撞出更牛逼的点子💡",
      },
      {
        type: "group-link",
        content: {
          members: genUsers(93),
        },
      },
    ],
  },

  {
    user: userJiugu,
    segments: [
      {
        type: "text",
        content: "下一期的选题，你更想看哪个？",
      },
      {
        type: "text-choices",
        content: ["玖姑开喷程前", "继续diss东方甄选", "分享更多个人生活"],
      },
    ],
  },

  {
    user: userHading,
    segments: [
      {
        type: "text",
        content: "我选了：玖姑开喷程前",
      },
    ],
  },

  {
    user: userJiuguAI,
    segments: [
      {
        type: "text",
        content:
          "啊哈！\n" + "你也选了这个？\n" + "来群里看看别人都选了什么吧！",
      },
      {
        type: "group-link",
        content: {
          members: genUsers(1231),
        },
      },
    ],
  },

  {
    user: userJiugu,
    segments: [
      {
        type: "text",
        content: "想看喷程前的直接速速来点赞评论转发！",
      },
      {
        type: "task",
        content: {
          value: 10,
          title: "我会在本周连续讨论一些愚蠢的常见性别话术#服美...",
          cover: "/cover-jiugu.png",
          datetime: 1706372922,
          members: genUsers(183),
        },
      },
    ],
  },

  {
    user: userHading,
    segments: [
      {
        type: "text",
        content: "上传了作品截图",
      },
      {
        type: "images",
        content: {
          images: sampleImageItems,
        },
      },
    ],
  },

  {
    user: userJiuguAI,
    segments: [
      {
        type: "text",
        content: "买这个",
      },
      {
        type: "goods-link",
        content: {
          title: "1对1深度咨询",
          value: 800,
          cover: sampleImageItems[0],
          source: "火值兑换商城",
        },
      },
    ],
  },
];
