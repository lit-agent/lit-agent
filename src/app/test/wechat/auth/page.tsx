"use client"
import { VerticalContainer } from "@/components/containers/vertical"
import { WX_AUTH_URL, WX_REDIRECT_URL, wxApp } from "@/lib/wx/config"
import Link from "next/link"
import { ButtonLink } from "@/components/_universal/link"
import { useUser } from "@/hooks/use-user"
import { Label } from "@/components/ui/label"
import SubPage from "@/components/sub-page"
import { BrowserEnvironmentComp } from "@/components/_universal/browser"

export default function Page() {
  const user = useUser()
  const userId = user?.id

  const getUrl = (scope: string) =>
    `${WX_AUTH_URL}?appid=${wxApp.appId}&redirect_uri=${WX_REDIRECT_URL}&response_type=code&scope=${scope}&state=${userId}#wechat_redirect`

  return (
    <SubPage title={"微信登录授权测试"}>
      <VerticalContainer>
        <BrowserEnvironmentComp />

        <Label className={"text-xs"}>
          不弹出授权页面，直接跳转，只能获取用户openid
        </Label>
        <ButtonLink href={getUrl("snsapi_base")} disabled={!userId}>
          snsapi_base 授权
        </ButtonLink>

        <Label className={"text-xs"}>
          弹出授权页面，可通过openid拿到昵称、性别、所在地。并且，
          即使在未关注的情况下，只要用户授权，也能获取其信息
        </Label>
        <ButtonLink href={getUrl("snsapi_userinfo")} disabled={!userId}>
          snsapi_userinfo 授权
        </ButtonLink>

        <div className={"text-xs inline-flex"}>
          ref:
          <Link
            href={
              "https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/Wechat_webpage_authorization.html"
            }
            className={"truncate italic"}
          >
            https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/Wechat_webpage_authorization.html
          </Link>
        </div>
      </VerticalContainer>
    </SubPage>
  )
}
