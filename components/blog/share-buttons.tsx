"use client";

import { Link2, Facebook, Twitter, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ShareButtonsProps {
  title: string;
  url: string;
  className?: string;
}

export function ShareButtons({ title, url, className }: ShareButtonsProps) {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const shareLinks = [
    {
      name: "X (Twitter)",
      href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
      icon: Twitter,
    },
    {
      name: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      icon: Facebook,
    },
    {
      name: "LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      icon: Linkedin,
    },
  ];

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      // Clipboard API unavailable; ignore.
    }
  };

  return (
    <div className={className}>
      <span className="text-sm font-medium text-muted-foreground">
        Share this article
      </span>
      <div className="mt-2 flex gap-2">
        {shareLinks.map((link) => (
          <Button
            key={link.name}
            asChild
            variant="outline"
            size="icon"
            aria-label={`Share on ${link.name}`}
          >
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              <link.icon className="h-4 w-4" />
            </a>
          </Button>
        ))}
        <Button
          variant="outline"
          size="icon"
          aria-label="Copy link"
          onClick={handleCopy}
        >
          <Link2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
