import { useEffect, useRef } from "react";
import gsap from "gsap";

function Loader({ onComplete }) {
  const loaderRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();

    tl.to(loaderRef.current, {
      opacity: 0,
      duration: 0.8,
      delay: 1.2,
      ease: "power2.out",
      onComplete
    });
  }, []);

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center gap-4"
    >
      <p
        className="text-white text-5xl font-bold"
        style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.1em" }}
      >
        MUSIC STORE
      </p>
      <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
    </div>
  );
}

export default Loader;