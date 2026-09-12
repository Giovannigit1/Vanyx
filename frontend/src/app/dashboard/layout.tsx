"use client";

import { ReactNode } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { BottomNav } from "@/components/dashboard/BottomNav";
import { RoleProvider } from "@/context/RoleContext";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <RoleProvider>
      <div className="min-h-screen bg-[#F4F5F7] text-[#333333] flex font-sans">
        {/* Sidebar is hidden on mobile, visible on medium+ screens */}
        <div className="hidden md:flex">
          <Sidebar />
        </div>
        
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col h-screen overflow-hidden pb-[60px] md:pb-0">
          {children}
        </div>

        {/* Bottom Navigation for Mobile Only */}
        <BottomNav />
      </div>
    </RoleProvider>
  );
}
