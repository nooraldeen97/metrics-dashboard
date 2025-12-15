import React from 'react';
import { Badge } from "@/components/ui/badge";
import { cn } from '@/lib/utils';

interface BadgeProps {
    variant?: "default" | "secondary" | "destructive" | "outline";
    title?: string;
    className?:string;
}


function StatusBadge({variant = "default", title = "loading",className}: BadgeProps) {
  return (
    <div className=' ml-auto'>
    <Badge variant={variant} className={cn(className)}>{title}</Badge>
    </div>
  );
}

export default StatusBadge;
