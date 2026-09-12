"use client";

import { useState } from "react";
import { Header } from "@/components/dashboard/Header";
import { Plus, Search, Edit2, Trash2, Clock, DollarSign, Type, AlignLeft } from "lucide-react";
import { Modal } from "@/components/ui/Modal";

export default function ServiciosPage() {
  const [isNewServiceModalOpen, setIsNewServiceModalOpen] = useState(false);

  const [services] = useState([
    { id: 1, name: "Corte Clásico", description: "Corte tradicional a tijera o máquina.", duration: 30, price: 12000, category: "Corte" },
    { id: 2, name: "Fade / Degradado", description: "Corte con degradado perfecto y perfilado.", duration: 45, price: 14000, category: "Corte" },
    { id: 3, name: "Perfilado de Barba", description: "Alineación y rebaje de barba con toalla caliente.", duration: 30, price: 8000, category: "Barba" },
    { id: 4, name: "Full House (Corte + Barba)", description: "Servicio completo premium.", duration: 75, price: 20000, category: "Combo" },
    { id: 5, name: "Corte Niño", description: "Corte para menores de 12 años.", duration: 30, price: 10000, category: "Corte" },
    { id: 6, name: "Limpieza Facial", description: "Exfoliación y mascarilla black.", duration: 20, price: 5000, category: "Extras" },
  ]);

  return (
    <>
      <Header title="Gestión de Servicios" />
      
      <div className="p-4 md:p-6 overflow-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Buscar servicio..." 
              className="pl-10 pr-4 py-2.5 w-full bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#3B82F6] outline-none shadow-sm" 
            />
          </div>
          <button 
            onClick={() => setIsNewServiceModalOpen(true)}
            className="bg-[#2C323F] hover:bg-[#1F2430] text-white px-5 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 transition-all shadow-sm w-full sm:w-auto justify-center hover:shadow-md hover:-translate-y-0.5"
          >
            <Plus size={18} /> Nuevo Servicio
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div key={service.id} className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col group">
              <div className="p-6 flex-1">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-bold text-gray-800 text-lg leading-tight">{service.name}</h3>
                  <span className="bg-blue-50 text-[#3B82F6] text-xs font-bold px-3 py-1 rounded-md border border-blue-100">
                    {service.category}
                  </span>
                </div>
                <p className="text-gray-500 text-sm mb-5 line-clamp-2 font-medium">{service.description}</p>
                
                <div className="flex items-center gap-4 text-sm font-bold text-gray-700">
                  <div className="flex items-center gap-1.5 bg-gray-50 px-2.5 py-1.5 rounded-lg border border-gray-100">
                    <Clock size={16} className="text-gray-400" />
                    {service.duration} min
                  </div>
                  <div className="flex items-center gap-1.5 bg-green-50 text-green-700 px-2.5 py-1.5 rounded-lg border border-green-100">
                    <DollarSign size={16} className="text-green-500" />
                    {service.price.toLocaleString('es-CL')}
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-6 py-4 border-t border-gray-100 flex justify-end gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                <button 
                  onClick={() => alert(`Abriendo formulario para editar: ${service.name}`)}
                  className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-gray-600 hover:text-[#3B82F6] hover:bg-white hover:shadow-sm rounded-lg transition-all border border-transparent hover:border-gray-200"
                >
                  <Edit2 size={16} /> Editar
                </button>
                <button 
                  onClick={() => alert(`¿Estás seguro que deseas eliminar el servicio: ${service.name}?`)}
                  className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-gray-600 hover:text-red-500 hover:bg-white hover:shadow-sm rounded-lg transition-all border border-transparent hover:border-gray-200"
                >
                  <Trash2 size={16} /> Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* New Service Modal */}
      <Modal isOpen={isNewServiceModalOpen} onClose={() => setIsNewServiceModalOpen(false)} title="Agregar Nuevo Servicio">
        <form className="space-y-4 text-sm" onSubmit={(e) => { e.preventDefault(); setIsNewServiceModalOpen(false); }}>
          
          <div>
            <label className="block font-medium text-gray-700 mb-1">Nombre del Servicio *</label>
            <div className="relative">
              <Type className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input type="text" placeholder="Ej: Fade Clásico" className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#3B82F6] outline-none" required />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-medium text-gray-700 mb-1">Precio (CLP) *</label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input type="number" placeholder="10000" className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#3B82F6] outline-none" required />
              </div>
            </div>
            <div>
              <label className="block font-medium text-gray-700 mb-1">Duración (minutos) *</label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input type="number" placeholder="30" className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#3B82F6] outline-none" required />
              </div>
            </div>
          </div>

          <div>
            <label className="block font-medium text-gray-700 mb-1">Categoría</label>
            <select className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#3B82F6] outline-none bg-white">
              <option>Corte</option>
              <option>Barba</option>
              <option>Combo</option>
              <option>Extras</option>
            </select>
          </div>

          <div>
            <label className="block font-medium text-gray-700 mb-1">Descripción</label>
            <div className="relative">
              <AlignLeft className="absolute left-3 top-3 text-gray-400" size={16} />
              <textarea placeholder="Descripción del servicio que verá el cliente..." rows={3} className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#3B82F6] outline-none resize-none"></textarea>
            </div>
          </div>

          <div className="pt-4 flex justify-end gap-3">
            <button type="button" onClick={() => setIsNewServiceModalOpen(false)} className="px-4 py-2 font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
              Cancelar
            </button>
            <button type="submit" className="px-6 py-2 bg-[#2C323F] hover:bg-[#1F2430] text-white font-bold rounded-lg transition-all shadow-md">
              Crear Servicio
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}
