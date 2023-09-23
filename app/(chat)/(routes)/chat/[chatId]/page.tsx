import prismadb from "@/lib/prismadb";
import { auth, redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import ChatClient from "./components/ChatClient";

interface ChatIdPageProps {
    params: {
        chatId: string;
    }
}

const ChatIdPage: React.FunctionComponent<ChatIdPageProps> = async ({ params }) => {
    const { userId } = auth();

    if (!userId) {
        // Disabled, as I want non-signed in users to be able to view the chat
        // return redirectToSignIn();
    }

    const companion = await prismadb.companion.findUnique({
        where: {
            id: params.chatId
        },
        include: {
            messages: {
                orderBy: {
                    createdAt: "asc"
                },
                where: {
                    userId: userId || undefined,
                }
            },
            _count: {
                select: {
                    messages: true
                }
            }
        }
    });

    if (!companion) {
        return redirect("/")
    }

    return (
        <div>
            <ChatClient companion={companion} />
        </div>
    );
}

export default ChatIdPage;