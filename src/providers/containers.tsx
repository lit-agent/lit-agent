import { ComponentProps, PropsWithChildren } from "react"
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"
import Markdown, { Components } from "react-markdown"
import { cn } from "@/lib/utils"
import remarkGfm from "remark-gfm"

export function MasonryContainer({ children }: PropsWithChildren) {
  return (
    <ResponsiveMasonry
      columnsCountBreakPoints={{ 600: 2, 900: 3, 1200: 4, 1500: 5 }}
    >
      <Masonry gutter="0.5rem">{children}</Masonry>
    </ResponsiveMasonry>
  )
}

export const MarkdownContainer = ({
  children,
  className,
  ...props
}: ComponentProps<typeof Markdown>) => {
  return (
    <Markdown
      remarkPlugins={[remarkGfm]}
      components={markdownComponents}
      className={cn("w-full overflow-hidden whitespace-pre-wrap", className)}
      {...props}
    >
      {!children
        ? ""
        : children.replace(/(#\S+)/g, (match, tag) => `[${tag}](/tag/${tag})`)}
    </Markdown>
  )
}

const markdownComponents: Partial<Components> = {
  // 这个好像没用，直接预处理吧。。。
  text: (props) => {
    console.log({ text: props })

    const { children } = props
    // Regular expression to match #xxx pattern
    const hashtagPattern = /#(\w+)/g
    if (!children || typeof children !== "string") return null

    const parts = children.split(hashtagPattern)
    // Transform #xxx into link
    return (
      <>
        {parts.map((part, index) => {
          if (index % 2 === 1) {
            // It's a hashtag
            return (
              <a key={index} href={`/tag/${part}`}>
                {part}
              </a>
            )
          }
          return <p key={index}>{part}</p>
        })}
      </>
    )
  },

  a: ({ href, children }) => {
    // console.log({ text });
    return (
      <a
        href={href}
        className={cn(
          "text-primary",
          (children as string).startsWith("#") ||
            "underline underline-offset-4",
        )}
        target={"_blank"}
      >
        {children}
      </a>
    )
  },
}
