import { useRef, useState } from "react";

interface CropBox {
    x: number;
    y: number;
    width: number;
    height: number;
}

export default function useDragSelectCrop() {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [cropBox, setCropBox] = useState<CropBox | null>(null);
    const [isSelecting, setIsSelecting] = useState(false);
    const [start, setStart] = useState<{ x: number; y: number } | null>(null);

    const handleMouseDown = (e: React.MouseEvent) => {
        const rect = containerRef.current?.getBoundingClientRect();
        if (!rect) return;

        const startX = e.clientX - rect.left;
        const startY = e.clientY - rect.top;

        setStart({ x: startX, y: startY });
        setCropBox({ x: startX, y: startY, width: 0, height: 0 });
        setIsSelecting(true);
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isSelecting || !start) return;
        const rect = containerRef.current?.getBoundingClientRect();
        if (!rect) return;

        const currentX = e.clientX - rect.left;
        const currentY = e.clientY - rect.top;

        const x = Math.min(start.x, currentX);
        const y = Math.min(start.y, currentY);
        const width = Math.abs(currentX - start.x);
        const height = Math.abs(currentY - start.y);

        setCropBox({ x, y, width, height });
    };

    const handleMouseUp = () => {
        setIsSelecting(false);
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
