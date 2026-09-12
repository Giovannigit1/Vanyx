"use client";

import { useState } from "react";
import { Header } from "@/components/dashboard/Header";
import { Plus, Search, Edit2, Trash2, Mail, Phone, User, Calendar, Scissors, DollarSign } from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import { useRole } from "@/context/RoleContext";

export default function ClientesPage() {
  const { role, barberName } = useRole();
  const [isNewClientModalOpen, setIsNewClientModalOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<any>(null);
  
  const allClients = [
    { id: 1, name: "Tomás Pérez", phone: "+56 9 1234 5678", email: "tomas@email.com", lastVisit: "12 Oct 2026", totalVisits: 5, status: "Frecuente", totalSpent: "$85.000", barbers: ["Ismael Jara"] },
    { id: 2, name: "Nicolás Rojas", phone: "+56 9 8765 4321", email: "nicolas@email.com", lastVisit: "10 Oct 2026", totalVisits: 12, status: "VIP", totalSpent: "$210.000", barbers: ["Matías", "Ismael Jara"] },
    { id: 3, name: "Sebastián Silva", phone: "+56 9 1122 3344", email: "sebastian@email.com", lastVisit: "01 Oct 2026", totalVisits: 1, status: "Nuevo", totalSpent: "$12.000", barbers: ["Ismael Jara"] },
    { id: 4, name: "Carlos Gómez", phone: "+56 9 5566 7788", email: "carlos@email.com", lastVisit: "15 Sep 2026", totalVisits: 3, status: "Frecuente", totalSpent: "$45.000", barbers: ["Barbero 3"] },
    { id: 5, name: "Juan Soto", phone: "+56 9 9988 7766", email: "juan@email.com", lastVisit: "20 Sep 2026", totalVisits: 2, status: "Frecuente", totalSpent: "$35.000", barbers: ["Matías"] },
  ];

  const clients = role === "Administrador" 
    ? allClients 
    : allClients.filter(c => c.barbers.includes(barberName));

  const allPastAppointments = [
    { date: "12 Oct 2026", service: "Full House", barber: "Ismael Jara", price: "$20.000" },
    { date: "28 Sep 2026", service: "Fade / Degradado", barber: "Matías", price: "$14.000" },
    { date: "10 Sep 2026", service: "Corte Clásico", barber: "Ismael Jara", price: "$12.000" },
  ];

  const getPastAppointments = () => {
    if (role === "Administrador") return allPastAppointments;
    return allPastAppointments.filter(apt => apt.barber === barberName);
  };

  return (
    <>
      <Header title={role === "Administrador" ? "Gestión de Clientes" : "Mis Clientes"} />
      
      <div className="p-6 overflow-auto">
        {role === "Barbero" && (
          <div className="bg-blue-50 border border-blue-200 text-blue-800 p-4 rounded-xl mb-6 text-sm font-medium">
            Estás viendo únicamente los clientes que se han atendido contigo alguna vez.
          </div>
        )}

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Buscar por nombre, teléfono o email..." 
              className="pl-10 pr-4 py-2.5 w-full bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#3B82F6] outline-none shadow-sm" 
            />
          </div>
          <button 
            onClick={() => setIsNewClientModalOpen(true)}
            className="bg-[#2C323F] hover:bg-[#1F2430] text-white px-5 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 transition-all shadow-sm w-full sm:w-auto justify-center hover:shadow-md hover:-translate-y-0.5"
          >
            <Plus size={18} /> Nuevo Cliente
          </button>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto w-full">
            <table className="w-full text-left border-collapse whitespace-nowrap min-w-[800px]">
              <thead>
                <tr className="bg-gray-50/80 border-b border-gray-200 text-gray-500 text-xs uppercase tracking-wider font-semibold">
                  <th className="p-4 pl-6">Cliente</th>
                  <th className="p-4">Contacto</th>
                  <th className="p-4">Última Visita</th>
                  <th className="p-4">Total Citas</th>
                  <th className="p-4">Estado</th>
                  <th className="p-4 pr-6 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {clients.length > 0 ? (
                  clients.map((client) => (
                    <tr 
                      key={client.id} 
                      className="hover:bg-blue-50/50 transition-colors group cursor-pointer"
                      onClick={() => setSelectedClient(client)}
                    >
                      <td className="p-4 pl-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 font-bold text-sm shrink-0">
                            {client.name.substring(0,2).toUpperCase()}
                          </div>
                          <div className="font-bold text-gray-800">{client.name}</div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="text-sm font-medium text-gray-700 flex items-center gap-1.5 mb-0.5">
                          <Phone size={12} className="text-gray-400"/> {client.phone}
                        </div>
                        <div className="text-xs text-gray-500 flex items-center gap-1.5">
                          <Mail size={12} className="text-gray-400"/> {client.email}
                        </div>
                      </td>
                      <td className="p-4 text-sm font-medium text-gray-600">{client.lastVisit}</td>
                      <td className="p-4 text-sm font-bold text-gray-800">{client.totalVisits}</td>
                      <td className="p-4">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold
                          ${client.status === 'VIP' ? 'bg-amber-100 text-amber-800 border border-amber-200' : 
                            client.status === 'Nuevo' ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' : 
                            'bg-blue-100 text-blue-800 border border-blue-200'}`}>
                          {client.status}
                        </span>
                      </td>
                      <td className="p-4 pr-6 text-right">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button 
                            onClick={(e) => { e.stopPropagation(); alert("Abrir formulario de edición..."); }}
                            className="p-2 text-gray-400 hover:text-[#3B82F6] hover:bg-blue-50 rounded-lg transition-colors"
                          >
                            <Edit2 size={16} />
                          </button>
                          {role === "Administrador" && (
                            <button 
                              onClick={(e) => { e.stopPropagation(); alert("¿Estás seguro de eliminar este cliente?"); }}
                              className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                            >
                              <Trash2 size={16} />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-gray-500">
                      No hay clientes asociados a este perfil.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
          <div className="p-4 border-t border-gray-200 flex items-center justify-between text-sm text-gray-500 bg-gray-50/50">
            <span className="font-medium">Mostrando {clients.length} clientes</span>
            <div className="flex gap-2">
              <button className="px-3 py-1.5 border border-gray-200 rounded-lg hover:bg-white font-medium disabled:opacity-50 transition-colors shadow-sm bg-white">Anterior</button>
              <button className="px-3 py-1.5 border border-gray-200 rounded-lg hover:bg-white font-medium disabled:opacity-50 transition-colors shadow-sm bg-white">Siguiente</button>
            </div>
          </div>
        </div>
      </div>

      {/* Client Profile Modal */}
      <Modal isOpen={!!selectedClient} onClose={() => setSelectedClient(null)} title="Ficha del Cliente">
        {selectedClient && (
          <div className="space-y-6">
            
            {/* Header Info */}
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-[#3B82F6] font-bold text-2xl shrink-0 shadow-inner border border-blue-200">
                {selectedClient.name.substring(0,2).toUpperCase()}
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-xl leading-tight">{selectedClient.name}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide
                    ${selectedClient.status === 'VIP' ? 'bg-amber-100 text-amber-800' : 
                      selectedClient.status === 'Nuevo' ? 'bg-emerald-100 text-emerald-800' : 
                      'bg-blue-100 text-blue-800'}`}>
                    {selectedClient.status}
                  </span>
                  <span className="text-xs text-gray-500 font-medium">Cliente desde Ene 2026</span>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-gray-50 p-3 rounded-xl border border-gray-100 text-center">
                <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Citas</span>
                <span className="font-bold text-gray-800">{selectedClient.totalVisits}</span>
              </div>
              <div className="bg-gray-50 p-3 rounded-xl border border-gray-100 text-center">
                <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Última Visita</span>
                <span className="font-bold text-gray-800 text-sm">{selectedClient.lastVisit}</span>
              </div>
              <div className="bg-gray-50 p-3 rounded-xl border border-gray-100 text-center">
                <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Total Gastado</span>
                <span className="font-bold text-emerald-600">{selectedClient.totalSpent}</span>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-3 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
              <h4 className="text-xs font-bold text-gray-800 uppercase tracking-wider mb-2">Información de Contacto</h4>
              <div className="flex items-center gap-3 text-sm font-medium text-gray-700">
                <Phone size={16} className="text-gray-400" />
                {selectedClient.phone}
                <a 
                  href={`https://wa.me/${selectedClient.phone.replace(/\D/g, '')}`} 
                  target="_blank" 
                  rel="noreferrer"
                  className="ml-auto text-xs bg-[#25D366]/10 text-[#25D366] px-2 py-1 rounded font-bold hover:bg-[#25D366]/20 transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  WhatsApp
                </a>
              </div>
              <div className="flex items-center gap-3 text-sm font-medium text-gray-700">
                <Mail size={16} className="text-gray-400" />
                {selectedClient.email}
              </div>
            </div>

            {/* Past Appointments */}
            <div>
              <h4 className="text-xs font-bold text-gray-800 uppercase tracking-wider mb-3">Historial de Citas</h4>
              <div className="space-y-3">
                {getPastAppointments().length > 0 ? (
                  getPastAppointments().map((apt, i) => (
                    <div key={i} className="flex justify-between items-center bg-white p-3 rounded-xl border border-gray-100 shadow-sm hover:border-blue-100 transition-colors">
                      <div className="flex gap-3">
                        <div className="bg-blue-50 text-[#3B82F6] p-2 rounded-lg">
                          <Scissors size={16} />
                        </div>
                        <div>
                          <p className="font-bold text-gray-800 text-sm">{apt.service}</p>
                          <p className="text-xs text-gray-500 font-medium">{apt.date} • con {apt.barber}</p>
                        </div>
                      </div>
                      <div className="font-bold text-gray-700 text-sm">
                        {apt.price}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-500 italic">No hay historial visible.</p>
                )}
              </div>
            </div>

            <div className="pt-2">
              <button 
                onClick={() => alert("Abriendo formulario para agendar a este cliente...")}
                className="w-full bg-[#3B82F6] hover:bg-blue-600 text-white py-2.5 rounded-xl font-bold transition-all shadow-sm"
              >
                Agendar Nueva Cita
              </button>
            </div>

          </div>
        )}
      </Modal>

      {/* New Client Modal */}
      <Modal isOpen={isNewClientModalOpen} onClose={() => setIsNewClientModalOpen(false)} title="Agregar Nuevo Cliente">
        <form className="space-y-4 text-sm" onSubmit={(e) => { e.preventDefault(); setIsNewClientModalOpen(false); }}>
          
          <div>
            <label className="block font-medium text-gray-700 mb-1">Nombre Completo *</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input type="text" placeholder="Ej: Juan Pérez" className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#3B82F6] outline-none" required />
            </div>
          </div>

          <div>
            <label className="block font-medium text-gray-700 mb-1">Teléfono *</label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input type="tel" placeholder="+56 9 1234 5678" className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#3B82F6] outline-none" required />
            </div>
          </div>

          <div>
            <label className="block font-medium text-gray-700 mb-1">Correo Electrónico (Opcional)</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input type="email" placeholder="cliente@correo.com" className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#3B82F6] outline-none" />
            </div>
          </div>

          <div>
            <label className="block font-medium text-gray-700 mb-1">Notas Internas</label>
            <textarea placeholder="Información adicional del cliente..." rows={3} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#3B82F6] outline-none resize-none"></textarea>
          </div>

          <div className="pt-4 flex justify-end gap-3">
            <button type="button" onClick={() => setIsNewClientModalOpen(false)} className="px-4 py-2 font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
              Cancelar
            </button>
            <button type="submit" className="px-6 py-2 bg-[#2C323F] hover:bg-[#1F2430] text-white font-bold rounded-lg transition-all shadow-md">
              Guardar Cliente
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}
