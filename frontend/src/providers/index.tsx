"use client";

import React from "react";

import JotaiProvider from "./jotaiProvider";
import ViewportProvider from "./viewportProvider";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <JotaiProvider>
      <ViewportProvider>
        {children}
      </ViewportProvider>
    </JotaiProvider>
  );
};
export default Providers;
