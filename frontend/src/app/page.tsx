"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Scissors, Calendar, MapPin, Phone, Clock, ArrowRight, Star, ShieldCheck, TrendingUp, Play } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const services = [
  { name: "Barba Simple", duration: "40 min", price: "$10.000", desc: "Perfilado de barba con asesoría + Aplicación de productos" },
  { name: "Solo Corte", duration: "1 hrs", price: "$13.000", desc: "Corte de Cabello + Agua" },
  { name: "Corte + Cejas", duration: "1 hrs", price: "$15.000", desc: "Corte de cabello + Perfilado de cejas + Aplicación de productos" },
  { name: "Corte + Barba Simple", duration: "1h 20m", price: "$22.000", desc: "Corte de cabello + Barba (Trimer - Shaver)" },
  { name: "Corte + Barba Premium", duration: "1h 30m", price: "$24.000", desc: "Corte de cabello + barba (Premium)" },
  { name: "Full House", duration: "2 hrs", price: "$27.000", desc: "Asesoría + Corte + Perfilado de barba y cejas + Limpieza Facial" },
  { name: "Ondulación Permanente", duration: "3 hrs", price: "$60.000", desc: "Ondulación permanente (Desde los 60.000)" },
];

const carouselImages = [
  "/assets/instagram/post-1.jpg",
  "/assets/instagram/post-3.jpg",
  "/assets/instagram/post-6.jpg",
  "/assets/instagram/post-7.jpg",
];

