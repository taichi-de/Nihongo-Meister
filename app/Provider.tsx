"use client";

import { MantineProvider } from "@mantine/core";
import { ReactNode } from "react";

const Provider = ({ children }: { children: ReactNode }) => {
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        colorScheme: "dark",
      }}
    >
      {children}
    </MantineProvider>
  );
};

export default Provider;
