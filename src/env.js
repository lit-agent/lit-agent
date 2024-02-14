import { createEnv } from "@t3-oss/env-nextjs"
import { z } from "zod"

export const env = createEnv({
  /**
   * Specify your server-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars.
   */
  server: {
    DATABASE_URL: z
      .string()
      .url()
      .refine(
        (str) => !str.includes("YOUR_MYSQL_URL_HERE"),
        "You forgot to change the default URL",
      ),
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),
    NEXTAUTH_SECRET:
      process.env.NODE_ENV === "production"
        ? z.string()
        : z.string().optional(),
    NEXTAUTH_URL: z.preprocess(
      // This makes Vercel deployments not fail if you don't set NEXTAUTH_URL
      // Since NextAuth.js automatically uses the VERCEL_URL if present.
      (str) => process.env.VERCEL_URL ?? str,
      // VERCEL_URL doesn't include `https` so it cant be validated as a URL
      process.env.VERCEL ? z.string() : z.string().url(),
    ),
    DISCORD_CLIENT_ID: z.string().optional(),
    DISCORD_CLIENT_SECRET: z.string().optional(),
    TENCENTCLOUD_SECRET_ID: z.string(),
    TENCENTCLOUD_SECRET_KEY: z.string(),

    PUSHER_APP_ID: z.string(),
    PUSHER_APP_SECRET: z.string(),

    OSS_ACCESS_KEY_ID: z.string(),
    OSS_ACCESS_KEY_SECRET: z.string(),

    PAY_APP_ID: z.string(),
    PAY_ACTIVATION_CODE: z.string(),
    PAY_VENDOR_SN: z.string(),
    PAY_VENDOR_KEY: z.string(),
    PAY_TERMINAL_SN: z.string(),
    PAY_TERMINAL_KEY: z.string(),
    WX_APP_ID: z.string(),
    WX_APP_SECRET: z.string(),
  },

  /**
   * Specify your client-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars. To expose them to the client, prefix them with
   * `NEXT_PUBLIC_`.
   */
  client: {
    // NEXT_PUBLIC_CLIENTVAR: z.string(),
    NEXT_PUBLIC_APP_URL: z.string(),
    NEXT_PUBLIC_WS_URL: z.string(),

    NEXT_PUBLIC_PUSHER_APP_KEY: z.string(),
    NEXT_PUBLIC_PUSHER_CLUSTER: z.string(),

    NEXT_PUBLIC_PAY_APP_DOMAIN: z.string(),
    NEXT_PUBLIC_PAY_QR_DOMAIN: z.string(),
  },

  /**
   * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
   * middlewares) or client-side so we need to destruct manually.
   */
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    NODE_ENV: process.env.NODE_ENV,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    DISCORD_CLIENT_ID: process.env.DISCORD_CLIENT_ID,
    DISCORD_CLIENT_SECRET: process.env.DISCORD_CLIENT_SECRET,
    TENCENTCLOUD_SECRET_ID: process.env.TENCENTCLOUD_SECRET_ID,
    TENCENTCLOUD_SECRET_KEY: process.env.TENCENTCLOUD_SECRET_KEY,

    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    NEXT_PUBLIC_WS_URL: process.env.NEXT_PUBLIC_WS_URL,

    PUSHER_APP_ID: process.env.PUSHER_APP_ID,
    PUSHER_APP_SECRET: process.env.PUSHER_APP_SECRET,
    NEXT_PUBLIC_PUSHER_APP_KEY: process.env.NEXT_PUBLIC_PUSHER_APP_KEY,
    NEXT_PUBLIC_PUSHER_CLUSTER: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,

    OSS_ACCESS_KEY_ID: process.env.OSS_ACCESS_KEY_ID,
    OSS_ACCESS_KEY_SECRET: process.env.OSS_ACCESS_KEY_SECRET,

    PAY_APP_ID: process.env.PAY_APP_ID,
    PAY_ACTIVATION_CODE: process.env.PAY_ACTIVATION_CODE,
    PAY_VENDOR_SN: process.env.PAY_VENDOR_SN,
    PAY_VENDOR_KEY: process.env.PAY_VENDOR_KEY,
    PAY_TERMINAL_SN: process.env.PAY_TERMINAL_SN,
    PAY_TERMINAL_KEY: process.env.PAY_TERMINAL_KEY,
    NEXT_PUBLIC_PAY_APP_DOMAIN: process.env.NEXT_PUBLIC_PAY_APP_DOMAIN,
    NEXT_PUBLIC_PAY_QR_DOMAIN: process.env.NEXT_PUBLIC_PAY_QR_DOMAIN,

    WX_APP_ID: process.env.WX_APP_ID,
    WX_APP_SECRET: process.env.WX_APP_SECRET,
  },
  /**
   * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially
   * useful for Docker builds.
   */
  skipValidation: true, //!!process.env.SKIP_ENV_VALIDATION,
  /**
   * Makes it so that empty strings are treated as undefined. `SOME_VAR: z.string()` and
   * `SOME_VAR=''` will throw an error.
   */
  emptyStringAsUndefined: true,
})
