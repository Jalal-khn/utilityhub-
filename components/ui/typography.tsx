import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils/cn";

const headingVariants = cva("scroll-m-20 tracking-tight", {
  variants: {
    level: {
      h1: "text-4xl font-extrabold lg:text-5xl",
      h2: "text-3xl font-semibold tracking-tight lg:text-4xl",
      h3: "text-2xl font-semibold tracking-tight",
      h4: "text-xl font-semibold tracking-tight",
      h5: "text-lg font-semibold tracking-tight",
      h6: "text-base font-semibold tracking-tight",
    },
  },
  defaultVariants: {
    level: "h1",
  },
});

const textVariants = cva("leading-7", {
  variants: {
    variant: {
      p: "text-base",
      lead: "text-xl text-muted-foreground",
      large: "text-lg font-semibold",
      small: "text-sm font-medium leading-none",
      muted: "text-sm text-muted-foreground",
    },
  },
  defaultVariants: {
    variant: "p",
  },
});

interface HeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, level, as, ...props }, ref) => {
    const Component = as || level || "h1";
    return (
      <Component
        ref={ref}
        className={cn(headingVariants({ level }), className)}
        {...props}
      />
    );
  }
);
Heading.displayName = "Heading";

interface TextProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof textVariants> {
  as?: "p" | "span" | "div";
}

const Text = React.forwardRef<HTMLParagraphElement, TextProps>(
  ({ className, variant, as = "p", ...props }, ref) => {
    if (as === "span") {
      return (
        <span
          ref={ref as any}
          className={cn(textVariants({ variant }), className)}
          {...props}
        />
      );
    }
    if (as === "div") {
      return (
        <div
          ref={ref as any}
          className={cn(textVariants({ variant }), className)}
          {...props}
        />
      );
    }
    return (
      <p
        ref={ref}
        className={cn(textVariants({ variant }), className)}
        {...props}
      />
    );
  }
);
Text.displayName = "Text";

const Link = React.forwardRef<
  HTMLAnchorElement,
  React.AnchorHTMLAttributes<HTMLAnchorElement>
>(({ className, ...props }, ref) => (
  <a
    ref={ref}
    className={cn(
      "font-medium text-primary underline underline-offset-4 hover:text-primary/80",
      className
    )}
    {...props}
  />
));
Link.displayName = "Link";

export { Heading, Text, Link, headingVariants, textVariants };
