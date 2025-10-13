import { siteConfig } from "../constants/appConstants";

export function downloadPdf(bytes: Uint8Array<ArrayBuffer>, fileName:string) {
  const blob = new Blob([bytes], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = `${siteConfig.name}-${fileName}.pdf`;;  
  a.click();

  URL.revokeObjectURL(url);
}
