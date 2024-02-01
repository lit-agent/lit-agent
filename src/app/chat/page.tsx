"use client";

import ChatItem from "@/components/chat-item";
import { BottomNavbar } from "@/components/navbar";
import { Input } from "@/components/ui/input";
import { IoMenuOutline } from "react-icons/io5";
import { cn } from "@/lib/utils";
import { BloggerContainer } from "@/containers/blogger";
import { useUser } from "@/hooks/use-user";
import { SelectUser } from "@/components/select-user";
import { api } from "@/trpc/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { AddMessageForm } from "@/components/add-message-form";

export default function ChatPage() {
  const postsQuery = api.post.infinite.useInfiniteQuery(
    {},
    {
      getNextPageParam: (d) => d.nextCursor,
    },
  );
  const utils = api.useUtils();
  const { hasNextPage, isFetchingNextPage, fetchNextPage } = postsQuery;

  // list of messages that are rendered
  const [messages, setMessages] = useState(() => {
    const msgs = postsQuery.data?.pages.map((page) => page.items).flat();
    return msgs;
  });
  type Post = NonNullable<typeof messages>[number];
  const { data: session } = useSession();
  const userName = session?.user?.name;
  const scrollTargetRef = useRef<HTMLDivElement>(null);

  // fn to add and dedupe new messages onto state
  const addMessages = useCallback((incoming?: Post[]) => {
    setMessages((current) => {
      const map: Record<Post["id"], Post> = {};
      for (const msg of current ?? []) {
        map[msg.id] = msg;
      }
      for (const msg of incoming ?? []) {
        map[msg.id] = msg;
      }
      return Object.values(map).sort(
        (a, b) => a.createdAt.getTime() - b.createdAt.getTime(),
      );
    });
  }, []);

  // when new data from `useInfiniteQuery`, merge with current state
  useEffect(() => {
    const msgs = postsQuery.data?.pages.map((page) => page.items).flat();
    addMessages(msgs);
  }, [postsQuery.data?.pages, addMessages]);

  const scrollToBottomOfList = useCallback(() => {
    if (scrollTargetRef.current == null) {
      return;
    }

    scrollTargetRef.current.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [scrollTargetRef]);
  useEffect(() => {
    scrollToBottomOfList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // subscribe to new posts and add
  api.post.onAdd.useSubscription(undefined, {
    onData(post) {
      addMessages([post]);
    },
    onError(err) {
      console.error("Subscription error:", err);
      // we might have missed a message - invalidate cache
      utils.post.infinite.invalidate();
    },
  });

  const [currentlyTyping, setCurrentlyTyping] = useState<string[]>([]);
  api.post.whoIsTyping.useSubscription(undefined, {
    onData(data) {
      setCurrentlyTyping(data);
    },
  });

  return (
    <div className={"flex h-full flex-col"}>
      <SelectUser />

      {/*<div className={"flex grow flex-col gap-4 overflow-auto p-4"}>*/}
      {/*  {*/}
      {/*    // sampleChatItems*/}
      {/*    [].map((chatItem, index) => (*/}
      {/*      <ChatItem {...chatItem} key={index} />*/}
      {/*    ))*/}
      {/*  }*/}
      {/*</div>*/}

      <button
        data-testid="loadMore"
        onClick={() => fetchNextPage()}
        disabled={!hasNextPage || isFetchingNextPage}
        className="rounded bg-indigo-500 px-4 py-2 text-white disabled:opacity-40"
      >
        {isFetchingNextPage
          ? "Loading more..."
          : hasNextPage
            ? "Load More"
            : "Nothing more to load"}
      </button>

      <div className="grow space-y-4 overflow-y-auto">
        {messages?.map((item) => (
          <article key={item.id} className=" text-gray-50">
            <header className="flex space-x-2 text-sm">
              <h3 className="text-base">
                {item.source === "RAW" ? (
                  item.name
                ) : (
                  <a
                    href={`https://github.com/${item.name}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {item.name}
                  </a>
                )}
              </h3>
              <span className="text-gray-500">
                {new Intl.DateTimeFormat("en-GB", {
                  dateStyle: "short",
                  timeStyle: "short",
                }).format(item.createdAt)}
              </span>
            </header>
            <p className="whitespace-pre-line text-xl leading-tight">
              {item.text}
            </p>
          </article>
        ))}

        <div ref={scrollTargetRef}></div>
      </div>

      <div className={"relative px-4 py-1"}>
        <AddMessageForm onMessagePost={() => scrollToBottomOfList()} />

        <Input
          className={cn(
            "bg-[#463F4F] ",
            "focus-visible:ring-0",
            "focus-visible:ring-offset-0",
          )}
        />

        <BloggerContainer
          className={
            "absolute bottom-0 right-5 top-0 my-auto h-6 w-6 text-gray-400"
          }
        >
          <IoMenuOutline />
        </BloggerContainer>
      </div>

      <BottomNavbar />
    </div>
  );
}
