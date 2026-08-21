import type { ToolEngineConfig } from "@/lib/tool-engine";

export const TOOLS: ToolEngineConfig[] = [
  // Text Tools
  {
    name: "Word Counter",
    slug: "word-counter",
    featured: true,
    addedAt: "2026-01-12",
    description: "Count words, characters, sentences, and paragraphs in your text. Calculate reading time.",
    category: "text",
    primaryKeyword: "word counter",
    secondaryKeywords: ["word count", "character count", "text analyzer", "reading time"],
    faq: [
      {
        question: "How is word count calculated?",
        answer: "Words are counted by splitting text by whitespace characters. Multiple consecutive spaces are treated as a single separator.",
      },
      {
        question: "What counts as a sentence?",
        answer: "Sentences are identified by punctuation marks like periods, exclamation marks, and question marks.",
      },
    ],
    schema: {
      inputs: [
        {
          id: "text",
          name: "text",
          type: "textarea",
          label: "Text",
          placeholder: "Enter your text here...",
        },
      ],
      outputs: [
        {
          id: "wordCount",
          name: "wordCount",
          type: "number",
          label: "Word Count",
        },
        {
          id: "charCount",
          name: "charCount",
          type: "number",
          label: "Character Count",
        },
      ],
    },
    metadata: {},
    relatedTools: ["character-counter", "case-converter"],
    searchTags: ["text", "words", "count", "analyze"],
  },
  {
    name: "Character Counter",
    slug: "character-counter",
    description: "Count characters, letters, numbers, spaces, and lines in your text with detailed statistics.",
    category: "text",
    primaryKeyword: "character counter",
    secondaryKeywords: ["char count", "letter count", "text length"],
    faq: [
      {
        question: "Does this count spaces?",
        answer: "Yes, you can see both total characters and characters without spaces.",
      },
    ],
    schema: {
      inputs: [
        {
          id: "text",
          name: "text",
          type: "textarea",
          label: "Text",
          placeholder: "Enter your text here...",
        },
      ],
      outputs: [
        {
          id: "charCount",
          name: "charCount",
          type: "number",
          label: "Character Count",
        },
      ],
    },
    metadata: {},
    relatedTools: ["word-counter", "case-converter"],
    searchTags: ["text", "characters", "count", "analyze"],
  },
  {
    name: "Case Converter",
    slug: "case-converter",
    description: "Convert text between uppercase, lowercase, title case, sentence case, camelCase, snake_case, and kebab-case.",
    category: "text",
    primaryKeyword: "case converter",
    secondaryKeywords: ["text case", "uppercase", "lowercase", "title case"],
    faq: [
      {
        question: "What is camelCase?",
        answer: "camelCase is a naming convention where words are joined together, with each word except the first starting with a capital letter.",
      },
    ],
    schema: {
      inputs: [
        {
          id: "text",
          name: "text",
          type: "textarea",
          label: "Text",
          placeholder: "Enter your text here...",
        },
      ],
      outputs: [
        {
          id: "convertedText",
          name: "convertedText",
          type: "text",
          label: "Converted Text",
        },
      ],
    },
    metadata: {},
    relatedTools: ["word-counter", "character-counter"],
    searchTags: ["text", "case", "convert", "transform"],
  },
  {
    name: "Lorem Ipsum Generator",
    slug: "lorem-ipsum-generator",
    description: "Generate placeholder Lorem Ipsum text for your designs and prototypes. Customize paragraphs and sentences.",
    category: "text",
    primaryKeyword: "lorem ipsum generator",
    secondaryKeywords: ["placeholder text", "dummy text", "lorem generator"],
    faq: [
      {
        question: "What is Lorem Ipsum?",
        answer: "Lorem Ipsum is standard placeholder text used in printing and typesetting industry to demonstrate graphic elements.",
      },
    ],
    schema: {
      inputs: [
        {
          id: "paragraphs",
          name: "paragraphs",
          type: "number",
          label: "Paragraphs",
          defaultValue: 3,
          min: 1,
          max: 20,
        },
        {
          id: "sentences",
          name: "sentences",
          type: "number",
          label: "Sentences per Paragraph",
          defaultValue: 5,
          min: 1,
          max: 20,
        },
      ],
      outputs: [
        {
          id: "generatedText",
          name: "generatedText",
          type: "text",
          label: "Generated Text",
        },
      ],
    },
    metadata: {},
    relatedTools: ["word-counter", "character-counter"],
    searchTags: ["text", "case", "convert", "transform"],
  },
  {
    name: "Remove Extra Spaces",
    slug: "remove-extra-spaces",
    description: "Remove extra spaces from your text. Trim leading/trailing spaces and collapse multiple spaces into one.",
    category: "text",
    primaryKeyword: "remove extra spaces",
    secondaryKeywords: ["remove double spaces", "trim whitespace", "collapse spaces", "clean text"],
    faq: [
      {
        question: "What does this tool do?",
        answer: "It removes leading and trailing whitespace and collapses multiple consecutive spaces between words into a single space.",
      },
    ],
    schema: {
      inputs: [
        {
          id: "text",
          name: "text",
          type: "textarea",
          label: "Text",
          placeholder: "Paste text with extra spaces here...",
        },
      ],
      outputs: [
        {
          id: "cleanedText",
          name: "cleanedText",
          type: "text",
          label: "Cleaned Text",
        },
      ],
    },
    metadata: {},
    relatedTools: ["duplicate-line-remover", "word-counter"],
    searchTags: ["spaces", "whitespace", "clean", "trim"],
  },
  {
    name: "Duplicate Line Remover",
    slug: "duplicate-line-remover",
    description: "Remove duplicate lines from your text and keep only unique lines. Sort output alphabetically if needed.",
    category: "text",
    primaryKeyword: "duplicate line remover",
    secondaryKeywords: ["remove duplicate lines", "unique lines", "dedupe text", "remove repeats"],
    faq: [
      {
        question: "What counts as a duplicate line?",
        answer: "Two lines are considered duplicates if they are exactly identical, including case and whitespace.",
      },
    ],
    schema: {
      inputs: [
        {
          id: "text",
          name: "text",
          type: "textarea",
          label: "Text",
          placeholder: "Paste your list here...",
        },
      ],
      outputs: [
        {
          id: "uniqueLines",
          name: "uniqueLines",
          type: "text",
          label: "Unique Lines",
        },
      ],
    },
    metadata: {},
    relatedTools: ["remove-extra-spaces", "word-counter"],
    searchTags: ["duplicate", "lines", "unique", "dedupe"],
  },
  {
    name: "Text Reverser",
    slug: "text-reverser",
    description: "Reverse your text, words, or lines. Flip entire strings, reverse word order, or reverse each line.",
    category: "text",
    primaryKeyword: "text reverser",
    secondaryKeywords: ["reverse text", "reverse words", "flip text", "backwards text"],
    faq: [
      {
        question: "What modes are available?",
        answer: "You can reverse the full text character by character, reverse the order of words, or reverse the order of lines.",
      },
    ],
    schema: {
      inputs: [
        {
          id: "text",
          name: "text",
          type: "textarea",
          label: "Text",
          placeholder: "Enter text to reverse...",
        },
      ],
      outputs: [
        {
          id: "reversedText",
          name: "reversedText",
          type: "text",
          label: "Reversed Text",
        },
      ],
    },
    metadata: {},
    relatedTools: ["case-converter", "word-counter"],
    searchTags: ["reverse", "flip", "backwards", "text"],
  },
  // Calculators
  {
    name: "Age Calculator",
    slug: "age-calculator",
    description: "Calculate your exact age in years, months, days, total days, and total hours from your birth date.",
    category: "math",
    primaryKeyword: "age calculator",
    secondaryKeywords: ["age", "birthday", "date calculator", "how old am i"],
    faq: [
      {
        question: "How accurate is this calculator?",
        answer: "This calculator accounts for leap years and provides exact age calculations based on the current date.",
      },
    ],
    schema: {
      inputs: [
        {
          id: "birthDate",
          name: "birthDate",
          type: "text",
          label: "Birth Date",
        },
      ],
      outputs: [
        {
          id: "age",
          name: "age",
          type: "text",
          label: "Age",
        },
      ],
    },
    metadata: {},
    relatedTools: ["bmi-calculator", "percentage-calculator"],
    searchTags: ["age", "calculator", "birthday", "date"],
  },
  {
    name: "BMI Calculator",
    slug: "bmi-calculator",
    description: "Calculate your Body Mass Index (BMI) to determine if you're underweight, normal, overweight, or obese.",
    category: "math",
    primaryKeyword: "bmi calculator",
    secondaryKeywords: ["body mass index", "bmi", "health calculator", "weight calculator"],
    faq: [
      {
        question: "What is BMI?",
        answer: "BMI (Body Mass Index) is a measure of body fat based on height and weight. It's calculated as weight in kilograms divided by height in meters squared.",
      },
    ],
    schema: {
      inputs: [
        {
          id: "weight",
          name: "weight",
          type: "number",
          label: "Weight",
        },
        {
          id: "height",
          name: "height",
          type: "number",
          label: "Height",
        },
      ],
      outputs: [
        {
          id: "bmi",
          name: "bmi",
          type: "number",
          label: "BMI",
        },
      ],
    },
    metadata: {},
    relatedTools: ["age-calculator", "percentage-calculator"],
    searchTags: ["bmi", "health", "calculator", "weight"],
  },
  {
    name: "Percentage Calculator",
    slug: "percentage-calculator",
    description: "Calculate percentages in multiple ways: what is X% of Y, X is what % of Y, X is Y% of what, and percentage change.",
    category: "math",
    primaryKeyword: "percentage calculator",
    secondaryKeywords: ["percent", "percentage", "percent calculator", "math"],
    faq: [
      {
        question: "How do I calculate percentage change?",
        answer: "Percentage change is calculated as ((new value - old value) / old value) × 100.",
      },
    ],
    schema: {
      inputs: [
        {
          id: "value",
          name: "value",
          type: "number",
          label: "Value",
        },
      ],
      outputs: [
        {
          id: "result",
          name: "result",
          type: "number",
          label: "Result",
        },
      ],
    },
    metadata: {},
    relatedTools: ["age-calculator", "bmi-calculator"],
    searchTags: ["percentage", "calculator", "math", "percent"],
  },
  {
    name: "Loan Calculator",
    slug: "loan-calculator",
    description: "Calculate monthly payments, total payment, and total interest for loans with adjustable amount, rate, and term.",
    category: "math",
    primaryKeyword: "loan calculator",
    secondaryKeywords: ["mortgage calculator", "loan payment", "interest calculator", "emi calculator"],
    faq: [
      {
        question: "How is monthly payment calculated?",
        answer: "Monthly payment is calculated using the standard amortization formula: M = P[r(1+r)^n]/[(1+r)^n-1], where P is principal, r is monthly rate, and n is number of payments.",
      },
    ],
    schema: {
      inputs: [
        {
          id: "amount",
          name: "amount",
          type: "number",
          label: "Loan Amount",
        },
        {
          id: "rate",
          name: "rate",
          type: "number",
          label: "Interest Rate",
        },
        {
          id: "years",
          name: "years",
          type: "number",
          label: "Loan Term (Years)",
        },
      ],
      outputs: [
        {
          id: "monthlyPayment",
          name: "monthlyPayment",
          type: "number",
          label: "Monthly Payment",
        },
      ],
    },
    metadata: {},
    relatedTools: ["percentage-calculator", "unit-converter"],
    searchTags: ["loan", "calculator", "mortgage", "interest"],
  },
  {
    name: "Discount Calculator",
    slug: "discount-calculator",
    description: "Calculate the final price after a discount. Find the savings amount and final price from original price and discount percentage.",
    category: "math",
    primaryKeyword: "discount calculator",
    secondaryKeywords: ["sale calculator", "discount price", "percent off", "savings calculator"],
    faq: [
      {
        question: "How is the discount amount calculated?",
        answer: "The discount amount is original price multiplied by the discount percentage divided by 100. The final price is the original price minus the discount.",
      },
    ],
    schema: {
      inputs: [
        {
          id: "originalPrice",
          name: "originalPrice",
          type: "number",
          label: "Original Price",
        },
        {
          id: "discountPercent",
          name: "discountPercent",
          type: "number",
          label: "Discount (%)",
        },
      ],
      outputs: [
        {
          id: "discountAmount",
          name: "discountAmount",
          type: "number",
          label: "You Save",
        },
        {
          id: "finalPrice",
          name: "finalPrice",
          type: "number",
          label: "Final Price",
        },
      ],
    },
    metadata: {},
    relatedTools: ["percentage-calculator", "gst-calculator"],
    searchTags: ["discount", "sale", "percent off", "price"],
  },
  {
    name: "GST Calculator",
    slug: "gst-calculator",
    description: "Calculate GST for your business. Add or remove GST from amounts using the Indian GST rates of 5%, 12%, 18%, and 28%.",
    category: "math",
    primaryKeyword: "gst calculator",
    secondaryKeywords: ["goods and services tax", "gst tax calculator", "gst inclusive", "gst exclusive"],
    faq: [
      {
        question: "What is the difference between GST inclusive and exclusive?",
        answer: "GST exclusive means GST is added on top of the base price. GST inclusive means the displayed amount already includes the GST.",
      },
    ],
    schema: {
      inputs: [
        {
          id: "amount",
          name: "amount",
          type: "number",
          label: "Amount",
        },
        {
          id: "rate",
          name: "rate",
          type: "select",
          label: "GST Rate",
          options: [
            { label: "5%", value: "5" },
            { label: "12%", value: "12" },
            { label: "18%", value: "18" },
            { label: "28%", value: "28" },
          ],
        },
        {
          id: "mode",
          name: "mode",
          type: "select",
          label: "Calculation Type",
          options: [
            { label: "GST Exclusive (Add GST)", value: "exclusive" },
            { label: "GST Inclusive (Remove GST)", value: "inclusive" },
          ],
        },
      ],
      outputs: [
        {
          id: "gstAmount",
          name: "gstAmount",
          type: "number",
          label: "GST Amount",
        },
        {
          id: "netAmount",
          name: "netAmount",
          type: "number",
          label: "Net Amount",
        },
      ],
    },
    metadata: {},
    relatedTools: ["discount-calculator", "percentage-calculator"],
    searchTags: ["gst", "tax", "calculator", "india"],
  },
  {
    name: "Date Difference Calculator",
    slug: "date-difference-calculator",
    description: "Calculate the exact difference between two dates in years, months, days, weeks, hours, and minutes.",
    category: "math",
    primaryKeyword: "date difference calculator",
    secondaryKeywords: ["days between dates", "date gap", "date range calculator", "how many days"],
    faq: [
      {
        question: "How is the difference in years, months, and days computed?",
        answer: "The calculator counts full calendar years, then full months, then remaining days between the two dates.",
      },
    ],
    schema: {
      inputs: [
        {
          id: "startDate",
          name: "startDate",
          type: "text",
          label: "Start Date",
        },
        {
          id: "endDate",
          name: "endDate",
          type: "text",
          label: "End Date",
        },
      ],
      outputs: [
        {
          id: "totalDays",
          name: "totalDays",
          type: "number",
          label: "Total Days",
        },
        {
          id: "yearsMonthsDays",
          name: "yearsMonthsDays",
          type: "text",
          label: "Years, Months, Days",
        },
      ],
    },
    metadata: {},
    relatedTools: ["age-calculator", "percentage-calculator"],
    searchTags: ["date", "difference", "days", "calculator"],
  },
  {
    name: "Unit Converter",
    slug: "unit-converter",
    description: "Convert between different units of measurement including length, weight, and temperature.",
    category: "converter",
    primaryKeyword: "unit converter",
    secondaryKeywords: ["measurement converter", "length converter", "weight converter", "temperature converter"],
    faq: [
      {
        question: "What units are supported?",
        answer: "Length: meters, kilometers, centimeters, millimeters, miles, yards, feet, inches. Weight: kilograms, grams, milligrams, pounds, ounces, tons. Temperature: Celsius, Fahrenheit, Kelvin.",
      },
    ],
    schema: {
      inputs: [
        {
          id: "value",
          name: "value",
          type: "number",
          label: "Value",
        },
        {
          id: "fromUnit",
          name: "fromUnit",
          type: "select",
          label: "From Unit",
          options: [
            { label: "Meters", value: "meters" },
            { label: "Kilometers", value: "kilometers" },
          ],
        },
        {
          id: "toUnit",
          name: "toUnit",
          type: "select",
          label: "To Unit",
          options: [
            { label: "Meters", value: "meters" },
            { label: "Kilometers", value: "kilometers" },
          ],
        },
      ],
      outputs: [
        {
          id: "result",
          name: "result",
          type: "number",
          label: "Result",
        },
      ],
    },
    metadata: {},
    relatedTools: ["percentage-calculator", "loan-calculator"],
    searchTags: ["unit", "converter", "measurement", "convert"],
  },
  // Developer Tools
  {
    name: "JSON Formatter",
    slug: "json-formatter",
    featured: true,
    addedAt: "2026-06-22",
    description: "Format, validate, and minify JSON data. Copy formatted output with proper indentation.",
    category: "developer",
    primaryKeyword: "json formatter",
    secondaryKeywords: ["json beautifier", "json validator", "json minifier", "pretty print json"],
    faq: [
      {
        question: "What does this tool do?",
        answer: "This tool formats JSON data with proper indentation for readability, validates JSON syntax, and can minify JSON to remove unnecessary whitespace.",
      },
    ],
    schema: {
      inputs: [
        {
          id: "json",
          name: "json",
          type: "textarea",
          label: "JSON",
          placeholder: '{"key": "value"}',
        },
      ],
      outputs: [
        {
          id: "formatted",
          name: "formatted",
          type: "code",
          label: "Formatted JSON",
        },
      ],
    },
    metadata: {},
    relatedTools: ["base64-encoder", "base64-decoder"],
    searchTags: ["json", "formatter", "beautifier", "validator"],
  },
  {
    name: "Base64 Encoder",
    slug: "base64-encoder",
    description: "Encode text to Base64 format. Convert plain text to Base64 encoded string instantly.",
    category: "developer",
    primaryKeyword: "base64 encoder",
    secondaryKeywords: ["base64 encode", "text to base64", "base64 converter"],
    faq: [
      {
        question: "What is Base64 encoding?",
        answer: "Base64 is a binary-to-text encoding scheme that represents binary data in an ASCII string format. It's commonly used to encode data for transmission over media designed to handle text.",
      },
    ],
    schema: {
      inputs: [
        {
          id: "text",
          name: "text",
          type: "textarea",
          label: "Text",
          placeholder: "Enter text to encode...",
        },
      ],
      outputs: [
        {
          id: "encoded",
          name: "encoded",
          type: "code",
          label: "Base64 Encoded",
        },
      ],
    },
    metadata: {},
    relatedTools: ["base64-decoder", "json-formatter"],
    searchTags: ["base64", "encode", "encoder", "convert"],
  },
  {
    name: "Base64 Decoder",
    slug: "base64-decoder",
    description: "Decode Base64 strings back to plain text. Convert Base64 encoded data to readable text.",
    category: "developer",
    primaryKeyword: "base64 decoder",
    secondaryKeywords: ["base64 decode", "base64 to text", "base64 converter"],
    faq: [
      {
        question: "Can I decode any Base64 string?",
        answer: "This tool can decode valid Base64 strings. Invalid Base64 will show an error message.",
      },
    ],
    schema: {
      inputs: [
        {
          id: "base64",
          name: "base64",
          type: "textarea",
          label: "Base64 String",
          placeholder: "Enter Base64 string to decode...",
        },
      ],
      outputs: [
        {
          id: "decoded",
          name: "decoded",
          type: "text",
          label: "Decoded Text",
        },
      ],
    },
    metadata: {},
    relatedTools: ["base64-encoder", "json-formatter"],
    searchTags: ["base64", "decode", "decoder", "convert"],
  },
  {
    name: "UUID Generator",
    slug: "uuid-generator",
    description: "Generate random UUIDs (Universally Unique Identifiers). Generate multiple UUIDs at once for testing and development.",
    category: "developer",
    primaryKeyword: "uuid generator",
    secondaryKeywords: ["guid generator", "unique id", "random uuid", "uuid v4"],
    faq: [
      {
        question: "What is a UUID?",
        answer: "UUID (Universally Unique Identifier) is a 128-bit number used to identify information in computer systems. The version we generate is UUID v4, which is randomly generated.",
      },
    ],
    schema: {
      inputs: [
        {
          id: "count",
          name: "count",
          type: "number",
          label: "Count",
          defaultValue: 5,
          min: 1,
          max: 50,
        },
      ],
      outputs: [
        {
          id: "uuids",
          name: "uuids",
          type: "code",
          label: "Generated UUIDs",
        },
      ],
    },
    metadata: {},
    relatedTools: ["json-formatter", "base64-encoder"],
    searchTags: ["uuid", "guid", "generator", "unique"],
  },
  {
    name: "URL Encoder",
    slug: "url-encoder",
    description: "Encode URLs and text to a valid URL-encoded format. Escape special characters for safe use in URLs and query strings.",
    category: "developer",
    primaryKeyword: "url encoder",
    secondaryKeywords: ["url encode", "percent encoding", "encode url", "url escape"],
    faq: [
      {
        question: "What is URL encoding?",
        answer: "URL encoding replaces unsafe characters with a percent sign followed by their hexadecimal value, making text safe to include in URLs.",
      },
    ],
    schema: {
      inputs: [
        {
          id: "text",
          name: "text",
          type: "textarea",
          label: "Text to Encode",
          placeholder: "Enter text or URL...",
        },
      ],
      outputs: [
        {
          id: "encoded",
          name: "encoded",
          type: "code",
          label: "Encoded URL",
        },
      ],
    },
    metadata: {},
    relatedTools: ["url-decoder", "base64-encoder"],
    searchTags: ["url", "encode", "percent", "escape"],
  },
  {
    name: "URL Decoder",
    slug: "url-decoder",
    description: "Decode percent-encoded URLs and query strings back to their original readable form.",
    category: "developer",
    primaryKeyword: "url decoder",
    secondaryKeywords: ["url decode", "percent decode", "decode url", "unescape url"],
    faq: [
      {
        question: "What can this decode?",
        answer: "It decodes percent-encoded sequences (%20 for spaces, %3A for colons, etc.) back to their original characters.",
      },
    ],
    schema: {
      inputs: [
        {
          id: "text",
          name: "text",
          type: "textarea",
          label: "Encoded URL",
          placeholder: "Paste encoded URL...",
        },
      ],
      outputs: [
        {
          id: "decoded",
          name: "decoded",
          type: "text",
          label: "Decoded Text",
        },
      ],
    },
    metadata: {},
    relatedTools: ["url-encoder", "base64-decoder"],
    searchTags: ["url", "decode", "percent", "unescape"],
  },
  {
    name: "JWT Decoder",
    slug: "jwt-decoder",
    description: "Decode JSON Web Tokens (JWT) and view the header and payload. Inspect token contents without any server calls.",
    category: "developer",
    primaryKeyword: "jwt decoder",
    secondaryKeywords: ["jwt debugger", "jwt parser", "decode json web token", "token inspector"],
    faq: [
      {
        question: "What is a JWT?",
        answer: "A JWT (JSON Web Token) is a compact token with three parts: header, payload, and signature. This tool decodes the header and payload for inspection.",
      },
      {
        question: "Is my token sent anywhere?",
        answer: "No. Decoding happens entirely in your browser. The signature is never verified, so always confirm tokens with the issuing server.",
      },
    ],
    schema: {
      inputs: [
        {
          id: "token",
          name: "token",
          type: "textarea",
          label: "JWT Token",
          placeholder: "Paste your JWT here...",
        },
      ],
      outputs: [
        {
          id: "header",
          name: "header",
          type: "json",
          label: "Header",
        },
        {
          id: "payload",
          name: "payload",
          type: "json",
          label: "Payload",
        },
      ],
    },
    metadata: {},
    relatedTools: ["json-formatter", "base64-decoder"],
    searchTags: ["jwt", "token", "decode", "json"],
  },
  // SEO Tools
  {
    name: "Meta Tag Generator",
    slug: "meta-tag-generator",
    description: "Generate SEO meta tags for your website including title, description, keywords, Open Graph, and Twitter Card tags.",
    category: "seo",
    primaryKeyword: "meta tag generator",
    secondaryKeywords: ["seo meta tags", "og tags", "twitter card generator", "meta tags"],
    faq: [
      {
        question: "Why are meta tags important?",
        answer: "Meta tags help search engines understand your content and improve how your pages appear in search results and social media shares.",
      },
    ],
    schema: {
      inputs: [
        {
          id: "title",
          name: "title",
          type: "text",
          label: "Page Title",
        },
        {
          id: "description",
          name: "description",
          type: "textarea",
          label: "Meta Description",
        },
      ],
      outputs: [
        {
          id: "metaTags",
          name: "metaTags",
          type: "code",
          label: "Meta Tags",
        },
      ],
    },
    metadata: {},
    relatedTools: ["robots-txt-generator", "sitemap-generator"],
    searchTags: ["meta", "seo", "tags", "generator"],
  },
  {
    name: "Robots.txt Generator",
    slug: "robots-txt-generator",
    description: "Generate robots.txt files to control search engine crawling. Configure allow/disallow rules and crawl delays.",
    category: "seo",
    primaryKeyword: "robots.txt generator",
    secondaryKeywords: ["robots txt", "crawl control", "seo robots", "search engine crawling"],
    faq: [
      {
        question: "What is robots.txt?",
        answer: "robots.txt is a file that tells search engine crawlers which pages or files the crawler can or can't request from your site.",
      },
    ],
    schema: {
      inputs: [
        {
          id: "userAgent",
          name: "userAgent",
          type: "text",
          label: "User Agent",
          defaultValue: "*",
        },
        {
          id: "allowPaths",
          name: "allowPaths",
          type: "text",
          label: "Allow Paths",
        },
      ],
      outputs: [
        {
          id: "robotsTxt",
          name: "robotsTxt",
          type: "code",
          label: "robots.txt",
        },
      ],
    },
    metadata: {},
    relatedTools: ["meta-tag-generator", "sitemap-generator"],
    searchTags: ["robots", "txt", "seo", "crawling"],
  },
  {
    name: "Sitemap Generator",
    slug: "sitemap-generator",
    description: "Generate XML sitemaps for your website. Add URLs with priority, change frequency, and last modified date.",
    category: "seo",
    primaryKeyword: "sitemap generator",
    secondaryKeywords: ["xml sitemap", "seo sitemap", "google sitemap", "sitemap xml"],
    faq: [
      {
        question: "Why do I need a sitemap?",
        answer: "Sitemaps help search engines discover and index your pages more efficiently, especially for new or large websites.",
      },
    ],
    schema: {
      inputs: [
        {
          id: "urls",
          name: "urls",
          type: "text",
          label: "URLs",
        },
      ],
      outputs: [
        {
          id: "sitemap",
          name: "sitemap",
          type: "code",
          label: "Sitemap XML",
        },
      ],
    },
    metadata: {},
    relatedTools: ["meta-tag-generator", "robots-txt-generator"],
    searchTags: ["sitemap", "xml", "seo", "generator"],
  },
  {
    name: "Open Graph Generator",
    slug: "open-graph-generator",
    description: "Generate Open Graph meta tags for rich social media previews on Facebook, LinkedIn, and other platforms.",
    category: "seo",
    primaryKeyword: "open graph generator",
    secondaryKeywords: ["og tags generator", "og meta tags", "social share tags", "facebook preview tags"],
    faq: [
      {
        question: "What are Open Graph tags?",
        answer: "Open Graph tags control how your page appears when shared on social media, including the title, description, image, and type.",
      },
    ],
    schema: {
      inputs: [
        {
          id: "title",
          name: "title",
          type: "text",
          label: "Page Title",
        },
        {
          id: "url",
          name: "url",
          type: "text",
          label: "Page URL",
        },
        {
          id: "image",
          name: "image",
          type: "text",
          label: "Image URL",
        },
      ],
      outputs: [
        {
          id: "ogTags",
          name: "ogTags",
          type: "code",
          label: "Open Graph Tags",
        },
      ],
    },
    metadata: {},
    relatedTools: ["twitter-card-generator", "meta-tag-generator"],
    searchTags: ["open graph", "og", "social", "tags"],
  },
  {
    name: "Twitter Card Generator",
    slug: "twitter-card-generator",
    description: "Generate Twitter Card meta tags for rich previews when your pages are shared on X (Twitter).",
    category: "seo",
    primaryKeyword: "twitter card generator",
    secondaryKeywords: ["twitter meta tags", "x card generator", "twitter card validator", "social preview tags"],
    faq: [
      {
        question: "What is a Twitter Card?",
        answer: "Twitter Cards are special meta tags that let you attach rich media experiences like images and summaries to tweets that link to your site.",
      },
    ],
    schema: {
      inputs: [
        {
          id: "title",
          name: "title",
          type: "text",
          label: "Title",
        },
        {
          id: "description",
          name: "description",
          type: "textarea",
          label: "Description",
        },
        {
          id: "image",
          name: "image",
          type: "text",
          label: "Image URL",
        },
      ],
      outputs: [
        {
          id: "twitterTags",
          name: "twitterTags",
          type: "code",
          label: "Twitter Card Tags",
        },
      ],
    },
    metadata: {},
    relatedTools: ["open-graph-generator", "meta-tag-generator"],
    searchTags: ["twitter", "card", "seo", "tags"],
  },
  // Image Tools
  {
    name: "Image Compressor",
    slug: "image-compressor",
    featured: true,
    addedAt: "2026-02-20",
    description: "Compress images to reduce file size while maintaining quality. Adjust compression level for optimal results.",
    category: "image",
    primaryKeyword: "image compressor",
    secondaryKeywords: ["image compression", "reduce image size", "optimize image", "image optimizer"],
    faq: [
      {
        question: "How does image compression work?",
        answer: "Image compression reduces file size by removing unnecessary data and adjusting quality settings. Lower quality results in smaller files.",
      },
    ],
    schema: {
      inputs: [
        {
          id: "image",
          name: "image",
          type: "file",
          label: "Image",
          accept: "image/*",
        },
        {
          id: "quality",
          name: "quality",
          type: "number",
          label: "Quality",
          defaultValue: 80,
          min: 10,
          max: 100,
        },
      ],
      outputs: [
        {
          id: "compressedImage",
          name: "compressedImage",
          type: "file",
          label: "Compressed Image",
        },
      ],
    },
    metadata: {},
    relatedTools: ["image-resizer", "png-to-jpg"],
    searchTags: ["image", "compress", "optimize", "reduce"],
  },
  {
    name: "Image Resizer",
    slug: "image-resizer",
    description: "Resize images to specific dimensions. Maintain aspect ratio or set custom width and height.",
    category: "image",
    primaryKeyword: "image resizer",
    secondaryKeywords: ["resize image", "image dimensions", "scale image", "image size"],
    faq: [
      {
        question: "Will resizing affect image quality?",
        answer: "Resizing larger images to smaller dimensions maintains quality. Enlarging small images may result in pixelation.",
      },
    ],
    schema: {
      inputs: [
        {
          id: "image",
          name: "image",
          type: "file",
          label: "Image",
          accept: "image/*",
        },
        {
          id: "width",
          name: "width",
          type: "number",
          label: "Width (px)",
        },
        {
          id: "height",
          name: "height",
          type: "number",
          label: "Height (px)",
        },
      ],
      outputs: [
        {
          id: "resizedImage",
          name: "resizedImage",
          type: "file",
          label: "Resized Image",
        },
      ],
    },
    metadata: {},
    relatedTools: ["image-compressor", "png-to-jpg"],
    searchTags: ["image", "resize", "dimensions", "scale"],
  },
  {
    name: "PNG to JPG",
    slug: "png-to-jpg",
    description: "Convert PNG images to JPG format. Useful for reducing file size and improving compatibility.",
    category: "image",
    primaryKeyword: "png to jpg",
    secondaryKeywords: ["png converter", "jpg converter", "image format converter", "png to jpeg"],
    faq: [
      {
        question: "What happens to transparency?",
        answer: "PNG transparency is replaced with a white background when converting to JPG since JPG doesn't support transparency.",
      },
    ],
    schema: {
      inputs: [
        {
          id: "image",
          name: "image",
          type: "file",
          label: "PNG Image",
          accept: "image/png",
        },
      ],
      outputs: [
        {
          id: "jpgImage",
          name: "jpgImage",
          type: "file",
          label: "JPG Image",
        },
      ],
    },
    metadata: {},
    relatedTools: ["jpg-to-png", "image-compressor"],
    searchTags: ["png", "jpg", "convert", "format"],
  },
  {
    name: "JPG to PNG",
    slug: "jpg-to-png",
    description: "Convert JPG images to PNG format. Preserve quality and add transparency support.",
    category: "image",
    primaryKeyword: "jpg to png",
    secondaryKeywords: ["jpeg to png", "jpg converter", "png converter", "image format converter"],
    faq: [
      {
        question: "Why convert JPG to PNG?",
        answer: "PNG supports transparency and provides lossless compression, making it ideal for images that need to maintain quality.",
      },
    ],
    schema: {
      inputs: [
        {
          id: "image",
          name: "image",
          type: "file",
          label: "JPG Image",
          accept: "image/jpeg,image/jpg",
        },
      ],
      outputs: [
        {
          id: "pngImage",
          name: "pngImage",
          type: "file",
          label: "PNG Image",
        },
      ],
    },
    metadata: {},
    relatedTools: ["png-to-jpg", "image-compressor"],
    searchTags: ["jpg", "png", "convert", "format"],
  },
  {
    name: "HEIC to JPG",
    slug: "heic-to-jpg",
    description: "Convert HEIC or HEIF images to JPG format for broad compatibility across devices and apps.",
    category: "image",
    primaryKeyword: "heic to jpg",
    secondaryKeywords: ["heic converter", "heif to jpg", "iphone image converter"],
    faq: [
      {
        question: "Why convert HEIC to JPG?",
        answer: "JPG is more widely supported by older software, web apps, and sharing platforms than HEIC.",
      },
    ],
    schema: {
      inputs: [
        {
          id: "image",
          name: "image",
          type: "file",
          label: "Image",
          accept: "image/*",
        },
      ],
      outputs: [
        {
          id: "jpgImage",
          name: "jpgImage",
          type: "file",
          label: "JPG Image",
        },
      ],
    },
    metadata: {},
    relatedTools: ["png-to-jpg", "jpg-to-png"],
    searchTags: ["image", "heic", "jpg", "convert"],
  },
  {
    name: "Rotate Image",
    slug: "rotate-image",
    description: "Rotate uploaded images by 90 degrees for corrected orientation.",
    category: "image",
    primaryKeyword: "rotate image",
    secondaryKeywords: ["image rotation", "rotate photo", "fix image orientation"],
    faq: [
      {
        question: "What does this tool do?",
        answer: "The tool rotates the uploaded image by 90 degrees to fix orientation issues.",
      },
    ],
    schema: {
      inputs: [
        {
          id: "image",
          name: "image",
          type: "file",
          label: "Image",
          accept: "image/*",
        },
      ],
      outputs: [
        {
          id: "rotatedImage",
          name: "rotatedImage",
          type: "file",
          label: "Rotated Image",
        },
      ],
    },
    metadata: {},
    relatedTools: ["image-resizer", "webp-converter"],
    searchTags: ["image", "rotate", "orientation", "photo"],
  },
  {
    name: "WEBP Converter",
    slug: "webp-converter",
    description: "Convert WEBP images to PNG or JPG format. Make WEBP images compatible with older browsers and tools.",
    category: "image",
    primaryKeyword: "webp converter",
    secondaryKeywords: ["webp to png", "webp to jpg", "webp format", "image converter"],
    faq: [
      {
        question: "What is WEBP?",
        answer: "WEBP is a modern image format that provides superior compression. This tool converts it to more widely supported formats.",
      },
    ],
    schema: {
      inputs: [
        {
          id: "image",
          name: "image",
          type: "file",
          label: "WEBP Image",
          accept: "image/webp",
        },
        {
          id: "format",
          name: "format",
          type: "select",
          label: "Output Format",
          options: [
            { label: "PNG", value: "png" },
            { label: "JPG", value: "jpg" },
          ],
        },
      ],
      outputs: [
        {
          id: "convertedImage",
          name: "convertedImage",
          type: "file",
          label: "Converted Image",
        },
      ],
    },
    metadata: {},
    relatedTools: ["png-to-jpg", "jpg-to-png"],
    searchTags: ["webp", "convert", "png", "jpg"],
  },
  {
    name: "Image to WEBP",
    slug: "image-to-webp",
    description: "Convert PNG, JPG, and other image formats to WEBP. WEBP provides superior compression for smaller file sizes.",
    category: "image",
    primaryKeyword: "image to webp",
    secondaryKeywords: ["convert to webp", "webp converter", "jpg to webp", "png to webp"],
    faq: [
      {
        question: "Why use WEBP format?",
        answer: "WEBP provides superior compression compared to PNG and JPG, resulting in smaller file sizes while maintaining visual quality. It's supported by all modern browsers.",
      },
    ],
    schema: {
      inputs: [
        {
          id: "image",
          name: "image",
          type: "file",
          label: "Image",
          accept: "image/*",
        },
        {
          id: "quality",
          name: "quality",
          type: "number",
          label: "Quality",
          defaultValue: 85,
          min: 10,
          max: 100,
        },
      ],
      outputs: [
        {
          id: "webpImage",
          name: "webpImage",
          type: "file",
          label: "WEBP Image",
        },
      ],
    },
    metadata: {},
    relatedTools: ["webp-converter", "image-compressor"],
    searchTags: ["webp", "convert", "image", "format"],
  },
  {
    name: "Crop Image",
    slug: "crop-image",
    addedAt: "2026-07-01",
    description: "Crop images online by selecting a custom aspect ratio. Square, 16:9, 4:3, and free-form crops supported.",
    category: "image",
    primaryKeyword: "crop image",
    secondaryKeywords: ["crop photo", "image cropper", "crop tool", "aspect ratio crop"],
    faq: [
      {
        question: "Can I choose the crop area myself?",
        answer: "Yes, pick a preset aspect ratio or use the free-form option, then drag to position the crop area on your image.",
      },
    ],
    schema: {
      inputs: [
        {
          id: "image",
          name: "image",
          type: "file",
          label: "Image",
          accept: "image/*",
        },
        {
          id: "ratio",
          name: "ratio",
          type: "select",
          label: "Aspect Ratio",
        },
      ],
      outputs: [
        {
          id: "croppedImage",
          name: "croppedImage",
          type: "file",
          label: "Cropped Image",
        },
      ],
    },
    metadata: {},
    relatedTools: ["image-resizer", "flip-image"],
    searchTags: ["crop", "image", "photo", "ratio"],
  },
  {
    name: "Flip Image",
    slug: "flip-image",
    addedAt: "2026-07-14",
    description: "Flip images horizontally or vertically. Mirror images along the X or Y axis in one click.",
    category: "image",
    primaryKeyword: "flip image",
    secondaryKeywords: ["mirror image", "flip photo", "horizontal flip", "vertical flip"],
    faq: [
      {
        question: "What is the difference between flip and rotate?",
        answer: "Rotating spins the image (e.g. 90 degrees), while flipping mirrors it along an axis, creating a left-right or top-bottom reflection.",
      },
    ],
    schema: {
      inputs: [
        {
          id: "image",
          name: "image",
          type: "file",
          label: "Image",
          accept: "image/*",
        },
        {
          id: "direction",
          name: "direction",
          type: "select",
          label: "Direction",
        },
      ],
      outputs: [
        {
          id: "flippedImage",
          name: "flippedImage",
          type: "file",
          label: "Flipped Image",
        },
      ],
    },
    metadata: {},
    relatedTools: ["rotate-image", "crop-image"],
    searchTags: ["flip", "mirror", "image", "photo"],
  },
  {
    name: "Image to Base64",
    slug: "image-to-base64",
    description: "Convert an image to a Base64 data URI. Perfect for embedding images directly in HTML, CSS, or JSON.",
    category: "image",
    primaryKeyword: "image to base64",
    secondaryKeywords: ["image to data uri", "base64 image converter", "encode image", "img base64"],
    faq: [
      {
        question: "What is a data URI?",
        answer: "A data URI embeds the image data directly in the string using Base64 encoding, so it can be inlined into HTML or CSS without a separate file.",
      },
    ],
    schema: {
      inputs: [
        {
          id: "image",
          name: "image",
          type: "file",
          label: "Image",
          accept: "image/*",
        },
      ],
      outputs: [
        {
          id: "base64",
          name: "base64",
          type: "code",
          label: "Base64 String",
        },
      ],
    },
    metadata: {},
    relatedTools: ["base64-to-image", "base64-encoder"],
    searchTags: ["base64", "image", "data uri", "encode"],
  },
  {
    name: "Base64 to Image",
    slug: "base64-to-image",
    description: "Convert a Base64 data URI back into a downloadable image file. Decode inline images to PNG or JPG.",
    category: "image",
    primaryKeyword: "base64 to image",
    secondaryKeywords: ["data uri to image", "decode base64 image", "base64 image converter", "inline image"],
    faq: [
      {
        question: "How do I convert Base64 to an image?",
        answer: "Paste the Base64 data URI (starting with data:image/...) and the tool will render it and let you download it as an image file.",
      },
    ],
    schema: {
      inputs: [
        {
          id: "base64",
          name: "base64",
          type: "textarea",
          label: "Base64 String",
        },
      ],
      outputs: [
        {
          id: "image",
          name: "image",
          type: "file",
          label: "Image",
        },
      ],
    },
    metadata: {},
    relatedTools: ["image-to-base64", "base64-decoder"],
    searchTags: ["base64", "image", "decode", "data uri"],
  },
  // PDF Tools
  {
    name: "Merge PDF",
    slug: "merge-pdf",
    featured: true,
    addedAt: "2026-03-15",
    description: "Combine multiple PDF files into a single document. Upload multiple PDFs and merge them in order.",
    category: "pdf",
    primaryKeyword: "merge pdf",
    secondaryKeywords: ["combine pdf", "join pdf", "pdf merger", "concatenate pdf"],
    faq: [
      {
        question: "Can I merge PDFs with different page sizes?",
        answer: "Yes, PDFs with different page sizes can be merged. Each page retains its original dimensions.",
      },
    ],
    schema: {
      inputs: [
        {
          id: "pdfs",
          name: "pdfs",
          type: "file",
          label: "PDF Files",
          accept: "application/pdf",
          multiple: true,
        },
      ],
      outputs: [
        {
          id: "mergedPdf",
          name: "mergedPdf",
          type: "file",
          label: "Merged PDF",
        },
      ],
    },
    metadata: {},
    relatedTools: ["split-pdf", "compress-pdf"],
    searchTags: ["pdf", "merge", "combine", "join"],
  },
  {
    name: "Split PDF",
    slug: "split-pdf",
    description: "Split PDF files by page range or extract specific pages. Separate pages into new PDF documents.",
    category: "pdf",
    primaryKeyword: "split pdf",
    secondaryKeywords: ["extract pdf pages", "pdf splitter", "separate pdf", "pdf page extractor"],
    faq: [
      {
        question: "How do I extract specific pages?",
        answer: "Select 'Extract Specific Pages' mode and enter the page numbers you want to extract, separated by commas (e.g., 1,3,5).",
      },
    ],
    schema: {
      inputs: [
        {
          id: "pdf",
          name: "pdf",
          type: "file",
          label: "PDF File",
          accept: "application/pdf",
        },
        {
          id: "mode",
          name: "mode",
          type: "select",
          label: "Split Mode",
          options: [
            { label: "Page Range", value: "range" },
            { label: "Extract Specific Pages", value: "extract" },
          ],
        },
      ],
      outputs: [
        {
          id: "splitPdf",
          name: "splitPdf",
          type: "file",
          label: "Split PDF",
        },
      ],
    },
    metadata: {},
    relatedTools: ["merge-pdf", "compress-pdf"],
    searchTags: ["pdf", "split", "extract", "pages"],
  },
  {
    name: "Compress PDF",
    slug: "compress-pdf",
    description: "Reduce PDF file size while maintaining quality. Optimize PDFs for web sharing and storage.",
    category: "pdf",
    primaryKeyword: "compress pdf",
    secondaryKeywords: ["reduce pdf size", "pdf optimizer", "pdf compression", "shrink pdf"],
    faq: [
      {
        question: "Will compression affect quality?",
        answer: "PDF compression removes redundant data and optimizes content. Text quality remains excellent, images may be slightly compressed.",
      },
    ],
    schema: {
      inputs: [
        {
          id: "pdf",
          name: "pdf",
          type: "file",
          label: "PDF File",
          accept: "application/pdf",
        },
        {
          id: "quality",
          name: "quality",
          type: "number",
          label: "Compression Level",
          defaultValue: 75,
          min: 10,
          max: 100,
        },
      ],
      outputs: [
        {
          id: "compressedPdf",
          name: "compressedPdf",
          type: "file",
          label: "Compressed PDF",
        },
      ],
    },
    metadata: {},
    relatedTools: ["merge-pdf", "split-pdf"],
    searchTags: ["pdf", "compress", "reduce", "optimize"],
  },
  {
    name: "Image to PDF",
    slug: "image-to-pdf",
    description: "Convert one or more images into a single PDF document. Perfect for combining screenshots, photos, and scanned pages.",
    category: "pdf",
    primaryKeyword: "image to pdf",
    secondaryKeywords: ["jpg to pdf", "png to pdf", "convert images to pdf", "image converter"],
    faq: [
      {
        question: "What image formats are supported?",
        answer: "This tool supports PNG, JPG, JPEG, and WEBP images and converts them into a single PDF file.",
      },
    ],
    schema: {
      inputs: [
        {
          id: "images",
          name: "images",
          type: "file",
          label: "Images",
          accept: "image/*",
          multiple: true,
        },
      ],
      outputs: [
        {
          id: "pdf",
          name: "pdf",
          type: "file",
          label: "PDF Document",
        },
      ],
    },
    metadata: {},
    relatedTools: ["merge-pdf", "compress-pdf"],
    searchTags: ["pdf", "image", "convert", "images"],
  },
  {
    name: "PDF to Image",
    slug: "pdf-to-image",
    description: "Convert the first page of a PDF into a PNG image preview for quick sharing and visual review.",
    category: "pdf",
    primaryKeyword: "pdf to image",
    secondaryKeywords: ["pdf to png", "convert pdf image", "pdf preview", "pdf screenshot"],
    faq: [
      {
        question: "What output format is used?",
        answer: "The tool generates a PNG preview image from the PDF for easy download and sharing.",
      },
    ],
    schema: {
      inputs: [
        {
          id: "pdf",
          name: "pdf",
          type: "file",
          label: "PDF File",
          accept: "application/pdf",
        },
      ],
      outputs: [
        {
          id: "image",
          name: "image",
          type: "file",
          label: "PNG Preview",
        },
      ],
    },
    metadata: {},
    relatedTools: ["image-to-pdf", "merge-pdf"],
    searchTags: ["pdf", "image", "convert", "preview"],
  },
  {
    name: "PDF to JPG",
    slug: "pdf-to-jpg",
    description: "Convert each PDF page into a high-quality JPG image. Extract pages from PDF as individual photos.",
    category: "pdf",
    primaryKeyword: "pdf to jpg",
    secondaryKeywords: ["convert pdf to jpg", "pdf to image", "pdf page to image", "extract pdf as image"],
    faq: [
      {
        question: "How many pages can I convert?",
        answer: "You can convert any PDF up to the browser memory limit. Each page is rendered at a high resolution and downloaded as a separate JPG.",
      },
      {
        question: "Is the file uploaded anywhere?",
        answer: "No. All conversion happens locally in your browser using PDF.js, so your documents never leave your device.",
      },
    ],
    schema: {
      inputs: [
        {
          id: "pdf",
          name: "pdf",
          type: "file",
          label: "PDF File",
          accept: "application/pdf",
        },
      ],
      outputs: [
        {
          id: "images",
          name: "images",
          type: "file",
          label: "JPG Images",
        },
      ],
    },
    metadata: {},
    relatedTools: ["jpg-to-pdf", "pdf-to-image"],
    searchTags: ["pdf", "jpg", "convert", "image"],
  },
  {
    name: "JPG to PDF",
    slug: "jpg-to-pdf",
    description: "Convert JPG and PNG images into a single PDF document. Turn photos into a professional PDF file.",
    category: "pdf",
    primaryKeyword: "jpg to pdf",
    secondaryKeywords: ["convert jpg to pdf", "image to pdf", "jpeg to pdf", "photos to pdf"],
    faq: [
      {
        question: "How do I combine multiple images?",
        answer: "Upload several JPG or PNG images and they will be placed into a single PDF, one image per page, in upload order.",
      },
    ],
    schema: {
      inputs: [
        {
          id: "images",
          name: "images",
          type: "file",
          label: "Images",
          accept: "image/jpeg,image/png",
          multiple: true,
        },
      ],
      outputs: [
        {
          id: "pdf",
          name: "pdf",
          type: "file",
          label: "PDF Document",
        },
      ],
    },
    metadata: {},
    relatedTools: ["pdf-to-jpg", "image-to-pdf"],
    searchTags: ["jpg", "pdf", "convert", "document"],
  },
  {
    name: "Rotate PDF",
    slug: "rotate-pdf",
    addedAt: "2026-05-05",
    description: "Rotate PDF pages by 90, 180, or 270 degrees. Fix incorrectly oriented PDF documents.",
    category: "pdf",
    primaryKeyword: "rotate pdf",
    secondaryKeywords: ["pdf rotation", "rotate pages", "fix pdf orientation", "pdf page rotation"],
    faq: [
      {
        question: "Can I rotate specific pages?",
        answer: "This tool rotates all pages in the PDF by the specified angle. For selective rotation, use split and merge tools.",
      },
    ],
    schema: {
      inputs: [
        {
          id: "pdf",
          name: "pdf",
          type: "file",
          label: "PDF File",
          accept: "application/pdf",
        },
        {
          id: "rotation",
          name: "rotation",
          type: "select",
          label: "Rotation",
          options: [
            { label: "90° Clockwise", value: "90" },
            { label: "180°", value: "180" },
            { label: "270° Clockwise", value: "270" },
          ],
        },
      ],
      outputs: [
        {
          id: "rotatedPdf",
          name: "rotatedPdf",
          type: "file",
          label: "Rotated PDF",
        },
      ],
    },
    metadata: {},
    relatedTools: ["merge-pdf", "split-pdf"],
    searchTags: ["pdf", "rotate", "orientation", "pages"],
  },
  {
    name: "Unlock PDF",
    slug: "unlock-pdf",
    description: "Remove password protection from PDF files. Unlock secured PDFs with the correct password.",
    category: "pdf",
    primaryKeyword: "unlock pdf",
    secondaryKeywords: ["remove pdf password", "decrypt pdf", "pdf password remover", "unlock secured pdf"],
    faq: [
      {
        question: "Is it legal to unlock PDFs?",
        answer: "You can only unlock PDFs that you own or have permission to access. This tool requires the correct password.",
      },
    ],
    schema: {
      inputs: [
        {
          id: "pdf",
          name: "pdf",
          type: "file",
          label: "Protected PDF",
          accept: "application/pdf",
        },
        {
          id: "password",
          name: "password",
          type: "text",
          label: "Password",
        },
      ],
      outputs: [
        {
          id: "unlockedPdf",
          name: "unlockedPdf",
          type: "file",
          label: "Unlocked PDF",
        },
      ],
    },
    metadata: {},
    relatedTools: ["merge-pdf", "compress-pdf"],
    searchTags: ["pdf", "unlock", "password", "decrypt"],
  },
  {
    name: "Length Converter",
    slug: "length-converter",
    description: "Convert lengths between meters, kilometers, centimeters, millimeters, miles, yards, feet, and inches.",
    category: "converter",
    primaryKeyword: "length converter",
    secondaryKeywords: ["convert length", "feet to meters", "miles to kilometers", "measurement converter"],
    faq: [
      {
        question: "What length units are supported?",
        answer: "This tool supports conversion between meters, kilometers, centimeters, millimeters, miles, yards, feet, and inches.",
      },
      {
        question: "How accurate is the conversion?",
        answer: "Conversions use standard conversion factors and are rounded to 4 decimal places.",
      },
    ],
    schema: {
      inputs: [
        {
          id: "value",
          name: "value",
          type: "number",
          label: "Value",
        },
        {
          id: "fromUnit",
          name: "fromUnit",
          type: "select",
          label: "From Unit",
        },
        {
          id: "toUnit",
          name: "toUnit",
          type: "select",
          label: "To Unit",
        },
      ],
      outputs: [
        {
          id: "result",
          name: "result",
          type: "number",
          label: "Result",
        },
      ],
    },
    metadata: {},
    relatedTools: ["unit-converter", "temperature-converter"],
    searchTags: ["length", "converter", "measurement", "convert"],
  },
  {
    name: "Temperature Converter",
    slug: "temperature-converter",
    description: "Convert temperatures between Celsius, Fahrenheit, and Kelvin instantly.",
    category: "converter",
    primaryKeyword: "temperature converter",
    secondaryKeywords: ["celsius to fahrenheit", "fahrenheit to celsius", "kelvin converter", "temp converter"],
    faq: [
      {
        question: "How is Celsius converted to Fahrenheit?",
        answer: "The formula used is: (Celsius × 9/5) + 32 = Fahrenheit.",
      },
      {
        question: "What is absolute zero in Kelvin?",
        answer: "Absolute zero is 0 Kelvin, which is equal to -273.15°C or -459.67°F.",
      },
    ],
    schema: {
      inputs: [
        {
          id: "value",
          name: "value",
          type: "number",
          label: "Value",
        },
        {
          id: "fromUnit",
          name: "fromUnit",
          type: "select",
          label: "From Unit",
        },
        {
          id: "toUnit",
          name: "toUnit",
          type: "select",
          label: "To Unit",
        },
      ],
      outputs: [
        {
          id: "result",
          name: "result",
          type: "number",
          label: "Result",
        },
      ],
    },
    metadata: {},
    relatedTools: ["unit-converter", "length-converter"],
    searchTags: ["temperature", "converter", "celsius", "fahrenheit", "kelvin"],
  },
  {
    name: "Weight Converter",
    slug: "weight-converter",
    description: "Convert weight between milligrams, grams, kilograms, tonnes, ounces, pounds, and stones.",
    category: "converter",
    primaryKeyword: "weight converter",
    secondaryKeywords: ["kg to lbs", "lbs to kg", "weight conversion", "mass converter"],
    faq: [
      {
        question: "What units are supported?",
        answer: "Milligrams, grams, kilograms, tonnes, ounces, pounds, and stones.",
      },
    ],
    schema: {
      inputs: [
        {
          id: "value",
          name: "value",
          type: "number",
          label: "Value",
        },
        {
          id: "fromUnit",
          name: "fromUnit",
          type: "select",
          label: "From Unit",
        },
        {
          id: "toUnit",
          name: "toUnit",
          type: "select",
          label: "To Unit",
        },
      ],
      outputs: [
        {
          id: "result",
          name: "result",
          type: "number",
          label: "Result",
        },
      ],
    },
    metadata: {},
    relatedTools: ["length-converter", "temperature-converter"],
    searchTags: ["weight", "converter", "kg", "lbs", "mass"],
  },
  {
    name: "Area Converter",
    slug: "area-converter",
    addedAt: "2026-05-28",
    description: "Convert area between square meters, square kilometers, square feet, acres, hectares, and more.",
    category: "converter",
    primaryKeyword: "area converter",
    secondaryKeywords: ["convert area", "acres to hectares", "square feet to square meters", "land measurement"],
    faq: [
      {
        question: "What units are supported?",
        answer: "Square meters, square kilometers, square centimeters, square miles, square yards, square feet, square inches, acres, and hectares.",
      },
    ],
    schema: {
      inputs: [
        {
          id: "value",
          name: "value",
          type: "number",
          label: "Value",
        },
        {
          id: "fromUnit",
          name: "fromUnit",
          type: "select",
          label: "From Unit",
        },
        {
          id: "toUnit",
          name: "toUnit",
          type: "select",
          label: "To Unit",
        },
      ],
      outputs: [
        {
          id: "result",
          name: "result",
          type: "number",
          label: "Result",
        },
      ],
    },
    metadata: {},
    relatedTools: ["length-converter", "unit-converter"],
    searchTags: ["area", "converter", "acres", "hectares", "land"],
  },
  {
    name: "Speed Converter",
    slug: "speed-converter",
    description: "Convert speed between meters per second, kilometers per hour, miles per hour, knots, and feet per second.",
    category: "converter",
    primaryKeyword: "speed converter",
    secondaryKeywords: ["kmh to mph", "mph to kmh", "speed conversion", "knots to kmh"],
    faq: [
      {
        question: "What units are supported?",
        answer: "Meters per second, kilometers per hour, miles per hour, knots, and feet per second.",
      },
    ],
    schema: {
      inputs: [
        {
          id: "value",
          name: "value",
          type: "number",
          label: "Value",
        },
        {
          id: "fromUnit",
          name: "fromUnit",
          type: "select",
          label: "From Unit",
        },
        {
          id: "toUnit",
          name: "toUnit",
          type: "select",
          label: "To Unit",
        },
      ],
      outputs: [
        {
          id: "result",
          name: "result",
          type: "number",
          label: "Result",
        },
      ],
    },
    metadata: {},
    relatedTools: ["length-converter", "temperature-converter"],
    searchTags: ["speed", "converter", "kmh", "mph", "knots"],
  },
  {
    name: "Color Picker",
    slug: "color-picker",
    description: "Select colors using a visual color picker, view HEX/RGB values, and explore preset palettes.",
    category: "color",
    primaryKeyword: "color picker",
    secondaryKeywords: ["color selector", "hex color picker", "rgb color picker", "online color picker"],
    faq: [
      {
        question: "Can I use HEX codes directly?",
        answer: "Yes, you can type or paste a 6-digit HEX code to update the selected color.",
      },
      {
        question: "Are there preset colors available?",
        answer: "Yes, a collection of 20 popular preset colors is available for quick selection.",
      },
    ],
    schema: {
      inputs: [
        {
          id: "color",
          name: "color",
          type: "text",
          label: "Selected Color",
        },
      ],
      outputs: [
        {
          id: "hex",
          name: "hex",
          type: "text",
          label: "HEX Code",
        },
        {
          id: "rgb",
          name: "rgb",
          type: "text",
          label: "RGB Code",
        },
      ],
    },
    metadata: {},
    relatedTools: ["hex-to-rgb", "rgb-to-hex"],
    searchTags: ["color", "picker", "hex", "rgb", "palette"],
  },
  {
    name: "HEX to RGB Converter",
    slug: "hex-to-rgb",
    description: "Convert HEX color codes to RGB format. View a live preview of the converted color.",
    category: "color",
    primaryKeyword: "hex to rgb",
    secondaryKeywords: ["hex to rgb converter", "color code converter", "hex to rgb online"],
    faq: [
      {
        question: "What format of HEX codes are supported?",
        answer: "Both 3-character (e.g. #FFF) and 6-character (e.g. #FFFFFF) hexadecimal formats are supported, with or without the leading hash (#).",
      },
    ],
    schema: {
      inputs: [
        {
          id: "hex",
          name: "hex",
          type: "text",
          label: "HEX Color",
        },
      ],
      outputs: [
        {
          id: "rgb",
          name: "rgb",
          type: "text",
          label: "RGB Result",
        },
      ],
    },
    metadata: {},
    relatedTools: ["color-picker", "rgb-to-hex"],
    searchTags: ["hex", "rgb", "color", "convert"],
  },
  {
    name: "RGB to HEX Converter",
    slug: "rgb-to-hex",
    description: "Convert RGB color channel values (Red, Green, Blue) into a hexadecimal color code.",
    category: "color",
    primaryKeyword: "rgb to hex",
    secondaryKeywords: ["rgb to hex converter", "rgb to hex online", "color code converter"],
    faq: [
      {
        question: "What is the valid range for RGB channels?",
        answer: "Each color channel (Red, Green, Blue) must be an integer between 0 and 255.",
      },
    ],
    schema: {
      inputs: [
        {
          id: "red",
          name: "red",
          type: "number",
          label: "Red",
        },
        {
          id: "green",
          name: "green",
          type: "number",
          label: "Green",
        },
        {
          id: "blue",
          name: "blue",
          type: "number",
          label: "Blue",
        },
      ],
      outputs: [
        {
          id: "hex",
          name: "hex",
          type: "text",
          label: "HEX Result",
        },
      ],
    },
    metadata: {},
    relatedTools: ["color-picker", "hex-to-rgb"],
    searchTags: ["rgb", "hex", "color", "convert"],
  },
  {
    name: "Gradient Generator",
    slug: "gradient-generator",
    description: "Generate beautiful CSS gradients. Create linear and radial gradients with custom colors and copy the CSS instantly.",
    category: "color",
    primaryKeyword: "gradient generator",
    secondaryKeywords: ["css gradient", "gradient maker", "linear gradient", "radial gradient"],
    faq: [
      {
        question: "What can I do with the generated gradient?",
        answer: "The tool outputs ready-to-use CSS so you can style backgrounds, buttons, and text in your web projects.",
      },
    ],
    schema: {
      inputs: [
        {
          id: "color1",
          name: "color1",
          type: "text",
          label: "Color 1",
        },
        {
          id: "color2",
          name: "color2",
          type: "text",
          label: "Color 2",
        },
      ],
      outputs: [
        {
          id: "css",
          name: "css",
          type: "code",
          label: "CSS Gradient",
        },
      ],
    },
    metadata: {},
    relatedTools: ["color-palette-generator", "color-picker"],
    searchTags: ["gradient", "css", "color", "background"],
  },
  {
    name: "Color Palette Generator",
    slug: "color-palette-generator",
    addedAt: "2026-04-22",
    description: "Generate harmonious color palettes from a single starting hue. Perfect for designs, themes, and brand colors.",
    category: "color",
    primaryKeyword: "color palette generator",
    secondaryKeywords: ["palette generator", "color scheme", "design colors", "5 color palette"],
    faq: [
      {
        question: "How are palettes generated?",
        answer: "A random hue is chosen and five shades of varying lightness are derived from it, creating a cohesive palette.",
      },
    ],
    schema: {
      inputs: [
        {
          id: "count",
          name: "count",
          type: "number",
          label: "Colors",
          defaultValue: 5,
        },
      ],
      outputs: [
        {
          id: "palette",
          name: "palette",
          type: "code",
          label: "Palette",
        },
      ],
    },
    metadata: {},
    relatedTools: ["gradient-generator", "color-picker"],
    searchTags: ["palette", "color", "scheme", "design"],
  },
  {
    name: "Contrast Checker",
    slug: "contrast-checker",
    addedAt: "2026-07-20",
    description: "Check the contrast ratio between two colors and verify WCAG accessibility compliance for text.",
    category: "color",
    primaryKeyword: "contrast checker",
    secondaryKeywords: ["wcag contrast", "color contrast", "accessibility checker", "contrast ratio"],
    faq: [
      {
        question: "What is a good contrast ratio?",
        answer: "WCAG AA requires at least 4.5:1 for normal text and 3:1 for large text. AAA requires 7:1 for normal text.",
      },
    ],
    schema: {
      inputs: [
        {
          id: "foreground",
          name: "foreground",
          type: "text",
          label: "Foreground Color",
        },
        {
          id: "background",
          name: "background",
          type: "text",
          label: "Background Color",
        },
      ],
      outputs: [
        {
          id: "ratio",
          name: "ratio",
          type: "number",
          label: "Contrast Ratio",
        },
        {
          id: "rating",
          name: "rating",
          type: "text",
          label: "WCAG Rating",
        },
      ],
    },
    metadata: {},
    relatedTools: ["color-picker", "hex-to-rgb"],
    searchTags: ["contrast", "wcag", "accessibility", "ratio"],
  },
  {
    name: "Password Generator",
    slug: "password-generator",
    featured: true,
    addedAt: "2026-05-10",
    description: "Generate strong, secure, random passwords. Customize length and include uppercase, lowercase, numbers, and symbols.",
    category: "generator",
    primaryKeyword: "password generator",
    secondaryKeywords: ["generate password", "secure password generator", "random password", "password creator"],
    faq: [
      {
        question: "What makes a password strong?",
        answer: "A strong password is long (12+ characters) and contains a mix of uppercase letters, lowercase letters, numbers, and symbols.",
      },
      {
        question: "Are these passwords stored anywhere?",
        answer: "No, passwords are generated entirely in your browser using secure random number generation and are never sent to a server.",
      },
    ],
    schema: {
      inputs: [
        {
          id: "length",
          name: "length",
          type: "number",
          label: "Password Length",
        },
      ],
      outputs: [
        {
          id: "password",
          name: "password",
          type: "text",
          label: "Generated Password",
        },
      ],
    },
    metadata: {},
    relatedTools: ["uuid-generator", "random-number-generator", "password-strength-checker"],
    searchTags: ["password", "generator", "security", "random"],
  },
  {
    name: "QR Code Generator",
    slug: "qr-code-generator",
    featured: true,
    addedAt: "2026-04-18",
    description: "Generate custom QR codes for URLs, text, contacts, or Wi-Fi configurations. Download as PNG.",
    category: "generator",
    primaryKeyword: "qr code generator",
    secondaryKeywords: ["make qr code", "free qr generator", "qr code creator", "custom qr code"],
    faq: [
      {
        question: "What is a QR code?",
        answer: "A QR (Quick Response) code is a matrix barcode that can be scanned using smartphone cameras to access links, text, or details instantly.",
      },
      {
        question: "Will this QR code expire?",
        answer: "No, the QR codes generated are static and will work indefinitely as long as the encoded URL or text remains valid.",
      },
    ],
    schema: {
      inputs: [
        {
          id: "text",
          name: "text",
          type: "textarea",
          label: "Content",
        },
      ],
      outputs: [
        {
          id: "qrCode",
          name: "qrCode",
          type: "file",
          label: "QR Code Image",
        },
      ],
    },
    metadata: {},
    relatedTools: ["password-generator", "random-number-generator"],
    searchTags: ["qr", "generator", "code", "image"],
  },
  {
    name: "WhatsApp QR Generator",
    slug: "whatsapp-qr-generator",
    description: "Generate a WhatsApp QR code that opens a chat or pre-filled message when scanned.",
    category: "generator",
    primaryKeyword: "whatsapp qr generator",
    secondaryKeywords: ["whatsapp qr code", "wa qr", "chat qr"],
    faq: [
      {
        question: "How does it work?",
        answer: "The tool creates a QR code that opens a WhatsApp chat link with the provided phone number and optional message.",
      },
    ],
    schema: {
      inputs: [
        {
          id: "phone",
          name: "phone",
          type: "text",
          label: "Phone Number",
        },
      ],
      outputs: [
        {
          id: "qr",
          name: "qr",
          type: "file",
          label: "QR Image",
        },
      ],
    },
    metadata: {},
    relatedTools: ["qr-code-generator", "random-number-generator"],
    searchTags: ["qr", "whatsapp", "generator", "chat"],
  },
  {
    name: "WiFi QR Generator",
    slug: "wifi-qr-generator",
    description: "Generate a QR code that shares your WiFi credentials. Guests scan and connect instantly without typing a password.",
    category: "generator",
    primaryKeyword: "wifi qr generator",
    secondaryKeywords: ["wifi qr code", "qr for wifi", "share wifi password", "wifi code"],
    faq: [
      {
        question: "How do guests connect?",
        answer: "They open their camera app, scan the QR code, and their phone automatically joins the network using the encoded SSID and password.",
      },
      {
        question: "Is my password visible?",
        answer: "The password is embedded in the QR code. Only share it with people you trust to access your network.",
      },
    ],
    schema: {
      inputs: [
        {
          id: "ssid",
          name: "ssid",
          type: "text",
          label: "Network Name (SSID)",
        },
        {
          id: "password",
          name: "password",
          type: "text",
          label: "Password",
        },
      ],
      outputs: [
        {
          id: "qr",
          name: "qr",
          type: "file",
          label: "QR Image",
        },
      ],
    },
    metadata: {},
    relatedTools: ["qr-code-generator", "whatsapp-qr-generator"],
    searchTags: ["wifi", "qr", "password", "generator"],
  },
  {
    name: "Email QR Generator",
    slug: "email-qr-generator",
    description: "Create a QR code that opens a pre-filled email to your address. Add optional subject and message.",
    category: "generator",
    primaryKeyword: "email qr generator",
    secondaryKeywords: ["mail qr code", "email qr", "qr to email", "prefilled email"],
    faq: [
      {
        question: "What happens when scanned?",
        answer: "The scanner opens their email app with the recipient, subject, and message already filled in.",
      },
    ],
    schema: {
      inputs: [
        {
          id: "email",
          name: "email",
          type: "text",
          label: "Email Address",
        },
        {
          id: "subject",
          name: "subject",
          type: "text",
          label: "Subject",
        },
      ],
      outputs: [
        {
          id: "qr",
          name: "qr",
          type: "file",
          label: "QR Image",
        },
      ],
    },
    metadata: {},
    relatedTools: ["qr-code-generator", "vcard-qr-generator"],
    searchTags: ["email", "qr", "generator", "mail"],
  },
  {
    name: "SMS QR Generator",
    slug: "sms-qr-generator",
    description: "Generate a QR code that opens an SMS text message to a phone number with an optional pre-filled body.",
    category: "generator",
    primaryKeyword: "sms qr generator",
    secondaryKeywords: ["text message qr", "sms code", "qr to text", "message qr"],
    faq: [
      {
        question: "How does the SMS QR work?",
        answer: "Scanning opens the phone's messaging app with the recipient number and message text already entered.",
      },
    ],
    schema: {
      inputs: [
        {
          id: "phone",
          name: "phone",
          type: "text",
          label: "Phone Number",
        },
        {
          id: "message",
          name: "message",
          type: "textarea",
          label: "Message",
        },
      ],
      outputs: [
        {
          id: "qr",
          name: "qr",
          type: "file",
          label: "QR Image",
        },
      ],
    },
    metadata: {},
    relatedTools: ["qr-code-generator", "whatsapp-qr-generator"],
    searchTags: ["sms", "qr", "text", "generator"],
  },
  {
    name: "URL QR Generator",
    slug: "url-qr-generator",
    description: "Create a QR code that opens your website, link, or app store page when scanned.",
    category: "generator",
    primaryKeyword: "url qr generator",
    secondaryKeywords: ["link qr code", "website qr", "qr for url", "url code"],
    faq: [
      {
        question: "Does the URL need https://?",
        answer: "No. If you omit the protocol, https:// is added automatically so the link always opens correctly.",
      },
    ],
    schema: {
      inputs: [
        {
          id: "url",
          name: "url",
          type: "text",
          label: "URL",
        },
      ],
      outputs: [
        {
          id: "qr",
          name: "qr",
          type: "file",
          label: "QR Image",
        },
      ],
    },
    metadata: {},
    relatedTools: ["qr-code-generator", "email-qr-generator"],
    searchTags: ["url", "qr", "link", "generator"],
  },
  {
    name: "vCard QR Generator",
    slug: "vcard-qr-generator",
    addedAt: "2026-06-30",
    description: "Generate a QR code that shares your contact details as a vCard. Add name, phone, email, company, and website.",
    category: "generator",
    primaryKeyword: "vcard qr generator",
    secondaryKeywords: ["contact qr code", "business card qr", "vcard code", "digital business card"],
    faq: [
      {
        question: "What is a vCard?",
        answer: "A vCard (VCF) is a file format for electronic business cards. Scanning the QR code lets someone save your contact info instantly.",
      },
    ],
    schema: {
      inputs: [
        {
          id: "firstName",
          name: "firstName",
          type: "text",
          label: "First Name",
        },
        {
          id: "lastName",
          name: "lastName",
          type: "text",
          label: "Last Name",
        },
        {
          id: "phone",
          name: "phone",
          type: "text",
          label: "Phone",
        },
        {
          id: "email",
          name: "email",
          type: "text",
          label: "Email",
        },
      ],
      outputs: [
        {
          id: "qr",
          name: "qr",
          type: "file",
          label: "QR Image",
        },
      ],
    },
    metadata: {},
    relatedTools: ["qr-code-generator", "email-qr-generator"],
    searchTags: ["vcard", "qr", "contact", "business card"],
  },
  {
    name: "Random Number Generator",
    slug: "random-number-generator",
    description: "Generate single or multiple random numbers within your custom minimum and maximum range.",
    category: "generator",
    primaryKeyword: "random number generator",
    secondaryKeywords: ["generate numbers", "rng", "random digit", "number selector"],
    faq: [
      {
        question: "Are the numbers truly random?",
        answer: "This tool uses standard pseudo-random number generator algorithms built into modern web browsers, suitable for games, selections, and drawings.",
      },
    ],
    schema: {
      inputs: [
        {
          id: "min",
          name: "min",
          type: "number",
          label: "Minimum",
        },
        {
          id: "max",
          name: "max",
          type: "number",
          label: "Maximum",
        },
        {
          id: "count",
          name: "count",
          type: "number",
          label: "Quantity",
        },
      ],
      outputs: [
        {
          id: "numbers",
          name: "numbers",
          type: "code",
          label: "Generated Numbers",
        },
      ],
    },
    metadata: {},
    relatedTools: ["uuid-generator", "password-generator"],
    searchTags: ["random", "number", "generator", "rng"],
  },
  {
    name: "Password Strength Checker",
    slug: "password-strength-checker",
    description: "Check the strength and security level of your passwords. Get detailed analysis and security tips.",
    category: "security",
    primaryKeyword: "password strength checker",
    secondaryKeywords: ["check password", "password checker", "is my password safe", "password strength meter"],
    faq: [
      {
        question: "How is the password strength score determined?",
        answer: "It is calculated based on length, complexity (presence of uppercase, lowercase, digits, and special characters), and simple patterns.",
      },
    ],
    schema: {
      inputs: [
        {
          id: "password",
          name: "password",
          type: "text",
          label: "Password",
        },
      ],
      outputs: [
        {
          id: "score",
          name: "score",
          type: "number",
          label: "Score",
        },
      ],
    },
    metadata: {},
    relatedTools: ["password-generator", "sha256-generator"],
    searchTags: ["password", "strength", "security", "checker"],
  },
  {
    name: "SHA256 Generator",
    slug: "sha256-generator",
    description: "Generate cryptographic SHA256 hashes from text input instantly. Perfect for security and data verification.",
    category: "security",
    primaryKeyword: "sha256 generator",
    secondaryKeywords: ["sha256 hash", "hash text", "sha256 online", "cryptographic hash"],
    faq: [
      {
        question: "What is SHA256?",
        answer: "SHA-256 (Secure Hash Algorithm 2) is a cryptographic hash function that produces a unique 256-bit (32-byte) signature for any given input, which is one-way and cannot be reversed.",
      },
    ],
    schema: {
      inputs: [
        {
          id: "text",
          name: "text",
          type: "textarea",
          label: "Input Text",
        },
      ],
      outputs: [
        {
          id: "hash",
          name: "hash",
          type: "code",
          label: "SHA256 Hash",
        },
      ],
    },
    metadata: {},
    relatedTools: ["md5-generator", "password-strength-checker"],
    searchTags: ["sha256", "hash", "generator", "security", "crypto"],
  },
  {
    name: "MD5 Hash Generator",
    slug: "md5-generator",
    description: "Generate MD5 cryptographic hashes from text. Compare checksums and verify data integrity.",
    category: "security",
    primaryKeyword: "md5 generator",
    secondaryKeywords: ["md5 hash", "hash text", "md5 online", "checksum generator"],
    faq: [
      {
        question: "What is MD5?",
        answer: "MD5 is a widely used cryptographic hash function producing a 128-bit hash value. While not suitable for high security (due to vulnerabilities), it remains popular for verifying file integrity and simple checksums.",
      },
    ],
    schema: {
      inputs: [
        {
          id: "text",
          name: "text",
          type: "textarea",
          label: "Input Text",
        },
      ],
      outputs: [
        {
          id: "hash",
          name: "hash",
          type: "code",
          label: "MD5 Hash",
        },
      ],
    },
    metadata: {},
    relatedTools: ["sha256-generator", "password-strength-checker"],
    searchTags: ["md5", "hash", "generator", "security", "crypto"],
  },
  {
    name: "SHA1 Generator",
    slug: "sha1-generator",
    description: "Generate SHA1 hashes from text. Useful for checksums and integrity verification of non-critical data.",
    category: "security",
    primaryKeyword: "sha1 generator",
    secondaryKeywords: ["sha1 hash", "hash text", "sha1 online", "checksum"],
    faq: [
      {
        question: "Is SHA1 secure?",
        answer: "SHA1 is considered cryptographically broken and should not be used for security purposes. It remains fine for basic checksumming.",
      },
    ],
    schema: {
      inputs: [
        {
          id: "text",
          name: "text",
          type: "textarea",
          label: "Input Text",
        },
      ],
      outputs: [
        {
          id: "hash",
          name: "hash",
          type: "code",
          label: "SHA1 Hash",
        },
      ],
    },
    metadata: {},
    relatedTools: ["sha256-generator", "sha512-generator"],
    searchTags: ["sha1", "hash", "generator", "checksum"],
  },
  {
    name: "SHA512 Generator",
    slug: "sha512-generator",
    addedAt: "2026-06-12",
    description: "Generate SHA512 hashes from text. SHA-2 family hash producing a strong 512-bit digest.",
    category: "security",
    primaryKeyword: "sha512 generator",
    secondaryKeywords: ["sha512 hash", "hash text", "sha512 online", "secure hash"],
    faq: [
      {
        question: "What is SHA512 used for?",
        answer: "SHA512 produces a 512-bit digest and is widely used for data integrity verification and digital signatures where strong collision resistance is needed.",
      },
    ],
    schema: {
      inputs: [
        {
          id: "text",
          name: "text",
          type: "textarea",
          label: "Input Text",
        },
      ],
      outputs: [
        {
          id: "hash",
          name: "hash",
          type: "code",
          label: "SHA512 Hash",
        },
      ],
    },
    metadata: {},
    relatedTools: ["sha256-generator", "sha1-generator"],
    searchTags: ["sha512", "hash", "generator", "security"],
  },
  // Finance Tools
  {
    name: "Mortgage Calculator",
    slug: "mortgage-calculator",
    addedAt: "2026-08-20",
    description:
      "Calculate monthly mortgage payments, total interest, and the true cost of a home with adjustable down payment, rate, and term.",
    category: "finance",
    primaryKeyword: "mortgage calculator",
    secondaryKeywords: [
      "home loan calculator",
      "mortgage payment calculator",
      "house payment calculator",
      "mortgage interest calculator",
    ],
    faq: [
      {
        question: "How is a mortgage monthly payment calculated?",
        answer: "The monthly payment uses the standard amortization formula M = P[r(1+r)^n]/[(1+r)^n-1], where P is the loan amount after your down payment, r is the monthly interest rate, and n is the number of monthly payments.",
      },
      {
        question: "Does a bigger down payment reduce my monthly payment?",
        answer: "Yes. A larger down payment reduces the loan amount, which lowers both your monthly payment and the total interest you pay over the life of the loan.",
      },
      {
        question: "Does this include taxes and insurance?",
        answer: "No. This calculator shows principal and interest only. Property taxes, homeowners insurance, and HOA fees are paid separately and vary by location.",
      },
    ],
    schema: {
      inputs: [
        {
          id: "homePrice",
          name: "homePrice",
          type: "number",
          label: "Home Price",
        },
        {
          id: "downPaymentPercent",
          name: "downPaymentPercent",
          type: "number",
          label: "Down Payment (%)",
        },
        {
          id: "rate",
          name: "rate",
          type: "number",
          label: "Interest Rate",
        },
        {
          id: "years",
          name: "years",
          type: "number",
          label: "Loan Term (Years)",
        },
      ],
      outputs: [
        {
          id: "monthlyPayment",
          name: "monthlyPayment",
          type: "number",
          label: "Monthly Payment",
        },
        {
          id: "totalInterest",
          name: "totalInterest",
          type: "number",
          label: "Total Interest",
        },
      ],
    },
    metadata: {},
    relatedTools: ["loan-calculator", "emi-calculator", "compound-interest-calculator"],
    searchTags: ["mortgage", "home loan", "house", "payment", "real estate"],
  },
  {
    name: "EMI Calculator",
    slug: "emi-calculator",
    addedAt: "2026-08-20",
    description:
      "Calculate loan EMI with prepayment savings. See how extra monthly payments shorten your tenure and reduce total interest.",
    category: "finance",
    primaryKeyword: "emi calculator",
    secondaryKeywords: [
      "emi calculator with prepayment",
      "loan emi calculator",
      "equated monthly installment",
      "prepayment calculator",
    ],
    faq: [
      {
        question: "What is EMI?",
        answer: "EMI stands for Equated Monthly Installment - the fixed amount you pay each month toward a loan, covering both principal and interest.",
      },
      {
        question: "How does prepayment reduce my loan?",
        answer: "Any extra amount paid each month goes directly toward the principal. A smaller principal means less interest accrues, so the loan is paid off faster and you save on total interest.",
      },
      {
        question: "Is the EMI fixed throughout the loan?",
        answer: "For fixed-rate loans the EMI stays the same. With a floating rate loan, the EMI changes whenever the lender resets the interest rate.",
      },
    ],
    schema: {
      inputs: [
        {
          id: "principal",
          name: "principal",
          type: "number",
          label: "Loan Amount",
        },
        {
          id: "rate",
          name: "rate",
          type: "number",
          label: "Interest Rate",
        },
        {
          id: "years",
          name: "years",
          type: "number",
          label: "Tenure (Years)",
        },
        {
          id: "prepayment",
          name: "prepayment",
          type: "number",
          label: "Extra Monthly Payment",
        },
      ],
      outputs: [
        {
          id: "emi",
          name: "emi",
          type: "number",
          label: "Monthly EMI",
        },
        {
          id: "interestSaved",
          name: "interestSaved",
          type: "number",
          label: "Interest Saved with Prepayment",
        },
      ],
    },
    metadata: {},
    relatedTools: ["loan-calculator", "mortgage-calculator", "compound-interest-calculator"],
    searchTags: ["emi", "loan", "prepayment", "installment", "tenure"],
  },
  {
    name: "Compound Interest Calculator",
    slug: "compound-interest-calculator",
    addedAt: "2026-08-20",
    description:
      "Calculate compound interest growth on investments with monthly contributions. See future value across yearly to daily compounding.",
    category: "finance",
    primaryKeyword: "compound interest calculator",
    secondaryKeywords: [
      "investment calculator",
      "compound interest formula",
      "future value calculator",
      "savings growth calculator",
    ],
    faq: [
      {
        question: "What is compound interest?",
        answer: "Compound interest is interest earned on both your original investment and on previously earned interest, causing your money to grow at an accelerating rate over time.",
      },
      {
        question: "Which compounding frequency should I choose?",
        answer: "Use the frequency your bank or investment actually uses - savings accounts often compound daily, many bonds semi-annually, and most funds monthly. More frequent compounding produces slightly higher returns.",
      },
      {
        question: "Do monthly contributions affect the result?",
        answer: "Yes. Regular contributions are added each month and immediately begin earning compound interest, which significantly increases the final value over long periods.",
      },
    ],
    schema: {
      inputs: [
        {
          id: "principal",
          name: "principal",
          type: "number",
          label: "Initial Investment",
        },
        {
          id: "monthlyContribution",
          name: "monthlyContribution",
          type: "number",
          label: "Monthly Addition",
        },
        {
          id: "rate",
          name: "rate",
          type: "number",
          label: "Interest Rate",
        },
        {
          id: "years",
          name: "years",
          type: "number",
          label: "Time Period (Years)",
        },
      ],
      outputs: [
        {
          id: "futureValue",
          name: "futureValue",
          type: "number",
          label: "Future Value",
        },
        {
          id: "totalInterest",
          name: "totalInterest",
          type: "number",
          label: "Interest Earned",
        },
      ],
    },
    metadata: {},
    relatedTools: ["emi-calculator", "loan-calculator", "percentage-calculator"],
    searchTags: ["compound interest", "investment", "savings", "growth", "future value"],
  },
  {
    name: "Hourly to Salary Calculator",
    slug: "hourly-to-salary-calculator",
    addedAt: "2026-08-20",
    description:
      "Convert hourly pay to annual, monthly, weekly, and daily salary. Adjust hours per week and weeks worked per year.",
    category: "finance",
    primaryKeyword: "hourly to salary",
    secondaryKeywords: [
      "hourly to annual salary",
      "wage calculator",
      "salary converter",
      "hourly wage to yearly",
    ],
    faq: [
      {
        question: "How do I convert hourly pay to annual salary?",
        answer: "Multiply your hourly rate by hours worked per week, then multiply by weeks worked per year. The standard full-time assumption is $rate x 40 hours x 52 weeks.",
      },
      {
        question: "What if I take unpaid vacation?",
        answer: "Reduce the weeks per year setting to match your actual working weeks - for example, use 50 weeks if you take two unpaid weeks off.",
      },
      {
        question: "Is this my take-home pay?",
        answer: "No. This shows gross salary before taxes, insurance, retirement contributions, and other deductions that vary by country and personal situation.",
      },
    ],
    schema: {
      inputs: [
        {
          id: "hourlyRate",
          name: "hourlyRate",
          type: "number",
          label: "Hourly Rate",
        },
        {
          id: "hoursPerWeek",
          name: "hoursPerWeek",
          type: "number",
          label: "Hours per Week",
        },
        {
          id: "weeksPerYear",
          name: "weeksPerYear",
          type: "number",
          label: "Weeks per Year",
        },
      ],
      outputs: [
        {
          id: "annualSalary",
          name: "annualSalary",
          type: "number",
          label: "Annual Salary",
        },
        {
          id: "monthlySalary",
          name: "monthlySalary",
          type: "number",
          label: "Monthly Salary",
        },
      ],
    },
    metadata: {},
    relatedTools: ["tip-calculator", "percentage-calculator", "discount-calculator"],
    searchTags: ["salary", "hourly", "wage", "paycheck", "income"],
  },
  {
    name: "Tip Calculator",
    slug: "tip-calculator",
    addedAt: "2026-08-20",
    description:
      "Calculate restaurant tips instantly with quick percentage buttons and bill splitting between any number of people.",
    category: "finance",
    primaryKeyword: "tip calculator",
    secondaryKeywords: [
      "gratuity calculator",
      "restaurant tip calculator",
      "bill splitter",
      "split the bill",
    ],
    faq: [
      {
        question: "How much should I tip?",
        answer: "In the United States, 15-20% of the pre-tax bill is standard for good restaurant service. Other countries have different customs - many include service in the bill already.",
      },
      {
        question: "How does bill splitting work?",
        answer: "Set the number of people and the calculator divides the total bill including tip equally, showing both the per-person total and the tip share per person.",
      },
      {
        question: "Should I tip on the pre-tax or post-tax amount?",
        answer: "Customary etiquette is to tip on the pre-tax amount, though many people simply tip on the final bill total for convenience.",
      },
    ],
    schema: {
      inputs: [
        {
          id: "billAmount",
          name: "billAmount",
          type: "number",
          label: "Bill Amount",
        },
        {
          id: "tipPercent",
          name: "tipPercent",
          type: "number",
          label: "Tip Percentage",
        },
        {
          id: "people",
          name: "people",
          type: "number",
          label: "Number of People",
        },
      ],
      outputs: [
        {
          id: "tipAmount",
          name: "tipAmount",
          type: "number",
          label: "Tip Amount",
        },
        {
          id: "perPersonTotal",
          name: "perPersonTotal",
          type: "number",
          label: "Per Person Total",
        },
      ],
    },
    metadata: {},
    relatedTools: ["hourly-to-salary-calculator", "discount-calculator", "percentage-calculator"],
    searchTags: ["tip", "gratuity", "restaurant", "bill", "split"],
  },
  {
    name: "SIP Calculator",
    slug: "sip-calculator",
    addedAt: "2026-08-20",
    description:
      "Calculate returns on your monthly SIP investment. See total invested, estimated gains, and maturity value for any period.",
    category: "finance",
    primaryKeyword: "sip calculator",
    secondaryKeywords: [
      "mutual fund calculator",
      "systematic investment plan",
      "sip return calculator",
      "sip maturity value",
    ],
    faq: [
      {
        question: "What is a SIP?",
        answer: "A Systematic Investment Plan (SIP) lets you invest a fixed amount in a mutual fund at regular intervals, usually monthly, combining rupee/dollar-cost averaging with compound growth.",
      },
      {
        question: "How is SIP return calculated?",
        answer: "Each monthly installment compounds independently for the months it remains invested. The formula is FV = P x [(1+i)^n - 1] / i x (1+i), where P is the monthly amount, i is the monthly rate, and n is the number of months.",
      },
      {
        question: "What return rate should I assume?",
        answer: "Historically, diversified equity funds have averaged around 10-12% annually over long periods, but past performance never guarantees future results. Use conservative estimates for planning.",
      },
    ],
    schema: {
      inputs: [
        {
          id: "monthlyInvestment",
          name: "monthlyInvestment",
          type: "number",
          label: "Monthly Investment",
        },
        {
          id: "rate",
          name: "rate",
          type: "number",
          label: "Expected Return Rate",
        },
        {
          id: "years",
          name: "years",
          type: "number",
          label: "Investment Period (Years)",
        },
      ],
      outputs: [
        {
          id: "futureValue",
          name: "futureValue",
          type: "number",
          label: "Total Value",
        },
        {
          id: "estimatedGains",
          name: "estimatedGains",
          type: "number",
          label: "Estimated Returns",
        },
      ],
    },
    metadata: {},
    relatedTools: ["compound-interest-calculator", "retirement-calculator", "roi-calculator"],
    searchTags: ["sip", "mutual fund", "investment", "monthly", "returns"],
  },
  {
    name: "Simple Interest Calculator",
    slug: "simple-interest-calculator",
    addedAt: "2026-08-20",
    description:
      "Calculate simple interest instantly using principal, rate, and time. See interest earned, total amount, and yearly interest.",
    category: "finance",
    primaryKeyword: "simple interest calculator",
    secondaryKeywords: [
      "simple interest formula",
      "interest calculator principal rate time",
      "si calculator",
      "flat interest calculator",
    ],
    faq: [
      {
        question: "What is simple interest?",
        answer: "Simple interest is calculated only on the original principal using I = PRT/100 (Principal x Rate x Time). Unlike compound interest, earned interest does not itself earn interest.",
      },
      {
        question: "Where is simple interest used?",
        answer: "Short-term personal loans, some auto loans, bonds with fixed coupons, and many classroom finance problems use simple interest because it is straightforward to compute.",
      },
      {
        question: "Simple vs compound interest - which grows faster?",
        answer: "Compound interest always grows faster over multiple periods because interest is added to the balance and earns its own interest. Over one single period they are identical.",
      },
    ],
    schema: {
      inputs: [
        {
          id: "principal",
          name: "principal",
          type: "number",
          label: "Principal Amount",
        },
        {
          id: "rate",
          name: "rate",
          type: "number",
          label: "Interest Rate (% per year)",
        },
        {
          id: "years",
          name: "years",
          type: "number",
          label: "Time Period (Years)",
        },
      ],
      outputs: [
        {
          id: "interest",
          name: "interest",
          type: "number",
          label: "Interest Earned",
        },
        {
          id: "total",
          name: "total",
          type: "number",
          label: "Total Amount",
        },
      ],
    },
    metadata: {},
    relatedTools: ["compound-interest-calculator", "loan-calculator", "emi-calculator"],
    searchTags: ["simple interest", "principal", "rate", "time", "formula"],
  },
  {
    name: "Salary After Tax Calculator",
    slug: "salary-after-tax-calculator",
    addedAt: "2026-08-20",
    description:
      "Estimate take-home pay from gross salary for the US, UK, and Canada. See estimated tax, effective tax rate, and monthly net income.",
    category: "finance",
    primaryKeyword: "salary after tax calculator",
    secondaryKeywords: [
      "take home pay calculator",
      "net salary calculator",
      "income tax estimator",
      "gross to net calculator",
    ],
    faq: [
      {
        question: "How accurate is this estimate?",
        answer: "It applies official progressive tax brackets and standard deductions/allowances for each country. It excludes state/provincial taxes and social contributions like Social Security, National Insurance, or CPP, so treat it as a close first approximation.",
      },
      {
        question: "What is an effective tax rate?",
        answer: "Your effective rate is total tax divided by gross income. It is always lower than your top bracket rate because lower portions of your income are taxed at lower rates.",
      },
      {
        question: "Why is part of my income tax-free?",
        answer: "Each system gives a tax-free allowance - the US standard deduction ($15,000), the UK personal allowance (£12,570), and Canada's basic personal amount (~$16,129) - so income up to that level owes no income tax.",
      },
    ],
    schema: {
      inputs: [
        {
          id: "country",
          name: "country",
          type: "select",
          label: "Country / Tax System",
        },
        {
          id: "grossSalary",
          name: "grossSalary",
          type: "number",
          label: "Gross Annual Salary",
        },
      ],
      outputs: [
        {
          id: "netIncome",
          name: "netIncome",
          type: "number",
          label: "Net Take-Home Pay",
        },
        {
          id: "effectiveRate",
          name: "effectiveRate",
          type: "number",
          label: "Effective Tax Rate",
        },
      ],
    },
    metadata: {},
    relatedTools: ["hourly-to-salary-calculator", "retirement-calculator", "percentage-calculator"],
    searchTags: ["salary", "tax", "take home", "net pay", "income"],
  },
  {
    name: "Retirement Calculator",
    slug: "retirement-calculator",
    addedAt: "2026-08-20",
    description:
      "Project your retirement savings based on current savings, monthly contributions, return rate, and years until retirement.",
    category: "finance",
    primaryKeyword: "retirement calculator",
    secondaryKeywords: [
      "retirement savings calculator",
      "nest egg calculator",
      "401k growth projection",
      "how much do i need to retire",
    ],
    faq: [
      {
        question: "How much should I save for retirement?",
        answer: "A common benchmark is 10-12 times your final annual salary saved by retirement age. Personal needs vary widely based on lifestyle, healthcare costs, and other income sources like pensions or social security.",
      },
      {
        question: "What return rate should I use?",
        answer: "Long-term balanced portfolios have historically returned 6-8% annually; stock-heavy portfolios higher. Use a conservative rate so you are pleasantly surprised rather than short of funds.",
      },
      {
        question: "Does this account for inflation?",
        answer: "No - results are in today's dollars before inflation adjustment. If inflation averages 3%, $1 million in 30 years will buy roughly what $412,000 buys today.",
      },
    ],
    schema: {
      inputs: [
        {
          id: "currentSavings",
          name: "currentSavings",
          type: "number",
          label: "Current Savings",
        },
        {
          id: "monthlyContribution",
          name: "monthlyContribution",
          type: "number",
          label: "Monthly Contribution",
        },
        {
          id: "currentAge",
          name: "currentAge",
          type: "number",
          label: "Current Age",
        },
        {
          id: "retirementAge",
          name: "retirementAge",
          type: "number",
          label: "Retirement Age",
        },
      ],
      outputs: [
        {
          id: "futureValue",
          name: "futureValue",
          type: "number",
          label: "Projected Savings",
        },
        {
          id: "growth",
          name: "growth",
          type: "number",
          label: "Investment Growth",
        },
      ],
    },
    metadata: {},
    relatedTools: ["compound-interest-calculator", "sip-calculator", "inflation-calculator"],
    searchTags: ["retirement", "savings", "pension", "nest egg", "401k"],
  },
  {
    name: "Car Loan Calculator",
    slug: "car-loan-calculator",
    addedAt: "2026-08-20",
    description:
      "Calculate car loan payments including down payment and trade-in value. See monthly payment, total interest, and true vehicle cost.",
    category: "finance",
    primaryKeyword: "car loan calculator",
    secondaryKeywords: [
      "auto loan calculator",
      "vehicle finance calculator",
      "car payment calculator with trade in",
      "auto financing",
    ],
    faq: [
      {
        question: "How does a trade-in affect my loan?",
        answer: "Trade-in value is subtracted from the vehicle price along with your down payment, reducing the amount you need to finance - which lowers both your monthly payment and total interest.",
      },
      {
        question: "What loan term should I choose?",
        answer: "Shorter terms (36-48 months) cost less overall but have higher monthly payments. Terms beyond 60 months often leave you owing more than the car is worth due to depreciation.",
      },
      {
        question: "What costs are not included?",
        answer: "Sales tax, registration, documentation fees, insurance, and extended warranties are excluded. Budget roughly 8-10% extra on top of the vehicle price for these.",
      },
    ],
    schema: {
      inputs: [
        {
          id: "vehiclePrice",
          name: "vehiclePrice",
          type: "number",
          label: "Vehicle Price",
        },
        {
          id: "downPayment",
          name: "downPayment",
          type: "number",
          label: "Down Payment",
        },
        {
          id: "tradeIn",
          name: "tradeIn",
          type: "number",
          label: "Trade-In Value",
        },
        {
          id: "rate",
          name: "rate",
          type: "number",
          label: "Interest Rate",
        },
      ],
      outputs: [
        {
          id: "monthlyPayment",
          name: "monthlyPayment",
          type: "number",
          label: "Monthly Payment",
        },
        {
          id: "totalInterest",
          name: "totalInterest",
          type: "number",
          label: "Total Interest",
        },
      ],
    },
    metadata: {},
    relatedTools: ["mortgage-calculator", "loan-calculator", "emi-calculator"],
    searchTags: ["car", "auto", "vehicle", "loan", "trade-in"],
  },
  {
    name: "Credit Card Payoff Calculator",
    slug: "credit-card-payoff-calculator",
    addedAt: "2026-08-20",
    description:
      "Find out how long until your credit card is paid off with fixed monthly payments, plus total interest you will pay.",
    category: "finance",
    primaryKeyword: "credit card payoff calculator",
    secondaryKeywords: [
      "debt payoff calculator",
      "credit card interest calculator",
      "how long to pay off credit card",
      "minimum payment calculator",
    ],
    faq: [
      {
        question: "Why does paying the minimum take so long?",
        answer: "Minimum payments are often just 1-3% of the balance. Early on, most of that goes to interest, not debt - a $5,000 balance at 21% APR can take decades and cost more than the original balance in interest.",
      },
      {
        question: "How much extra should I pay each month?",
        answer: "Any amount above the monthly interest charge reduces your principal. Even $25-50 extra per month typically cuts years off payoff time and saves thousands in interest.",
      },
      {
        question: "What if my payment is too low?",
        answer: "If your payment does not exceed the monthly interest charge, the balance grows instead of shrinking and can never be paid off - the calculator warns you when this happens.",
      },
    ],
    schema: {
      inputs: [
        {
          id: "balance",
          name: "balance",
          type: "number",
          label: "Card Balance",
        },
        {
          id: "apr",
          name: "apr",
          type: "number",
          label: "APR (%)",
        },
        {
          id: "monthlyPayment",
          name: "monthlyPayment",
          type: "number",
          label: "Monthly Payment",
        },
      ],
      outputs: [
        {
          id: "months",
          name: "months",
          type: "number",
          label: "Months to Pay Off",
        },
        {
          id: "totalInterest",
          name: "totalInterest",
          type: "number",
          label: "Total Interest Paid",
        },
      ],
    },
    metadata: {},
    relatedTools: ["emi-calculator", "loan-calculator", "car-loan-calculator"],
    searchTags: ["credit card", "debt", "payoff", "apr", "interest"],
  },
  {
    name: "Inflation Calculator",
    slug: "inflation-calculator",
    addedAt: "2026-08-20",
    description:
      "See how inflation erodes purchasing power over time. Calculate future prices of goods and what your money will be worth.",
    category: "finance",
    primaryKeyword: "inflation calculator",
    secondaryKeywords: [
      "purchasing power calculator",
      "cost of living increase",
      "future price calculator",
      "money value over time",
    ],
    faq: [
      {
        question: "How is future cost calculated?",
        answer: "Future Cost = Today's Price x (1 + inflation rate)^years. At 3% annual inflation, something costing $100 today costs about $134 in ten years.",
      },
      {
        question: "What is a typical inflation rate?",
        answer: "The US Federal Reserve targets 2% annually, and the long-run historical average is roughly 3%. Actual rates fluctuate significantly year to year.",
      },
      {
        question: "How do I protect money from inflation?",
        answer: "Common approaches include stocks/index funds, inflation-protected bonds (TIPS), real estate, and I-bonds - assets whose returns historically exceed the inflation rate over long periods.",
      },
    ],
    schema: {
      inputs: [
        {
          id: "amount",
          name: "amount",
          type: "number",
          label: "Amount Today",
        },
        {
          id: "rate",
          name: "rate",
          type: "number",
          label: "Inflation Rate (% per year)",
        },
        {
          id: "years",
          name: "years",
          type: "number",
          label: "Number of Years",
        },
      ],
      outputs: [
        {
          id: "futureCost",
          name: "futureCost",
          type: "number",
          label: "Future Cost",
        },
        {
          id: "purchasingPower",
          name: "purchasingPower",
          type: "number",
          label: "Purchasing Power",
        },
      ],
    },
    metadata: {},
    relatedTools: ["retirement-calculator", "compound-interest-calculator", "percentage-calculator"],
    searchTags: ["inflation", "purchasing power", "cost of living", "prices"],
  },
  {
    name: "ROI Calculator",
    slug: "roi-calculator",
    addedAt: "2026-08-20",
    description:
      "Calculate return on investment with total ROI and annualized ROI (CAGR). Compare investments of different sizes and periods.",
    category: "finance",
    primaryKeyword: "roi calculator",
    secondaryKeywords: [
      "return on investment calculator",
      "investment return calculator",
      "cagr calculator",
      "annualized return",
    ],
    faq: [
      {
        question: "What is ROI?",
        answer: "Return on Investment measures gain or loss relative to cost: ROI = (Final Value - Initial Investment) / Initial Investment x 100. A 50% ROI means every $1 invested became $1.50.",
      },
      {
        question: "Why does annualized ROI matter?",
        answer: "A 50% return over 5 years is very different from 50% in one year. Annualized ROI (CAGR) converts total return into an average yearly rate, making different investments directly comparable.",
      },
      {
        question: "Does ROI include fees and dividends?",
        answer: "Only if you include them in the numbers. Use final value after fees and with dividends reinvested for the most accurate picture of true performance.",
      },
    ],
    schema: {
      inputs: [
        {
          id: "initialInvestment",
          name: "initialInvestment",
          type: "number",
          label: "Amount Invested",
        },
        {
          id: "finalValue",
          name: "finalValue",
          type: "number",
          label: "Final Value",
        },
        {
          id: "years",
          name: "years",
          type: "number",
          label: "Holding Period (Years)",
        },
      ],
      outputs: [
        {
          id: "roi",
          name: "roi",
          type: "number",
          label: "Total ROI (%)",
        },
        {
          id: "annualizedRoi",
          name: "annualizedRoi",
          type: "number",
          label: "Annualized ROI (%)",
        },
      ],
    },
    metadata: {},
    relatedTools: ["compound-interest-calculator", "sip-calculator", "profit-margin-calculator"],
    searchTags: ["roi", "return", "investment", "cagr", "performance"],
  },
  {
    name: "Profit Margin Calculator",
    slug: "profit-margin-calculator",
    addedAt: "2026-08-20",
    description:
      "Calculate gross profit, profit margin, and markup from cost and selling price. Understand the difference between margin and markup.",
    category: "finance",
    primaryKeyword: "profit margin calculator",
    secondaryKeywords: [
      "margin calculator",
      "markup calculator",
      "gross profit calculator",
      "pricing calculator",
    ],
    faq: [
      {
        question: "What is the difference between margin and markup?",
        answer: "Margin is profit as a percentage of the selling price; markup is profit as a percentage of the cost. Selling at $100 something that cost $40 gives a 60% margin but a 150% markup.",
      },
      {
        question: "How do I convert markup to margin?",
        answer: "Margin = Markup / (1 + Markup). A 100% markup equals a 50% margin. Confusing the two is a classic pricing mistake that silently shrinks expected profits.",
      },
      {
        question: "What is a good profit margin?",
        answer: "It varies enormously by industry - grocery stores run 1-3% net margins while software companies often exceed 20%. Compare against your own industry benchmarks, not across industries.",
      },
    ],
    schema: {
      inputs: [
        {
          id: "cost",
          name: "cost",
          type: "number",
          label: "Cost Price",
        },
        {
          id: "revenue",
          name: "revenue",
          type: "number",
          label: "Selling Price",
        },
      ],
      outputs: [
        {
          id: "margin",
          name: "margin",
          type: "number",
          label: "Profit Margin (%)",
        },
        {
          id: "markup",
          name: "markup",
          type: "number",
          label: "Markup (%)",
        },
      ],
    },
    metadata: {},
    relatedTools: ["discount-calculator", "roi-calculator", "break-even-calculator"],
    searchTags: ["margin", "markup", "profit", "pricing", "business"],
  },
  {
    name: "Break-Even Calculator",
    slug: "break-even-calculator",
    addedAt: "2026-08-20",
    description:
      "Find your break-even point in units and revenue. Calculate how many sales you need before your business becomes profitable.",
    category: "finance",
    primaryKeyword: "break even calculator",
    secondaryKeywords: [
      "break even point formula",
      "break even analysis",
      "fixed and variable costs",
      "units to break even",
    ],
    faq: [
      {
        question: "What is the break-even point?",
        answer: "The break-even point is where total revenue exactly equals total costs - no profit, no loss. Below it you lose money; above it every additional sale earns profit equal to the contribution margin.",
      },
      {
        question: "What is contribution margin?",
        answer: "Contribution margin is the selling price minus the variable cost per unit. It is the slice of each sale available to cover fixed costs and eventually generate profit.",
      },
      {
        question: "What counts as a fixed cost?",
        answer: "Costs that stay constant regardless of sales volume: rent, salaries, insurance, software subscriptions. Variable costs like materials, packaging, and per-unit shipping change with each unit sold.",
      },
    ],
    schema: {
      inputs: [
        {
          id: "fixedCosts",
          name: "fixedCosts",
          type: "number",
          label: "Fixed Costs",
        },
        {
          id: "pricePerUnit",
          name: "pricePerUnit",
          type: "number",
          label: "Price per Unit",
        },
        {
          id: "variableCost",
          name: "variableCost",
          type: "number",
          label: "Variable Cost per Unit",
        },
      ],
      outputs: [
        {
          id: "breakEvenUnits",
          name: "breakEvenUnits",
          type: "number",
          label: "Break-Even Units",
        },
        {
          id: "breakEvenRevenue",
          name: "breakEvenRevenue",
          type: "number",
          label: "Break-Even Revenue",
        },
      ],
    },
    metadata: {},
    relatedTools: ["profit-margin-calculator", "roi-calculator", "percentage-calculator"],
    searchTags: ["break even", "fixed costs", "variable costs", "business", "startup"],
  },
];

