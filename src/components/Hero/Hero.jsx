import { useEffect, useRef } from "react";
import gsap from "gsap";
import Grainient from "../Grainient/Grainient";
import ShinyText from "../ShinyText/ShinyText";

function Hero() {
  const titleRef = useRef(null);
  const textRef = useRef(null);
  const btnRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.timeline({ defaults: { ease: "power3.out" } })
        .fromTo(titleRef.current,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.5 }
        )
        .fromTo(textRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.2 },
          "-=1"
        )
        .fromTo(btnRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 1 },
          "-=0.8"
        );
    });

    return () => ctx.revert();
  }, []);



  return (
    <section className="relative h-screen flex text-white">
      
      <div className="absolute inset-0 -z-10">
        <Grainient
          color1="#000000"
          color2="#726e6e"
          color3="#fafafa"
          timeSpeed={0.9}
          colorBalance={0}
          warpStrength={1}
          warpFrequency={2}
          warpSpeed={2}
          warpAmplitude={50}
          blendAngle={-20}
          blendSoftness={0.05}
          rotationAmount={500}
          noiseScale={2}
          grainAmount={0.1}
          grainScale={2}
          grainAnimated
          contrast={1.5}
          gamma={1}
          saturation={1}
          centerX={0}
          centerY={0}
          zoom={0.9}
        />
      </div>

      {/* Botón arriba derecha */}
      <div ref={btnRef} className="absolute top-8 right-6 md:right-8">
        <button
          onClick={() => document.getElementById("categorias").scrollIntoView({ behavior: "smooth" })}
          className="px-4 py-2 md:px-6 md:py-3 text-sm md:text-base text-white bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl shadow-lg hover:bg-white/20 transition-all duration-300"
        >
          Mirar Tienda
        </button>
      </div>

      {/* Título abajo izquierda */}
      <div ref={titleRef} className="absolute bottom-36 md:bottom-12 left-6 md:left-10">
        <h1 
          className="font-bold leading-none"
          style={{
            fontSize: "clamp(3.5rem, 10vw, 11rem)",
            fontFamily: "'Bebas Neue', sans-serif",
            letterSpacing: "0.02em"
          }}
        >
          Music<br />Store
        </h1>
      </div>

      {/* Texto abajo derecha */}
      <div ref={textRef} className="absolute bottom-36 md:bottom-24 right-6 md:right-10 text-right max-w-[180px] md:max-w-xs">
        <ShinyText
          text={"ENCUENTRA TU SONIDO\nIDEAL CON NOSOTROS"}
          speed={4}
          delay={0}
          color="#c9a84c"
          shineColor="#ffe566"
          spread={120}
          direction="left"
          yoyo={false}
          pauseOnHover={false}
          disabled={false}
          className={"whitespace-pre text-sm md:text-base font-bold"}
          style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.10em" }}
        />
      </div>
        
    </section>
  );
}

export default Hero;