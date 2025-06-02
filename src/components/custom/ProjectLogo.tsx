import Link from "next/link";

import { cn } from "@/lib/utils";
import { PenLine } from "lucide-react";
export function ProjectLogo({
  fontSize = "2xl",
  iconSize = 20,
}: {
  fontSize?: string;
  iconSize?: number;
}) {
  return (
    <Link
      href="/"
      className={cn(
        "text-2xl font-extrabold flex items-center gap-2",
        fontSize
      )}
    >
      <div className="rounded-xl bg-gradient-to-r from-blue-400 to-blue-600">
        <PenLine size={iconSize} className="stroke-white" />
      </div>
      <div>
        <span className="bg-gradient-to-r from-blue-400 to-blue-500 bg-clip-text text-transparent">
          Flow
        </span>
        <span className="text-stone-700 dark:text-stone-300">Redefined</span>
      </div>
    </Link>
  );
}
