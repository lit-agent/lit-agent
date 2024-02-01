"use client";

import { type AppRouter } from "@/server/api/routers";
import { createTRPCReact } from "@trpc/react-query";

export const api = createTRPCReact<AppRouter>();
