"use client";

import { useState, type ReactNode } from "react";
import { useServerInsertedHTML } from "next/navigation";
import { StyleRegistry, createStyleRegistry } from "styled-jsx";

/* Without a registry, styled-jsx styles in the App Router are injected on
   the client after hydration, so anything styled `opacity: 0` (hover labels,
   the /parcels captions) flashes fully visible on every load. This renders
   them on the server. */
export default function StyledJsxRegistry({ children }: { children: ReactNode }) {
  const [registry] = useState(() => createStyleRegistry());
  useServerInsertedHTML(() => {
    const styles = registry.styles();
    registry.flush();
    return <>{styles}</>;
  });
  return <StyleRegistry registry={registry}>{children}</StyleRegistry>;
}
