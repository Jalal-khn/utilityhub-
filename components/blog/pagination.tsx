import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
  className?: string;
}

export function Pagination({
  currentPage,
  totalPages,
  basePath,
  className,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const pageHref = (page: number) =>
    page === 1 ? basePath : `${basePath}/page/${page}`;

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <nav
      aria-label="Pagination"
      className={cn("flex items-center justify-center gap-2", className)}
    >
      <Button
        asChild
        variant="outline"
        size="sm"
        disabled={currentPage <= 1}
        className={currentPage <= 1 ? "pointer-events-none opacity-50" : ""}
      >
        <Link href={pageHref(currentPage - 1)} aria-label="Previous page">
          <ChevronLeft className="h-4 w-4" />
        </Link>
      </Button>

      {pages.map((page) => {
        const isActive = page === currentPage;
        const isEllipsisStart = page === 2 && currentPage > 4;
        const isEllipsisEnd =
          page === totalPages - 1 && currentPage < totalPages - 3;

        if (isEllipsisStart || isEllipsisEnd) {
          return (
            <span key={page} className="px-2 text-muted-foreground">
              &hellip;
            </span>
          );
        }

        const showPage =
          Math.abs(page - currentPage) <= 1 ||
          page === 1 ||
          page === totalPages;

        if (!showPage) return null;

        return (
          <Button
            key={page}
            asChild
            variant={isActive ? "default" : "outline"}
            size="sm"
            className={cn("min-w-9", isActive && "pointer-events-none")}
          >
            <Link href={pageHref(page)} aria-current={isActive ? "page" : undefined}>
              {page}
            </Link>
          </Button>
        );
      })}

      <Button
        asChild
        variant="outline"
        size="sm"
        disabled={currentPage >= totalPages}
        className={currentPage >= totalPages ? "pointer-events-none opacity-50" : ""}
      >
        <Link href={pageHref(currentPage + 1)} aria-label="Next page">
          <ChevronRight className="h-4 w-4" />
        </Link>
      </Button>
    </nav>
  );
}
