"use client";

import * as React from "react";

export function useActiveHeading(ids: string[]): string {
  const [activeId, setActiveId] = React.useState<string>("");
  const idsKey = ids.join("|");

  React.useEffect(() => {
    if (!idsKey) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "-80px 0px -70% 0px" }
    );

    const elements = idsKey
      .split("|")
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => Boolean(element));

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [idsKey]);

  return activeId;
}
