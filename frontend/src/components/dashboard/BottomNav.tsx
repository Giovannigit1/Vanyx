"use client";

import { usePathname } from "next/navigation";
import { Calendar, Users, Scissors, Briefcase, BarChart2, Settings, Menu, X } from "lucide-react";
import NextLink from "next/link";
import { useRole } from "@/context/RoleContext";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function BottomNav() {
  const pathname = usePathname();
  const { role } = useRole();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const allMenuItems = [
    { name: "Agenda", icon: Calendar, path: "/dashboard", roles: ["Administrador", "Barbero"] },
    { name: "Clientes", icon: Users, path: "/dashboard/clientes", roles: ["Administrador", "Barbero"] },
    { name: "Servicios", icon: Scissors, path: "/dashboard/servicios", roles: ["Administrador"] },
    { name: "Equipo", icon: Briefcase, path: "/dashboard/equipo", roles: ["Administrador"] },
    { name: "Métricas", icon: BarChart2, path: "/dashboard/estadisticas", roles: ["Administrador"] },
    { name: "Ajustes", icon: Settings, path: "/dashboard/configuracion", roles: ["Administrador"] },
  ];

  const menuItems = allMenuItems.filter(item => item.roles.includes(role));
  
  // Show max 4 items in bottom bar, others in a "More" menu if needed
  const visibleItems = menuItems.slice(0, 4);
  const hasMore = menuItems.length > 4;

  return (
    <>
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-[#111111] text-white border-t border-white/10 flex items-center justify-around pb-safe z-50 shadow-[0_-10px_20px_rgba(0,0,0,0.1)]">
        {visibleItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <NextLink
              key={item.name}
              href={item.path}
              className={`flex flex-col items-center justify-center w-full py-3 gap-1 relative ${
                isActive ? "text-white" : "text-gray-500 hover:text-gray-300"
              }`}
            >
              {isActive && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-1 bg-white rounded-b-md shadow-[0_0_10px_rgba(255,255,255,0.5)]"></div>
              )}
              <item.icon size={22} className={`transition-transform ${isActive ? "scale-110" : ""}`} />
              <span className="text-[10px] font-bold">{item.name}</span>
            </NextLink>
          );
        })}
        
        {hasMore && (
          <button 
            onClick={() => setIsMenuOpen(true)}
            className="flex flex-col items-center justify-center w-full py-3 gap-1 text-gray-500 hover:text-gray-300"
          >
            <Menu size={22} />
            <span className="text-[10px] font-bold">Más</span>
          </button>
        )}
      </div>

      {/* Slide up menu for extra options */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/60 z-50 md:hidden backdrop-blur-sm"
            />
            <motion.div 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", bounce: 0, duration: 0.3 }}
              className="fixed bottom-0 left-0 right-0 bg-[#111111] rounded-t-3xl z-50 md:hidden pb-safe overflow-hidden border-t border-white/10"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-white font-bold text-lg">Más Opciones</h3>
                  <button onClick={() => setIsMenuOpen(false)} className="p-2 bg-white/10 text-white rounded-full">
                    <X size={20} />
                  </button>
                </div>
                
                <div className="space-y-2">
                  {menuItems.slice(4).map((item) => {
                    const isActive = pathname === item.path;
                    return (
                      <NextLink
                        key={item.name}
                        href={item.path}
                        onClick={() => setIsMenuOpen(false)}
                        className={`flex items-center gap-4 px-4 py-4 rounded-2xl transition-all ${
                          isActive ? "bg-white/10 text-white border border-white/10" : "text-gray-400 hover:bg-white/5"
                        }`}
                      >
                        <item.icon size={24} className={isActive ? "text-white" : "text-gray-500"} />
                        <span className="font-bold text-base">{item.name}</span>
                      </NextLink>
                    )
                  })}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
