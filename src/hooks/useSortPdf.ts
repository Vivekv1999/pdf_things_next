import { PDFDocument } from "pdf-lib";
import { useState } from "react";
import pdfjsLib from "../lib/pdfWorker";

interface PageText {
  pageIndex: number;
  text: string;
  sku: string;
}

function useSort() {
  const [sortedPages, setSortedPages] = useState<PageText[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const isPersonal = true;

  const reorderPdf = async (pdfBytes: ArrayBuffer | null) => {
    if (!pdfBytes) return null;

    try {
      setIsLoading(true);
      setError(null);

      const start = performance.now();

      const typedarray = new Uint8Array(cloneArrayBuffer(pdfBytes));
      const pdf = await pdfjsLib.getDocument({ data: typedarray }).promise;

      const pageTexts = await extractTextFromPdf(pdf);

      const sorted = sortPagesBySKU(pageTexts);
      const removeEmptySKUPages=sorted?.filter((v)=>v?.sku!=="")
      
      setSortedPages(removeEmptySKUPages);

      const srcDoc = await PDFDocument.load(cloneArrayBuffer(pdfBytes));
      const pdfDoc = await PDFDocument.create();

      for (const sortedPage of removeEmptySKUPages) {
        const [copiedPage] = await pdfDoc.copyPages(srcDoc, [sortedPage.pageIndex]);
        pdfDoc.addPage(copiedPage);
      }

      const bytes = await pdfDoc.save();

      const end = performance.now();
      console.log(`sorting took ${(end - start).toFixed(2)} ms`);

      setIsLoading(false);
      return bytes;
    } catch (err) {
      setError(err as Error);
      setIsLoading(false);
      return null;
    }
  };

  const extractTextFromPdf = async (pdf: any): Promise<PageText[]> => {
    const pageTexts: PageText[] = [];

    for (let i = 0; i < pdf.numPages; i++) {
      const page = await pdf.getPage(i + 1);
      const textContent = await page.getTextContent();
      const textItems = textContent.items;
      const pageText = textItems.map((item: any) => item.str).join(" ");
      console.log(pageText,"pageText",i);
      
      const sku = extractSKUFromTextMeesho(pageText);
      pageTexts.push({ pageIndex: i, text: pageText, sku });
    }

    return pageTexts;
  };


  const extractSKUFromTextMeesho = (text: string): string => {
    const startFormString="Color   Order No."
    const start = text.indexOf(startFormString);
    const end = text.indexOf("Free Size");
    
    if (start !== -1 && end !== -1 && start < end) {
      const between = text.substring(start + startFormString.length, end).trim();
      return between;
    }

    return "";
  };

  const normalizeSKU = (sku: string): string => {
    return sku
      .replace(/^zz-/, "hh-")
      .replace(/^gg-/, "hh-");
  };

  const sortPagesBySKU = (pageTexts: PageText[]) =>
    pageTexts.sort((a, b) =>
      isPersonal
        ? normalizeSKU(a.sku).localeCompare(normalizeSKU(b.sku))
        : a.sku.localeCompare(b.sku)
    );

  const cloneArrayBuffer = (buf: ArrayBuffer) => buf.slice(0);

  return { sortedPages, isLoading, error, reorderPdf };
}

export default useSort;
