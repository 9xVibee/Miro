import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const Info = () => {
  return (
    <div className="absolute top-2 left-2 bg-white rounded-md px-1.5 h-12 items-center shadow-lg flex">
      Todo: Information about the board
    </div>
  );
};

Info.Skeleton = function InfoSkeleton() {
  return (
    <div className="absolute top-2 left-2 bg-white rounded-md px-1.5 h-12 items-center shadow-md flex w-[300px]" />
  );
};

export default Info;
