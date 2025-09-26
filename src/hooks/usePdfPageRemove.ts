import { useState } from "react";

export default function usePdfPageRemove() {
    const [removedIndexes, setRemovedIndexes] = useState<number[]>([]);

    const togglePageRemoval = (idx: number) => {
        setRemovedIndexes((prev) =>
            prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
        );
    };

    return { togglePageRemoval, removedIndexes };
}