import { TaskParamType, TaskType } from "@/types/task";
import { CodeIcon, LucideProps } from "lucide-react";

export const PageToHtml = {
  type: TaskType.PAGE_TO_HTML,
  label: "Get Html from page",
  icon: (props: LucideProps) => (
    <CodeIcon className="stroke-purple-700" {...props} />
  ),
  isEntryPoint: false,
  inputs: [
    {
      name: "Web page",
      type: TaskParamType.BROWSER_INSTANCE,
      required: true,
    },
  ],
};
