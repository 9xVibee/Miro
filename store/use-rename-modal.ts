import { create } from "zustand";

const defaultValues = { id: "", title: "" };

interface IRenameModal {
  isOpen: boolean;
  initilaValues: typeof defaultValues;
  onOpen: (id: string, title: string) => void;
  onClose: () => void;
}

export const useRenameModal = create<IRenameModal>((set) => ({
  isOpen: false,
  onClose: () =>
    set({
      initilaValues: { id: "", title: "" },
      isOpen: false,
    }),
  onOpen: (id, title) =>
    set({
      isOpen: true,
      initilaValues: { id, title },
    }),
  initilaValues: defaultValues,
}));
