"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import persianNumber from "@/utils/persianNumber";
import { cn } from "@/lib/cn";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 rounded-md border border-gray-200 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
      >
        <ChevronRight size={18} />
      </button>

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={cn(
            "w-10 h-10 rounded-md text-sm transition-colors",
            currentPage === page
              ? "bg-primary text-white"
              : "border border-gray-200 text-[#646464] hover:bg-gray-50"
          )}
        >
          {persianNumber(page)}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 rounded-md border border-gray-200 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
      >
        <ChevronLeft size={18} />
      </button>
    </div>
  );
};

export default Pagination;