export function getToolsByCategory(category: string): ToolEngineConfig[] {
  return TOOLS.filter((tool) => tool.category === category);
}

export function getCategoryToolCounts(): Record<string, number> {
  return TOOLS.reduce<Record<string, number>>((counts, tool) => {
    counts[tool.category] = (counts[tool.category] ?? 0) + 1;
    return counts;
  }, {});
}

export function getAllToolSlugs(): string[] {
  return TOOLS.map((tool) => tool.slug);
}

export function getToolBySlug(slug: string): ToolEngineConfig | undefined {
  return TOOLS.find((tool) => tool.slug === slug);
}

export function getRelatedTools(
  slug: string,
  category: string,
  limit: number = 4
): ToolEngineConfig[] {
  const currentTool = TOOLS.find((tool) => tool.slug === slug);

  if (!currentTool) {
    return [];
  }

  const configuredRelatedTools = currentTool.relatedTools
    .map((relatedSlug) => TOOLS.find((tool) => tool.slug === relatedSlug))
    .filter((tool): tool is ToolEngineConfig => Boolean(tool))
    .filter((tool) => tool.slug !== slug);

  if (configuredRelatedTools.length > 0) {
    return configuredRelatedTools.slice(0, limit);
  }

  return TOOLS.filter(
    (tool) => tool.category === category && tool.slug !== slug
  ).slice(0, limit);
}
