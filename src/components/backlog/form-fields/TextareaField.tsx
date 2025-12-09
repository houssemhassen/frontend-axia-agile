
import React from 'react';
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface TextareaFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  rows?: number;
  placeholder?: string;
}

const TextareaField: React.FC<TextareaFieldProps> = ({
  id,
  label,
  value,
  onChange,
  rows = 3,
  placeholder
}) => {
  return (
    <div className="grid grid-cols-4 items-center gap-4">
      <Label htmlFor={id} className="text-right">
        {label}
      </Label>
      <Textarea
        id={id}
        value={value}
        onChange={onChange}
        className="col-span-3"
        rows={rows}
        placeholder={placeholder}
      />
    </div>
  );
};

export default TextareaField;
