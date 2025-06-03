"use client";
import React from "react";
import { Separator } from "@/components/ui/separator";
import { DesktopSidebar } from "@/components/custom/Sidebar";
import { BreadCrumbHeader } from "@/components/custom/BreadCrumbHeader";
import { ModeToggle } from "@/components/custom/Toggle";
import { SignedIn, UserButton } from "@clerk/nextjs";
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen">
      <DesktopSidebar />
      <div className="flex flex-col flex-1 min-h-screen">
        <header className="flex items-center justify-between px-6 py-4 h-[50px] container">
          <BreadCrumbHeader />
          <div className="gap-1 flex items-center">
            <ModeToggle />

            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </header>
        <Separator />
        <div className="overflow-auto">
          <div className="flex-1 container py-4 text-accent-foreground px-4">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
