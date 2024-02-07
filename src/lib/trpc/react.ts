"use client"

import { type AppRouter } from "@/routers/_index"
import { createTRPCReact } from "@trpc/react-query"

export const api = createTRPCReact<AppRouter>()
