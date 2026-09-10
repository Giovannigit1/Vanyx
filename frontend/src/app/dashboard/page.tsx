"use client";

import { useState } from "react";
import { Calendar as CalendarIcon, Clock, Users, Settings, LogOut, Scissors, Plus, Search, ChevronLeft, ChevronRight, Menu, Bell } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Dashboard() {
  const [currentDate] = useState(new Date("2026-10-12"));
  const barbers = ["Ismael Jara", "Matías", "Barbero 3"];
  
  // Time slots from 10:00 to 19:00
  const timeSlots = Array.from({ length: 19 }, (_, i) => {
    const hour = Math.floor(i / 2) + 10;
    const minutes = i % 2 === 0 ? "00" : "30";
    return `${hour}:${minutes}`;
  });

  const appointments = [
    { id: 1, barber: 0, client: "Tomás Pérez", service: "Full House", startIdx: 0, duration: 4, status: "completed", color: "bg-green-500" }, // 10:00 - 12:00
    { id: 2, barber: 1, client: "Nicolás Rojas", service: "Solo Corte", startIdx: 1, duration: 2, status: "in-progress", color: "bg-blue-500" }, // 10:30 - 11:30
    { id: 3, barber: 0, client: "Sebastián Silva", service: "Barba Simple", startIdx: 6, duration: 1, status: "pending", color: "bg-purple-500" }, // 13:00 - 13:30
    { id: 4, barber: 2, client: "Carlos Gómez", service: "Corte + Cejas", startIdx: 10, duration: 2, status: "pending", color: "bg-yellow-500" }, // 15:00 - 16:00
  ];

  return (
    <div className="min-h-screen bg-[#F4F5F7] text-[#333333] flex font-sans">
      
      {/* SIDEBAR (AgendaPro Style - Light theme with dark accents) */}
      <aside className="w-64 bg-[#2C323F] text-white hidden md:flex flex-col">
        <div className="p-4 flex items-center gap-3 border-b border-gray-700">
          <div className="w-8 h-8 bg-white rounded-md flex items-center justify-center font-bold text-[#2C323F]">BW</div>
          <div>
            <h2 className="font-bold text-sm tracking-wide leading-tight">BlvckWhite</h2>
            <p className="text-xs text-gray-400">San Bernardo</p>
          </div>
        </div>
        
        <nav className="flex-1 py-4 overflow-y-auto">
          <ul className="space-y-1 px-2">
            <li>
              <a href="#" className="flex items-center gap-3 px-3 py-2.5 bg-[#1F2430] text-white rounded-md border-l-4 border-[#3B82F6]">
                <CalendarIcon size={18} />
                <span className="font-medium text-sm">Agenda</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center gap-3 px-3 py-2.5 text-gray-400 hover:text-white hover:bg-[#1F2430] rounded-md transition-colors">
                <Users size={18} />
                <span className="font-medium text-sm">Clientes</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center gap-3 px-3 py-2.5 text-gray-400 hover:text-white hover:bg-[#1F2430] rounded-md transition-colors">
                <Scissors size={18} />
                <span className="font-medium text-sm">Servicios</span>
              </a>
            </li>
          </ul>
        </nav>
        
        <div className="p-4 border-t border-gray-700">
          <a href="#" className="flex items-center gap-3 px-3 py-2 text-gray-400 hover:text-white transition-colors">
            <Settings size={18} />
            <span className="font-medium text-sm">Configuración</span>
          </a>
          <Link href="/" className="flex items-center gap-3 px-3 py-2 text-gray-400 hover:text-white transition-colors">
            <LogOut size={18} />
            <span className="font-medium text-sm">Cerrar Sesión</span>
          </Link>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        
        {/* TOP NAVBAR */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 shrink-0 z-10 shadow-sm">
          <div className="flex items-center gap-4">
            <button className="md:hidden text-gray-500"><Menu size={24} /></button>
            <h1 className="text-lg font-semibold text-gray-800">Agenda Diaria</h1>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input type="text" placeholder="Buscar cliente..." className="pl-9 pr-4 py-1.5 bg-gray-100 border-none rounded-full text-sm focus:ring-2 focus:ring-[#3B82F6] outline-none" />
            </div>
            
            <button className="text-gray-500 hover:text-gray-800">
              <Bell size={20} />
            </button>
            
            <div className="flex items-center gap-2 border-l border-gray-200 pl-6">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-sm">
                IJ
              </div>
              <span className="text-sm font-medium text-gray-700 hidden sm:block">Ismael Jara</span>
            </div>
          </div>
        </header>

        {/* CALENDAR TOOLBAR */}
        <div className="bg-white px-6 py-3 border-b border-gray-200 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-4">
            <button className="px-3 py-1.5 border border-gray-300 rounded text-sm font-medium hover:bg-gray-50">Hoy</button>
            <div className="flex items-center gap-2">
              <button className="p-1.5 text-gray-500 hover:bg-gray-100 rounded"><ChevronLeft size={20}/></button>
              <h2 className="text-base font-semibold text-gray-800 w-48 text-center capitalize">
                Lunes, 12 de Octubre 2026
              </h2>
              <button className="p-1.5 text-gray-500 hover:bg-gray-100 rounded"><ChevronRight size={20}/></button>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <select className="border border-gray-300 text-sm rounded px-3 py-1.5 bg-white font-medium outline-none">
              <option>Todos los locales</option>
              <option>San Bernardo</option>
            </select>
            <button className="bg-[#3B82F6] hover:bg-blue-600 text-white px-4 py-1.5 rounded text-sm font-medium flex items-center gap-2 transition-colors shadow-sm">
              <Plus size={16} /> Nueva Cita
            </button>
          </div>
        </div>

        {/* CALENDAR GRID */}
        <div className="flex-1 overflow-auto bg-white flex">
          {/* Time Column */}
          <div className="w-20 shrink-0 border-r border-gray-200 bg-white sticky left-0 z-20">
            <div className="h-12 border-b border-gray-200 bg-gray-50 sticky top-0 z-30"></div>
            {timeSlots.map((time, i) => (
              <div key={i} className="h-16 border-b border-gray-100 relative">
                <span className="absolute -top-3 right-3 text-xs text-gray-400 font-medium">{i % 2 === 0 ? time : ''}</span>
              </div>
            ))}
          </div>
          
          {/* Barbers Columns */}
          <div className="flex-1 min-w-[600px] flex">
            {barbers.map((barber, bIdx) => (
              <div key={bIdx} className="flex-1 border-r border-gray-200 relative min-w-[200px]">
                {/* Header */}
                <div className="h-12 border-b border-gray-200 bg-gray-50 flex flex-col items-center justify-center sticky top-0 z-10">
                  <span className="text-sm font-semibold text-gray-700">{barber}</span>
                </div>
                
                {/* Grid Lines */}
                <div className="relative">
                  {timeSlots.map((_, i) => (
                    <div key={i} className={`h-16 border-b ${i % 2 === 0 ? 'border-gray-200' : 'border-gray-100 border-dashed'} hover:bg-blue-50/30 cursor-pointer transition-colors`}></div>
                  ))}
                  
                  {/* Appointments */}
                  {appointments.filter(a => a.barber === bIdx).map((apt) => (
                    <motion.div 
                      key={apt.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className={`absolute left-1 right-1 rounded-md p-2 shadow-sm text-white overflow-hidden cursor-pointer hover:brightness-110 transition-all ${apt.color}`}
                      style={{ 
                        top: `${apt.startIdx * 64 + 2}px`, 
                        height: `${apt.duration * 64 - 4}px`,
                        zIndex: 5
                      }}
                    >
                      <div className="font-semibold text-sm leading-tight truncate">{apt.client}</div>
                      <div className="text-xs opacity-90 truncate">{apt.service}</div>
                      {apt.duration > 1 && (
                        <div className="absolute bottom-2 left-2 text-xs opacity-75 font-medium flex items-center gap-1">
                          <Clock size={10} /> 
                          {timeSlots[apt.startIdx]} - {timeSlots[apt.startIdx + apt.duration]}
                        </div>
                      )}
                    </motion.div>
                  ))}

                  {/* Current Time Indicator Line (Mock) */}
                  <div className="absolute left-0 right-0 h-px bg-red-500 z-10 pointer-events-none" style={{ top: '160px' }}>
                    <div className="absolute -left-2 -top-1 w-2 h-2 rounded-full bg-red-500"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
