"use client";

import { Bell, ChevronDown } from "lucide-react";
import { useRole } from "@/context/RoleContext";

export function Header({ title }: { title: string }) {
  const { role, setRole, barberName } = useRole();

  const toggleRole = () => {
    setRole(role === "Administrador" ? "Barbero" : "Administrador");
  };

  return (
    <div className="h-16 md:h-20 bg-white border-b border-gray-200 flex items-center justify-between px-4 md:px-8 shrink-0 relative z-30">
      <h1 className="text-xl md:text-2xl font-black text-gray-800 tracking-tight truncate max-w-[150px] md:max-w-none">{title}</h1>
      
      <div className="flex items-center gap-3 md:gap-6">
        <button className="relative p-2 text-gray-400 hover:text-[#3B82F6] transition-colors rounded-full hover:bg-gray-50">
          <Bell size={20} className="md:w-[22px] md:h-[22px]" />
          <span className="absolute top-1.5 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
        
        <div className="h-8 w-px bg-gray-200"></div>
        
        <div 
          onClick={toggleRole}
          className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded-xl transition-colors border border-transparent hover:border-gray-100"
          title="Haz clic para cambiar de rol (Demo)"
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-gray-800 to-gray-600 flex items-center justify-center text-white font-bold text-sm shadow-sm">
            {barberName.substring(0,2).toUpperCase()}
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-bold text-gray-800">{barberName}</p>
            <p className={`text-xs font-semibold ${role === 'Administrador' ? 'text-[#3B82F6]' : 'text-emerald-500'}`}>{role}</p>
          </div>
          <ChevronDown size={16} className="text-gray-400 hidden md:block" />
        </div>
      </div>
    </div>
  );
}
