
import React from 'react';
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from '@/components/ui/badge';

interface Option {
  value: string;
  label: string;
}

interface SelectFieldProps {
  label: string;
  value: string;
  onValueChange: (value: string) => void;
  options: Option[];
  badgeClassName?: (value: string) => string;
  placeholder?: string;
}

const SelectField: React.FC<SelectFieldProps> = ({
  label,
  value,
  onValueChange,
  options,
  badgeClassName,
  placeholder
}) => {
  return (
    <div className="grid grid-cols-4 items-center gap-4">
      <Label className="text-right">{label}</Label>
      <div className="col-span-3">
        <Select 
          value={value} 
          onValueChange={onValueChange}
        >
          <SelectTrigger>
            <SelectValue placeholder={placeholder}>
              {badgeClassName && value ? (
                <Badge className={badgeClassName(value)}>
                  {options.find(opt => opt.value === value)?.label || value.replace("-", " ")}
                </Badge>
              ) : null}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {options.map(option => (
              <SelectItem key={option.value} value={option.value}>
                {badgeClassName ? (
                  <Badge className={badgeClassName(option.value)}>
                    {option.label}
                  </Badge>
                ) : (
                  option.label
                )}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default SelectField;
