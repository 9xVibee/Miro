import { api } from "@/convex/_generated/api";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import React from "react";
import { toast } from "sonner";

interface NewBoardButtonProps {
  orgId: string;
  disabled?: boolean;
}

const NewBoardButton = ({ orgId, disabled }: NewBoardButtonProps) => {
  const { mutate, loading } = useApiMutation(api.board.create);

  const handleCreateBoard = () => {
    mutate({ orgId, title: "Untitled" })
      .then((id) => {
        toast.success("Board Created");
        // TODO: Redirect to board
      })
      .catch((err) => toast.error("Failed to create board"));
  };

  return (
    <button
      disabled={loading || disabled}
      onClick={handleCreateBoard}
      className={cn(
        "col-span-1 aspect-[100/127] bg-blue-600 hover:bg-blue-800 rounded-lg transition-colors flex flex-col items-center justify-center py-6",
        (loading || disabled) && "opacity-75"
      )}
    >
      <Plus className="h-12 w-12 text-white stroke-1" />
      <p className="text-xs text-white font-light">New Board</p>
    </button>
  );
};

export default NewBoardButton;
