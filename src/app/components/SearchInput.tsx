import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface SearchInputProps {
  changeFilter: (value: string) => void;
}

export function SearchInput({ changeFilter }: SearchInputProps) {
  return (
    <div className="relative w-full">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        className="pl-9"
        placeholder="Search datasets..."
        onChange={(e) => changeFilter(e.target.value)}
      />
    </div>
  );
}
