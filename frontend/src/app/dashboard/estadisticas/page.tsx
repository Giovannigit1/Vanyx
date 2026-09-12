"use client";

import { useState } from "react";
import { Header } from "@/components/dashboard/Header";
import { TrendingUp, Users, Scissors, DollarSign, Calendar } from "lucide-react";
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from "recharts";

const dataMock = {
  'Esta semana': {
    revenue: [
      { name: 'Lun', ingresos: 120000 },
      { name: 'Mar', ingresos: 150000 },
      { name: 'Mié', ingresos: 180000 },
      { name: 'Jue', ingresos: 140000 },
      { name: 'Vie', ingresos: 250000 },
      { name: 'Sáb', ingresos: 320000 },
      { name: 'Dom', ingresos: 0 },
    ],
    services: [
      { name: 'Corte Clásico', value: 45 },
      { name: 'Fade', value: 35 },
      { name: 'Perfilado', value: 12 },
      { name: 'Full House', value: 8 },
    ],
    kpis: [
      { title: "Ingresos Totales", value: "$1.160.000", change: "+12%", icon: DollarSign, color: "text-emerald-600", bg: "bg-emerald-100" },
      { title: "Citas Completadas", value: "145", change: "+5%", icon: Calendar, color: "text-blue-600", bg: "bg-blue-100" },
      { title: "Nuevos Clientes", value: "32", change: "+18%", icon: Users, color: "text-purple-600", bg: "bg-purple-100" },
      { title: "Servicios Vendidos", value: "180", change: "-2%", icon: Scissors, color: "text-amber-600", bg: "bg-amber-100" },
    ]
  },
  'Este mes': {
    revenue: [
      { name: 'Semana 1', ingresos: 850000 },
      { name: 'Semana 2', ingresos: 920000 },
      { name: 'Semana 3', ingresos: 1100000 },
      { name: 'Semana 4', ingresos: 1050000 },
    ],
    services: [
      { name: 'Corte Clásico', value: 180 },
      { name: 'Fade', value: 145 },
      { name: 'Perfilado', value: 60 },
      { name: 'Full House', value: 45 },
    ],
    kpis: [
      { title: "Ingresos Totales", value: "$3.920.000", change: "+8%", icon: DollarSign, color: "text-emerald-600", bg: "bg-emerald-100" },
      { title: "Citas Completadas", value: "580", change: "+12%", icon: Calendar, color: "text-blue-600", bg: "bg-blue-100" },
      { title: "Nuevos Clientes", value: "125", change: "+24%", icon: Users, color: "text-purple-600", bg: "bg-purple-100" },
      { title: "Servicios Vendidos", value: "640", change: "+5%", icon: Scissors, color: "text-amber-600", bg: "bg-amber-100" },
    ]
  },
  'Últimos 3 meses': {
    revenue: [
      { name: 'Ago', ingresos: 3200000 },
      { name: 'Sep', ingresos: 3600000 },
      { name: 'Oct', ingresos: 3920000 },
    ],
    services: [
      { name: 'Corte Clásico', value: 500 },
      { name: 'Fade', value: 420 },
      { name: 'Perfilado', value: 180 },
      { name: 'Full House', value: 150 },
    ],
    kpis: [
      { title: "Ingresos Totales", value: "$10.720.000", change: "+15%", icon: DollarSign, color: "text-emerald-600", bg: "bg-emerald-100" },
      { title: "Citas Completadas", value: "1540", change: "+18%", icon: Calendar, color: "text-blue-600", bg: "bg-blue-100" },
      { title: "Nuevos Clientes", value: "310", change: "+42%", icon: Users, color: "text-purple-600", bg: "bg-purple-100" },
      { title: "Servicios Vendidos", value: "1850", change: "+14%", icon: Scissors, color: "text-amber-600", bg: "bg-amber-100" },
    ]
  }
};

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#8B5CF6'];
const formatCurrency = (value: number) => `$${value.toLocaleString('es-CL')}`;

