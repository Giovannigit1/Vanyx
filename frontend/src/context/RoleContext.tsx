"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

type Role = "Administrador" | "Barbero";

interface RoleContextType {
  role: Role;
  setRole: (role: Role) => void;
  barberName: string;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export function RoleProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<Role>("Administrador");
  
  // Si es Administrador es Ismael, si es Barbero asumiremos que es Matías para la demo
  const barberName = role === "Administrador" ? "Ismael Jara" : "Matías";

  return (
    <RoleContext.Provider value={{ role, setRole, barberName }}>
      {children}
    </RoleContext.Provider>
  );
}

export function useRole() {
  const context = useContext(RoleContext);
  if (context === undefined) {
    throw new Error("useRole must be used within a RoleProvider");
  }
  return context;
}
