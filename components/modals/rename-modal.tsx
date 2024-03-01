"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogClose,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { useRenameModal } from "@/store/use-rename-modal";

import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { toast } from "sonner";

const RenameModal = () => {
  const { isOpen, onClose, initilaValues } = useRenameModal();

  const { mutate, loading } = useApiMutation(api.board.rename);

  const [title, setTitle] = useState(initilaValues.title);

  useEffect(() => {
    setTitle(initilaValues.title);
  }, [initilaValues.title]);

  const onSubmit = () => {
    if (!title) {
      return toast.error("Title cannot be empty!");
    }

    if (title.length > 60) {
      return toast.error("Title cannot be longer than 60 characters!");
    }

    mutate({
      id: initilaValues.id,
      rename: title,
    })
      .then(() => {
        toast.success("Title Renamed Successfully");
        onClose();
      })
      .catch(() => {
        toast.error("Failed to rename title");
        onClose();
      })
      .finally(() => onClose());
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit board title</DialogTitle>
        </DialogHeader>
        <DialogDescription>Enter a new title for this board</DialogDescription>
        <form onSubmit={onSubmit}>
          <Input
            disabled={loading}
            required
            maxLength={60}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Board title"
          />
        </form>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant={"outline"} disabled={loading}>
              Cancel
            </Button>
          </DialogClose>
          <Button disabled={loading} type="submit" onClick={onSubmit}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RenameModal;
