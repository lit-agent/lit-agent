"use client";

import { type AppRouter } from "src/server/routers";
import { createTRPCReact } from "@trpc/react-query";

export const api = createTRPCReact<AppRouter>();
