"use client";

import { ThemeProvider } from "styled-components";
import { theme } from "@/styles/theme";

const AppProvider: React.FC<React.PropsWithChildren> = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

export default AppProvider;
