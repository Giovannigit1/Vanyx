"use client";

import { useState } from "react";
import { Clock, Plus, ChevronLeft, ChevronRight, User, Scissors, Calendar, MapPin, Check, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { Header } from "@/components/dashboard/Header";
import { Modal } from "@/components/ui/Modal";
import { useRole } from "@/context/RoleContext";

export default function Dashboard() {
  const [currentDate] = useState(new Date("2026-10-12"));
  const { role, barberName } = useRole();
  const allBarbers = ["Ismael Jara", "Matías", "Barbero 3"];
  
  // Si es Administrador, ve todos. Si es Barbero, ve solo su columna
  const barbers = role === "Administrador" ? allBarbers : [barberName];
  
  const [selectedApt, setSelectedApt] = useState<any>(null);
  const [isNewAptModalOpen, setIsNewAptModalOpen] = useState(false);
  
  // Time slots from 10:00 to 19:00
  const timeSlots = Array.from({ length: 19 }, (_, i) => {
    const hour = Math.floor(i / 2) + 10;
    const minutes = i % 2 === 0 ? "00" : "30";
    return `${hour}:${minutes}`;
  });

  const appointments = [
    { id: 1, barberName: "Ismael Jara", client: "Tomás Pérez", phone: "+56 9 1234 5678", service: "Full House", price: "$20.000", startIdx: 0, duration: 4, status: "Completado", color: "bg-emerald-500", note: "Cliente frecuente, prefiere degradado alto." },
    { id: 2, barberName: "Matías", client: "Nicolás Rojas", phone: "+56 9 8765 4321", service: "Solo Corte", price: "$12.000", startIdx: 1, duration: 2, status: "En curso", color: "bg-blue-600", note: "" },
    { id: 3, barberName: "Ismael Jara", client: "Sebastián Silva", phone: "+56 9 1122 3344", service: "Barba Simple", price: "$8.000", startIdx: 6, duration: 1, status: "Pendiente", color: "bg-indigo-500", note: "Llega 5 min tarde." },
    { id: 4, barberName: "Barbero 3", client: "Carlos Gómez", phone: "+56 9 5566 7788", service: "Corte + Cejas", price: "$14.000", startIdx: 10, duration: 2, status: "Pendiente", color: "bg-amber-500", note: "" },
    { id: 5, barberName: "Matías", client: "Juan Soto", phone: "+56 9 9988 7766", service: "Full House", price: "$20.000", startIdx: 4, duration: 3, status: "Pendiente", color: "bg-blue-600", note: "VIP" },
  ];

  const getWhatsAppLink = (phone: string) => {
    const cleanPhone = phone.replace(/\D/g, '');
    return `https://wa.me/${cleanPhone}`;
  };

  return (
    <>
      <Header title="Agenda Diaria" />
      
      {/* CALENDAR TOOLBAR */}
      <div className="bg-white px-4 md:px-6 py-3 md:py-4 border-b border-gray-200 flex flex-col md:flex-row md:items-center justify-between shrink-0 gap-3 md:gap-4 shadow-sm relative z-20">
        <div className="flex items-center justify-between md:justify-start gap-4 w-full md:w-auto">
          <button className="px-3 md:px-4 py-2 border border-gray-200 shadow-sm rounded-lg text-xs md:text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors">Hoy</button>
          <div className="flex items-center gap-1 md:gap-2 bg-gray-50 rounded-lg p-1 border border-gray-100 flex-1 md:flex-none justify-center">
            <button className="p-1.5 text-gray-500 hover:bg-white hover:shadow-sm rounded-md transition-all"><ChevronLeft size={18}/></button>
            <h2 className="text-xs md:text-sm font-bold text-gray-800 w-32 md:w-48 text-center capitalize tracking-tight truncate">
              12 Oct 2026
            </h2>
            <button className="p-1.5 text-gray-500 hover:bg-white hover:shadow-sm rounded-md transition-all"><ChevronRight size={18}/></button>
          </div>
        </div>
        
        <div className="flex items-center justify-end gap-3 w-full md:w-auto">
          <select className="border border-gray-200 text-sm rounded-lg px-3 md:px-4 py-2 bg-gray-50 font-medium outline-none hidden md:block focus:ring-2 focus:ring-[#3B82F6]">
            <option>San Bernardo</option>
            <option>Todos los locales</option>
          </select>
          <button 
            onClick={() => setIsNewAptModalOpen(true)}
            className="bg-[#2C323F] hover:bg-[#1F2430] text-white px-4 md:px-5 py-2 md:py-2.5 rounded-lg text-xs md:text-sm font-semibold flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 w-full md:w-auto"
          >
            <Plus size={18} /> Nueva Cita
          </button>
        </div>
      </div>

      {/* CALENDAR GRID */}
      <div className="flex-1 overflow-x-auto overflow-y-auto bg-gray-50 flex relative">
        {/* Time Column */}
        <div className="w-16 md:w-20 shrink-0 border-r border-gray-200 bg-white sticky left-0 z-20 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.05)]">
          <div className="h-14 border-b border-gray-200 bg-white sticky top-0 z-30"></div>
          {timeSlots.map((time, i) => (
            <div key={i} className="h-20 border-b border-gray-100 relative">
              <span className="absolute -top-3 right-2 md:right-4 text-[10px] md:text-xs text-gray-400 font-semibold">{i % 2 === 0 ? time : ''}</span>
            </div>
          ))}
        </div>
        
        {/* Barbers Columns */}
        <div className="flex-1 min-w-[300px] flex">
          {barbers.map((barber, bIdx) => (
            <div key={bIdx} className="flex-1 border-r border-gray-200 relative min-w-[250px] bg-white">
              {/* Header */}
              <div className="h-14 border-b border-gray-200 bg-white flex flex-col items-center justify-center sticky top-0 z-10 shadow-sm">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 font-bold text-[10px]">
                    {barber.substring(0,2).toUpperCase()}
                  </div>
                  <span className="text-sm font-bold text-gray-800">{barber}</span>
                </div>
              </div>
              
              {/* Grid Lines */}
              <div className="relative">
                {timeSlots.map((_, i) => (
                  <div key={i} className={`h-20 border-b ${i % 2 === 0 ? 'border-gray-200' : 'border-gray-100 border-dashed'} hover:bg-blue-50/50 cursor-crosshair transition-colors`}></div>
                ))}
                
                {/* Appointments */}
                {appointments.filter(a => a.barberName === barber).map((apt) => (
                  <motion.div 
                    key={apt.id}
                    onClick={() => setSelectedApt(apt)}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`absolute left-2 right-2 rounded-xl p-3 shadow-md text-white overflow-hidden cursor-pointer hover:shadow-lg transition-all border border-white/20 group ${apt.color}`}
                    style={{ 
                      top: `${apt.startIdx * 80 + 4}px`, 
                      height: `${apt.duration * 80 - 8}px`,
                      zIndex: 5
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none"></div>
                    <div className="relative z-10 flex flex-col h-full">
                      <div className="font-bold text-sm leading-tight truncate drop-shadow-sm">{apt.client}</div>
                      <div className="text-xs opacity-90 truncate mt-0.5 font-medium">{apt.service}</div>
                      
                      {apt.duration > 1 && (
                        <div className="mt-auto text-xs opacity-90 font-semibold flex items-center gap-1.5 bg-black/20 self-start px-2 py-1 rounded-md backdrop-blur-sm">
                          <Clock size={10} /> 
                          {timeSlots[apt.startIdx]}
                        </div>
                      )}
                      
                      {apt.status === "Completado" && (
                        <div className="absolute top-2 right-2 bg-white/20 rounded-full p-0.5 backdrop-blur-sm">
                          <Check size={12} className="text-white" />
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}

                {/* Current Time Indicator Line (Mock) */}
                <div className="absolute left-0 right-0 h-0.5 bg-red-500 z-10 pointer-events-none shadow-[0_0_8px_rgba(239,68,68,0.5)]" style={{ top: '200px' }}>
                  <div className="absolute -left-2 -top-1.5 w-3.5 h-3.5 rounded-full bg-red-500 border-2 border-white shadow-sm"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Appointment Detail Modal */}
      <Modal isOpen={!!selectedApt} onClose={() => setSelectedApt(null)} title="Detalles de la Reserva">
        {selectedApt && (
          <div className="space-y-5 text-sm text-gray-700">
            <div className="flex items-center justify-between bg-gray-50/80 p-4 rounded-xl border border-gray-100">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white shadow-inner ${selectedApt.color}`}>
                  <User size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-lg">{selectedApt.client}</h4>
                  <p className="text-gray-500 font-medium">{selectedApt.phone}</p>
                </div>
              </div>
              <a 
                href={getWhatsAppLink(selectedApt.phone)} 
                target="_blank" 
                rel="noreferrer"
                className="bg-[#25D366] hover:bg-[#20bd5a] text-white p-2.5 rounded-full shadow-sm hover:shadow-md transition-all flex items-center justify-center"
                title="Contactar por WhatsApp"
              >
                <MessageCircle size={20} />
              </a>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm">
                <span className="block text-xs font-semibold text-gray-400 mb-1.5 uppercase tracking-wider">Servicio</span>
                <div className="flex items-center gap-2 font-bold text-gray-800">
                  <Scissors size={16} className="text-[#3B82F6]"/> {selectedApt.service}
                </div>
              </div>
              <div className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm">
                <span className="block text-xs font-semibold text-gray-400 mb-1.5 uppercase tracking-wider">Precio</span>
                <div className="font-bold text-emerald-600 text-base">{selectedApt.price}</div>
              </div>
              <div className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm">
                <span className="block text-xs font-semibold text-gray-400 mb-1.5 uppercase tracking-wider">Horario</span>
                <div className="flex items-center gap-2 font-bold text-gray-800">
                  <Clock size={16} className="text-[#3B82F6]"/> 
                  {timeSlots[selectedApt.startIdx]} - {timeSlots[selectedApt.startIdx + selectedApt.duration]}
                </div>
              </div>
              <div className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm">
                <span className="block text-xs font-semibold text-gray-400 mb-1.5 uppercase tracking-wider">Estado</span>
                <span className="bg-gray-100 px-2.5 py-1 rounded-md text-sm font-bold text-gray-700">{selectedApt.status}</span>
              </div>
            </div>

            {selectedApt.note && (
              <div className="pt-2">
                <span className="block text-xs font-semibold text-gray-400 mb-1.5 uppercase tracking-wider">Nota para el barbero</span>
                <div className="bg-amber-50 border border-amber-100/50 p-3 rounded-xl text-amber-800 text-sm font-medium">
                  {selectedApt.note}
                </div>
              </div>
            )}

            <div className="pt-5 flex gap-3">
              <button className="flex-1 bg-white border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700 py-2.5 rounded-xl font-bold transition-all">
                Reprogramar
              </button>
              <button className="flex-1 bg-[#2C323F] hover:bg-[#1F2430] text-white py-2.5 rounded-xl font-bold transition-all shadow-md hover:shadow-lg">
                Completar Cita
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* New Appointment Modal */}
      <Modal isOpen={isNewAptModalOpen} onClose={() => setIsNewAptModalOpen(false)} title="Agendar Nueva Cita">
        <form className="space-y-4 text-sm" onSubmit={(e) => { e.preventDefault(); setIsNewAptModalOpen(false); }}>
          
          <div>
            <label className="block font-medium text-gray-700 mb-1">Cliente</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input type="text" placeholder="Buscar cliente por nombre..." className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#3B82F6] outline-none" required />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-medium text-gray-700 mb-1">Barbero</label>
              <select 
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#3B82F6] outline-none bg-white disabled:bg-gray-50"
                disabled={role === "Barbero"}
                value={role === "Barbero" ? barberName : undefined}
              >
                {role === "Administrador" && <option>Cualquiera</option>}
                {allBarbers.map(b => <option key={b} value={b}>{b}</option>)}
              </select>
            </div>
            <div>
              <label className="block font-medium text-gray-700 mb-1">Servicio</label>
              <select className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#3B82F6] outline-none bg-white">
                <option>Corte Clásico</option>
                <option>Fade / Degradado</option>
                <option>Full House</option>
                <option>Perfilado de Barba</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-medium text-gray-700 mb-1">Fecha</label>
              <input type="date" defaultValue="2026-10-12" className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#3B82F6] outline-none" required />
            </div>
            <div>
              <label className="block font-medium text-gray-700 mb-1">Hora</label>
              <input type="time" defaultValue="10:00" className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#3B82F6] outline-none" required />
            </div>
          </div>

          <div>
            <label className="block font-medium text-gray-700 mb-1">Notas (Opcional)</label>
            <textarea placeholder="Alguna indicación especial..." rows={2} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#3B82F6] outline-none resize-none"></textarea>
          </div>

          <div className="pt-4 flex justify-end gap-3">
            <button type="button" onClick={() => setIsNewAptModalOpen(false)} className="px-4 py-2 font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
              Cancelar
            </button>
            <button type="submit" className="px-6 py-2 bg-[#3B82F6] hover:bg-blue-600 text-white font-bold rounded-lg transition-all shadow-md">
              Confirmar Reserva
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}
