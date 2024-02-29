"use client";

import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { useOrganization } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import Image from "next/image";
import React from "react";

const EmptyBoard = () => {
  const create = useMutation(api.boards.create);
  const { organization } = useOrganization();

  const onClick = () => {
    if (!organization) return;

    create({
      orgId: organization.id,
      title: "Untitled",
    });
  };

  return (
    <div
      className="w-full h-full flex justify-center flex-col
    items-center"
    >
      <Image src={"/note.svg"} alt="Empty search" height={140} width={140} />
      <h2 className="text-2xl font-semibold mt-6">Create Your first board!</h2>
      <p className="text-muted-foreground text-sm mt-2">
        Start by creating a board for your organization
      </p>
      <div className="mt-6">
        <Button size={"lg"} onClick={onClick}>
          Creat board
        </Button>
      </div>
    </div>
  );
};

export default EmptyBoard;
