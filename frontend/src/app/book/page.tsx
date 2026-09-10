"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Clock, User, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Book() {
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedBarber, setSelectedBarber] = useState<string | null>(null);

  const services = [
    { name: "Barba Simple", price: "$10.000", duration: "40m" },
    { name: "Solo Corte", price: "$13.000", duration: "1h" },
    { name: "Corte + Cejas", price: "$15.000", duration: "1h" },
    { name: "Corte + Barba Simple", price: "$22.000", duration: "1h 20m" },
    { name: "Corte + Barba Premium", price: "$24.000", duration: "1h 30m" },
    { name: "Full House", price: "$27.000", duration: "2h" },
  ];

  return (
    <main className="min-h-screen bg-[#141210] text-[#ECEAE2] py-24">
      <div className="max-w-3xl mx-auto px-6">
        <Link href="/" className="inline-flex items-center gap-2 text-[#8a8880] hover:text-white mb-12 transition-colors">
          <ArrowLeft size={18} /> Volver al inicio
        </Link>
        
        <div className="mb-12">
          <h1 className="text-4xl font-['Oswald'] uppercase mb-2">Agendar Cita</h1>
          <p className="text-[#8a8880]">Completa los pasos para reservar tu hora en BlvckWhite Barbería.</p>
        </div>

        {/* Progress bar */}
        <div className="flex gap-2 mb-12">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className={`h-1 flex-1 rounded-full ${step >= i ? 'bg-[#c0272d]' : 'bg-[#39362f]'}`} />
          ))}
        </div>

        {/* Steps */}
        <motion.div 
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-[#1d1a17] border border-[#39362f] p-8"
        >
          {step === 1 && (
            <div>
              <h2 className="text-xl font-['Oswald'] uppercase mb-6 flex items-center gap-2">
                <span className="bg-[#ECEAE2] text-black w-6 h-6 flex items-center justify-center rounded-full text-xs">1</span>
                Selecciona un servicio
              </h2>
              <div className="grid gap-4">
                {services.map((svc) => (
                  <button 
                    key={svc.name}
                    onClick={() => { setSelectedService(svc.name); setStep(2); }}
                    className="flex justify-between items-center p-4 border border-[#39362f] hover:border-[#c0272d] bg-[#141210] text-left transition-colors group"
                  >
                    <div>
                      <strong className="block font-medium group-hover:text-[#c0272d] transition-colors">{svc.name}</strong>
                      <span className="text-[#8a8880] text-sm">{svc.duration}</span>
                    </div>
                    <span className="font-medium text-[#ECEAE2]">{svc.price}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="text-xl font-['Oswald'] uppercase mb-6 flex items-center gap-2">
                <span className="bg-[#ECEAE2] text-black w-6 h-6 flex items-center justify-center rounded-full text-xs">2</span>
                Selecciona tu barbero
              </h2>
              <div className="grid grid-cols-2 gap-4 mb-8">
                <button onClick={() => { setSelectedBarber("Ismael Jara"); setStep(3); }} className="p-6 border border-[#39362f] hover:border-[#c0272d] bg-[#141210] text-center transition-colors group">
                  <div className="w-16 h-16 bg-[#39362f] rounded-full mx-auto mb-4 flex items-center justify-center overflow-hidden">
                    <User className="text-[#8a8880] group-hover:text-[#ECEAE2] transition-colors" size={32} />
                  </div>
                  <strong className="block font-medium group-hover:text-[#c0272d] transition-colors">Ismael Jara</strong>
                  <span className="text-xs text-[#8a8880]">Fundador</span>
                </button>
                <button onClick={() => { setSelectedBarber("Cualquier Barbero"); setStep(3); }} className="p-6 border border-[#39362f] hover:border-[#c0272d] bg-[#141210] text-center transition-colors group">
                  <div className="w-16 h-16 bg-[#39362f] rounded-full mx-auto mb-4 flex items-center justify-center">
                    <User className="text-[#8a8880] group-hover:text-[#ECEAE2] transition-colors" size={32} />
                  </div>
                  <strong className="block font-medium group-hover:text-[#c0272d] transition-colors">Cualquier Barbero</strong>
                  <span className="text-xs text-[#8a8880]">Próximo disponible</span>
                </button>
              </div>
              <button onClick={() => setStep(1)} className="text-sm text-[#8a8880] hover:text-white">Volver al paso 1</button>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 className="text-xl font-['Oswald'] uppercase mb-6 flex items-center gap-2">
                <span className="bg-[#ECEAE2] text-black w-6 h-6 flex items-center justify-center rounded-full text-xs">3</span>
                Fecha y Hora
              </h2>
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <label className="block text-sm text-[#8a8880] mb-2">Selecciona un día</label>
                  <input type="date" className="w-full bg-[#141210] border border-[#39362f] p-3 text-[#ECEAE2] outline-none focus:border-[#c0272d]" />
                </div>
                <div>
                  <label className="block text-sm text-[#8a8880] mb-2">Horas disponibles ({selectedBarber})</label>
                  <div className="grid grid-cols-2 gap-2">
                    {/* Simulated dynamic availability logic */}
                    {(selectedBarber === "Ismael Jara" ? ['10:00', '13:00', '15:30'] : ['10:00', '11:30', '13:00', '15:30', '17:00']).map(t => (
                      <button key={t} onClick={() => setStep(4)} className="p-3 border border-[#39362f] hover:border-[#c0272d] bg-[#141210] text-sm text-center transition-colors">
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <button onClick={() => setStep(2)} className="text-sm text-[#8a8880] hover:text-white">Volver al paso 2</button>
            </div>
          )}

          {step === 4 && (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 size={32} />
              </div>
              <h2 className="text-3xl font-['Oswald'] uppercase mb-4">Cita Confirmada</h2>
              <p className="text-[#8a8880] mb-8">Tu reserva para <strong className="text-white">{selectedService}</strong> con <strong className="text-white">{selectedBarber}</strong> ha sido agendada exitosamente. Te enviaremos un WhatsApp con los detalles.</p>
              
              <Link href="/" className="inline-block bg-[#ECEAE2] text-[#141210] px-8 py-4 font-medium hover:bg-[#c0272d] hover:text-white transition-colors">
                Volver al Inicio
              </Link>
            </div>
          )}
        </motion.div>
      </div>
    </main>
  );
}
