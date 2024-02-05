import * as tencentcloud from "tencentcloud-sdk-nodejs-sms";
import * as process from "process";
import { getTimeS } from "../lib/datetime";
import { JIUGU_AI_ID, SMS_EXPIRE_MINUTES } from "@/const";
import { prisma } from "@/server/db";
import { signOut } from "next-auth/react";
import { MessageType } from "@/ds/message";

const SmsClient = tencentcloud.sms.v20210111.Client;

const secretId = process.env.TENCENTCLOUD_SECRET_ID;
const secretKey = process.env.TENCENTCLOUD_SECRET_KEY;
// console.log("-- tencent clout sdk: ", { secretId, secretKey });

// 实例化要请求产品(以cvm为例)的client对象
const client = new SmsClient({
  // 为了保护密钥安全，建议将密钥设置在环境变量中或者配置文件中，请参考本文凭证管理章节。
  // 硬编码密钥到代码中有可能随代码泄露而暴露，有安全隐患，并不推荐。
  credential: {
    secretId,
    secretKey,
  },
  // 产品地域
  region: "ap-beijing",
  // 可选配置实例
  profile: {
    httpProfile: {
      endpoint: "sms.tencentcloudapi.com",
      headers: {
        // 自定义 header
      },
      // proxy: "http://127.0.0.1:8899" // http请求代理
    },
  },
});

export const sendSms = async ({ phone }: { phone: string }) => {
  const code = Math.random().toString().slice(2, 8);

  const params = {
    PhoneNumberSet: [phone],
    SmsSdkAppId: "1400518792",
    SignName: "邢健的个人博客",
    TemplateId: "2064119",
    TemplateParamSet: [code, `${SMS_EXPIRE_MINUTES}`],
  };

  try {
    console.log("-- sending sms: ", { phone, code });
    const user = await prisma.user.findUnique({
      where: { phone },
      include: { honors: true },
    });
    if (!user) {
      // 新建 user 和 account
      await prisma.user.create({
        data: {
          name: phone,
          phone,

          // 创建平台级的账号，todo: 未来应该是继续account创建或者更新user
          accounts: {
            create: {
              provider: "sms",
              providerAccountId: phone,
              type: "credentials",

              access_token: code,
              expires_at: getTimeS() + SMS_EXPIRE_MINUTES * 60 * 1000,
            },
          },
        },
      });
    } else {
      // 只更新 account
      await prisma.account.update({
        where: {
          provider_providerAccountId: {
            provider: "sms",
            providerAccountId: phone,
          },
        },
        data: {
          access_token: code,
          expires_at: getTimeS() + SMS_EXPIRE_MINUTES * 60 * 1000,
        },
      });
    }

    const res = await client.SendSms(params);
    console.log("-- res: ", res);
    return res;
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const validateSms = async ({
  phone,
  code,
}: {
  phone: string;
  code: string;
}) => {
  const account = await prisma.account.findUnique({
    where: {
      provider_providerAccountId: {
        provider: "sms",
        providerAccountId: phone,
      },
    },
    include: {
      user: true,
    },
  });
  // console.log("-- account: ", account);

  if (
    // 不存在
    !account ||
    // 过期
    getTimeS() > account.expires_at! ||
    // 错误
    account.access_token !== code
  ) {
    return null;
  }

  let user;
  if (!account.user) {
    //   创建用户
    user = await prisma.user.create({
      data: {
        name: "sms-" + phone,
        phone,
        phoneVerified: new Date(),
        status: "online",

        // 连接 user - account
        // todo: 连接 user - verificationToken - session
        accounts: {
          connect: {
            provider_providerAccountId: {
              provider: "sms",
              providerAccountId: phone,
            },
          },
        },
      },
    });

    // 欢迎语不需要使用socket发，因为用户还没到房间
    await prisma.message.create({
      data: {
        body: {
          type: MessageType.Plain,
          detail:
            "Yo！恭喜你成为姑的Friend！\n\n" +
            "在这里你可以随时跟我的AI替身闲聊（放心它不会瞎编），所有的聊天记录我都能看到，如果有值得回复的问题我会亲自回复\n\n" +
            "商务合作留言请加 #合作 标签\n" +
            "商品售后留言请加 #售后 标签\n\n" +
            "常见问题：\n" +
            "[如何直接联系玖姑本人？](https://baidu.com)\n" +
            "[什么是火值？如何赚火值？](https://baidu.com)",
        },
        channelId: `${user.id}-jiugu`,
        fromUserId: JIUGU_AI_ID,
      },
    });
  } else {
    user = await prisma.user.update({
      where: { id: account.user.id },
      data: {
        status: "online",
      },
    });
  }

  // 确保徽章
  // honors 一开始没有
  if (!user.honors?.length) {
    await prisma.user.update({
      where: { id: user.id },
      data: {
        honors: {
          connectOrCreate: {
            where: {
              id: "NewUser",
            },
            create: {
              id: "NewUser",
            },
          },
        },
      },
    });
  }

  // 确保房间
  // const roomId = `${user.id}-jiugu`;
  // await prisma.room.upsert({
  //   where: { id: roomId },
  //   create: { id: roomId },
  //   update: {},
  // });

  console.log("-- validated user: ", user);

  return user;
};
