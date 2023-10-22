"use client";

import StyledComponentsRegistry from "../lib/registry";
import GlobalStyles from "@/styles";
import AppProvider from "@/hooks";

export default function RootLayout(props: React.PropsWithChildren) {
  return (
    <html>
      <body>
        <StyledComponentsRegistry>{props.children}</StyledComponentsRegistry>
        <GlobalStyles />
        <AppProvider>{props.children}</AppProvider>
      </body>
    </html>
  );
}
