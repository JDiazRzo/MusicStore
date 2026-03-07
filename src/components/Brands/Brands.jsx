const BRANDS = [
  { name: "Fender",  logo: "/brands/fender.svg" },
  { name: "Gibson",  logo: "/brands/gibson.svg" },
  { name: "Ibanez",  logo: "/brands/ibanez.svg" },
  { name: "PRS",     logo: "/brands/prs.png" },
  { name: "Yamaha",  logo: "/brands/yamaha.svg" },
];

function Brands() {
  return (
    <section className="py-20 px-6 bg-[#0e0e0e]">
      <p className="text-center text-xs tracking-[0.4em] uppercase text-white/30 mb-12">
        Marcas oficiales
      </p>
      <div className="max-w-5xl mx-auto flex flex-wrap justify-center items-center gap-12">
        {BRANDS.map((brand) => (
          <div
            key={brand.name}
            className="group flex items-center justify-center w-32 h-16 opacity-30 hover:opacity-100 transition-opacity duration-300 cursor-pointer"
          >
            <img
              src={brand.logo}
              alt={brand.name}
              className="max-h-10 w-auto object-contain"
              style={{ filter: "brightness(0) invert(1)" }}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

export default Brands;