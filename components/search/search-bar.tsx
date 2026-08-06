"use client";

import * as React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";
import { useRouter } from "next/navigation";

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  onValueChange?: (query: string) => void;
  value?: string;
  className?: string;
  variant?: "default" | "compact";
}

export function SearchBar({
  placeholder = "Search tools...",
  onSearch,
  onValueChange,
  value,
  className,
  variant = "default",
}: SearchBarProps) {
  const [internalQuery, setInternalQuery] = React.useState(value ?? "");
  const inputRef = React.useRef<HTMLInputElement>(null);
  const router = useRouter();

  const query = value !== undefined ? value : internalQuery;

  const handleChange = (nextValue: string) => {
    if (value === undefined) {
      setInternalQuery(nextValue);
    }
    onValueChange?.(nextValue);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(query.trim());
    } else if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "relative w-full",
        variant === "compact" ? "max-w-md" : "max-w-2xl",
        className
      )}
    >
      <div className="relative flex items-center">
        <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
        <Input
          ref={inputRef}
          type="search"
          placeholder={placeholder}
          value={query}
          onChange={(e) => handleChange(e.target.value)}
          className="pl-10 pr-4"
        />
        {variant === "default" && (
          <Button
            type="submit"
            size="sm"
            className="absolute right-1"
            variant="ghost"
          >
            Search
          </Button>
        )}
      </div>
    </form>
  );
}
