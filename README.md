# Lit Agent

## todo

- [ ] [next-auth] customize callback url after signing in based on the `activated` property
- [ ] [next-auth] load data from user into session in `profile` function instead of `session` callback

## Tech

### 关于图片优化与写法

参考：https://stackoverflow.com/questions/69230343/nextjs-image-component-with-fixed-witdth-and-auto-height

在写图片时，不需要指定 width 和 height，直接在 classNames 里写好就可以，是代码比较简洁的一种方式：

```tsx
// 自行决定尺寸，需要写好 w、h，否则会报尺寸失调问题
<Image
  src={CoverSmImage}
  alt={"cover"}
  className={"shrink-0 w-[120px] h-auto"}
/>

// 使用 fill 基于容器决定尺寸，需要加上 sizes，否则会报性能问题
<div className={"w-16"}>
  <AspectRatio ratio={1}>
    <Image
      src={getImagePath(s, { width: 64, height: 64 })}
      alt={s}
      fill
      sizes={"100%"}
    />
  </AspectRatio>
</div>
```

## About T3

### What's next? How do I make an app with this?

We try to keep this project as simple as possible, so you can start with just the scaffolding we set up for you, and add
additional things later when they become necessary.

If you are not familiar with the different technologies used in this project, please refer to the respective docs. If
you still are in the wind, please join our [Discord](https://t3.gg/discord) and ask for help.

- [Next.js](https://nextjs.org)
- [NextAuth.js](https://next-auth.js.org)
- [Prisma](https://prisma.io)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)

### Learn More

To learn more about the [T3 Stack](https://create.t3.gg/), take a look at the following resources:

- [Documentation](https://create.t3.gg/)
- [Learn the T3 Stack](https://create.t3.gg/en/faq#what-learning-resources-are-currently-available) — Check out these
  awesome tutorials

You can check out the [create-t3-app GitHub repository](https://github.com/t3-oss/create-t3-app) — your feedback and
contributions are welcome!

### How do I deploy this?

Follow our deployment guides
for [Vercel](https://create.t3.gg/en/deployment/vercel), [Netlify](https://create.t3.gg/en/deployment/netlify)
and [Docker](https://create.t3.gg/en/deployment/docker) for more information.
