
import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface InputFieldProps {
  id: string;
  label: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  min?: string;
  max?: string;
  placeholder?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  id,
  label,
  value,
  onChange,
  type = "text",
  min,
  max,
  placeholder
}) => {
  return (
    <div className="grid grid-cols-4 items-center gap-4">
      <Label htmlFor={id} className="text-right">
        {label}
      </Label>
      <Input
        id={id}
        type={type}
        min={min}
        max={max}
        value={value}
        onChange={onChange}
        className="col-span-3"
        placeholder={placeholder}
      />
    </div>
  );
};

export default InputField;
