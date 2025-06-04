import { ProjectLogo } from "@/components/custom/ProjectLogo";
import { ModeToggle } from "@/components/custom/Toggle";
import { Separator } from "@/components/ui/separator";

export default function WorkflowLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col w-full h-screen">
      {children}
      <Separator />
      <footer className="flex items-center justify-between w-full p-2">
        <ProjectLogo />
        <ModeToggle />
      </footer>
    </div>
  );
}
