import React from 'react';
import { Badge } from "@/components/ui/badge";

interface BadgeProps {
    variant?: "default" | "secondary" | "destructive" | "outline";
    title: string;
    color?: string;
}


function BadgeComponent({variant = "default", title = "Badge",color}: BadgeProps) {
  return (
    <div className=' ml-auto'>
    <Badge variant={variant} className={color}>{title}</Badge>
    </div>
  );
}

export default BadgeComponent;
