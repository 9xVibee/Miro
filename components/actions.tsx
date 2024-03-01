"use client";

import { DropdownMenuContentProps } from "@radix-ui/react-dropdown-menu";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Link2, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { api } from "@/convex/_generated/api";
import ConfirmModal from "./confirm-modal";
import { Button } from "./ui/button";
import { useRenameModal } from "@/store/use-rename-modal";

interface ActionsProps {
  children: React.ReactNode;
  side?: DropdownMenuContentProps["side"];
  sideOffset?: DropdownMenuContentProps["sideOffset"];
  id: string;
  title: string;
}

const Actions = ({ children, id, title, side, sideOffset }: ActionsProps) => {
  const { mutate, loading } = useApiMutation(api.board.remove);
  const { onOpen } = useRenameModal();

  const onDelete = () => {
    mutate({
      id: id,
    })
      .then(() => toast.success("Board deleted"))
      .catch(() => toast.error("Failed to delete board"));
  };

  const onCopyLink = () => {
    navigator.clipboard
      .writeText(`${window.location.origin}/board/${id}`)
      .then(() => toast.success("Link copied"))
      .catch(() => toast.error("Failed to copy link"));
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent
        side={side}
        sideOffset={sideOffset}
        className="w-60 cursor-pointer"
        onClick={(e) => e.stopPropagation()}
      >
        <DropdownMenuItem
          onClick={onCopyLink}
          className="cursor-pointer text-sm w-full justify-start font-normal"
        >
          <Link2 className="h-4 w-4 mr-2" />
          Copy board Link
        </DropdownMenuItem>
        <ConfirmModal
          description="This will delete the board and all of its con"
          header="Delete board?"
          onConfirm={onDelete}
        >
          <Button
            className="cursor-pointer text-sm w-full flex justify-start font-normal px-2"
            variant={"ghost"}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </Button>
        </ConfirmModal>
        <DropdownMenuItem
          onClick={() => onOpen(id, title)}
          className="cursor-pointer text-sm w-full justify-start font-normal"
        >
          <Pencil className="h-4 w-4 mr-2" />
          Rename
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Actions;
