import { Skeleton } from "@/components/ui/skeleton";
import { Loader } from "lucide-react";
import Info from "./info";
import Participants from "./participants";
import Toolbar from "./toolbar";

const Loading = () => {
  return (
    <div className="h-screen w-full bg-neutral-100 touch-none flex items-center justify-center">
      <Loader className="w-6 h-6 text-muted-foreground animate-spin" />
      <Info.Skeleton />
      <Participants.Skeleton />
      <Toolbar.Skeleton />
    </div>
  );
};

export default Loading;
