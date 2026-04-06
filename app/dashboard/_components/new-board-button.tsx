"use client";

import { api } from "@/convex/_generated/api";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { cn } from "@/lib/utils";
import { useQuery } from "convex/react";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface NewBoardButtonProps {
    orgId: string;
    disabled?: boolean;
    isDocument?: boolean;
}

const MAX_BOARDS_WITHIN_ORG = 5;

export const NewBoardButton = ({ orgId, disabled, isDocument }: NewBoardButtonProps) => {
    const router = useRouter();
    const { mutate, pending } = useApiMutation(api.board.create);

    const data = useQuery(api.board.getTotalBoardCountOfOrg, {
        orgId,
    });

    const onClick = () => {
        if (data && data >= MAX_BOARDS_WITHIN_ORG) {
            toast.error(
                `You can only have ${MAX_BOARDS_WITHIN_ORG} items within an organization`
            );
            return;
        }

        mutate({ orgId, title: "Untitled", type: isDocument ? "document" : "board" })
            .then((id) => {
                toast.success(`${isDocument ? "Document" : "Board"} created!`);
                router.push(`/board/${id}`);
            })
            .catch(() => toast.error(`Failed to create ${isDocument ? "document" : "board"}`));
    };

    return (
        <button
            disabled={pending || disabled}
            onClick={onClick}
            className={cn(
                "col-span-1 aspect-[100/127] rounded-lg flex flex-col items-center justify-center py-6",
                isDocument ? "bg-emerald-600 hover:bg-emerald-800" : "bg-blue-600 hover:bg-blue-800",
                (pending || disabled) && `opacity-75 hover:${isDocument ? "bg-emerald-600" : "bg-blue-600"} cursor-not-allowed`
            )}
        >
            <div />
            <Plus className="h-12 w-12 text-white stroke-1" />
            <p className="text-sm text-white font-light">New {isDocument ? "document" : "board"}</p>
        </button>
    );
};
