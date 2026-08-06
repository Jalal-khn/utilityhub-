"use client";

import * as React from "react";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils/cn";

interface SearchSuggestion {
  id: string;
  label: string;
  type: "tool" | "category" | "blog";
  href: string;
}

interface SearchSuggestionsProps {
  suggestions: SearchSuggestion[];
  onSelect: (suggestion: SearchSuggestion) => void;
  className?: string;
}

export function SearchSuggestions({
  suggestions,
  onSelect,
  className,
}: SearchSuggestionsProps) {
  if (suggestions.length === 0) {
    return (
      <div className={cn("p-4 text-center text-sm text-muted-foreground", className)}>
        No results found
      </div>
    );
  }

  return (
    <div className={cn("py-2", className)}>
      {suggestions.map((suggestion) => (
        <button
          key={suggestion.id}
          onClick={() => onSelect(suggestion)}
          className="flex w-full items-center gap-3 px-4 py-2 text-left hover:bg-accent transition-colors"
        >
          <Search className="h-4 w-4 text-muted-foreground" />
          <div className="flex-1">
            <span className="text-sm font-medium">{suggestion.label}</span>
            <span className="ml-2 text-xs text-muted-foreground capitalize">
              {suggestion.type}
            </span>
          </div>
        </button>
      ))}
    </div>
  );
}
