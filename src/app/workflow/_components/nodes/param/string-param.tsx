"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useId, useState } from "react";
import { ParamProps } from "@/types/appNode";
export function StringParam({
  param,
  value,
  updateNodeParamValue,
}: ParamProps) {
  const id = useId();
  const [internalValue, setInternalValue] = useState(value ?? "");
  return (
    <div className="space-y-1 p-1 w-full">
      <Label htmlFor={id} className="text-xs flex">
        {param.name}
        {param.required && <p className="text-red-400 px-2">*</p>}
      </Label>
      <Input
        id={id}
        placeholder="Enter a value here"
        value={internalValue}
        onChange={(e) => setInternalValue(e.target.value)}
        onBlur={() => updateNodeParamValue(internalValue)}
      />
      {param.helperText && (
        <p className="text-muted-foreground px-2">{param.helperText}</p>
      )}
    </div>
  );
}
