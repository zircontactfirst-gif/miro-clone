"use client";

import { ImageLayer } from "@/types/canvas";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

interface ImageProps {
    id: string;
    layer: ImageLayer;
    onPointerDown: (e: React.PointerEvent, id: string) => void;
    selectionColor?: string;
}

export const ImageNode = ({
    id,
    layer,
    onPointerDown,
    selectionColor,
}: ImageProps) => {
    const { x, y, width, height, src } = layer;

    // We store the Convex storage ID in the 'src' field. If it starts with 'http', it's a direct URL (optional support).
    const isDirectUrl = src.startsWith("http") || src.startsWith("data:");
    const urlFromConvex = useQuery(
        api.files.getFileUrl, 
        isDirectUrl ? "skip" : { storageId: src as Id<"_storage"> }
    );

    const imageUrl = isDirectUrl ? src : urlFromConvex;

    return (
        <foreignObject
            x={x}
            y={y}
            width={width}
            height={height}
            onPointerDown={(e) => onPointerDown(e, id)}
            style={{
                outline: selectionColor ? `1px solid ${selectionColor}` : "none",
            }}
            className="shadow-sm drop-shadow-xl"
        >
            <div
                className="h-full w-full relative"
                style={{
                    opacity: imageUrl ? 1 : 0.5,
                }}
            >
                {imageUrl ? (
                    <img 
                        src={imageUrl} 
                        alt="Canvas Image" 
                        style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "fill",
                            userSelect: "none",
                        }} 
                        draggable={false}
                    />
                ) : (
                    <div className="h-full w-full bg-neutral-200 animate-pulse flex items-center justify-center rounded-sm">
                        <span className="text-xs text-neutral-400 font-medium">Loading...</span>
                    </div>
                )}
            </div>
        </foreignObject>
    );
};
