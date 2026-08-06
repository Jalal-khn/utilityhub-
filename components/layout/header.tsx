import Link from "next/link";
import { NAVIGATION, SITE_CONFIG } from "@/lib/constants/config";
import { ThemeToggle } from "@/components/common/theme-toggle";
import { MobileNav } from "@/components/layout/mobile-nav";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <span className="text-xl font-bold">{SITE_CONFIG.name}</span>
        </Link>
        <nav className="hidden items-center space-x-6 text-sm font-medium md:flex">
          {NAVIGATION.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              {item.name}
            </Link>
          ))}
        </nav>
        <div className="ml-auto flex items-center space-x-4">
          <ThemeToggle />
          <div className="md:hidden">
            <MobileNav items={[...NAVIGATION]} />
          </div>
        </div>
      </div>
    </header>
  );
}
