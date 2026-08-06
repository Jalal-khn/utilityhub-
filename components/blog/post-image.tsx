"use client";

import * as React from "react";
import { FileText } from "lucide-react";
import { cn } from "@/lib/utils/cn";

interface PostImageProps {
  src?: string;
  alt: string;
  className?: string;
  imgClassName?: string;
}

export function PostImage({
  src,
  alt,
  className,
  imgClassName,
}: PostImageProps) {
  const [failed, setFailed] = React.useState(false);

  if (!src || failed) {
    return (
      <div
        className={cn(
          "flex h-full w-full items-center justify-center bg-gradient-to-br from-muted to-muted/40 text-muted-foreground",
          className
        )}
      >
        <FileText className="h-12 w-12" />
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
      className={cn("h-full w-full object-cover", imgClassName)}
    />
  );
}