const localVideos = [
  "/assets/videos/video-1.mp4",
  "/assets/videos/video-2.mp4",
  "/assets/videos/video-3.mp4"
];

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [currentImg, setCurrentImg] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Carousel timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImg((prev) => (prev + 1) % carouselImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <main className="min-h-screen bg-[#0a0908] text-[#ECEAE2] overflow-x-hidden">
      {/* HEADER */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-[#0a0908]/95 backdrop-blur-md py-4 border-b border-[#39362f]' : 'py-6 bg-transparent'}`}>
        <div className="wrap flex items-center justify-between">
          <div className="font-['Oswald'] font-bold text-xl tracking-wider flex items-center gap-1">
            <span>BLVCK</span>
            <span className="bg-[#ECEAE2] text-[#141210] px-1">WHITE</span>
          </div>
          <nav className="hidden md:flex gap-8 text-sm text-[#c9c7bd]">
            <a href="#sobre" className="hover:text-white transition-colors">Sobre</a>
            <a href="#servicios" className="hover:text-white transition-colors">Servicios</a>
            <a href="#reels" className="hover:text-white transition-colors">Videos</a>
            <a href="#galeria" className="hover:text-white transition-colors">Galería</a>
          </nav>
          <Link href="/book" className="border border-[#ECEAE2] px-5 py-2 text-sm hover:bg-[#ECEAE2] hover:text-[#141210] transition-colors">
            Reservar
          </Link>
        </div>
      </header>

      {/* HERO SECTION WITH AUTHENTIC VIDEO BACKGROUND & CAROUSEL */}
      <section className="relative min-h-[90vh] flex items-center pt-28 pb-24 overflow-hidden">
        {/* Authentic Background Video (Darkened) */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline
            className="absolute top-1/2 left-1/2 w-[120%] h-[120%] object-cover -translate-x-1/2 -translate-y-1/2 opacity-25 blur-sm"
          >
            <source src="/assets/videos/video-2.mp4" type="video/mp4" />
          </video>
          {/* Gradients to ensure text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0908] via-[#0a0908]/90 to-[#0a0908]/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0908] via-transparent to-[#0a0908]/50" />
        </div>

        <div className="wrap relative z-10 grid md:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-center w-full">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="w-10 h-[1px] bg-[#c0272d]"></span>
              <span className="text-[#c0272d] font-medium text-sm tracking-widest uppercase">Barbería · San Bernardo</span>
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-[5rem] font-['Oswald'] uppercase leading-[1.05] mb-6">
              Corte limpio.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-[#8a8880]">Actitud blvck & white.</span>
            </h1>
            <p className="text-[#c9c7bd] text-lg max-w-md mb-10 leading-relaxed font-light">
              Expertos en cortes precisos y perfilado de barba. Disfruta de un ambiente premium en San Bernardo diseñado exclusivamente para ti.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/book" className="bg-[#ECEAE2] text-[#141210] px-8 py-4 font-semibold hover:bg-[#c0272d] hover:text-white transition-all transform hover:-translate-y-1 flex items-center justify-center gap-3 group">
                <Calendar size={18} className="group-hover:animate-bounce" /> Agendar Cita
              </Link>
              <a href="https://wa.me/56959246529" target="_blank" rel="noreferrer" className="border border-[#39362f] bg-black/40 backdrop-blur-md px-8 py-4 font-medium hover:border-[#ECEAE2] hover:bg-white/5 transition-all transform hover:-translate-y-1 flex items-center justify-center gap-3">
                <Phone size={18} /> WhatsApp
              </a>
            </div>
          </motion.div>

          {/* Animated Carousel Banner (Restored) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative aspect-[4/5] max-w-md mx-auto w-full border border-[#39362f]/50 bg-[#141210] overflow-hidden group shadow-2xl rounded-sm"
          >
            <AnimatePresence mode="wait">
              <motion.img 
                key={currentImg}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                src={carouselImages[currentImg]}
                alt="BlvckWhite Trabajo" 
                className="absolute inset-0 w-full h-full object-cover"
              />
            </AnimatePresence>
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
            
            {/* Carousel Indicators */}
            <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
              <div className="bg-black/40 backdrop-blur-md px-4 py-2 border border-white/10 text-xs flex items-center gap-2 rounded-sm shadow-xl">
                <div className="w-1.5 h-1.5 bg-[#c0272d] rounded-full animate-pulse" />
                @blvckwhite.cl
              </div>
              <div className="flex gap-2">
                {carouselImages.map((_, i) => (
                  <div key={i} className={`h-1 transition-all duration-500 rounded-full ${i === currentImg ? 'w-6 bg-[#c0272d]' : 'w-2 bg-white/30'}`} />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* METRICS SECTION */}
      <section className="py-12 sm:py-16 bg-[#141210] border-y border-[#39362f] relative z-20">
        <div className="wrap grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
          {[
            { icon: <Star className="w-8 h-8 text-[#c0272d] mb-4" />, title: "Calidad Premium", desc: "Cortes modernos y clásicos con navaja y tijera, al mejor nivel." },
            { icon: <ShieldCheck className="w-8 h-8 text-[#c0272d] mb-4" />, title: "Garantía de Estilo", desc: "Asesoría personalizada según tu tipo de rostro y preferencias." },
            { icon: <TrendingUp className="w-8 h-8 text-[#c0272d] mb-4" />, title: "100% Digital", desc: "Reserva rápida y fácil desde nuestra plataforma o app." },
          ].map((m, i) => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              key={i} 
              className="p-6 sm:p-8 bg-[#1a1816] border border-[#39362f] hover:border-[#c0272d]/50 transition-colors rounded-xl shadow-lg"
            >
              {m.icon}
              <h3 className="font-['Oswald'] text-xl mb-2">{m.title}</h3>
              <p className="text-[#8a8880] text-sm leading-relaxed">{m.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* NATIVE VIDEOS SECTION */}
      <section id="reels" className="py-24 sm:py-32 relative overflow-hidden">
        <div className="wrap">
           <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center text-center pb-6 mb-12 sm:mb-16"
          >
            <span className="font-['Oswald'] text-[#c0272d] tracking-widest mb-4 block text-sm">EN MOVIMIENTO</span>
            <h2 className="text-4xl md:text-5xl uppercase">Nuestros Trabajos</h2>
            <p className="text-[#8a8880] mt-4 max-w-xl mx-auto">Conoce el detalle y la dedicación en cada uno de nuestros cortes a través de nuestros videos destacados.</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
            {localVideos.map((videoSrc, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="w-full flex justify-center"
              >
                <div className="relative w-full max-w-[350px] aspect-[9/16] bg-[#141210] rounded-xl overflow-hidden border border-[#39362f] shadow-xl group cursor-pointer hover:border-[#c0272d]/50 transition-colors duration-300">
                  <video 
                    src={videoSrc}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Overlay gradient for styling */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0908] via-transparent to-transparent opacity-60 pointer-events-none" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="sobre" className="py-24 sm:py-32 bg-[#141210] relative overflow-hidden border-t border-[#39362f]">
        <div className="absolute right-0 top-0 w-1/3 h-full bg-[#c0272d]/5 blur-[150px] pointer-events-none rounded-full" />
        <div className="wrap relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center text-center pb-6 mb-12 sm:mb-16"
          >
            <span className="font-['Oswald'] text-[#c0272d] tracking-widest mb-4 block text-sm">01 / HISTORIA</span>
            <h2 className="text-4xl md:text-5xl uppercase">Sobre Nosotros</h2>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-12 sm:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-[#c9c7bd] text-lg leading-relaxed mb-6">
                Somos una barbería especializada en cortes de pelo corto, brindando un servicio profesional y personalizado para hombres que buscan estilo, confort y calidad. Ofrecemos cortes clásicos, modernos y en tendencia, realizados con tijeras y navajas, siempre buscando resaltar la mejor versión de cada cliente.
              </p>
              <p className="text-[#c9c7bd] text-lg leading-relaxed">
                Además, nos especializamos en el mantenimiento y cuidado de barba, asegurándonos de que luzca impecable y bien definida. Te esperamos para que disfrutes de un servicio de calidad y un ambiente relajado, diseñado para que te sientas cómodo y seguro de tu look.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-[#0a0908] border border-[#39362f] p-6 sm:p-8 rounded-xl shadow-2xl relative"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#c0272d] to-transparent rounded-t-xl" />
              <ul className="space-y-6">
                <li className="flex gap-4 items-start pb-6 border-b border-[#39362f]/50">
                  <MapPin className="text-[#c0272d] shrink-0 mt-1" />
                  <div>
                    <strong className="block font-['Oswald'] tracking-wide mb-1 text-white">DIRECCIÓN</strong>
                    <span className="text-[#8a8880] text-sm sm:text-base">Eyzaguirre 530, San Bernardo, Chile</span>
                  </div>
                </li>
                <li className="flex gap-4 items-start pb-6 border-b border-[#39362f]/50">
                  <Clock className="text-[#c0272d] shrink-0 mt-1" />
                  <div>
                    <strong className="block font-['Oswald'] tracking-wide mb-1 text-white">HORARIO</strong>
                    <span className="text-[#8a8880] text-sm sm:text-base">Lunes a Sábado - Atención solo por reserva</span>
                  </div>
                </li>
                <li className="flex gap-4 items-start">
                  <InstagramIcon className="text-[#c0272d] shrink-0 mt-1" />
                  <div>
                    <strong className="block font-['Oswald'] tracking-wide mb-1 text-white">INSTAGRAM</strong>
                    <a href="https://instagram.com/blvckwhite.cl" target="_blank" rel="noreferrer" className="text-[#8a8880] hover:text-[#c0272d] transition-colors text-sm sm:text-base">@blvckwhite.cl</a>
                  </div>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="servicios" className="py-24 sm:py-32">
        <div className="wrap">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row sm:justify-between sm:items-end border-b border-[#39362f] pb-6 mb-12 sm:mb-16 gap-4"
          >
            <div>
              <span className="font-['Oswald'] text-[#c0272d] tracking-widest mb-2 block text-sm">02 / MENÚ</span>
              <h2 className="text-4xl md:text-5xl uppercase">Servicios</h2>
            </div>
            <div>
              <Link href="/book" className="text-sm font-medium text-[#ECEAE2] hover:text-[#c0272d] transition-colors border-b border-transparent hover:border-[#c0272d] pb-1">Ver todos los servicios</Link>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {services.map((svc, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-[#141210] border border-[#39362f] rounded-xl p-6 sm:p-8 hover:border-[#c0272d]/70 transition-all duration-300 group flex flex-col justify-between shadow-lg hover:shadow-xl hover:-translate-y-1"
              >
                <div>
                  <div className="flex justify-between items-start mb-4 gap-4">
                    <h3 className="font-['Oswald'] uppercase text-xl group-hover:text-[#c0272d] transition-colors leading-tight">{svc.name}</h3>
                    <span className="text-[#ECEAE2] font-semibold shrink-0 bg-[#0a0908] px-3 py-1 text-sm border border-[#39362f] rounded-md">{svc.price}</span>
                  </div>
                  <p className="text-[#8a8880] text-sm mb-6 leading-relaxed">{svc.desc}</p>
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-[#39362f]/50">
                  <span className="text-xs text-[#8a8880] flex items-center gap-1 font-medium"><Clock size={14} className="text-[#c0272d]"/> {svc.duration}</span>
                  <Link href="/book" className="text-[#c0272d] hover:text-white transition-colors opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 duration-300">
                    <ArrowRight size={20} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section id="galeria" className="py-24 sm:py-32 bg-[#141210] border-t border-[#39362f]">
        <div className="wrap">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center text-center pb-6 mb-12 sm:mb-16"
          >
            <span className="font-['Oswald'] text-[#c0272d] tracking-widest mb-4 block text-sm">03 / TRABAJOS</span>
            <h2 className="text-4xl md:text-5xl uppercase">Galería</h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4">
            {[2, 3, 4, 5, 6, 7, 8, 9].map((num, i) => (
              <motion.div 
                key={num}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative aspect-square overflow-hidden group bg-[#0a0908] rounded-lg sm:rounded-xl"
              >
                <img 
                  src={`/assets/instagram/post-${num}.jpg`} 
                  alt={`Trabajo ${i+1}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#c0272d]/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <InstagramIcon className="text-white w-8 h-8 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-100" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-[#39362f] bg-[#0a0908] py-12 text-[#8a8880] text-sm">
        <div className="wrap flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="font-['Oswald'] text-lg text-white">BLVCK<span className="bg-white text-black px-1 ml-1 rounded-sm">WHITE</span></span>
          </div>
          <p className="text-center md:text-left">© {new Date().getFullYear()} BlvckWhite Barbería. San Bernardo.</p>
          <div className="flex gap-6 font-medium">
            <a href="https://instagram.com/blvckwhite.cl" className="hover:text-[#c0272d] transition-colors">Instagram</a>
            <a href="https://wa.me/56959246529" className="hover:text-[#c0272d] transition-colors">WhatsApp</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
