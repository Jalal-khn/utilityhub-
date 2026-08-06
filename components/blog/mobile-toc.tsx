"use client";

import { List } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils/cn";
import type { TocItem } from "@/lib/blog/types";
import { useActiveHeading } from "./use-active-heading";

interface MobileTableOfContentsProps {
  items: TocItem[];
  className?: string;
}

export function MobileTableOfContents({
  items,
  className,
}: MobileTableOfContentsProps) {
  const activeId = useActiveHeading(items.map((item) => item.id));

  if (items.length === 0) return null;

  return (
    <div
      className={cn(
        "sticky top-20 z-20 rounded-lg border bg-background/95 p-3 shadow-sm backdrop-blur",
        className
      )}
    >
      <Accordion type="single" collapsible>
        <AccordionItem value="toc" className="border-none">
          <AccordionTrigger className="py-1.5 text-sm font-semibold hover:no-underline">
            <span className="flex items-center gap-2">
              <List className="h-4 w-4" />
              Table of contents
            </span>
          </AccordionTrigger>
          <AccordionContent>
            <ul className="max-h-72 space-y-1 overflow-y-auto pt-2">
              {items.map((item) => (
                <li
                  key={item.id}
                  className={cn(item.level > 2 && "ml-4")}
                >
                  <a
                    href={`#${item.id}`}
                    className={cn(
                      "block py-1 text-sm transition-colors",
                      activeId === item.id
                        ? "font-medium text-primary"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {item.text}
                  </a>
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
