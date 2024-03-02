"use client";

import { Button } from "@/components/ui/button";

import { api } from "@/convex/_generated/api";
import { useOrganization } from "@clerk/nextjs";

import { useApiMutation } from "@/hooks/use-api-mutation";

import Image from "next/image";
import React from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const EmptyBoard = () => {
  const { organization } = useOrganization();
  const { loading, mutate } = useApiMutation(api.board.create);
  const router = useRouter();

  const onClick = () => {
    if (!organization) return;

    mutate({
      orgId: organization.id,
      title: "Untitled",
    })
      .then((id) => {
        toast.success("Board Created");
        router.push("/board/" + id);
      })
      .catch(() => {
        toast.error("Failed to create board");
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
        <Button disabled={loading} size={"lg"} onClick={onClick}>
          Creat board
        </Button>
      </div>
    </div>
  );
};

export default EmptyBoard;
