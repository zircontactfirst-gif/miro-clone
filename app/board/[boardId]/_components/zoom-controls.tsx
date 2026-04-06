"use client";

import { Minus, Plus } from "lucide-react";
import { Camera } from "@/types/canvas";

interface ZoomControlsProps {
    camera: Camera;
    setCamera: (camera: Camera | ((c: Camera) => Camera)) => void;
}

export const ZoomControls = ({ camera, setCamera }: ZoomControlsProps) => {
    const zoomIn = () => {
        setCamera((c) => ({
            ...c,
            scale: Math.min(c.scale + 0.1, 5),
        }));
    };

    const zoomOut = () => {
        setCamera((c) => ({
            ...c,
            scale: Math.max(c.scale - 0.1, 0.1),
        }));
    };

    const resetZoom = () => {
        setCamera((c) => ({
            ...c,
            scale: 1,
            x: 0,
            y: 0,
        }));
    };

    return (
        <div className="absolute bottom-4 right-4 flex items-center bg-white shadow-md rounded-md border text-sm font-medium">
            <button 
                onClick={zoomOut}
                className="p-2 hover:bg-neutral-100 border-r text-neutral-600 rounded-l-md"
            >
                <Minus className="h-4 w-4" />
            </button>
            <button 
                onClick={resetZoom}
                className="px-3 py-2 hover:bg-neutral-100 text-neutral-700 min-w-[60px]"
            >
                {Math.round(camera.scale * 100)}%
            </button>
            <button 
                onClick={zoomIn}
                className="p-2 hover:bg-neutral-100 border-l text-neutral-600 rounded-r-md"
            >
                <Plus className="h-4 w-4" />
            </button>
        </div>
    );
};
