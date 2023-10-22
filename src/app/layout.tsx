"use client";

import StyledComponentsRegistry from "../lib/registry";
import GlobalStyles from "@/styles";
import AppProvider from "@/hooks";

export default function RootLayout(props: React.PropsWithChildren) {
  return (
    <html>
      <body>
        <StyledComponentsRegistry>
          <GlobalStyles />
          <AppProvider>{props.children}</AppProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
