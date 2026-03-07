import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Send, MessageCircle } from "lucide-react";

interface Message {
    id: number;
    text: string;
    sender: "user" | "bot";
}

interface ChatbotProps {
    isOpen: boolean;
    onClose: () => void;
}

const bloodDonationFAQs: { [key: string]: string } = {
    "who can donate blood": "Most healthy adults aged 17-65 who weigh at least 50kg can donate blood. You must be in good health and feeling well on the day of donation.",
    "how often can someone donate": "Whole blood can be donated every 56 days (about 8 weeks). Platelet donors can donate more frequently, up to 24 times per year.",
    "what are blood types": "There are 8 main blood types: A+, A-, B+, B-, AB+, AB-, O+, and O-. O- is the universal donor, while AB+ is the universal recipient.",
    "how long does donation take": "The entire donation process takes about 45-60 minutes, but the actual blood draw only takes 8-10 minutes.",
    "is it safe": "Yes, blood donation is very safe. Sterile, single-use equipment is used for each donor, making it impossible to contract diseases.",
    "what happens after": "After donation, rest for 10-15 minutes and have refreshments. Drink plenty of fluids and avoid strenuous activity for the rest of the day.",
    "can i donate if": "Eligibility depends on various factors including medications, travel history, and health conditions. Consult with donation center staff for specific cases.",
    "why donate": "Blood donation saves lives. One donation can help up to three patients. There's always a need for blood, especially during emergencies.",
};

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

    const findAnswer = (question: string): string => {
        const lowerQuestion = question.toLowerCase();
        for (const [key, value] of Object.entries(bloodDonationFAQs)) {
            if (lowerQuestion.includes(key)) {
                return value;
            }
        }
        return "I'm not sure about that specific question. For detailed information, please consult with your local blood donation center or healthcare provider.";
    };

    const handleSend = () => {
        if (inputValue.trim() === "") return;

        const userMessage: Message = {
            id: Date.now(),
            text: inputValue,
            sender: "user",
        };

        setMessages((prev) => [...prev, userMessage]);
        setInputValue("");
        setIsTyping(true);

        setTimeout(() => {
            const botResponse: Message = {
                id: Date.now() + 1,
                text: findAnswer(inputValue),
                sender: "bot",
            };
            setMessages((prev) => [...prev, botResponse]);
            setIsTyping(false);
        }, 1500);
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
                                    Online
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

                    <div className="flex-1 overflow-y-auto p-6 space-y-4">
                        {messages.map((message) => (
                            <motion.div
                                key={message.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"
                                    }`}
                            >
                                <div
                                    className={`max-w-[75%] p-4 rounded-2xl ${message.sender === "user"
                                            ? "bg-gradient-to-r from-[#8B0000] to-[#C62828] text-white"
                                            : "bg-gray-100 text-gray-800"
                                        }`}
                                    style={{
                                        fontFamily: "Inter, sans-serif",
                                        fontSize: "0.875rem",
                                        lineHeight: "1.5",
                                    }}
                                >
                                    {message.text}
                                </div>
                            </motion.div>
                        ))}
                        {isTyping && (
                            <div className="flex justify-start">
                                <TypingIndicator />
                            </div>
                        )}
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
                                className="w-12 h-12 rounded-full bg-gradient-to-r from-[#8B0000] to-[#C62828] text-white flex items-center justify-center hover:shadow-lg transition-all"
                                style={{
                                    boxShadow: "0 4px 12px rgba(139, 0, 0, 0.3)",
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
