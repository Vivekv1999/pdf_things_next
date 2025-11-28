import { PDFDocument } from "pdf-lib";
import { useState } from "react";
import pdfjsLib from "../lib/pdfWorker";

interface PageText {
  pageIndex: number;
  text: string;
  sku: string;
}

type sortFor = "MEESHO" | "FLIPKART";

function useSort(sortFor: sortFor) {
  const [sortedPages, setSortedPages] = useState<PageText[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const isPersonal =true && sortFor === "MEESHO";

  const reorderPdf = async (
    pdfBytes: ArrayBuffer | null, 
    onProgress?: (p: number) => void
  ) => {
    if (!pdfBytes) return null;

    try {
      setIsLoading(true);
      setError(null);
      setProgress(0);

      const start = performance.now();
      const typedarray = new Uint8Array(cloneArrayBuffer(pdfBytes));
      const pdf = await pdfjsLib.getDocument({ data: typedarray }).promise;

      // extract and track progress
      const pageTexts = await extractTextFromPdf(pdf,onProgress);

      setProgress(70);
      onProgress?.(70);

      const sorted = sortPagesBySKU(pageTexts);
      const removeEmptySKUPages = sorted?.filter((v) => v?.sku !== "");
      setSortedPages(removeEmptySKUPages);

      const srcDoc = await PDFDocument.load(cloneArrayBuffer(pdfBytes));
      const pdfDoc = await PDFDocument.create();

      for (let i = 0; i < removeEmptySKUPages.length; i++) {
        const sortedPage = removeEmptySKUPages[i];
        const [copiedPage] = await pdfDoc.copyPages(srcDoc, [sortedPage.pageIndex]);
        pdfDoc.addPage(copiedPage);

        // update progress based on number of pages added
        const pageProgress = 70 + (i / removeEmptySKUPages.length) * 30;
        setProgress(Math.min(100, pageProgress));
        onProgress?.(Math.min(100, pageProgress));
      }

      const bytes = await pdfDoc.save();
      const end = performance.now();
      console.log(`Sorting took ${(end - start).toFixed(2)} ms`);

      setIsLoading(false);
      setProgress(100);
      onProgress?.(100);
      return bytes;
    } catch (err) {
      setError(err as Error);
      setIsLoading(false);
      setProgress(0);
      return null;
    }
  };

  const extractTextFromPdf = async (pdf: any,onProgress?:any): Promise<PageText[]> => {
    const pageTexts: PageText[] = [];

    for (let i = 0; i < pdf.numPages; i++) {
      const page = await pdf.getPage(i + 1);
      const textContent = await page.getTextContent();
      const textItems = textContent.items;
      const pageText = textItems.map((item: any) => item.str).join(" ");

      let sku = "";
      switch (sortFor) {
        case "MEESHO":
          sku = extractSKUFromTextMeesho(pageText);          
          break;
        case "FLIPKART":
          sku = extractSKUFromTextFlipkart(pageText);
          break;
      }

      pageTexts.push({ pageIndex: i, text: pageText, sku });

      // 🔹 Update progress during text extraction (0–70%)
        setProgress(Math.round(((i + 1) / pdf.numPages) * 70));
        const extractProgress = Math.round(((i + 1) / pdf.numPages) * 70);
        setProgress(extractProgress);
        if (onProgress) onProgress(extractProgress);
      }

    return pageTexts;
  };

  const extractSKUFromTextMeesho = (text: string): string => {
    // const startFormString = "Color   Order No.";
    // const start = text.indexOf(startFormString);
    // const end = text.indexOf("Free Size");

    // if (start !== -1 && end !== -1 && start < end) {
    //   const between = text.substring(start + startFormString.length, end).trim();
    //   return between;
    // }

    // return "";

    const start = text.indexOf("Color   Order No.")
     if (start === -1) return "";
    const afterQTYStart = start + "Color   Order No.".length;
    const afterQTYText = text.slice(afterQTYStart).trim();
    
    // const words = afterQTYText.split(/\s+/);
    // const sku = words.slice(0, 15).join(" ");
    const sku = afterQTYText.slice(0, 45)
    return sku;
  };

  const extractSKUFromTextFlipkart = (text: string): string => {
    const start = text.indexOf("QTY ");
    if (start === -1) return "";
    const afterQTYStart = start + "QTY ".length;
    const afterQTYText = text.slice(afterQTYStart).trim();
    const words = afterQTYText.split(/\s+/);
    const sku = words.slice(1, 71).join(" ");
    return sku;
  };

  const normalizeSKU = (sku: string): string => {
    return sku.replace(/^zz-/, "hh-").replace(/^gg-/, "hh-");
  };

  const sortPagesBySKU = (pageTexts: PageText[]) =>
    pageTexts.sort((a, b) =>
      isPersonal
        ? normalizeSKU(a.sku).localeCompare(normalizeSKU(b.sku))
        : a.sku.localeCompare(b.sku)
    );

  const cloneArrayBuffer = (buf: ArrayBuffer) => buf.slice(0);

  return { sortedPages, isLoading, error, reorderPdf, progress };
}

export default useSort;
