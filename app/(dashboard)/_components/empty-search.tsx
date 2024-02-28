import Image from "next/image";
import React from "react";

const EmptySearch = () => {
  return (
    <div
      className="w-full h-full flex justify-center flex-col
    items-center"
    >
      <Image
        src={"/empty-search.svg"}
        alt="Empty search"
        height={140}
        width={140}
      />
      <h2 className="text-2xl font-semibold mt-6">No results found!</h2>
      <p className="text-muted-foreground text-sm mt-2">
        Try seaching something else
      </p>
    </div>
  );
};

export default EmptySearch;
