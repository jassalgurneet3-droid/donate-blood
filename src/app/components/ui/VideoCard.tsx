import { motion } from "framer-motion";

interface VideoCardProps {
  videoId: string;
  title: string;
  description: string;
}

export function VideoCard({ videoId, title, description }: VideoCardProps) {
  return (
    <motion.div
      className="bg-white rounded-2xl overflow-hidden shadow-lg transition-all duration-200"
      whileHover={{
        y: -8,
        scale: 1.02,
        boxShadow: "0 10px 30px rgba(139, 0, 0, 0.3)",
      }}
      style={{
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      }}
    >
      <div className="aspect-video w-full">
        <iframe
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${videoId}`}
          title={title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full"
        ></iframe>
      </div>

      <div className="p-6">
        <h3
          className="mb-2"
          style={{
            fontFamily: "Oswald, sans-serif",
            fontSize: "1.25rem",
            fontWeight: 600,
            color: "#8B0000",
          }}
        >
          {title}
        </h3>

        <p
          className="text-gray-600"
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "0.875rem",
            lineHeight: "1.5",
          }}
        >
          {description}
        </p>
      </div>
    </motion.div>
  );
}