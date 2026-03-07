import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function GuitarOfTheMonth() {
  const guitarRef = useRef(null);
  const sectionRef = useRef(null);
  const labelRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const priceRef = useRef(null);
  const btnRef = useRef(null);
  const imgWrapRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: { trigger: section, start: "top 75%" }
      })
        .fromTo(labelRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 })
        .fromTo(titleRef.current, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2 }, "-=0.4")
        .fromTo(descRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1 }, "-=0.8")
        .fromTo(priceRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, "-=0.6")
        .fromTo(btnRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, "-=0.6")
        .fromTo(imgWrapRef.current, { x: 60, opacity: 0 }, { x: 0, opacity: 1, duration: 1.4 }, "-=1.2");
    });

    const handleMouseMove = (e) => {
      const rect = section.getBoundingClientRect();
      const xPercent = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const yPercent = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      gsap.to(guitarRef.current, {
        rotateY: xPercent * 20,
        rotateX: -yPercent * 8,
        duration: 0.8,
        ease: "power2.out",
        transformPerspective: 1000,
      });
    };

    const handleMouseLeave = () => {
      gsap.to(guitarRef.current, {
        rotateY: 0, rotateX: 0,
        duration: 1, ease: "power3.out",
      });
    };

    section.addEventListener("mousemove", handleMouseMove);
    section.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      ctx.revert();
      section.removeEventListener("mousemove", handleMouseMove);
      section.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-[#0a0a0a] py-32 px-6 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 50% at 60% 50%, rgba(255,255,255,0.04) 0%, transparent 70%)" }}
      />
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16">
        <div className="md:w-1/3 text-white pl-8 md:pl-16">
          <p ref={labelRef} className="text-xs tracking-[0.3em] uppercase text-white/40 mb-4">Guitarra del mes</p>
          <h2 ref={titleRef} className="text-5xl font-bold leading-tight mb-6">Gibson<br />Les Paul</h2>
          <p ref={descRef} className="text-white/50 text-base leading-relaxed mb-8">Un clásico atemporal. El sonido que definió décadas de rock, blues y soul.</p>
          <p ref={priceRef} className="text-2xl font-semibold mb-8">$16,000,000</p>
          <button ref={btnRef} className="px-8 py-3 border border-white/20 rounded-full text-sm tracking-widest uppercase hover:bg-white hover:text-black transition-all duration-300">
            Ver Producto en detalle
          </button>
        </div>
        <div ref={imgWrapRef} className="md:w-2/3 relative flex justify-center items-center" style={{ minHeight: "500px" }}>
          <img
            ref={guitarRef}
            src="/img/GuitarraDelMes.png"
            alt="Gibson Les Paul"
            className="relative z-10 select-none"
            style={{ maxHeight: "480px", width: "auto", transformStyle: "preserve-3d", willChange: "transform", filter: "drop-shadow(0 40px 60px rgba(0,0,0,0.8))" }}
            draggable={false}
          />
        </div>
      </div>
    </section>
  );
}

export default GuitarOfTheMonth;