import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface SkeletonCardProps {
  count: number;
  className?: string;
}
export function SkeletonCard({ className, count = 1 }: SkeletonCardProps) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index}>
          <Skeleton className={cn("mt-4", className)} />
        </div>
      ))}
    </div>
  );
}
