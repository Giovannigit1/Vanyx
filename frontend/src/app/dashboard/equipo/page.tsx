"use client";

import { useState } from "react";
import { Header } from "@/components/dashboard/Header";
import { Plus, Search, Edit2, Trash2, Mail, Phone, Calendar, User, Briefcase } from "lucide-react";
import { Modal } from "@/components/ui/Modal";

export default function EquipoPage() {
  const [isNewMemberModalOpen, setIsNewMemberModalOpen] = useState(false);

  const [barbers] = useState([
    { id: 1, name: "Ismael Jara", role: "Administrador / Barbero", email: "ismael@blvckwhite.cl", phone: "+56 9 1111 2222", status: "Activo", avatar: "IJ" },
    { id: 2, name: "Matías", role: "Barbero Senior", email: "matias@blvckwhite.cl", phone: "+56 9 3333 4444", status: "Activo", avatar: "M" },
    { id: 3, name: "Barbero 3", role: "Barbero Junior", email: "b3@blvckwhite.cl", phone: "+56 9 5555 6666", status: "Inactivo", avatar: "B3" },
  ]);

  return (
    <>
      <Header title="Gestión de Equipo" />
      
      <div className="p-6 overflow-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Buscar miembro del equipo..." 
              className="pl-10 pr-4 py-2.5 w-full bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#3B82F6] outline-none shadow-sm" 
            />
          </div>
          <button 
            onClick={() => setIsNewMemberModalOpen(true)}
            className="bg-[#2C323F] hover:bg-[#1F2430] text-white px-5 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 transition-all shadow-sm w-full sm:w-auto justify-center hover:shadow-md hover:-translate-y-0.5"
          >
            <Plus size={18} /> Nuevo Miembro
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {barbers.map((barber) => (
            <div key={barber.id} className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-shadow group">
              <div className="p-6">
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-[#3B82F6] font-bold text-xl shadow-sm">
                      {barber.avatar}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800 text-lg leading-tight">{barber.name}</h3>
                      <p className="text-sm text-[#3B82F6] font-semibold">{barber.role}</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                    barber.status === 'Activo' ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' : 'bg-gray-100 text-gray-600 border border-gray-200'
                  }`}>
                    {barber.status}
                  </span>
                </div>
                
                <div className="space-y-3 mt-4 bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <div className="flex items-center gap-3 text-sm font-medium text-gray-700">
                    <Mail size={16} className="text-[#3B82F6]" />
                    {barber.email}
                  </div>
                  <div className="flex items-center gap-3 text-sm font-medium text-gray-700">
                    <Phone size={16} className="text-[#3B82F6]" />
                    {barber.phone}
                  </div>
                  <div className="flex items-center gap-3 text-sm font-medium text-gray-700">
                    <Calendar size={16} className="text-[#3B82F6]" />
                    Lunes a Sábado
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-6 py-4 border-t border-gray-100 flex justify-between gap-2">
                <button 
                  onClick={() => alert(`Abriendo horario de: ${barber.name}`)}
                  className="flex-1 flex items-center justify-center gap-2 py-2 text-sm font-semibold text-gray-700 hover:text-[#3B82F6] hover:bg-white rounded-lg transition-all border border-transparent hover:border-gray-200 hover:shadow-sm"
                >
                  <Calendar size={16} /> Ver Horario
                </button>
                <div className="flex gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={() => alert(`Abriendo formulario para editar: ${barber.name}`)}
                    className="p-2 text-gray-500 hover:text-[#3B82F6] hover:bg-white rounded-lg transition-all border border-transparent hover:border-gray-200 hover:shadow-sm"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button 
                    onClick={() => alert(`¿Estás seguro que deseas eliminar a: ${barber.name}?`)}
                    className="p-2 text-gray-500 hover:text-red-500 hover:bg-white rounded-lg transition-all border border-transparent hover:border-gray-200 hover:shadow-sm"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* New Member Modal */}
      <Modal isOpen={isNewMemberModalOpen} onClose={() => setIsNewMemberModalOpen(false)} title="Añadir Miembro del Equipo">
        <form className="space-y-4 text-sm" onSubmit={(e) => { e.preventDefault(); setIsNewMemberModalOpen(false); }}>
          
          <div>
            <label className="block font-medium text-gray-700 mb-1">Nombre Completo *</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input type="text" placeholder="Ej: Roberto Sánchez" className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#3B82F6] outline-none" required />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-medium text-gray-700 mb-1">Rol *</label>
              <div className="relative">
                <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <select className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#3B82F6] outline-none bg-white">
                  <option>Barbero Junior</option>
                  <option>Barbero Senior</option>
                  <option>Administrador</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block font-medium text-gray-700 mb-1">Estado</label>
              <select className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#3B82F6] outline-none bg-white">
                <option>Activo</option>
                <option>Inactivo</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-medium text-gray-700 mb-1">Teléfono</label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input type="tel" placeholder="+56 9 0000 0000" className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#3B82F6] outline-none" />
            </div>
          </div>

          <div>
            <label className="block font-medium text-gray-700 mb-1">Correo Electrónico</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input type="email" placeholder="barbero@blvckwhite.cl" className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#3B82F6] outline-none" />
            </div>
          </div>

          <div className="pt-4 flex justify-end gap-3">
            <button type="button" onClick={() => setIsNewMemberModalOpen(false)} className="px-4 py-2 font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
              Cancelar
            </button>
            <button type="submit" className="px-6 py-2 bg-[#2C323F] hover:bg-[#1F2430] text-white font-bold rounded-lg transition-all shadow-md">
              Añadir Barbero
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}
