"use client";

import React from "react";
import EmptySearch from "./empty-search";
import EmptyFavorites from "./empty-favorites";
import EmptyBoard from "./empty-board";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

interface BoardListProps {
  orgId: string;
  query: {
    search?: string;
    favorites?: string;
  };
}

const BoardList = ({ orgId, query }: BoardListProps) => {
  const data = useQuery(api.boards.getBoards, { orgId });

  if (data === undefined) {
    return <div>Loading...</div>;
  }

  if (!data.length && query.search) {
    return <EmptySearch />;
  }

  if (!data.length && query.favorites) {
    return <EmptyFavorites />;
  }

  if (!data.length) {
    return <EmptyBoard />;
  }

  return <div>{JSON.stringify(data)}</div>;
};

export default BoardList;
