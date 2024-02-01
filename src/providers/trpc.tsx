import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { getUrl, transformer } from "@/trpc/shared";
import { loggerLink, unstable_httpBatchStreamLink } from "@trpc/client";
import { createTRPCReact } from "@trpc/react-query";
import { AppRouter } from "@/server/api/routers";

export const apiReact = createTRPCReact<AppRouter>();

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
