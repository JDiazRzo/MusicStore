import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CircularGallery from "../CircularGallery/CircularGallery";
import GuitarOfTheMonth from "../GuitarOfTheMth/GuitarOfTheMonth";
import Squares from "../Squares/Squares";
import Brands from "../Brands/Brands";

gsap.registerPlugin(ScrollTrigger);

function Body() {
  const titleRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1.2, ease: "power3.out",
          scrollTrigger: { trigger: titleRef.current, start: "top 85%" }
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="bg-[#0e0e0e] text-white">

   
        <div className="py-20 px-1">
            <h2 ref={titleRef} className="text-4xl font-semibold mb-16 text-center tracking-wide">
                CATEGORIAS
            </h2>
            <div id="categorias" style={{ height: "600px", position: "relative" }}>
                <CircularGallery 
                    bend={1}
                    textColor="#ffffff"
                    borderRadius={0.05}
                    scrollSpeed={2}
                    scrollEase={0.05}
                    items={[
                    { image: "/img/guitarras.jpg", text: "Guitarras" },
                    { image: "/img/bajos.jpg",     text: "Bajos" },
                    { image: "/img/baterias.jpg",  text: "Baterías" },
                    { image: "/img/teclados.jpg",  text: "Teclados" },
                    ]}
                />
            </div>
        </div>

     
      <div className="max-w-5xl mx-auto px-6">
        <div className="border-t border-white/5" />
      </div>

    
      <section className="relative w-full overflow-hidden py-32">
        <div className="absolute inset-0 z-0">
          <Squares
            speed={0.5}
            squareSize={40}
            direction="diagonal"
            borderColor="#726e6e"
            hoverFillColor="#222"
          />
        </div>
        <div className="relative z-10 mx-6 md:mx-24 rounded-3xl bg-[#0a0a0a]/80 backdrop-blur-sm border border-white/5 overflow-hidden">
          <GuitarOfTheMonth />
        </div>
      </section>

     
      <div className="max-w-5xl mx-auto px-6">
        <div className="border-t border-white/5" />
      </div>

      <div className="py-32">
        <Brands />
      </div>

      <footer className="text-center py-12 bg-black">
        <p className="text-white/30 text-sm tracking-widest uppercase">© 2026 MusicStore</p>
      </footer>

    </div>
  );
}

export default Body;