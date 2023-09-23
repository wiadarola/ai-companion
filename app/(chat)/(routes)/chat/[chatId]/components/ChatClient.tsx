"use client"

import { Companion, Message } from "@prisma/client";
import ChatHeader from "./ChatHeader";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useCompletion } from "ai/react";
import ChatForm from "./ChatForm";

interface ChatClientProps {
    companion: Companion & {
        messages: Message[];
        _count: {
            messages: number;
        }
    };
}

const ChatClient: React.FunctionComponent<ChatClientProps> = ({ companion }) => {
    const router = useRouter();
    const [messages, setMessages] = useState<any[]>(companion.messages);

    const { input, isLoading, handleInputChange, handleSubmit, setInput } = useCompletion({
        api: `/api/chat/${companion.id}`,
        onFinish(prompt, completion) {
            const systemMessage = {
                role: "system",
                content: completion,
            }

            setMessages(prev => [...prev, systemMessage]);
            setInput("");

            router.refresh();
        },
    });

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        const userMessage = {
            role: "user",
            content: input,
        }

        setMessages(prev => [...prev, userMessage]);

        handleSubmit(e);
    };

    return (
        <div className="flex flex-col h-full p-4 space-y-2">
            <ChatHeader companion={companion} />
            <ChatForm isLoading={isLoading} input={input} handleInputChange={handleInputChange} onSubmit={onSubmit} />
        </div>
    );
}

export default ChatClient;