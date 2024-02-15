import { prisma } from "../db";
import fetch from 'node-fetch';
import { getServerAuthSession } from "../auth";
import { WX_PROVIDER, WX_REDIRECT_URL, WX_AUTH_URL, WX_ACCESS_URL, WX_REGULAR_ACCESS_TOKEN_URL, wxApp } from "@/lib/wx/config"
import { GetAccessTokenResponse } from "./schema";


// 获取微信获取用户信息授权url
export const getWxAuthUrl = async () => {
    console.log("-- enter into getWxAuthUrl");
    const session = await getServerAuthSession();
    if (!session?.user?.id) {
        throw new Error("Fail to get userId");
    }
    const userId = session?.user?.id;
    const requestParam = `appid=${wxApp.appId}&redirect_uri=${WX_REDIRECT_URL}&response_type=code&scope=snsapi_base&state=${userId}#wechat_redirect`;
    return `${WX_AUTH_URL}?${requestParam}`;

}

// 获取微信access token, 用于发送订阅消息
export const getWxAccessToken = async () => {
    const url = `${WX_REGULAR_ACCESS_TOKEN_URL}?grant_type=client_credential&appid=${wxApp.appId}&secret=${wxApp.appSecret}`;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`HTTP error: ${response.status} ${response.statusText}`)
    }
    const data = await response.json();
    console.log(`getWxAccessToken url:${url} data:${JSON.stringify(data)}`);
    return data as GetAccessTokenResponse;
}

/**
 * 将微信openid关联至已存在的用户账号
 * @param userId 用户id
 * @param openId 用户微信openid
 * @returns 
 */
export const bindWxOpenIdToUser = async (openId: string) => {
    const session = await getServerAuthSession();
    if (!session?.user?.id) {
        throw new Error("Fail to get userId");
    }
    const userId = session?.user?.id;
    const existingAccount = await prisma.account.findUnique({
        where: {
            provider_providerAccountId: {
                provider: WX_PROVIDER,
                providerAccountId: openId,
            },
        },
    });
    console.log(`existing account:${JSON.stringify(existingAccount)}`);
    if (existingAccount) {
        return existingAccount;
    }
    const existingUser = await prisma.user.findUnique({
        where: {
            id: userId,
        },
    });
    console.log(`existing user:${JSON.stringify(existingAccount)}`);
    if (!existingUser) {
        throw new Error("User not found, cannot create wechat account");
    }

    const createdAccount = await prisma.account.create({
        data: {
            provider: WX_PROVIDER,
            providerAccountId: openId,
            type: "oauth",
            user: {
                connect: { id: userId },
            },
        },
    });
    console.log(`created user:${JSON.stringify(createdAccount)}`);

    return createdAccount;
};


/**
 * 获取用户微信openid
 * @param code 用户同意授权后获取code
 * @returns 用户微信openid
 */
export const getOpenId = async (code: string) => {
    const requestUrl = `${WX_ACCESS_URL}?appid=${wxApp.appId}&secret=${wxApp.appSecret}&code=${code}&grant_type=authorization_code`;
    
    const response = await fetch(requestUrl);
    if (!response.ok) {
        throw new Error(`HTTP error: ${response.status} ${response.statusText}`)
    }
    const data = await response.json();
    console.log(`getOpenId data:${JSON.stringify(data)}`);
    // 检查响应中是否有openid
    if (data.openid) {
        return data.openid;
    } else {
        console.error('OpenID not found in response:', data);
        return null;
    }
}
        