'use client'

import { ReactNode } from "react";
import { SWRConfig } from "swr";

export default function Provider({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <SWRConfig
      value={{
        revalidateOnFocus: false,
        refreshInterval: 120_000,
        dedupingInterval: 0,
        revalidateOnMount: true,
      }}
    >
      {children}
    </SWRConfig>
  );
}
