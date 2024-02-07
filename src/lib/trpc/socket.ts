import { createTRPCNext } from "@trpc/next"
import { AppRouter } from "@/server/routers"
import {
  createWSClient,
  httpBatchLink,
  loggerLink,
  TRPCLink,
  wsLink,
} from "@trpc/client"
import superjson from "superjson"
import { NextPageContext } from "next"
import { env } from "@/env"

export function getEndingLink(
  ctx: NextPageContext | undefined,
): TRPCLink<AppRouter> {
  if (typeof window === "undefined") {
    return httpBatchLink({
      url: `${env.NEXT_PUBLIC_APP_URL}/api/trpc`,
      headers() {
        if (!ctx?.req?.headers) {
          return {}
        }
        // on ssr, forward client's headers to the server
        return {
          ...ctx.req.headers,
          "x-ssr": "1",
        }
      },
    })
  }
  const client = createWSClient({
    url: env.NEXT_PUBLIC_WS_URL,
  })
  return wsLink({
    client,
  })
}

export const apiSocket = createTRPCNext<AppRouter>({
  config({ ctx }) {
    /**
     * If you want to use SSR, you need to use the server's full URL
     * @link https://trpc.io/docs/v11/ssr
     */

    return {
      /**
       * @link https://trpc.io/docs/v11/client/links
       */
      links: [
        // adds pretty logs to your console in development and logs errors in production
        loggerLink({
          enabled: (opts) =>
            (process.env.NODE_ENV === "development" &&
              typeof window !== "undefined") ||
            (opts.direction === "down" && opts.result instanceof Error),
        }),
        getEndingLink(ctx),
      ],
      /**
       * @link https://tanstack.com/query/v5/docs/reference/QueryClient
       */
      queryClientConfig: { defaultOptions: { queries: { staleTime: 60 } } },

      /**
       * @link https://trpc.io/docs/v11/data-transformers
       */
      transformer: superjson,
    }
  },
  /**
   * @link https://trpc.io/docs/v11/ssr
   */
  ssr: true,
})
