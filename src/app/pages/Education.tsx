import { useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle, ArrowRight, Droplets } from "lucide-react";
import { VideoCard } from "../components/ui/VideoCard";
import { Chatbot } from "../components/ui/Chatbot";

const educationalVideos = [
  {
    id: "dQw4w9WgXcQ",
    title: "Blood Donation Process Explained",
    description:
      "Learn step-by-step what happens during blood donation from registration to recovery.",
  },
  {
    id: "dQw4w9WgXcQ",
    title: "Who Can Donate Blood?",
    description:
      "Understand eligibility criteria, age requirements, and health conditions for donors.",
  },
  {
    id: "dQw4w9WgXcQ",
    title: "Importance of Blood Donation",
    description:
      "Discover how your donation saves lives and supports medical treatments worldwide.",
  },
];

export default function Education() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div className="min-h-screen py-12 px-6">
      <div className="max-w-7xl mx-auto">

        <h1 className="text-4xl font-bold text-center mb-12 text-red-700">
          Education Dashboard
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {educationalVideos.map((video, index) => (
            <VideoCard
              key={index}
              videoId={video.id}
              title={video.title}
              description={video.description}
            />
          ))}
        </div>

        <button
          onClick={() => setIsChatOpen(!isChatOpen)}
          className="fixed bottom-6 right-6 bg-red-700 text-white px-6 py-3 rounded-full"
        >
          Ask Question
        </button>

        <Chatbot isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
      </div>
    </div>
  );
}