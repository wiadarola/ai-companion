import { Companion } from "@prisma/client";
import ChatMessage from "./ChatMessage";
import { ChatMessageProps } from "./ChatMessage";
import { useState, useEffect, useRef } from "react";
import { ElementRef } from "react";

interface ChatMessagesProps {
    isLoading: boolean;
    messages: ChatMessageProps[];
    companion: Companion;
}

const ChatMessages: React.FunctionComponent<ChatMessagesProps> = ({ isLoading, messages = [], companion }) => {
    const scrollRef = useRef<ElementRef<"div">>(null);
    const [fakeLoading, setFakeLoading] = useState(messages.length === 0);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setFakeLoading(false);
        }, 1000);

        return () => clearTimeout(timeout);
    }, []);

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages.length]);

    return (
        <div className="flex-1 overflow-y-auto">
            <ChatMessage isLoading={fakeLoading} src={companion.src} role="system" content={`Hello, I am ${companion.name}, ${companion.description}.`} />
            {messages.map((message) => <ChatMessage key={message.content} role={message.role} content={message.content} src={message.src} />)}
            {isLoading && <ChatMessage isLoading={isLoading} role="system" src={companion.src} />}
            <div ref={scrollRef} />
        </div>
    );
}

export default ChatMessages;