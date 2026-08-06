import { getPdfjs } from "@/lib/pdfjs";

export async function pdfToBlobs(
  file: File,
  mime: "image/jpeg" | "image/png",
  scale = 1.5,
  password?: string
): Promise<Blob[]> {
  const pdfjsLib = await getPdfjs();
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer, password }).promise;

  try {
    const blobs: Blob[] = [];
    for (let p = 1; p <= pdf.numPages; p++) {
      const page = await pdf.getPage(p);
      const viewport = page.getViewport({ scale });
      const canvas = document.createElement("canvas");
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      const context = canvas.getContext("2d");
      if (!context) {
        throw new Error("Unable to create canvas context");
      }
      await page.render({ canvasContext: context, viewport }).promise;

      const blob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob(
          (result) => (result ? resolve(result) : reject(new Error("Rendering failed"))),
          mime,
          mime === "image/jpeg" ? 0.9 : undefined
        );
      });

      blobs.push(blob);
      page.cleanup();
    }
    return blobs;
  } finally {
    await pdf.destroy();
  }
}

export async function extractPdfText(file: File): Promise<string[]> {
  const pdfjsLib = await getPdfjs();
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

  try {
    const pages: string[] = [];
    for (let p = 1; p <= pdf.numPages; p++) {
      const page = await pdf.getPage(p);
      const content = await page.getTextContent();
      const text = content.items
        .map((item) => ("str" in item ? (item as { str: string }).str : ""))
        .join(" ")
        .replace(/\s+/g, " ")
        .trim();
      pages.push(text);
      page.cleanup();
    }
    return pages;
  } finally {
    await pdf.destroy();
  }
}
