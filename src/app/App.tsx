import { RouterProvider } from "react-router";
import { router } from "./routes";
import { useEffect, useRef } from "react";
import LocomotiveScroll from "locomotive-scroll";
import "locomotive-scroll/dist/locomotive-scroll.css";

export default function App() {

  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const scroll = new LocomotiveScroll({
      el: scrollRef.current as HTMLElement,
      smooth: true,
    });

    return () => {
      scroll.destroy();
    };
  }, []);

  return (
    <div data-scroll-container ref={scrollRef}>
      <RouterProvider router={router} />
    </div>
  );
}