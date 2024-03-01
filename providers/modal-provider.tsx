"use client";

import RenameModal from "@/components/modals/rename-modal";
import { useEffect, useState } from "react";

import React from "react";

const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <>
      <RenameModal />
    </>
  );
};

export default ModalProvider;
