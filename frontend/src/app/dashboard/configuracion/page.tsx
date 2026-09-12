"use client";

import { Header } from "@/components/dashboard/Header";
import { Save } from "lucide-react";

export default function ConfiguracionPage() {
  return (
    <>
      <Header title="Configuración del Local" />
      
      <div className="p-6 overflow-auto">
        <div className="max-w-4xl mx-auto space-y-6">
          
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
            <div className="border-b border-gray-200 bg-gray-50/50 px-6 py-4">
              <h2 className="text-lg font-semibold text-gray-800">Información General</h2>
              <p className="text-sm text-gray-500">Detalles principales de la barbería.</p>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nombre del Local</label>
                  <input type="text" defaultValue="BlvckWhite San Bernardo" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#3B82F6] outline-none text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono de Contacto</label>
                  <input type="text" defaultValue="+56 9 1234 5678" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#3B82F6] outline-none text-sm" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Dirección</label>
                  <input type="text" defaultValue="Arturo Prat 123, San Bernardo" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#3B82F6] outline-none text-sm" />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
            <div className="border-b border-gray-200 bg-gray-50/50 px-6 py-4">
              <h2 className="text-lg font-semibold text-gray-800">Horario de Atención</h2>
              <p className="text-sm text-gray-500">Configura los horarios en los que la barbería está abierta.</p>
            </div>
            <div className="p-6">
              <div className="space-y-3">
                {['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'].map((day) => (
                  <div key={day} className="flex items-center gap-4">
                    <div className="w-24 font-medium text-sm text-gray-700">{day}</div>
                    <div className="flex items-center gap-2 flex-1">
                      <input type="time" defaultValue="10:00" className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:ring-2 focus:ring-[#3B82F6] outline-none" />
                      <span className="text-gray-400">-</span>
                      <input type="time" defaultValue="19:00" className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:ring-2 focus:ring-[#3B82F6] outline-none" />
                    </div>
                  </div>
                ))}
                <div className="flex items-center gap-4 opacity-50">
                  <div className="w-24 font-medium text-sm text-gray-700">Domingo</div>
                  <div className="flex items-center gap-2 flex-1 text-sm font-medium">
                    Cerrado
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button className="px-5 py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
              Cancelar
            </button>
            <button className="px-5 py-2.5 bg-[#3B82F6] hover:bg-blue-600 rounded-lg text-sm font-medium text-white transition-colors flex items-center gap-2 shadow-sm">
              <Save size={16} /> Guardar Cambios
            </button>
          </div>

        </div>
      </div>
    </>
  );
}
