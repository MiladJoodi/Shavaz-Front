import Link from "next/link";
import { ChevronLeft } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

const Breadcrumb = ({ items }: BreadcrumbProps) => {
  return (
    <nav className="flex items-center gap-1 text-sm text-gray-500 py-4">
      <Link href="/" className="hover:text-primary transition-colors">
        خانه
      </Link>
      {items.map((item, index) => (
        <span key={index} className="flex items-center gap-1">
          <ChevronLeft size={14} />
          {item.href ? (
            <Link href={item.href} className="hover:text-primary transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-[#646464]">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
};

export default Breadcrumb;
