"use client";

import { Button } from "@/components/ui/button";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

import { cn } from "@/lib/utils";
import { useQuery } from "convex/react";

import { Poppins } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

import Hint from "@/components/hint";
import { useRenameModal } from "@/store/use-rename-modal";
import Actions from "@/components/actions";
import { Menu } from "lucide-react";

interface InfoProps {
  boardId: string;
}

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

const TabSeperator = () => {
  return <div className="text-neutral-300 px-1.5">|</div>;
};

const Info = ({ boardId }: InfoProps) => {
  const { onOpen } = useRenameModal();

  const data = useQuery(api.board.get, { id: boardId as Id<"boards"> });

  if (!data) return <InfoSkeleton />;

  return (
    <div
      className="absolute top-2 left-2 bg-white rounded-md px-1.5 h-12 
    items-center shadow-lg flex"
    >
      <Hint label="Go to Boards">
        <Button className="px-2" variant={"board"}>
          <Link href={"/"} className="flex">
            <Image src="/logo.svg" alt={"Board Logo"} width={40} height={40} />
            <span
              className={cn(
                "font-semibold text-xl ml-2 text-black",
                font.className
              )}
            >
              Board
            </span>
          </Link>
        </Button>
      </Hint>
      <TabSeperator />
      <Hint label="Edit title" side="bottom" sideOffset={10}>
        <Button
          variant={"board"}
          className="text-base font-normal px-2"
          onClick={() => {
            onOpen(boardId, data.title);
          }}
        >
          {data.title}
        </Button>
      </Hint>
      <TabSeperator />
      <Actions id={boardId} title={data.title} side="bottom" sideOffset={10}>
        <div>
          <Hint label="Main menu">
            <Button variant={"board"}>
              <Menu />
            </Button>
          </Hint>
        </div>
      </Actions>
    </div>
  );
};

export function InfoSkeleton() {
  return (
    <div className="absolute top-2 left-2 bg-white rounded-md px-1.5 h-12 items-center shadow-md flex w-[300px]" />
  );
}

export default Info;