export default function EstadisticasPage() {
  const [timeFilter, setTimeFilter] = useState<'Esta semana' | 'Este mes' | 'Últimos 3 meses'>('Esta semana');
  
  const currentData = dataMock[timeFilter];

  return (
    <>
      <Header title="Rendimiento y Estadísticas" />
      
      <div className="p-6 overflow-auto">
        <div className="flex justify-end mb-6">
          <select 
            value={timeFilter}
            onChange={(e) => setTimeFilter(e.target.value as any)}
            className="border border-gray-200 text-sm rounded-lg px-4 py-2 bg-white font-semibold outline-none focus:ring-2 focus:ring-[#3B82F6] shadow-sm cursor-pointer"
          >
            <option value="Esta semana">Esta semana</option>
            <option value="Este mes">Este mes</option>
            <option value="Últimos 3 meses">Últimos 3 meses</option>
          </select>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {currentData.kpis.map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)] flex items-start gap-4 transition-transform hover:-translate-y-1 hover:shadow-lg">
              <div className={`p-3.5 rounded-xl ${stat.bg} shadow-inner`}>
                <stat.icon size={24} className={stat.color} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-400 mb-1 tracking-wide uppercase">{stat.title}</p>
                <h3 className="text-3xl font-black text-gray-900 tracking-tight">{stat.value}</h3>
                <div className={`text-xs font-bold mt-2 flex items-center gap-1 ${stat.change.startsWith('+') ? 'text-emerald-500' : 'text-red-500'}`}>
                  {stat.change.startsWith('+') ? <TrendingUp size={14} /> : null}
                  {stat.change} vs anterior
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Gráfico de Ingresos */}
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 lg:col-span-2">
            <h3 className="text-lg font-bold text-gray-800 mb-6">Evolución de Ingresos</h3>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={currentData.revenue} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#6B7280', fontSize: 12}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#6B7280', fontSize: 12}} tickFormatter={(value) => `$${value/1000}k`} />
                  <RechartsTooltip 
                    formatter={(value: number) => [formatCurrency(value), "Ingresos"]}
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="ingresos" 
                    stroke="#3B82F6" 
                    strokeWidth={3}
                    dot={{ r: 4, strokeWidth: 2, fill: '#fff' }}
                    activeDot={{ r: 6, fill: '#3B82F6', stroke: '#fff', strokeWidth: 2 }}
                    animationDuration={500}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Gráfico de Servicios */}
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-2">Servicios Populares</h3>
            <p className="text-sm text-gray-500 mb-4 font-medium">Distribución en este periodo</p>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={currentData.services}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    animationDuration={500}
                  >
                    {currentData.services.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <RechartsTooltip 
                    formatter={(value: number) => [`${value}`, "Demandas"]}
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                  />
                  <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '12px', fontWeight: '500' }}/>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Rendimiento por Barbero (Estático en mock, podría ser dinámico también) */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-6">Rendimiento del Equipo</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: "Ismael Jara", revenue: "$650.000", appointments: 75, rating: "4.9", avatar: "IJ" },
              { name: "Matías", revenue: "$420.000", appointments: 50, rating: "4.8", avatar: "M" },
              { name: "Barbero 3", revenue: "$90.000", appointments: 20, rating: "4.5", avatar: "B3" },
            ].map((barber, i) => (
              <div key={i} className="flex flex-col bg-gray-50/50 p-5 rounded-xl border border-gray-100 hover:border-blue-100 hover:shadow-sm transition-all group">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-lg shrink-0 group-hover:scale-110 transition-transform">
                    {barber.avatar}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">{barber.name}</h4>
                    <div className="flex items-center gap-1 text-xs font-semibold text-amber-500">
                      ★ {barber.rating} <span className="text-gray-400 font-normal">/ 5.0</span>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-2 mt-auto">
                  <div className="bg-white p-3 rounded-lg border border-gray-100">
                    <span className="block text-xs font-semibold text-gray-400 mb-1">Citas</span>
                    <span className="font-bold text-gray-800">{barber.appointments}</span>
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-gray-100">
                    <span className="block text-xs font-semibold text-gray-400 mb-1">Ingresos</span>
                    <span className="font-bold text-emerald-600">{barber.revenue}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
