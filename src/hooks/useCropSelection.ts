import { useRef, useState } from "react";

interface CropBox {
    x: number;
    y: number;
    width: number;
    height: number;
}

type ResizeHandle =
    | "top-left"
    | "top-right"
    | "bottom-left"
    | "bottom-right"
    | "left"
    | "right"
    | "top"
    | "bottom"
    | null;

export default function useDragSelectCrop() {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [cropBox, setCropBox] = useState<CropBox | null>(null);
    const [isSelecting, setIsSelecting] = useState(false);
    const [start, setStart] = useState<{ x: number; y: number } | null>(null);
    const [resizeHandle, setResizeHandle] = useState<ResizeHandle>(null);

    const handleMouseDown = (e: React.MouseEvent, handle?: ResizeHandle) => {
        e.stopPropagation();
        const rect = containerRef.current?.getBoundingClientRect();
        if (!rect) return;

        const startX = e.clientX - rect.left;
        const startY = e.clientY - rect.top;

        if (handle && cropBox) {
            setResizeHandle(handle);
            setStart({ x: startX, y: startY });
            return;
        }

        // Start new selection
        setResizeHandle(null);
        setStart({ x: startX, y: startY });
        setCropBox({ x: startX, y: startY, width: 0, height: 0 });
        setIsSelecting(true);
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        const rect = containerRef.current?.getBoundingClientRect();
        if (!rect) return;

        const currentX = e.clientX - rect.left;
        const currentY = e.clientY - rect.top;

        // ---- Resizing existing selection ----
        if (resizeHandle && cropBox && start) {
            let { x, y, width, height } = cropBox;
            const dx = currentX - start.x;
            const dy = currentY - start.y;

            switch (resizeHandle) {
                case "right":
                    width += dx;
                    break;
                case "left":
                    x += dx;
                    width -= dx;
                    break;
                case "bottom":
                    height += dy;
                    break;
                case "top":
                    y += dy;
                    height -= dy;
                    break;
                case "top-left":
                    x += dx;
                    y += dy;
                    width -= dx;
                    height -= dy;
                    break;
                case "top-right":
                    y += dy;
                    width += dx;
                    height -= dy;
                    break;
                case "bottom-left":
                    x += dx;
                    width -= dx;
                    height += dy;
                    break;
                case "bottom-right":
                    width += dx;
                    height += dy;
                    break;
            }

            // Prevent negative sizes
            if (width < 0) {
                width = Math.abs(width);
                x -= width;
            }
            if (height < 0) {
                height = Math.abs(height);
                y -= height;
            }

            setCropBox({ x, y, width, height });
            setStart({ x: currentX, y: currentY });
            return;
        }

        // ---- Drawing new selection ----
        if (!isSelecting || !start) return;

        const x = Math.min(start.x, currentX);
        const y = Math.min(start.y, currentY);
        const width = Math.abs(currentX - start.x);
        const height = Math.abs(currentY - start.y);

        setCropBox({ x, y, width, height });
    };

    const handleMouseUp = () => {
        setIsSelecting(false);
        setResizeHandle(null);
        setStart(null);
    };

    return {
        containerRef,
        cropBox,
        setCropBox,
        isSelecting,
        handleMouseDown,
        handleMouseMove,
        handleMouseUp,
    };
}
