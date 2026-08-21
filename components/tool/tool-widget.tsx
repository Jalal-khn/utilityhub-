"use client";

import * as React from "react";
import dynamic from "next/dynamic";

function ToolLoading() {
  return (
    <div className="flex min-h-[200px] items-center justify-center rounded-xl border bg-muted/40">
      <span className="text-sm text-muted-foreground">Loading tool...</span>
    </div>
  );
}

const toolRegistry: Record<string, React.ComponentType> = {
  "color/color-palette-generator": dynamic(() => import("@/tools/color/color-palette-generator"), { ssr: false, loading: ToolLoading }),
  "color/color-picker": dynamic(() => import("@/tools/color/color-picker"), { ssr: false, loading: ToolLoading }),
  "color/contrast-checker": dynamic(() => import("@/tools/color/contrast-checker"), { ssr: false, loading: ToolLoading }),
  "color/gradient-generator": dynamic(() => import("@/tools/color/gradient-generator"), { ssr: false, loading: ToolLoading }),
  "color/hex-to-rgb": dynamic(() => import("@/tools/color/hex-to-rgb"), { ssr: false, loading: ToolLoading }),
  "color/rgb-to-hex": dynamic(() => import("@/tools/color/rgb-to-hex"), { ssr: false, loading: ToolLoading }),
  "converter/area-converter": dynamic(() => import("@/tools/converter/area-converter"), { ssr: false, loading: ToolLoading }),
  "converter/length-converter": dynamic(() => import("@/tools/converter/length-converter"), { ssr: false, loading: ToolLoading }),
  "converter/speed-converter": dynamic(() => import("@/tools/converter/speed-converter"), { ssr: false, loading: ToolLoading }),
  "converter/temperature-converter": dynamic(() => import("@/tools/converter/temperature-converter"), { ssr: false, loading: ToolLoading }),
  "converter/unit-converter": dynamic(() => import("@/tools/converter/unit-converter"), { ssr: false, loading: ToolLoading }),
  "converter/weight-converter": dynamic(() => import("@/tools/converter/weight-converter"), { ssr: false, loading: ToolLoading }),
  "developer/base64-decoder": dynamic(() => import("@/tools/developer/base64-decoder"), { ssr: false, loading: ToolLoading }),
  "developer/base64-encoder": dynamic(() => import("@/tools/developer/base64-encoder"), { ssr: false, loading: ToolLoading }),
  "developer/json-formatter": dynamic(() => import("@/tools/developer/json-formatter"), { ssr: false, loading: ToolLoading }),
  "developer/jwt-decoder": dynamic(() => import("@/tools/developer/jwt-decoder"), { ssr: false, loading: ToolLoading }),
  "developer/url-decoder": dynamic(() => import("@/tools/developer/url-decoder"), { ssr: false, loading: ToolLoading }),
  "developer/url-encoder": dynamic(() => import("@/tools/developer/url-encoder"), { ssr: false, loading: ToolLoading }),
  "developer/uuid-generator": dynamic(() => import("@/tools/developer/uuid-generator"), { ssr: false, loading: ToolLoading }),
  "finance/mortgage-calculator": dynamic(() => import("@/tools/finance/mortgage-calculator"), { ssr: false, loading: ToolLoading }),
  "finance/emi-calculator": dynamic(() => import("@/tools/finance/emi-calculator"), { ssr: false, loading: ToolLoading }),
  "finance/compound-interest-calculator": dynamic(() => import("@/tools/finance/compound-interest-calculator"), { ssr: false, loading: ToolLoading }),
  "finance/hourly-to-salary-calculator": dynamic(() => import("@/tools/finance/hourly-to-salary-calculator"), { ssr: false, loading: ToolLoading }),
  "finance/tip-calculator": dynamic(() => import("@/tools/finance/tip-calculator"), { ssr: false, loading: ToolLoading }),
  "finance/sip-calculator": dynamic(() => import("@/tools/finance/sip-calculator"), { ssr: false, loading: ToolLoading }),
  "finance/simple-interest-calculator": dynamic(() => import("@/tools/finance/simple-interest-calculator"), { ssr: false, loading: ToolLoading }),
  "finance/salary-after-tax-calculator": dynamic(() => import("@/tools/finance/salary-after-tax-calculator"), { ssr: false, loading: ToolLoading }),
  "finance/retirement-calculator": dynamic(() => import("@/tools/finance/retirement-calculator"), { ssr: false, loading: ToolLoading }),
  "finance/car-loan-calculator": dynamic(() => import("@/tools/finance/car-loan-calculator"), { ssr: false, loading: ToolLoading }),
  "finance/credit-card-payoff-calculator": dynamic(() => import("@/tools/finance/credit-card-payoff-calculator"), { ssr: false, loading: ToolLoading }),
  "finance/inflation-calculator": dynamic(() => import("@/tools/finance/inflation-calculator"), { ssr: false, loading: ToolLoading }),
  "finance/roi-calculator": dynamic(() => import("@/tools/finance/roi-calculator"), { ssr: false, loading: ToolLoading }),
  "finance/profit-margin-calculator": dynamic(() => import("@/tools/finance/profit-margin-calculator"), { ssr: false, loading: ToolLoading }),
  "finance/break-even-calculator": dynamic(() => import("@/tools/finance/break-even-calculator"), { ssr: false, loading: ToolLoading }),
  "generator/email-qr-generator": dynamic(() => import("@/tools/generator/email-qr-generator"), { ssr: false, loading: ToolLoading }),
  "generator/password-generator": dynamic(() => import("@/tools/generator/password-generator"), { ssr: false, loading: ToolLoading }),
  "generator/qr-code-generator": dynamic(() => import("@/tools/generator/qr-code-generator"), { ssr: false, loading: ToolLoading }),
  "generator/random-number-generator": dynamic(() => import("@/tools/generator/random-number-generator"), { ssr: false, loading: ToolLoading }),
  "generator/sms-qr-generator": dynamic(() => import("@/tools/generator/sms-qr-generator"), { ssr: false, loading: ToolLoading }),
  "generator/url-qr-generator": dynamic(() => import("@/tools/generator/url-qr-generator"), { ssr: false, loading: ToolLoading }),
  "generator/vcard-qr-generator": dynamic(() => import("@/tools/generator/vcard-qr-generator"), { ssr: false, loading: ToolLoading }),
  "generator/whatsapp-qr-generator": dynamic(() => import("@/tools/generator/whatsapp-qr-generator"), { ssr: false, loading: ToolLoading }),
  "generator/wifi-qr-generator": dynamic(() => import("@/tools/generator/wifi-qr-generator"), { ssr: false, loading: ToolLoading }),
  "image/base64-to-image": dynamic(() => import("@/tools/image/base64-to-image"), { ssr: false, loading: ToolLoading }),
  "image/crop-image": dynamic(() => import("@/tools/image/crop-image"), { ssr: false, loading: ToolLoading }),
  "image/flip-image": dynamic(() => import("@/tools/image/flip-image"), { ssr: false, loading: ToolLoading }),
  "image/heic-to-jpg": dynamic(() => import("@/tools/image/heic-to-jpg"), { ssr: false, loading: ToolLoading }),
  "image/image-compressor": dynamic(() => import("@/tools/image/image-compressor"), { ssr: false, loading: ToolLoading }),
  "image/image-resizer": dynamic(() => import("@/tools/image/image-resizer"), { ssr: false, loading: ToolLoading }),
  "image/image-to-base64": dynamic(() => import("@/tools/image/image-to-base64"), { ssr: false, loading: ToolLoading }),
  "image/image-to-webp": dynamic(() => import("@/tools/image/image-to-webp"), { ssr: false, loading: ToolLoading }),
  "image/jpg-to-png": dynamic(() => import("@/tools/image/jpg-to-png"), { ssr: false, loading: ToolLoading }),
  "image/png-to-jpg": dynamic(() => import("@/tools/image/png-to-jpg"), { ssr: false, loading: ToolLoading }),
  "image/rotate-image": dynamic(() => import("@/tools/image/rotate-image"), { ssr: false, loading: ToolLoading }),
  "image/webp-converter": dynamic(() => import("@/tools/image/webp-converter"), { ssr: false, loading: ToolLoading }),
  "math/age-calculator": dynamic(() => import("@/tools/math/age-calculator"), { ssr: false, loading: ToolLoading }),
  "math/bmi-calculator": dynamic(() => import("@/tools/math/bmi-calculator"), { ssr: false, loading: ToolLoading }),
  "math/date-difference-calculator": dynamic(() => import("@/tools/math/date-difference-calculator"), { ssr: false, loading: ToolLoading }),
  "math/discount-calculator": dynamic(() => import("@/tools/math/discount-calculator"), { ssr: false, loading: ToolLoading }),
  "math/gst-calculator": dynamic(() => import("@/tools/math/gst-calculator"), { ssr: false, loading: ToolLoading }),
  "math/loan-calculator": dynamic(() => import("@/tools/math/loan-calculator"), { ssr: false, loading: ToolLoading }),
  "math/percentage-calculator": dynamic(() => import("@/tools/math/percentage-calculator"), { ssr: false, loading: ToolLoading }),
  "pdf/compress-pdf": dynamic(() => import("@/tools/pdf/compress-pdf"), { ssr: false, loading: ToolLoading }),
  "pdf/image-to-pdf": dynamic(() => import("@/tools/pdf/image-to-pdf"), { ssr: false, loading: ToolLoading }),
  "pdf/jpg-to-pdf": dynamic(() => import("@/tools/pdf/jpg-to-pdf"), { ssr: false, loading: ToolLoading }),
  "pdf/merge-pdf": dynamic(() => import("@/tools/pdf/merge-pdf"), { ssr: false, loading: ToolLoading }),
  "pdf/pdf-to-image": dynamic(() => import("@/tools/pdf/pdf-to-image"), { ssr: false, loading: ToolLoading }),
  "pdf/pdf-to-jpg": dynamic(() => import("@/tools/pdf/pdf-to-jpg"), { ssr: false, loading: ToolLoading }),
  "pdf/rotate-pdf": dynamic(() => import("@/tools/pdf/rotate-pdf"), { ssr: false, loading: ToolLoading }),
  "pdf/split-pdf": dynamic(() => import("@/tools/pdf/split-pdf"), { ssr: false, loading: ToolLoading }),
  "pdf/unlock-pdf": dynamic(() => import("@/tools/pdf/unlock-pdf"), { ssr: false, loading: ToolLoading }),
  "security/md5-generator": dynamic(() => import("@/tools/security/md5-generator"), { ssr: false, loading: ToolLoading }),
  "security/password-strength-checker": dynamic(() => import("@/tools/security/password-strength-checker"), { ssr: false, loading: ToolLoading }),
  "security/sha1-generator": dynamic(() => import("@/tools/security/sha1-generator"), { ssr: false, loading: ToolLoading }),
  "security/sha256-generator": dynamic(() => import("@/tools/security/sha256-generator"), { ssr: false, loading: ToolLoading }),
  "security/sha512-generator": dynamic(() => import("@/tools/security/sha512-generator"), { ssr: false, loading: ToolLoading }),
  "seo/meta-tag-generator": dynamic(() => import("@/tools/seo/meta-tag-generator"), { ssr: false, loading: ToolLoading }),
  "seo/open-graph-generator": dynamic(() => import("@/tools/seo/open-graph-generator"), { ssr: false, loading: ToolLoading }),
  "seo/robots-txt-generator": dynamic(() => import("@/tools/seo/robots-txt-generator"), { ssr: false, loading: ToolLoading }),
  "seo/sitemap-generator": dynamic(() => import("@/tools/seo/sitemap-generator"), { ssr: false, loading: ToolLoading }),
  "seo/twitter-card-generator": dynamic(() => import("@/tools/seo/twitter-card-generator"), { ssr: false, loading: ToolLoading }),
  "text/case-converter": dynamic(() => import("@/tools/text/case-converter"), { ssr: false, loading: ToolLoading }),
  "text/character-counter": dynamic(() => import("@/tools/text/character-counter"), { ssr: false, loading: ToolLoading }),
  "text/duplicate-line-remover": dynamic(() => import("@/tools/text/duplicate-line-remover"), { ssr: false, loading: ToolLoading }),
  "text/lorem-ipsum-generator": dynamic(() => import("@/tools/text/lorem-ipsum-generator"), { ssr: false, loading: ToolLoading }),
  "text/remove-extra-spaces": dynamic(() => import("@/tools/text/remove-extra-spaces"), { ssr: false, loading: ToolLoading }),
  "text/text-reverser": dynamic(() => import("@/tools/text/text-reverser"), { ssr: false, loading: ToolLoading }),
  "text/word-counter": dynamic(() => import("@/tools/text/word-counter"), { ssr: false, loading: ToolLoading }),
};

interface ToolWidgetProps {
  category: string;
  slug: string;
}

export function ToolWidget({ category, slug }: ToolWidgetProps) {
  const Tool = toolRegistry[`${category}/${slug}`];
  if (!Tool) {
    return (
      <div className="flex min-h-[200px] items-center justify-center rounded-xl border bg-muted/40">
        <span className="text-sm text-muted-foreground">Tool unavailable</span>
      </div>
    );
  }
  return <Tool />;
}
