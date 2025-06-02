import { ProjectLogo } from "@/components/custom/ProjectLogo";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-screen items-center justify-center bg-amber-50">
      <ProjectLogo />
      {children}
    </div>
  );
}
