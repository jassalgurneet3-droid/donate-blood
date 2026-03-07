import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Send, MessageCircle } from "lucide-react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import ReactMarkdown from "react-markdown";

interface Message {
    id: number;
    text: string;
    sender: "user" | "bot";
}

interface ChatbotProps {
    isOpen: boolean;
    onClose: () => void;
}

function TypingIndicator() {
    return (
        <div className="flex items-center space-x-2 p-4 bg-gray-100 rounded-2xl max-w-[80px]">
            <motion.div
                className="w-2 h-2 bg-gray-400 rounded-full"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
            />
            <motion.div
                className="w-2 h-2 bg-gray-400 rounded-full"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
            />
            <motion.div
                className="w-2 h-2 bg-gray-400 rounded-full"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
            />
        </div>
    );
}

export function Chatbot({ isOpen, onClose }: ChatbotProps) {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 1,
            text: "Hello! I'm here to answer your questions about blood donation. Ask me anything!",
            sender: "bot",
        },
    ]);
    const [inputValue, setInputValue] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    
    const chatSessionRef = useRef<any>(null);
    // 1. Added a ref to point to the bottom of the message list
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // 2. Added a function to handle the smooth scrolling
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    // 3. Added a useEffect to trigger the scroll whenever messages or isTyping changes
    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    useEffect(() => {
        const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
        if (!apiKey) {
            console.error("Gemini API key is missing. Check your .env file.");
            return;
        }

        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ 
            model: "gemini-2.5-flash",
            systemInstruction: "You are a helpful and empathetic Blood Donation Helper assistant. Keep your answers concise, clear, and use markdown (like bullet points and bold text) to make information easy to read."
        });

        // Initialize chat session
        chatSessionRef.current = model.startChat({
            history: [],
        });
    }, []);

    const handleSend = async () => {
        if (inputValue.trim() === "") return;

        const userText = inputValue;
        const userMessage: Message = {
            id: Date.now(),
            text: userText,
            sender: "user",
        };

        setMessages((prev) => [...prev, userMessage]);
        setInputValue("");
        setIsTyping(true);

        try {
            if (!chatSessionRef.current) {
                throw new Error("Chat session not initialized");
            }
            
            const result = await chatSessionRef.current.sendMessage(userText);
            const responseText = result.response.text();

            const botResponse: Message = {
                id: Date.now() + 1,
                text: responseText,
                sender: "bot",
            };
            setMessages((prev) => [...prev, botResponse]);
            
        } catch (error) {
            console.error("Error communicating with Gemini:", error);
            const errorMessage: Message = {
                id: Date.now() + 1,
                text: "I'm having a little trouble connecting right now. Please try again in a moment.",
                sender: "bot",
            };
            setMessages((prev) => [...prev, errorMessage]);
        } finally {
            setIsTyping(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            handleSend();
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="fixed bottom-24 right-6 w-96 h-[32rem] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden z-50"
                    style={{
                        boxShadow: "0 20px 60px rgba(139, 0, 0, 0.4)",
                    }}
                >
                    <div
                        className="p-6 text-white flex items-center justify-between"
                        style={{
                            background: "linear-gradient(135deg, #8B0000 0%, #C62828 100%)",
                        }}
                    >
                        <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                                <MessageCircle className="text-[#8B0000]" size={24} />
                            </div>
                            <div>
                                <h3
                                    className="m-0"
                                    style={{
                                        fontFamily: "Oswald, sans-serif",
                                        fontSize: "1.25rem",
                                    }}
                                >
                                    Blood Donation Helper
                                </h3>
                                <p
                                    className="m-0 opacity-90"
                                    style={{
                                        fontFamily: "Inter, sans-serif",
                                        fontSize: "0.75rem",
                                    }}
                                >
                                    Powered by Gemini AI
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="text-white hover:bg-white/20 rounded-full p-2 transition-colors"
                        >
                            <X size={24} />
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-6 space-y-4 overscroll-contain">
                        {messages.map((message) => (
                            <motion.div
                                key={message.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`flex ${
                                    message.sender === "user" ? "justify-end" : "justify-start"
                                }`}
                            >
                                <div
                                    className={`max-w-[85%] p-4 rounded-2xl ${
                                        message.sender === "user"
                                            ? "bg-gradient-to-r from-[#8B0000] to-[#C62828] text-white"
                                            : "bg-gray-100 text-gray-800"
                                    }`}
                                    style={{
                                        fontFamily: "Inter, sans-serif",
                                        fontSize: "0.875rem",
                                        lineHeight: "1.5",
                                    }}
                                >
                                    {message.sender === "user" ? (
                                        message.text
                                    ) : (
                                        <ReactMarkdown
                                            components={{
                                                p: ({node, ...props}) => <p className="m-0 mb-2 last:mb-0" {...props} />,
                                                ul: ({node, ...props}) => <ul className="list-disc ml-4 mb-2" {...props} />,
                                                ol: ({node, ...props}) => <ol className="list-decimal ml-4 mb-2" {...props} />,
                                                li: ({node, ...props}) => <li className="mb-1" {...props} />,
                                                strong: ({node, ...props}) => <strong className="font-semibold text-gray-900" {...props} />,
                                            }}
                                        >
                                            {message.text}
                                        </ReactMarkdown>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                        {isTyping && (
                            <div className="flex justify-start">
                                <TypingIndicator />
                            </div>
                        )}
                        {/* 4. Added the invisible div anchor at the bottom to scroll to */}
                        <div ref={messagesEndRef} />
                    </div>

                    <div className="p-4 border-t border-gray-200">
                        <div className="flex items-center space-x-2">
                            <input
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="Ask a question..."
                                className="flex-1 p-3 rounded-full bg-gray-100 outline-none focus:ring-2 focus:ring-[#8B0000] transition-all"
                                style={{
                                    fontFamily: "Inter, sans-serif",
                                    fontSize: "0.875rem",
                                }}
                            />
                            <button
                                onClick={handleSend}
                                disabled={isTyping}
                                className={`w-12 h-12 rounded-full text-white flex items-center justify-center transition-all ${
                                    isTyping 
                                        ? "bg-gray-400 cursor-not-allowed" 
                                        : "bg-gradient-to-r from-[#8B0000] to-[#C62828] hover:shadow-lg"
                                }`}
                                style={{
                                    boxShadow: isTyping ? "none" : "0 4px 12px rgba(139, 0, 0, 0.3)",
                                }}
                            >
                                <Send size={20} />
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}