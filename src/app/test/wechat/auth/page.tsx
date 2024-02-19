"use client"
import { VerticalContainer } from "@/components/containers/vertical"
import Link from "next/link"
import { ButtonLink } from "@/components/_universal/link"
import { useUser } from "@/hooks/use-user"
import { Label } from "@/components/ui/label"
import SubPage from "@/components/sub-page"
import { BrowserEnvironmentComp } from "@/components/_universal/browser"

import { WECHAT_AUTH_DOC_URL } from "@/lib/wechat/auth/config"
import { WechatScopeType } from "@/lib/wechat/auth/schema"

import { getWechatAuthorizationUrl } from "@/lib/wechat/auth/funcs/client"

export default function TestWechatAuthPage() {
  const { id } = useUser()

  return (
    <SubPage title={"微信登录授权测试"}>
      <VerticalContainer>
        <BrowserEnvironmentComp />

        <Label className={"text-xs"}>
          不弹出授权页面，直接跳转，只能获取用户openid
        </Label>
        <ButtonLink
          href={getWechatAuthorizationUrl(WechatScopeType.base, id)}
          disabled={!id}
        >
          {WechatScopeType.base} 授权
        </ButtonLink>

        <Label className={"text-xs"}>
          弹出授权页面，可通过openid拿到昵称、性别、所在地。并且，
          即使在未关注的情况下，只要用户授权，也能获取其信息
        </Label>
        <ButtonLink
          href={getWechatAuthorizationUrl(WechatScopeType.info, id)}
          disabled={!id}
        >
          {WechatScopeType.info} 授权
        </ButtonLink>

        <div className={"text-xs inline-flex"}>
          ref:
          <Link href={WECHAT_AUTH_DOC_URL} className={"truncate italic"}>
            {WECHAT_AUTH_DOC_URL}
          </Link>
        </div>
      </VerticalContainer>
    </SubPage>
  )
}
