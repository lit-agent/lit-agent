import Markdown, { Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import { cn } from "@/lib/utils";

export const MyMarkdown = ({ children }: { children: string }) => {
  return (
    <Markdown
      remarkPlugins={[remarkGfm]}
      components={markdownComponents}
      className={cn("whitespace-pre-wrap ")}
    >
      {children.replace(/(#\S+)/g, (match, tag) => `[${tag}](/tag/${tag})`)}
    </Markdown>
  );
};

export const markdownComponents: Partial<Components> = {
  // 这个好像没用，直接预处理吧。。。
  text: (props) => {
    console.log({ text: props });

    const { children } = props;
    // Regular expression to match #xxx pattern
    const hashtagPattern = /#(\w+)/g;
    if (!children || typeof children !== "string") return null;

    const parts = children.split(hashtagPattern);
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
            );
          }
          return <p key={index}>{part}</p>;
        })}
      </>
    );
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
    );
  },
};
