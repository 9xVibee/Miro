"use client";

import React from "react";
import EmptySearch from "./empty-search";

interface BoardListProps {
  orgId: string;
  query: {
    search?: string;
    favorites?: string;
  };
}

const BoardList = ({ orgId, query }: BoardListProps) => {
  const data = []; // TODO : Change to api call

  if (!data.length && query.search) {
    return <EmptySearch />;
  }

  if (!data.length && query.favorites) {
    return <div>No Favorites</div>;
  }

  if (!data.length) {
    return <div>No boards at all</div>;
  }

  return <div>{JSON.stringify(query)}</div>;
};

export default BoardList;
