import Image from "next/image";
import React from "react";

const EmptyFavorites = () => {
  return (
    <div
      className="w-full h-full flex justify-center flex-col
    items-center"
    >
      <Image
        src={"/empty-favorites.svg"}
        alt="Empty search"
        height={140}
        width={140}
      />
      <h2 className="text-2xl font-semibold mt-6">No Favorites boards!</h2>
      <p className="text-muted-foreground text-sm mt-2">Try favoriting board</p>
    </div>
  );
};

export default EmptyFavorites;
