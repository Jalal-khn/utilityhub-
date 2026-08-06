export const SITE_CONFIG = {
  name: "UtilityHub",
  description: "Your one-stop destination for online tools and utilities",
  url: "https://utilityhub.com",
  ogImage: "/opengraph-image",
  contact: {
    email: "jalalkhan0314076@gmail.com",
  },
  links: {
    twitter: "https://twitter.com/",
    github: "https://github.com/Jalal-khn",
  },
} as const;

export const NAVIGATION = [
  { name: "Tools", href: "/tools" },
  { name: "Blog", href: "/blog" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
] as const;
