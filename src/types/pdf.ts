export interface PdfMeta {
    id: string;
    file: File;
    pageCount: number;
    bytes: ArrayBuffer;
    previews: (string | null)[];
}

export interface ProgressUpdate {
    fileName: string;
    completed: number;
    totalFiles: number;
    stage: string;
    percent: number;
}