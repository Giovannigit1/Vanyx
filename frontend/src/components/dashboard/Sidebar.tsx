"use client";

import { usePathname } from "next/navigation";
import { Calendar, Users, Scissors, Briefcase, BarChart2, Settings, LogOut } from "lucide-react";
import NextLink from "next/link";
import { useRole } from "@/context/RoleContext";

export function Sidebar() {
  const pathname = usePathname();
  const { role } = useRole();

  const allMenuItems = [
    { name: "Agenda", icon: Calendar, path: "/dashboard", roles: ["Administrador", "Barbero"] },
    { name: "Clientes", icon: Users, path: "/dashboard/clientes", roles: ["Administrador", "Barbero"] },
    { name: "Servicios", icon: Scissors, path: "/dashboard/servicios", roles: ["Administrador"] },
    { name: "Equipo", icon: Briefcase, path: "/dashboard/equipo", roles: ["Administrador"] },
    { name: "Estadísticas", icon: BarChart2, path: "/dashboard/estadisticas", roles: ["Administrador"] },
    { name: "Configuración", icon: Settings, path: "/dashboard/configuracion", roles: ["Administrador"] },
  ];

  const menuItems = allMenuItems.filter(item => item.roles.includes(role));

  return (
    <div className="w-64 bg-[#111111] text-white flex flex-col shadow-xl z-50 border-r border-white/5">
      <div className="h-24 flex items-center justify-center px-6 border-b border-white/10 shrink-0 bg-[#0A0A0A]">
        <div className="flex flex-col items-center gap-2">
          {/* Custom Barber Logo SVG */}
          <div className="w-10 h-10 flex items-center justify-center relative">
            <div className="absolute inset-0 bg-white rounded-full opacity-10 blur-sm"></div>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8 text-white relative z-10">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.338 10.454L19.225 5.567a2.25 2.25 0 00-3.182-3.182l-4.887 4.887m-4.086 4.086L2.182 16.243a2.25 2.25 0 003.182 3.182l4.887-4.887m5.918-2.585l-5.918 5.918m-2.121-2.121l5.918-5.918" />
              <circle cx="7.5" cy="7.5" r="1.5" />
              <circle cx="16.5" cy="16.5" r="1.5" />
            </svg>
          </div>
          <div className="text-center">
            <span className="font-black text-xl tracking-[0.15em] uppercase block leading-none text-white">BLVCK</span>
            <span className="font-medium text-[10px] tracking-[0.3em] text-gray-400 uppercase block leading-none mt-1">WHITE</span>
          </div>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto py-6 px-4">
        <div className="space-y-1">
          {menuItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <NextLink
                key={item.name}
                href={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group relative overflow-hidden ${
                  isActive 
                    ? "text-white bg-white/10 border border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.05)]" 
                    : "text-gray-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                {isActive && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-white rounded-r-full shadow-[0_0_10px_rgba(255,255,255,0.5)]"></div>
                )}
                <item.icon 
                  size={20} 
                  className={`transition-colors relative z-10 ${isActive ? "text-white" : "text-gray-500 group-hover:text-gray-300"}`}
                />
                <span className={`font-semibold text-sm ${isActive ? "text-white" : ""}`}>
                  {item.name}
                </span>
              </NextLink>
            )
          })}
        </div>
      </div>
      
      <div className="p-4 border-t border-white/10">
        <button className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-gray-400 hover:bg-red-500/10 hover:text-red-400 transition-all group">
          <LogOut size={20} className="group-hover:text-red-400" />
          <span className="font-semibold text-sm">Cerrar Sesión</span>
        </button>
      </div>
    </div>
  );
}
