import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SelectStatusProps {
  changeFilter: (value: string) => void;
}

export function SelectStatus({ changeFilter }: SelectStatusProps) {
  return (
    <Select onValueChange={(value) => changeFilter( value)}>
      <SelectTrigger className="mt-2.5 w-full">
        <SelectValue placeholder="All Status" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Status</SelectLabel>
          <SelectItem value="active">active</SelectItem>
          <SelectItem value="inactive">inactive</SelectItem>
          <SelectItem value="archived">archived</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
