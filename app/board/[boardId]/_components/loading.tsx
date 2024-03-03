import { Loader } from "lucide-react";
import { InfoSkeleton } from "./info";
import { ParticipantsSkeleton } from "./participants";
import { ToolbarSkeleton } from "./toolbar";

const Loading = () => {
  return (
    <div className="h-screen w-full bg-neutral-100 touch-none flex items-center justify-center">
      <Loader className="w-6 h-6 text-muted-foreground animate-spin" />
      <InfoSkeleton />
      <ParticipantsSkeleton />
      <ToolbarSkeleton />
    </div>
  );
};

export default Loading;
