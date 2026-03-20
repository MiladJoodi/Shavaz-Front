import { cn } from "@/lib/cn";

interface SkeletonProps {
  className?: string;
}

export const Skeleton = ({ className }: SkeletonProps) => {
  return (
    <div
      className={cn("animate-pulse bg-gray-200 rounded-md", className)}
    />
  );
};

export const ProductCardSkeleton = () => {
  return (
    <div className="flex flex-col items-center gap-3 bg-white rounded-lg px-3 py-4 border border-gray-100">
      <Skeleton className="w-[130px] h-[130px] rounded-lg" />
      <Skeleton className="w-full h-4" />
      <Skeleton className="w-3/4 h-4" />
      <Skeleton className="w-1/2 h-6 mt-2" />
      <Skeleton className="w-1/3 h-3" />
    </div>
  );
};

export const BlogCardSkeleton = () => {
  return (
    <div className="flex flex-col bg-white rounded-lg overflow-hidden border border-gray-100">
      <Skeleton className="w-full h-48 rounded-none" />
      <div className="p-4 flex flex-col gap-2">
        <Skeleton className="w-3/4 h-5" />
        <Skeleton className="w-full h-3" />
        <Skeleton className="w-full h-3" />
        <Skeleton className="w-1/2 h-3" />
      </div>
    </div>
  );
};
