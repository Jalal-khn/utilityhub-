import Link from "next/link";
import { SITE_CONFIG, NAVIGATION } from "@/lib/constants/config";
import { Container } from "@/components/layout/container";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <Container className="py-12 md:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{SITE_CONFIG.name}</h3>
            <p className="text-sm text-muted-foreground">
              {SITE_CONFIG.description}
            </p>
          
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold">Navigation</h4>
            <ul className="space-y-2">
              {NAVIGATION.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold">Categories</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/text"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Text Tools
                </Link>
              </li>
              <li>
                <Link
                  href="/developer"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Developer Tools
                </Link>
              </li>
              <li>
                <Link
                  href="/math"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Calculators
                </Link>
              </li>
              <li>
                <Link
                  href="/converter"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Converters
                </Link>
              </li>
              <li>
                <Link
                  href="/image"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Image Tools
                </Link>
              </li>
              <li>
                <Link
                  href="/pdf"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  PDF Tools
                </Link>
              </li>
              <li>
                <Link
                  href="/seo"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  SEO Tools
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/privacy"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/disclaimer"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Disclaimer
                </Link>
              </li>
              <li>
                <Link
                  href="/cookie-policy"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Bottom Section */}
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link
              href="/sitemap.xml"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Sitemap
            </Link>
              <Link
                href={SITE_CONFIG.links.github}
                target="_blank"
                rel="noreferrer"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                GitHub
              </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
