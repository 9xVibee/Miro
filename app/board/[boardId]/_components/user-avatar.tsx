import Hint from "@/components/hint";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface UserAvatarProps {
  src?: string;
  name?: string;
  fallback?: string;
  borderColor?: string;
}

const UserAvatar = ({ borderColor, fallback, name, src }: UserAvatarProps) => {
  return (
    <Hint label={name || "Teammate"} sideOffset={18} side="bottom">
      <Avatar
        className="h-10 w-10 border-2"
        style={{
          borderColor,
        }}
      >
        <AvatarImage src={src} />
        <AvatarFallback className="text-xs font-semibold">
          {fallback}
        </AvatarFallback>
      </Avatar>
    </Hint>
  );
};

export default UserAvatar;
