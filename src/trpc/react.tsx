"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  TRPCLink,
  createWSClient,
  loggerLink,
  unstable_httpBatchStreamLink,
  wsLink,
  httpBatchLink,
} from "@trpc/client";
import { createTRPCReact } from "@trpc/react-query";
import { useState } from "react";

import { type AppRouter } from "@/server/api/routers";
import { getUrl, transformer } from "./shared";
import { NextPageContext } from "next";
import { env } from "@/env";
import { createTRPCNext } from "@trpc/next";
import superjson from "superjson";

function getEndingLink(ctx: NextPageContext | undefined): TRPCLink<AppRouter> {
  if (typeof window === "undefined") {
    return httpBatchLink({
      url: `${env.NEXT_PUBLIC_APP_URL}/api/trpc`,
      headers() {
        if (!ctx?.req?.headers) {
          return {};
        }
        // on ssr, forward client's headers to the server
        return {
          ...ctx.req.headers,
          "x-ssr": "1",
        };
      },
    });
  }
  const client = createWSClient({
    url: env.NEXT_PUBLIC_WS_URL,
  });
  return wsLink({
    client,
  });
}

export const api = createTRPCNext<AppRouter>({
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
    };
  },
  /**
   * @link https://trpc.io/docs/v11/ssr
   */
  ssr: true,
});

const apiReact = createTRPCReact<AppRouter>();

export function TRPCReactProvider(props: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  const [trpcClient] = useState(() =>
    apiReact.createClient({
      transformer,
      links: [
        loggerLink({
          enabled: (op) =>
            process.env.NODE_ENV === "development" ||
            (op.direction === "down" && op.result instanceof Error),
        }),
        unstable_httpBatchStreamLink({
          url: getUrl(),
        }),
      ],
    }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <apiReact.Provider client={trpcClient} queryClient={queryClient}>
        {props.children}
      </apiReact.Provider>
    </QueryClientProvider>
  );
}
