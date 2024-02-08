"use client";

import { ThemeProvider } from "next-themes";
import { PropsWithChildren } from "react";

export default function MyThemeProvider({ children }: PropsWithChildren) {
  return (
    <ThemeProvider defaultTheme={"dark"} attribute={"class"}>
      {children}
    </ThemeProvider>
  );
}
