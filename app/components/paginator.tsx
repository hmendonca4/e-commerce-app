import { Link, useLocation } from "@remix-run/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

interface PaginatorProps {
  currentPage: number;
  totalPages: number;
  basePath?: string; // default is current path
}

function getQueryStringWithoutPage(search: string) {
  const params = new URLSearchParams(search);
  params.delete("page");
  const qs = params.toString();
  return qs ? `&${qs}` : "";
}

export default function Paginator({
  currentPage,
  totalPages,
  basePath,
}: PaginatorProps) {
  const location = useLocation();
  const query = getQueryStringWithoutPage(location.search);
  const path = basePath || location.pathname;

  if (totalPages <= 1) return null;

  const pageLinks = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav className="mt-6 flex items-center justify-end gap-2">
      {currentPage > 1 && (
        <Link
          to={`${path}?page=${currentPage - 1}${query}`}
          className="px-3 py-1 border rounded hover:bg-gray-100"
        >
          <ChevronLeftIcon className="w-5 h-5 inline-block" />
        </Link>
      )}

      {pageLinks.map((page) => (
        <Link
          key={page}
          to={`${path}?page=${page}${query}`}
          className={`px-3 py-1 border rounded ${
            page === currentPage
              ? "bg-blue-500 text-white"
              : "hover:bg-gray-100"
          }`}
        >
          {page}
        </Link>
      ))}

      {currentPage < totalPages && (
        <Link
          to={`${path}?page=${currentPage + 1}${query}`}
          className="px-3 py-1 border rounded hover:bg-gray-100"
        >
          <ChevronRightIcon className="w-5 h-5 inline-block" />
        </Link>
      )}
    </nav>
  );
}
