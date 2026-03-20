import Link from "next/link";
import { LucideIcon } from "lucide-react";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description?: string;
  actionLabel?: string;
  actionHref?: string;
}

const EmptyState = ({
  icon: Icon,
  title,
  description,
  actionLabel,
  actionHref,
}: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-4">
      <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center">
        <Icon size={36} className="text-gray-400" />
      </div>
      <h3 className="text-lg text-[#646464] font-medium">{title}</h3>
      {description && <p className="text-sm text-gray-400 text-center max-w-md">{description}</p>}
      {actionLabel && actionHref && (
        <Link
          href={actionHref}
          className="mt-2 bg-primary text-white px-6 py-2.5 rounded-md text-sm hover:bg-primary/90 transition-colors"
        >
          {actionLabel}
        </Link>
      )}
    </div>
  );
};

export default EmptyState;
