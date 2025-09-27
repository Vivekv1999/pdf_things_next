import { PDFDocument } from "pdf-lib";
import { useEffect, useState } from "react";
import pdfjsLib from "../lib/pdfWorker";

interface PageText {
  pageIndex: number;
  text: string;
  sku: string; // Just to store the extracted SKU
}

function useSort(pdfBytes: ArrayBuffer | null) {
  const [sortedPages, setSortedPages] = useState<PageText[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const isPersonal = true

  useEffect(() => {
    if (!pdfBytes) return;

    const loadAndSortPdf = async () => {
      try {
        const typedarray = new Uint8Array(cloneArrayBuffer(pdfBytes));
        const pdf = await pdfjsLib.getDocument({ data: typedarray }).promise;

        // Extract text and SKU using position info
        const pageTexts = await extractTextFromPdf(pdf);

        // Sort pages by SKU
        const sorted = sortPagesBySKU(pageTexts);
        console.log(sorted?.map((v) => v?.sku), "test---skuu");

        setSortedPages(sorted);
        setIsLoading(false);
      } catch (err) {
        setError(err as Error);
        setIsLoading(false);
      }
    };

    loadAndSortPdf();
  }, [pdfBytes]);

  const extractTextFromPdf = async (pdf: any): Promise<PageText[]> => {
    const pageTexts: PageText[] = [];

    for (let i = 0; i < pdf.numPages; i++) {
      const page = await pdf.getPage(i + 1);
      const textContent = await page.getTextContent();

      // Extract text items along with their position (transform)
      const textItems = textContent.items;
      const pageText = textItems.map((item: any) => item.str).join(" ");

      // Attempt to extract SKU based on the layout of the PDF (no keyword matching)
      const sku = extractSKUFromText(pageText);  // Use full text, not based on specific keywords
      console.log('sku', sku)

      pageTexts.push({ pageIndex: i, text: pageText, sku });
    }

    return pageTexts;
  };

  const extractSKUFromText = (text: string): string => {
    const start = text.indexOf("Order No.");
    const end = text.indexOf("Free Size");

    if (start !== -1 && end !== -1 && start < end) {
      // Extract everything between 'Order No.' and 'Free Size'
      const between = text.substring(start + "Order No.".length, end).trim();
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
    pageTexts.sort((a, b) => {
      return isPersonal ?
        normalizeSKU(a.sku).localeCompare(normalizeSKU(b.sku)) //this is for me Only not for ALL USER
        : a.sku.localeCompare(b.sku); // Sort based on the SKU
    });

  const reorderPdf = async () => {
    if (!pdfBytes) return null;

    const cloned = cloneArrayBuffer(pdfBytes); // Make a fresh copy
    const srcDoc = await PDFDocument.load(cloned);
    const pdfDoc = await PDFDocument.create();

    // Reorder pages based on the sorted order
    for (let sortedPage of sortedPages) {
      const [copiedPage] = await pdfDoc.copyPages(srcDoc, [sortedPage.pageIndex]);
      pdfDoc.addPage(copiedPage);
    }

    return await pdfDoc.save(); // Return the new ordered PDF
  };

  function cloneArrayBuffer(buf: ArrayBuffer) {
    return buf.slice(0); // Makes a fresh copy of the ArrayBuffer
  }

  return { sortedPages, isLoading, error, reorderPdf };
}

export default useSort;
