"use client";

import { Canvas } from "./_components/canvas";
import { Room } from "@/components/room";
import { Loading } from "./_components/loading";
import { useEffect } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { DocumentEditor } from "./_components/document-editor";

interface BoardIdPageProps {
    params: { boardId: string };
}

const BoardIdPage = ({ params }: BoardIdPageProps) => {
    const board = useQuery(api.board.get, { id: params.boardId as Id<"boards"> });

    useEffect(() => {
        document.title = board?.title ? `${board.title} - Miro Clone` : `Board - Miro Clone`;
    }, [board?.title]);

    if (board === undefined) {
        return <Loading />;
    }

    if (board === null) {
        return <div className="h-full w-full flex items-center justify-center">Board not found</div>;
    }

    return (
        <Room roomId={params.boardId} fallback={<Loading />}>
            {board.type === "document" ? (
                <DocumentEditor boardId={params.boardId} />
            ) : (
                <Canvas boardId={params.boardId} />
            )}
        </Room>
    );
};

export default BoardIdPage;
