import { Skeleton } from "@/components/ui/skeleton";

interface SkeletonCardProps {
    count: number;
}  
export function SkeletonCard({ count = 1}: SkeletonCardProps) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="w-full">
          <Skeleton className="w-full h-12 mt-4" />
        </div>
      ))}
    </div>
  );
}
