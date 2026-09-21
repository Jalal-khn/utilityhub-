export interface ToolContent {
  about: string[];
  uses: string;
  tip: string;
  disclaimer?: string;
}

export const TOOL_CONTENT: Record<string, ToolContent> = {
  // ───────────────────────────── TEXT TOOLS ─────────────────────────────
  "word-counter": {
    about: [
      "A word counter is an essential writing companion for anyone who works with text — students, bloggers, copywriters, journalists, and professionals drafting reports or emails. It instantly counts words, characters, sentences, and paragraphs while also estimating reading time, so you always know how long your content will take an audience to read.",
      "The tool analyzes your text in real time as you type or paste, giving you live feedback on length and structure. Reading time is estimated using the average adult reading speed, which makes it useful for planning blog posts, scripts, speeches, or submissions that must fall within a strict word limit.",
    ],
    uses:
      "Use it to check that a blog post meets your target length, that an essay respects a word limit, or to measure the density of short social posts like tweets or captions.",
    tip: "Paste the finished draft and check both word count and reading time — aiming for under 7 minutes keeps most online readers engaged.",
  },
  "character-counter": {
    about: [
      "The character counter provides detailed statistics about your text, including total characters, characters excluding spaces, letters, numbers, spaces, and lines. It is the go-to tool for anyone who writes within strict character limits.",
      "Character limits are everywhere: Twitter and X posts, SMS messages, Meta ad descriptions, SEO meta descriptions, and product titles. This counter gives you the exact numbers you need, live, so you can trim text before you hit a platform's rejection point.",
    ],
    uses:
      "Use it to optimize a meta description to 160 characters, to fit an ad headline, or to verify an SMS fits within a single message so it doesn't split into multiple charges.",
    tip: "The 'characters without spaces' figure is the one most platforms use to measure text, so watch that number rather than the raw total.",
  },
  "case-converter": {
    about: [
      "The case converter instantly transforms any text between lower case, UPPER CASE, Title Case, and sentence case. It saves you from retyping paragraphs when the formatting requirement changes at the last moment.",
      "Different contexts demand different cases: titles and headings usually use Title Case, body copy uses sentence case, and UPPERCASE is used for emphasis or headers. This tool applies the correct transformation in a single click across any amount of text.",
    ],
    uses:
      "Use it to reformat a headline for Title Case, to normalize sloppy typed text to sentence case, or to prepare display text that must appear fully uppercase.",
    tip: "If your text contains acronyms or names like iPhone, review the result after conversion — automated casing can affect proper nouns.",
  },
  "lorem-ipsum-generator": {
    about: [
      "The Lorem Ipsum generator produces placeholder text based on the classic scrambled Latin passage used in publishing and web design. It lets you create any number of paragraphs, sentences, or words to fill a layout while a real copywriter drafts the final content.",
      "Placeholder text is standard practice in design and prototyping. Seeing realistic text lengths helps you evaluate spacing, line height, and typography before the actual copy exists, avoiding the distortion that nonsense like 'lorem ipsum' avoids by being rhythmically close to natural language.",
    ],
    uses:
      "Use it while designing a website template, testing a typesetting system, or mocking up a document layout that needs realistic block lengths.",
    tip: "Tune the paragraph count to match your real content roughly — two to three paragraphs per page section reproduces typical article flow.",
  },
  "remove-extra-spaces": {
    about: [
      "Remove Extra Spaces cleans up irregular whitespace in any text block. It collapses multiple consecutive spaces into one, trims leading and trailing spaces, and removes stray tabs, giving you consistently formatted text.",
      "Messy text often arrives from copy-pasting between documents, emails, or web pages that use different spacing. This tool normalizes that text in one pass, which is especially useful before converting text to HTML, inserting it into a database, or comparing two strings.",
    ],
    uses:
      "Use it on pasted email content, cleaned CSV fields, content copied out of PDFs, or any text where inconsistent spacing will cause parsing or layout problems.",
    tip: "Run cleanup before pasting text into code or structured formats — stray whitespace is a frequent source of subtle bugs.",
  },
  "duplicate-line-remover": {
    about: [
      "Duplicate Line Remover scans a block of text and removes repeated lines, leaving only unique entries. It is a data-cleaning staple for lists, email address blocks, URLs, or any column of text that has accumulated repetitions.",
      "Duplicates appear constantly in real work: mailing lists that get merged, exported keywords that overlap, or bullet lists compiled from multiple sources. This tool de-duplicates the whole block instantly and preserves your original order or sorts the result for easier reading.",
    ],
    uses:
      "Use it to clean an email list before sending, to de-duplicate keyword lists for an ad campaign, or to merge several copied lists into one clean set.",
    tip: "If order matters, keep the 'preserve first occurrence' behavior — sorting can rearrange entries you wanted in sequence.",
  },
  "text-reverser": {
    about: [
      "Text Reverser reverses text characters, words, or lines depending on the mode you choose. It's a fun utility with genuinely practical uses in coding puzzles, cryptography basics, and formatting experiments.",
      "Reversing a string is one of the classic exercises in programming education, and quick reverse tools are handy while prototyping logic or checking symmetric patterns in text. Choose to flip the entire string, reverse each line, or reverse just the order of words.",
    ],
    uses:
      "Use it to create coded messages, to check if a phrase reads the same backwards (palindromes), or to practice string manipulation logic before writing code.",
    tip: "Reversing word order rather than characters is useful for reordering lists or names that need to be flipped from 'First Last' to 'Last First'.",
  },

  // ───────────────────────────── MATH TOOLS ─────────────────────────────
  "age-calculator": {
    about: [
      "The age calculator computes your exact age in years, months, and days from any birth date to today, or to any future date you choose. It handles leap years and month-length differences automatically.",
      "Exact age matters for legal documents, insurance applications, retirement planning, school enrollment, or simply knowing your precise age in days. This tool also shows the day of the week you were born and how many days remain until your next birthday.",
    ],
    uses:
      "Use it for official form filling, planning birthday milestones, calculating eligibility ages, or verifying age for eligibility checks where exact day counts matter.",
    tip: "Choose a custom end date to calculate age at a specific event — like an exam date or a future retirement age rather than just today.",
  },
  "bmi-calculator": {
    about: [
      "The BMI (Body Mass Index) calculator estimates body fat based on height and weight using the standard formula: weight in kilograms divided by height in meters squared. It categorizes the result as underweight, normal, overweight, or obese.",
      "BMI is a screening tool used by health professionals to flag potential weight-related health risks. While it does not measure body fat directly, it is a quick, widely recognized starting point used by doctors, insurers, and fitness trackers before more detailed assessments.",
    ],
    uses:
      "Use it to track weight changes over time, to prepare for a health consultation, or to get a reference number before choosing a fitness or nutrition program.",
    tip: "BMI is less meaningful for athletes, children, or older adults — use it as a trend indicator for the same person rather than an absolute verdict.",
    disclaimer:
      "This tool is for general informational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment. BMI does not measure body fat directly and may be inaccurate for athletes, children, pregnant women, and older adults. Always consult a qualified healthcare provider about your weight and overall health.",
  },
  "percentage-calculator": {
    about: [
      "The percentage calculator handles three core operations: finding what percent one value is of another, finding a percentage of a number, and calculating percentage increase or decrease between two values.",
      "Percentages appear in almost every financial decision: discounts, tax, tips, interest, markups, and changes in prices or scores. This tool gives you the exact answer for whichever percentage relationship you need, with no mental arithmetic.",
    ],
    uses:
      "Use it to work out sale savings, grade conversions, tax additions, profit margins, or to compare how much a value has grown or fallen as a percentage.",
    tip: "For a '% increase or decrease' calculation, always put the original value as the base — swapping them gives a completely different result.",
  },
  "loan-calculator": {
    about: [
      "The loan calculator determines your monthly payment, total interest, and total cost for any installment loan based on the loan amount, annual interest rate, and repayment term.",
      "Loan mathematics are easy to get wrong and costly to miscalculate. Understanding your monthly obligation before signing lets you compare lenders, test the impact of a longer term, and see exactly how much interest you will pay over the life of the loan.",
    ],
    uses:
      "Use it to compare car loans, personal loans, and student loans, or to check whether shortening the term meaningfully reduces total interest.",
    tip: "Run the same scenario at a slightly higher rate than advertised — promotional rates often don't reflect your actual credit score.",
  },
  "discount-calculator": {
    about: [
      "The discount calculator works out the sale price after any percentage discount, showing both the amount saved and the final price you pay.",
      "Retail discounts, seasonal sales, and coupon codes all exploit the same confusion: is the discount on the original price or the final? This tool removes the ambiguity, computing the exact numbers so you can judge whether a deal is genuinely good.",
    ],
    uses:
      "Use it during shopping to compare 'X% off' offers, to check a coupon actually applied correctly, or to compute the true discount rate of a bundle deal.",
    tip: "When a store offers 'extra 10% off sale price,' enter the sale price first, then apply the extra 10% as a second calculation.",
  },
  "gst-calculator": {
    about: [
      "The GST calculator adds or deducts Goods and Services Tax to and from amounts, in exclusive, inclusive, or net modes, for whichever single tax rate applies.",
      "Taxes like GST are either included in a displayed price (inclusive) or added on top (exclusive), and businesses must report both figures. This tool converts between them precisely, with a breakdown of the tax component — essential for invoices, quotes, and returns.",
    ],
    uses:
      "Use it to prepare an invoice where GST is added on top, to separate the tax portion from a GST-inclusive paid amount, or to price products when your tax rate changes.",
    tip: "To work backwards from a GST-inclusive total, use inclusive mode — dividing by (1 + rate) gives the pre-tax amount.",
  },
  "date-difference-calculator": {
    about: [
      "The date difference calculator returns the exact span between two dates in days, weeks, or a full years-months-days breakdown.",
      "Whether you are tracking a project deadline, counting time until an event, computing tenure length, or calculating interest periods, an accurate date count avoids the manual error of counting calendars by hand — especially across months and leap years.",
    ],
    uses:
      "Use it for project timelines, contract duration, tenancy periods, warranty lengths, or computing how many days remain before a due date.",
    tip: "Specify whether to include both start and end days — legal and financial calculations often differ by one day depending on convention.",
  },

  // ───────────────────────────── CONVERTERS ─────────────────────────────
  "unit-converter": {
    about: [
      "The unit converter translates measurements across length, weight, temperature, area, volume, and more in a single interface.",
      "Converting units manually invites errors, and different countries use different systems — metric, imperial, and hybrid. This tool gives instant, precise conversions for everyday needs: cooking, travel, shipping, construction, and academic work, without needing to memorize conversion factors.",
    ],
    uses:
      "Use it when traveling between metric and imperial countries, converting recipe measurements, computing shipping weights, or double-checking engineering dimensions.",
    tip: "For conversions used repeatedly, note the result and check the tool's rounding — critical figures may need more decimal places.",
  },
  "length-converter": {
    about: [
      "The length converter converts between meters, kilometers, centimeters, millimeters, inches, feet, yards, and miles, with precise decimal accuracy.",
      "Length conversions come up constantly in construction, sewing, shipping, fitness (walking/rowing distances), and schoolwork. This tool converts in both directions instantly, removing the need to remember that an inch is 2.54 cm or a mile is 1.609 km.",
    ],
    uses:
      "Use it for home renovation measurements, parcel dimensions for shipping, fabric lengths for sewing, or converting running distances between miles and kilometers.",
    tip: "For shipping measure everything in centimeters or meters first — couriers charge by volume (dimensions) as well as weight.",
  },
  "temperature-converter": {
    about: [
      "The temperature converter switches instantly between Celsius, Fahrenheit, and Kelvin using the standard conversion formulas.",
      "Temperature conversions are needed when reading weather forecasts in another country, following recipes from different regions, or working in science and medicine where Kelvin and Celsius are standard. This tool handles all three scales precisely.",
    ],
    uses:
      "Use it to convert a weather forecast, oven temperatures for international recipes, or scientific measurements between Celsius and Kelvin.",
    tip: "A useful anchor: 0°C = 32°F and 100°C = 212°F — good for sanity-checking any conversion near these points.",
  },
  "weight-converter": {
    about: [
      "The weight converter converts between kilograms, grams, milligrams, pounds, ounces, and tons, covering everyday and scientific weight units.",
      "Weight conversions matter for cooking, fitness, nutrition labels, shipping costs, and international trade, where metric and imperial coexist. This tool removes guesswork, letting you convert recipe portions, luggage limits, or parcel weights precisely.",
    ],
    uses:
      "Use it for gym and diet tracking, converting baking recipes, checking airline baggage limits, or computing shipping weights for e-commerce.",
    tip: "Remember 1 kg ≈ 2.2 lbs as a mental shortcut, then use the tool for the exact figure where it counts (like parcel charges).",
  },
  "area-converter": {
    about: [
      "The area converter converts between square meters, square feet, acres, hectares, square kilometers, and square yards.",
      "Land and floor area are measured in very different units across the world — acres and square feet in the US and UK, hectares in Europe, and square meters nearly everywhere. This tool converts property sizes, land lots, and construction areas precisely.",
    ],
    uses:
      "Use it when comparing property listings across countries, calculating land area for purchase, floor space for flooring estimates, or garden sizes for planning.",
    tip: "An acre is roughly 4,047 square meters — useful reference, but use the tool for exact lot sizes before any purchase decision.",
  },
  "speed-converter": {
    about: [
      "The speed converter translates between kilometers per hour, miles per hour, meters per second, and knots.",
      "Speed units vary by context: road speeds use km/h or mph by country, aviation and marine use knots, and physics uses m/s. This tool converts accurately for travel planning, vehicle evaluations, or sports speed measurements.",
    ],
    uses:
      "Use it to interpret speed limits abroad, compare vehicle top speeds quoted in different units, or convert wind and current speeds for outdoor sports.",
    tip: "Knots are not the same as mph — a knot is one nautical mile per hour, roughly 15% faster than a standard mile per hour.",
  },

  // ───────────────────────────── DEVELOPER TOOLS ─────────────────────────────
  "json-formatter": {
    about: [
      "The JSON formatter parses raw JSON and re-prints it with clean indentation, sorting and validation options, so the structure is instantly readable.",
      "JSON is the universal data format for APIs and configuration files, but raw minified JSON is unreadable. This tool validates the syntax, highlights errors, and reformats nested objects into a clear tree — saving developers time when debugging API responses or hand-editing config files.",
    ],
    uses:
      "Use it to format an API response for inspection, to find a missing comma or bracket in a file, or to minify a pretty-printed JSON for storage.",
    tip: "If it won't parse, check for trailing commas — they're allowed by browsers but rejected by strict JSON parsers.",
  },
  "base64-encoder": {
    about: [
      "The Base64 encoder converts text into its Base64 representation, the standard way to encode data so it survives transport through systems that only handle ASCII text.",
      "Base64 encoding turns binary or non-ASCII data into a text-safe string used in data URLs, API payloads, email attachments, and authentication tokens. This encoder produces a correct, standard result with optional UTF-8 handling.",
    ],
    uses:
      "Use it to embed small images in HTML via data URIs, to encode credentials or tokens for APIs, or to package binary data into JSON.",
    tip: "Base64 is encoding, not encryption — anyone can decode it. Never use it to 'protect' passwords or secrets.",
  },
  "base64-decoder": {
    about: [
      "The Base64 decoder converts Base64 strings back into their original text, supporting UTF-8 data and flagging invalid input with a clear error.",
      "Decoding is the reverse of encoding: when an API returns a Base64 payload, an email carries a base64 body, or a data URI holds an image, this tool restores the original content so you can actually read it.",
    ],
    uses:
      "Use it to read Base64 API payloads during debugging, to un-embed images from data URIs, or to inspect the real content of encoded configuration strings.",
    tip: "If decoded text appears garbled, the original data was probably binary (an image or file), not plain text — and it says so in the error.",
  },
  "uuid-generator": {
    about: [
      "The UUID generator creates random Version 4 UUIDs — 128-bit identifiers standard for database keys, object IDs, and distributed systems — in bulk.",
      "Universally Unique Identifiers are the cleanest way to generate collision-free IDs without a central registry. This tool produces genuine random UUIDs in the count you need, ready to paste into code, database seeds, or test fixtures.",
    ],
    uses:
      "Use it to generate primary keys for a database, unique tokens for temporary records, or many test identities for load simulations.",
    tip: "Version 4 UUIDs use true randomness — collisions are statistically near-impossible, which is exactly why they work for production keys.",
  },
  "url-encoder": {
    about: [
      "The URL encoder percent-encodes special characters in a string so it can be safely included in a URL or query string.",
      "Characters like spaces, &, =, ?, and non-ASCII letters break URLs unless they are encoded. This tool converts text into its percent-encoded form, which is required when building query strings, API calls, or links with dynamic parameters.",
    ],
    uses:
      "Use it to safely append a search term to a URL, to build complex query strings for APIs, or to encode text that contains reserved characters.",
    tip: "Encode only the value portion of a parameter, not the whole URL — encoding the existing ? and = will corrupt the query structure.",
  },
  "url-decoder": {
    about: [
      "The URL decoder converts percent-encoded strings back to readable text, restoring spaces, ampersands, and special characters.",
      "When you inspect a browser URL, server log, or API response, values often appear encoded as %20 and %26. Decoding reveals the true content so you can read, debug, or further process it.",
    ],
    uses:
      "Use it to read what a URL parameter actually means, to restore a search string from a tracking link, or to reverse encoded input before processing.",
    tip: "Decode each value separately — if you decode a whole URL at once and it contains %2F for slashes, path structure may appear where you expect a single value.",
  },
  "jwt-decoder": {
    about: [
      "The JWT decoder inspects a JSON Web Token and shows its header and payload contents in a readable, formatted view.",
      "JWTs are the standard for authentication tokens and signed API payloads. During development you often need to see what claims are inside a token you received or generated. This tool splits the token into header and payload and decodes the Base64 sections for inspection.",
    ],
    uses:
      "Use it to verify what claims your login token carries, to debug why an API rejected a token, or to inspect the expiry and issuer fields while building auth.",
    tip: "Decoding only reveals the header and payload — the signature verifies authenticity and will not be readable as plain data; that's expected.",
  },

  // ───────────────────────────── SEO TOOLS ─────────────────────────────
  "meta-tag-generator": {
    about: [
      "The meta tag generator creates ready-to-paste HTML meta tags — title, description, keywords, and more — based on the details you enter.",
      "Meta tags tell Google and social platforms what a page is about, and getting them right improves click-through rates and how your links are displayed. This generator writes valid, correctly formatted tags you can paste straight into your page head.",
    ],
    uses:
      "Use it to draft the title and description block for a new article, product page, or landing page before handing it to your developer or CMS.",
    tip: "Keep titles under 60 characters and descriptions around 150–160 so they display fully in search results.",
  },
  "robots-txt-generator": {
    about: [
      "The robots.txt generator builds a valid robots.txt file that tells search engine crawlers which parts of your site they may or may not crawl.",
      "A robots.txt file controls crawl budget, blocks sensitive directories, and points crawlers to your sitemap. This generator produces the standard directives — User-agent, Disallow, Allow, and Sitemap — in the correct order and syntax.",
    ],
    uses:
      "Use it to block an admin area from indexing, to allow specific paths while blocking others, or to generate a baseline robots.txt for a new site.",
    tip: "robots.txt blocks crawling, not indexing — if a page is already indexed and you block it, it may stay in results until de-indexed another way.",
  },
  "sitemap-generator": {
    about: [
      "The sitemap generator produces an XML sitemap listing your URLs so search engines can discover and crawl every important page on your site.",
      "A sitemap speeds up indexing for new sites, deep pages, and dynamic content that crawl links can miss. This tool formats valid XML with the required namespaces and lets you add your page list quickly.",
    ],
    uses:
      "Use it to build a sitemap for a new domain, to add new URLs to an existing search console property, or to prepare a file for a client's CMS.",
    tip: "Keep sitemaps under 50,000 URLs and 50MB, and submit the URL directly in Google Search Console after publishing.",
  },
  "open-graph-generator": {
    about: [
      "The Open Graph generator creates the og: meta tags that control how your page appears when shared on Facebook, WhatsApp, LinkedIn, and other social platforms.",
      "Open Graph tags determine the title, description, and image shown in a link preview. Without them, platforms guess from page content — often badly. This generator writes valid og: tags you can insert into your page head.",
    ],
    uses:
      "Use it to prepare share preview tags for an article, product page, or landing page so links look polished wherever they're posted.",
    tip: "Use an image at least 1200x630 pixels — smaller images get cropped or rejected in social previews.",
  },
  "twitter-card-generator": {
    about: [
      "The Twitter card generator creates twitter:site, twitter:title, twitter:description, and twitter:image tags that control link previews on X (Twitter).",
      "Twitter cards make your links expand into rich previews with images and text instead of a bare URL. This tool generates the correct tags, including the summary_large_image card type for prominent image previews.",
    ],
    uses:
      "Use it to prepare preview metadata for shared URLs, ensuring a branded image and description appear whenever your content is posted on X.",
    tip: "Add the image URL as an absolute https address — Twitter card previews won't load relative or http image paths.",
  },

  // ───────────────────────────── IMAGE TOOLS ─────────────────────────────
  "image-compressor": {
    about: [
      "The image compressor reduces the file size of PNG and JPG images with adjustable compression, so they load faster without visibly ruining quality.",
      "Large images are the most common cause of slow websites, which hurt both user experience and search rankings. This tool re-encodes an image to a smaller file size in your browser, letting you balance quality against size precisely.",
    ],
    uses:
      "Use it to slim down images before uploading to your site, email, or platform that limits file sizes, or to speed up page loading times.",
    tip: "For web use, aim to keep JPEGs under 200KB and PNGs under 100KB — quality loss at those sizes is rarely noticeable.",
  },
  "image-resizer": {
    about: [
      "The image resizer scales images to exact width and height dimensions while preserving aspect ratio and format.",
      "Platforms and layouts demand specific image sizes — avatars at 400x400, banners at 1200x500, thumbnails at 150x150. This tool resizes precisely in the browser, producing a downloadable result at the dimensions you specify.",
    ],
    uses:
      "Use it to create social media banner sizes, profile image crops, product thumbnails, or to downscale a large photo before upload.",
    tip: "When only one dimension is fixed, keep the aspect ratio locked to avoid squashing or stretching the image.",
  },
  "png-to-jpg": {
    about: [
      "PNG to JPG converts PNG images into JPEG format, usually producing much smaller files suitable for photos and web use.",
      "PNG preserves transparency and is great for graphics, but full-color photos in PNG are large. JPEG compresses photos far more efficiently. This tool converts the format in-browser while preserving image quality as closely as possible.",
    ],
    uses:
      "Use it to shrink photo-heavy PNGs before web publishing, to make files compatible with systems that reject PNG, or to reduce upload sizes.",
    tip: "If your image has transparent areas, JPG will fill them with white — for logos or cutouts, keep PNG.",
  },
  "jpg-to-png": {
    about: [
      "JPG to PNG converts JPEG images into PNG format, preserving detail for editing, and adding support for transparency where the source allows.",
      "PNG is lossless, making it the format of choice when you'll edit or re-save an image repeatedly, or when you need a transparent background. This tool converts JPG to PNG losslessly in the browser.",
    ],
    uses:
      "Use it to convert a JPG into a PNG for lossless editing, or to prepare images for applications that require PNG input.",
    tip: "PNG files are larger than JPG — convert back to JPG for final web delivery of photos to keep pages fast.",
  },
  "heic-to-jpg": {
    about: [
      "HEIC to JPG converts Apple's HEIC photo format into standard JPG, making iPhone and macOS photos viewable and usable anywhere.",
      "HEIC is efficient but poorly supported by older systems and many web platforms. This tool converts HEIC files to universal JPG in the browser using a client-side decoder, so photos from a modern iPhone open and upload everywhere.",
    ],
    uses:
      "Use it when a website, form, or software rejects HEIC files, or to convert a batch of iPhone photos into the JPG format.",
    tip: "Convert before uploading to any system older than a few years — many still can't read HEIC and silently fail.",
  },
  "rotate-image": {
    about: [
      "Rotate Image turns an image by any angle — 90, 180, or custom degrees — to fix orientation and straighten media.",
      "Photos shot sideways on phones, scanned documents, and graphics imported from other tools often need a rotation. This tool applies the rotation and produces a corrected downloadable file without any quality loss for 90/180 degree turns.",
    ],
    uses:
      "Use it to fix portrait photos that display sideways, straighten scanned pages, or rotate a design asset before upload.",
    tip: "For small angle corrections (a slightly slanted photo), rotate in increments near the target angle and export the final result to avoid double-compression.",
  },
  "webp-converter": {
    about: [
      "The WEBP converter turns images into WebP — Google's modern format that delivers sharply smaller files than JPG or PNG at equal quality.",
      "WebP is supported by all modern browsers and is the recommended format for web images. This tool converts JPG, PNG, and other formats into WebP in the browser, shrinking page weight and speeding up load times.",
    ],
    uses:
      "Use it to prepare images for your website to reduce page weight, or to convert design exports into the format your CMS prefers.",
    tip: "WebP is ideal for the web but unnecessary for print or email attachments — convert to JPG for those.",
  },
  "image-to-webp": {
    about: [
      "Image to WEBP converts uploaded images from common formats into WebP with quality control, optimizing them for web delivery.",
      "Adopting WebP across a website can cut image bandwidth dramatically. This converter produces a WebP at a chosen quality level, letting you balance file size against fidelity for every image you plan to publish.",
    ],
    uses:
      "Use it when building a fast website, converting theme images, or preparing visual assets optimized for a content management system.",
    tip: "A quality setting around 80 percent visually matches JPG at a fraction of the file size for most photos.",
  },
  "crop-image": {
    about: [
      "Crop Image trims your image to exact dimensions or a free-form selection, removing unwanted edges and reframing the content.",
      "Every platform wants different framing: square profile images, wide banners, tall story graphics. This tool crops precisely in the browser so you control exactly which part of the photo remains.",
    ],
    uses:
      "Use it to remove unwanted background edges, create a square avatar from a landscape photo, or frame a product shot for a banner.",
    tip: "Crop as close to final dimensions as possible — resizing after cropping preserves the sharpest result.",
  },
  "flip-image": {
    about: [
      "Flip Image mirrors your image horizontally or vertically, reversing it along the chosen axis.",
      "Flipping is used for design corrections (a logo facing the wrong way), to fix scanned or photographed text mirrored in error, or simply to create a desired composition. The tool flips instantly and exports the result.",
    ],
    uses:
      "Use it to mirror a selfie, correct a mirrored scan, flip a design element to face the other direction, or reframe a horizontal composition.",
    tip: "Flip is a mirror, not a rotation — an image flipped horizontally looks like it's seen in a mirror, not turned.",
  },
  "image-to-base64": {
    about: [
      "Image to Base64 converts any image into its Base64 data URI, producing a text string you can embed directly in HTML, CSS, or JSON.",
      "Data URIs let you include small images inside a single file — handy for emails, prototypes, or reducing HTTP requests for tiny assets. This tool encodes your image and gives you the ready-to-paste string.",
    ],
    uses:
      "Use it to embed a small logo in a single HTML file, to inline icons in CSS, or to pass image data through a JSON payload.",
    tip: "Only use data URIs for very small assets — the Base64 form is ~33% larger, so big images slow down the page that embeds them.",
  },
  "base64-to-image": {
    about: [
      "Base64 to Image decodes a Base64 data URI back into a downloadable image file, restoring embedded images to an actual file.",
      "Data URIs ship images inside HTML, JSON, or databases. When you need the original file — for resaving, editing, or uploading — this tool decodes the string and rebuilds the image.",
    ],
    uses:
      "Use it to recover an image embedded in an email or JSON export, or to pull the original asset out of a source file.",
    tip: "Paste the full data URI (starting with 'data:image/…') — the tool needs that prefix to know the image type.",
  },

  // ───────────────────────────── PDF TOOLS ─────────────────────────────
  "merge-pdf": {
    about: [
      "Merge PDF combines multiple PDF files into a single document, arranging them in the order you choose.",
      "Combining separate PDFs into one file is a daily task for anyone handling contracts, invoices, or scanned pages. This tool merges files entirely in your browser — nothing is uploaded, so confidential documents never leave your device.",
    ],
    uses:
      "Use it to combine several invoices into one statement, join scanned pages into a single file, or merge a cover page with a report.",
    tip: "Drag files into the order you want before merging — reordering after the merge requires starting over.",
  },
  "split-pdf": {
    about: [
      "Split PDF separates a PDF into individual single-page files, or splits at pages you specify, exporting each piece as its own document.",
      "Extracting a specific page or dividing a long document into standalone files is common when sending just one page of a larger PDF. This tool performs the split in-browser with no upload.",
    ],
    uses:
      "Use it to extract a single page to email, to split a chapter from a book PDF, or to separate a multi-part form into its sections.",
    tip: "To pull out just one range of pages, use the page range option instead of splitting every page individually.",
  },
  "compress-pdf": {
    about: [
      "Compress PDF reduces PDF file size by re-encoding embedded images, making the file easier to email, upload, or store.",
      "PDFs with photos and scans balloon in size, blocking email limits and slowing uploads. This tool shrinks the file in your browser with adjustable compression, keeping the document readable.",
    ],
    uses:
      "Use it to make a large PDF fit an email attachment limit, to speed up uploading to a portal, or to archive documents more cheaply.",
    tip: "Compress the original, not a copy you've already compressed — repeated compression degrades quality without much further size gain.",
  },
  "image-to-pdf": {
    about: [
      "Image to PDF converts JPG, PNG, and other images into a single PDF document, with page sizing options.",
      "Turning images into a PDF is how you package photos for delivery, submit image-based documentation, or create a paginated album. This tool combines your selected images into one clean PDF right in the browser.",
    ],
    uses:
      "Use it to turn scanned photos into a single document, to package JPGs for a submission form that requires PDF, or to make an image-based handout.",
    tip: "Add images in the order they should appear on the pages, and choose a page size that matches the images to avoid white borders.",
  },
  "pdf-to-image": {
    about: [
      "PDF to Image converts PDF pages into PNG images so you can reuse, edit, or share the visual content of a document.",
      "Sometimes you need a PDF page as an image: for slides, social posts, or reinserting content into other tools. This tool rasterizes each PDF page to a PNG in the browser, with output size options.",
    ],
    uses:
      "Use it to convert a report page into a graphic, to repurpose a diagram from a PDF for a slideshow, or to preview pages individually.",
    tip: "For crisp text, choose the higher resolution export — low DPI makes text appear blurry when zoomed.",
  },
  "pdf-to-jpg": {
    about: [
      "PDF to JPG converts PDF pages into compressed JPG images, sacrificing some detail for much smaller files than PNG.",
      "JPEG exports of PDF pages are ideal when the target is a photo-like graphic or a smaller file for email and web use. This tool exports each page as JPG in the browser.",
    ],
    uses:
      "Use it for social media previews of PDF content, small image copies for email, or quick page thumbnails.",
    tip: "If your PDF is text-heavy, JPG compression slightly blurs letter edges — use PNG export for maximum sharpness on text pages.",
  },
  "jpg-to-pdf": {
    about: [
      "JPG to PDF combines one or more JPG images into a PDF document, the standard way to package photographs for submission or delivery.",
      "Many submission systems — visa forms, insurance claims, portfolio uploads — require PDF rather than loose images. This tool assembles your JPGs into a properly paginated PDF in the browser.",
    ],
    uses:
      "Use it to submit required photo documentation, to compile screenshots into a single document, or to convert scanned JPG pages into one PDF.",
    tip: "Keep images at a good resolution when combining — a PDF made from tiny JPGs cannot be sharpened later.",
  },
  "rotate-pdf": {
    about: [
      "Rotate PDF turns pages of a PDF 90, 180, or 270 degrees to fix documents scanned or saved in the wrong orientation.",
      "PDFs from scanners and phone apps frequently arrive sideways. This tool rotates each page the way you need, all in the browser with no upload, and exports a correctly oriented document.",
    ],
    uses:
      "Use it to fix a whole document scanned at the wrong angle, or to rotate just specific pages that are upside down.",
    tip: "Check the preview after rotation — rotating each page independently is easiest when only some pages are misoriented.",
  },
  "unlock-pdf": {
    about: [
      "Unlock PDF removes a viewing or restrictions password from a PDF, leaving the content readable without the password.",
      "Some PDFs carry restrictive permissions that block printing, copying, or editing even when you have legitimate access to the content. This tool removes those restrictions in-browser. Use it only on files you own or have rights to use.",
    ],
    uses:
      "Use it to print or copy text from a PDF you legitimately own, or to remove restrictions from your own documents before reuse.",
    tip: "This only works when a password is not required to open the file at all — fully encrypted PDFs still need the correct password.",
  },

  // ───────────────────────────── COLOR TOOLS ─────────────────────────────
  "color-picker": {
    about: [
      "The color picker lets you choose any color visually and gives you its exact HEX, RGB, and HSL values for instant use in design.",
      "Designers and developers constantly need to match colors precisely — from a brand palette, a screenshot, or an imagined scheme. This picker outputs color in every format you'd paste into CSS, design software, or documents.",
    ],
    uses:
      "Use it to extract an exact color for CSS, to compare shades before committing to a palette, or to translate between HEX and RGB formats.",
    tip: "Copy the format your target tool expects — CSS accepts HEX, but some design apps work better with RGB triples.",
  },
  "hex-to-rgb": {
    about: [
      "The HEX to RGB converter translates a six-digit (or three-digit) hex color code into its red, green, blue numeric values.",
      "Hex codes are compact but many tools — design apps, image editors, coding libraries — expect RGB triples or rgba() values. This tool converts instantly, including the rgba() form if you need transparency.",
    ],
    uses:
      "Use it to convert a color from a screenshot into an RGB value for a design tool, or to build an rgba() value with an alpha channel.",
    tip: "The last two digits of an 8-digit hex code encode alpha (opacity), not a color channel.",
  },
  "rgb-to-hex": {
    about: [
      "The RGB to HEX converter turns red, green, blue (0–255) values into the hex code used in CSS and HTML.",
      "Design software often reports colors as RGB triples, while web code needs hex format. This tool converts with instant precision so the color you see in one app matches exactly in the browser.",
    ],
    uses:
      "Use it when moving a color from a design program into CSS, or when a client supplies RGB values for a brand color.",
    tip: "Every RGB triple maps to exactly one hex code — if two tools disagree, one has rounded the values.",
  },
  "gradient-generator": {
    about: [
      "The gradient generator builds smooth color gradients and outputs the CSS code for linear and radial gradients.",
      "Gradients are a staple of modern UI design, but writing CSS gradient syntax by hand is error-prone. This generator gives you a live preview and the exact CSS you can paste into a stylesheet.",
    ],
    uses:
      "Use it to create a button background, an overlay tint, or a page section transition with a professional-looking gradient.",
    tip: "Gradients with neighboring hues (like blue to violet) look natural; far-apart hues can look jarring unless intended.",
  },
  "color-palette-generator": {
    about: [
      "The color palette generator produces a harmonious set of colors from a base hue, using standard color theory schemes like analogous, complementary, and triadic.",
      "A well-designed palette is the foundation of any brand or interface. This tool derives coherent color sets so you don't have to invent contrasting shades by eye, and outputs hex values for each.",
    ],
    uses:
      "Use it to create a starter brand palette, to find a complement for an existing color, or to build a harmonious UI theme.",
    tip: "Generate a complementary set first, then use the muted variant for backgrounds and the pure hue sparingly.",
  },
  "contrast-checker": {
    about: [
      "The contrast checker validates text and background color contrast against WCAG accessibility guidelines, reporting pass or fail at each level.",
      "Readable contrast is a legal and quality requirement for accessible websites. This tool compares two colors and tells you whether they meet WCAG AA or AAA for normal and large text, so your design doesn't exclude low-vision users.",
    ],
    uses:
      "Use it to verify a button label against its background, to audit site text colors for accessibility compliance, or to pick text shades that pass for body copy.",
    tip: "For body text, aim for AA (4.5:1 ratio) as a minimum; AAA (7:1) is best for small text in critical content.",
  },

  // ───────────────────────────── GENERATOR TOOLS ─────────────────────────────
  "password-generator": {
    about: [
      "The password generator creates strong, random passwords of any length, with options for uppercase, lowercase, numbers, and symbols, plus an easy-to-say passphrase mode.",
      "Weak and reused passwords are the leading cause of account compromise. A true random generator produces credentials that are impractical to brute-force, and the passphrase option creates strong yet typeable passwords for day-to-day accounts.",
    ],
    uses:
      "Use it to mint a unique password for a new account, to upgrade a reused password to a strong random one, or to generate recovery words.",
    tip: "A 16-character password with all character types takes centuries to brute-force — prioritize length over trickiness.",
  },
  "qr-code-generator": {
    about: [
      "The QR code generator creates scannable QR codes from any text, URL, or contact information, downloadable as an image.",
      "QR codes bridge physical and digital worlds: menus, business cards, product packaging, and event materials all link to web content through a scan. This generator produces a clean, high-resolution QR at any size you choose.",
    ],
    uses:
      "Use it to link a print flyer to your site, to put a scannable contact card on a business card, or to direct diners to a menu.",
    tip: "Print a test scan before bulk production — tiny QR codes on low-contrast backgrounds fail to scan.",
  },
  "whatsapp-qr-generator": {
    about: [
      "The WhatsApp QR generator creates a QR code that opens a WhatsApp chat with a specific number, prefilled with an optional message.",
      "WhatsApp click-to-chat QR codes are a popular way to start conversations from print and digital materials without hand-typing a number. This generator builds that link and its QR image in seconds.",
    ],
    uses:
      "Use it on flyers, product packaging, or a store window so customers can message you directly by scanning.",
    tip: "Include the country code in the number and prefill a friendly first message to raise response rates.",
  },
  "wifi-qr-generator": {
    about: [
      "The WiFi QR generator produces a QR code that connects a device to your Wi-Fi network when scanned — no need to type or share the password.",
      "Printing a Wi-Fi QR and posting it near a router or at reception lets visitors join the network in seconds. This generator encodes the network name, password, and encryption type into a scannable code.",
    ],
    uses:
      "Use it at a café, guesthouse, office, or home to let guests join Wi-Fi without asking for the password.",
    tip: "Use WPA/WPA2 as the encryption type — open networks embed no key but warn scanners your network has no password.",
  },
  "email-qr-generator": {
    about: [
      "The email QR generator creates a code that opens the visitor's email app with a pre-addressed, pre-filled email ready to send.",
      "A mail-to QR removes friction from collecting messages or feedback: one scan opens a draft addressed to you. This generator encodes recipient, subject, and body into a scannable QR.",
    ],
    uses:
      "Use it on business cards, signage, or receipts so people can email you with a single scan.",
    tip: "Keep the subject concise and the body minimal — long payloads produce denser codes that scan less reliably.",
  },
  "sms-qr-generator": {
    about: [
      "The SMS QR generator creates a code that opens the visitor's messaging app with your number and an optional message prefilled.",
      "For service businesses, an SMS QR turns printed advertising into an immediate conversation. This generator encodes the phone number and message in a scannable code.",
    ],
    uses:
      "Use it on delivery notices, meeting invites, or service ads to let customers text you instantly rather than call.",
    tip: "Include the full international number format so the code works for visitors while traveling.",
  },
  "url-qr-generator": {
    about: [
      "The URL QR generator encodes any web address as a QR code, the simplest and most reliable way to make a link scannable.",
      "URL QRs are the workhorse of print-to-digital linking — posters, packaging, presentations, and name tags all take visitors to a page by scanning. This generator produces a clean code for any URL.",
    ],
    uses:
      "Use it to print a link on a poster or flyer, to add a scannable product URL to packaging, or to link conference badges to a profile.",
    tip: "Use a short, permanent URL — long URLs make denser codes that are harder to scan at small sizes.",
  },
  "vcard-qr-generator": {
    about: [
      "The vCard QR generator encodes a contact card with name, phone, email, and website into a QR that saves to the scanner's contacts instantly.",
      "A scannable business card removes typos and saves time: one scan stores your full contact details on the person's phone. This generator builds a standard vCard 3.0 QR.",
    ],
    uses:
      "Use it on business cards, email signatures, or networking badges so contacts save your details instantly.",
    tip: "Include your website URL in the vCard fields — it saves one still needs to type but opens your site immediately.",
  },
  "random-number-generator": {
    about: [
      "The random number generator produces random values within a range you set — numbers, dice rolls, or random pairs — for any use from draws to sampling.",
      "Genuine randomness is useful for raffles, study sampling, dice games, and anywhere selection must be unbiased. This tool generates true random values instantly with the range you define.",
    ],
    uses:
      "Use it to pick a winner in a giveaway, to roll dice for a game, or to sample a random record index for testing.",
    tip: "For a single honest draw, generate one number in the full range and reset — repeated clicking biases selection patterns.",
  },

  // ───────────────────────────── SECURITY TOOLS ─────────────────────────────
  "password-strength-checker": {
    about: [
      "The password strength checker analyzes any password and scores it based on length, character variety, and common-pattern detection.",
      "Understanding what makes a password weak — short length, single character class, dictionary words — helps anyone build habits that keep accounts safe. This tool grades input in real time with suggestions for strengthening it.",
    ],
    uses:
      "Use it before choosing a new password, to demonstrate safe password habits to staff, or to audit the strength of a candidate password.",
    tip: "Length dominates strength: a 16-character passphrase beats a 12-character random mix in real-world attack math.",
  },
  "sha256-generator": {
    about: [
      "The SHA256 generator computes the SHA-256 hash of any text — a fixed-length fingerprint used to verify file and message integrity.",
      "SHA-256 is the workhorse hash behind software downloads, digital signatures, and blockchain technology. Generators let you confirm a checksum matches the published one, proving a file is intact and untampered.",
    ],
    uses:
      "Use it to verify a downloaded file matches its published checksum, to store a salted hash of a password, or to fingerprint text for comparison.",
    tip: "Hashing is one-way — never expect to recover the original text from a hash; that's the point.",
  },
  "md5-generator": {
    about: [
      "The MD5 hash generator produces the 32-character MD5 hash of any text — an older checksum still used for quick integrity checks.",
      "MD5 is fast and widely supported, so it persists in legacy systems and simple checksums, though it's considered insecure for cryptography. This tool is useful when you need an MD5 for compatibility with old software.",
    ],
    uses:
      "Use it to compare the MD5 checksum of a file against what a legacy system expects, or for quick hash comparisons in scripts.",
    tip: "Don't use MD5 for password storage — modern attacks crack it in seconds; use a salted hash like bcrypt or SHA-256.",
  },
  "sha1-generator": {
    about: [
      "The SHA1 generator computes the SHA-1 hash of text or input — a 40-character digest still found in legacy verification workflows.",
      "SHA-1 appears in older version-control systems, certificates, and file checksums. Though superseded for security, generators remain useful when interoperating with those systems.",
    ],
    uses:
      "Use it to reproduce a SHA-1 checksum expected by legacy tooling, or to fingerprint text in configurations that predate SHA-2.",
    tip: "Like MD5, SHA-1 is broken for security — use it only where a system requires that exact algorithm.",
  },
  "sha512-generator": {
    about: [
      "The SHA512 generator hashes text with the SHA-512 algorithm, producing a long, strong digest favored for integrity and high-security uses.",
      "SHA-512 belongs to the same family as SHA-256 but produces a larger hash, making it a common choice for high-security checksums and password-hashing schemes like SHA-512 crypt. This tool computes it instantly.",
    ],
    uses:
      "Use it to verify a file's SHA-512 checksum, to generate a strong digest for records, or to test hashing logic in development.",
    tip: "Match the exact algorithm a system expects — SHA-512 and SHA-256 return different values even for identical input.",
  },

  // ───────────────────────────── FINANCE TOOLS ─────────────────────────────
  "mortgage-calculator": {
    about: [
      "The mortgage calculator estimates your monthly payment from loan amount, interest rate, and term, breaking it into principal and interest.",
      "Knowing your real monthly payment before you commit to a home loan reveals how much house you can actually afford. This tool includes property tax and insurance fields for a complete picture of the true monthly cost.",
    ],
    uses:
      "Use it to compare mortgage offers, to size how large a loan your budget supports, or to see the impact of a higher down payment.",
    tip: "The largest lever on total cost is the interest rate — a 0.5% difference on a 30-year loan is often tens of thousands of dollars.",
  },
  "emi-calculator": {
    about: [
      "The EMI calculator computes your Equated Monthly Installment for loans — the fixed amount you pay each month until the loan is repaid.",
      "EMIs dominate personal budgeting for cars, consumer goods, and personal loans. This tool calculates the exact monthly payment plus the total interest, so you know the real cost of borrowing before you sign.",
    ],
    uses:
      "Use it to plan for a car or appliance loan, to compare lender quotes, or to check how an extra repayment shortens the term.",
    tip: "Small increases in the monthly EMI dramatically cut total interest — test 10% extra before deciding term.",
  },
  "compound-interest-calculator": {
    about: [
      "The compound interest calculator projects how an investment grows when interest is added to the principal and earns interest itself.",
      "Compound interest is the engine of long-term wealth — reinvesting returns turns modest savings into substantial sums over decades. This tool projects growth at your chosen rate, frequency, and term.",
    ],
    uses:
      "Use it to model retirement savings growth, to compare accounts by compounding frequency, or to show the value of starting early.",
    tip: "Compounding frequency matters — monthly compounding beats annual at the same nominal rate; check which your account offers.",
  },
  "hourly-to-salary-calculator": {
    about: [
      "The hourly to salary calculator converts hourly wages into annual, monthly, and weekly income using your hours per week.",
      "Comparing hourly contract pay with salaried offers requires converting both into the same annual figure. This tool does that math including typical full-time assumptions, so job decisions are based on real numbers.",
    ],
    uses:
      "Use it to compare a contract daily rate against a salary offer, to quote a freelance price in annual terms, or to budget from a shift wage.",
    tip: "Account for unpaid leave — the calculator assumes the hours you enter per week are consistent year-round.",
  },
  "tip-calculator": {
    about: [
      "The tip calculator works out a gratuity at any percentage and splits the bill among multiple people, including per-person totals.",
      "Splitting bills and calculating tips mentally on the spot is a classic source of error and awkwardness. This tool gives the exact per-person amount for any tip rate, making group dining accurate and fair.",
    ],
    uses:
      "Use it to split a restaurant bill with friends, to decide what tip matches the service, or to leave a precise rounded amount.",
    tip: "Many regions include service charges automatically — check the bill before adding a second tip on top.",
  },
  "sip-calculator": {
    about: [
      "The SIP calculator projects the future value of Systematic Investment Plans, showing how regular monthly investments grow with compounding returns.",
      "A systematic monthly investment is how most people build wealth gradually — investing a fixed amount into funds every month. This tool models the end value and the total you invested, making it easy to see the growth gap.",
    ],
    uses:
      "Use it to project a monthly mutual fund plan, to compare expected returns at different rates, or to plan a disciplined savings goal.",
    tip: "Projections assume a constant return rate — actual markets fluctuate, so treat the figure as a planning range, not a promise.",
  },
  "simple-interest-calculator": {
    about: [
      "The simple interest calculator computes interest on the original principal only, for a fixed rate and period — the formula behind most short-term lending and deposits.",
      "Simple interest applies to short-term loans, savings products, and notes where interest doesn't compound. This tool returns the interest earned or owed and the final amount with a single calculation.",
    ],
    uses:
      "Use it for short-term deposit yields, small-business borrowings, or any loan where the interest is computed on the principal only.",
    tip: "Simple interest and compound interest diverge the longer the term — for multi-year horizons, always check which applies.",
  },
  "salary-after-tax-calculator": {
    about: [
      "The salary after tax calculator estimates your take-home pay by deducting income tax and social contributions from gross salary.",
      "Negotiating a salary means evaluating the net amount that reaches your bank, not just the gross figure. This tool gives a realistic after-tax estimate so you negotiate or budget with the number that actually matters.",
    ],
    uses:
      "Use it to compare job offers in net terms, to gauge how a raise affects take-home pay, or to plan a personal budget from real income.",
    tip: "Regional exemptions and social contributions vary — treat results as an estimate and confirm with a tax professional for big decisions.",
  },
  "retirement-calculator": {
    about: [
      "The retirement calculator projects whether your current savings rate will fund your retirement, given your age, savings, and target income.",
      "Most people discover far too late whether they're saving enough. This tool gives a straightforward projection of your retirement corpus at different return assumptions, so gaps appear while there's still time to close them.",
    ],
    uses:
      "Use it to stress-test your savings rate, to set a monthly contribution target, or to check if delaying retirement a few years changes the picture.",
    tip: "Use a conservative return assumption (5–6% after inflation) — optimistic guesses make planning look better than reality.",
  },
  "car-loan-calculator": {
    about: [
      "The car loan calculator works out monthly payments and total interest for an auto loan, including the impact of down payment and term.",
      "Auto loans are large, multi-year obligations where small rate or term differences shift thousands of dollars. This tool shows the monthly payment, total interest, and total cost for any combination you're considering.",
    ],
    uses:
      "Use it to compare dealer financing against bank rates, to test how a bigger down payment shrinks interest, or to plan the monthly budget.",
    tip: "Shorter terms at slightly higher payments usually save far more in interest than they cost in monthly comfort.",
  },
  "credit-card-payoff-calculator": {
    about: [
      "The credit card payoff calculator shows how long it takes to clear a card balance given a monthly payment, and what the total interest will be.",
      "Credit card interest compounds monthly at rates that can more than double what you buy. This tool reveals the true cost of minimum payments and demonstrates how a bigger monthly payment accelerates payoff dramatically.",
    ],
    uses:
      "Use it to see how many years minimum payments actually take, to plan a payoff date, or to decide between extra monthly payments and a balance transfer.",
    tip: "Every payment you make above the minimum goes permanently against the principal — doubling the minimum can cut years off payoff.",
  },
  "inflation-calculator": {
    about: [
      "The inflation calculator shows how the purchasing power of money changes over time, projecting what a current amount will be worth in the future.",
      "Inflation erodes savings and makes future goals harder to plan. This tool converts a present amount to its equivalent future value at an assumed inflation rate, so budgets and targets stay realistic.",
    ],
    uses:
      "Use it to value a future goal in today's terms, to set an inflation-adjusted retirement target, or to see how a fixed income loses purchasing power.",
    tip: "Long-term consumer inflation averages around 3% — many people unknowingly model zero and under-plan by a third.",
  },
  "roi-calculator": {
    about: [
      "The ROI calculator computes Return on Investment — the percentage gain or loss on any investment relative to its cost.",
      "ROI is the universal measure for comparing business spends, marketing campaigns, and investments. This tool returns the ROI percentage and the net gain, letting you compare options on equal footing.",
    ],
    uses:
      "Use it to evaluate marketing spend, to compare candidate investments, or to report the return a business purchase generated.",
    tip: "The same ROI at different time spans isn't comparable — also check the holding period before ranking two options.",
  },
  "profit-margin-calculator": {
    about: [
      "The profit margin calculator computes gross margin, net margin, and markup from revenue and cost — the pricing health indicators every business needs.",
      "Margins determine pricing strategy, viability, and how much you keep from each sale. This tool returns gross profit, margin percentage, and markup in one view, so pricing decisions rest on numbers.",
    ],
    uses:
      "Use it to price a product with a target margin, to check supplier quotes, or to report margins on a product line.",
    tip: "Markup and margin are not the same — a 50% markup is a 33% margin, a classic source of pricing error.",
  },
  "break-even-calculator": {
    about: [
      "The break-even calculator determines how many units you must sell to cover your fixed costs — the point where revenue equals expenses and profit begins.",
      "Every launch and expansion needs a break-even number: how many sales before costs are covered. This tool computes that quantity from price, variable cost, and fixed cost inputs.",
    ],
    uses:
      "Use it to validate a product launch size, to set sales targets for a new location, or to test how a price change shifts the break-even point.",
    tip: "Lower the break-even by focusing on variable cost reduction first — it always moves the number more than volume guessing.",
  },
};

/** Fallback for any tool missing from the map above. */
export function getToolContent(slug: string): ToolContent | undefined {
  return TOOL_CONTENT[slug];
}