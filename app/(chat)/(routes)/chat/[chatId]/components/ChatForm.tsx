import { ChatRequestOptions } from "ai";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SendHorizonal } from "lucide-react";
import { redirectToSignIn, useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

interface ChatFormProps {
    isLoading: boolean;
    input: string;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => void;
    onSubmit: (e: React.FormEvent<HTMLFormElement>, chatRequestOptions?: ChatRequestOptions | undefined) => void;
}

const ChatForm: React.FunctionComponent<ChatFormProps> = ({ isLoading, input, handleInputChange, onSubmit }) => {
    const { userId } = useAuth();
    const router = useRouter();

    const checkAuth = () => {
        if (!userId) { router.push('/sign-in'); }
    }

    return (
        <form onSubmit={onSubmit} className="border-t border-primary/10 py-4 flex items-center gap-x-2">
            < Input onClick={checkAuth} disabled={isLoading} value={input} onChange={handleInputChange} placeholder="Type a message" className="rounded-lg bg-primary/10" />
            < Button disabled={isLoading} variant={'ghost'}>
                <SendHorizonal className="h-6 w-6" />
            </Button>
        </form>
    );
}

export default ChatForm;