import { AvatarImage } from "@radix-ui/react-avatar";
import { Avatar } from "./ui/avatar";
import { FunctionComponent } from "react";

interface BotAvatarProps {
    src: string;
}

const BotAvatar: FunctionComponent<BotAvatarProps> = ({ src }) => {
    return (
        <Avatar className="h-12 w-12">
            <AvatarImage src={src} />
        </Avatar>
    );
}

export default BotAvatar;