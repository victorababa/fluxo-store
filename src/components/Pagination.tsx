import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';

interface PageButtonProps {
  page: number;
  isActive: boolean;
  onClick: () => void;
}

const PageButton = ({ page, isActive, onClick }: PageButtonProps) => (
  <button
    onClick={(e) => {
      e.preventDefault();
      onClick();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }}
    className={`w-10 h-10 flex items-center justify-center rounded-md ${
      isActive
        ? 'bg-blue-600 text-white font-medium'
        : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
    }`}
    aria-current={isActive ? 'page' : undefined}
  >
    {page}
  </button>
);

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  className = '',
}: PaginationProps) {
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = startPage + maxVisiblePages - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  const pageNumbers = getPageNumbers();
  const showFirstPage = !pageNumbers.includes(1);
  const showLastPage = !pageNumbers.includes(totalPages) && totalPages > 0;
  const showLeftEllipsis = pageNumbers[0] > 1;
  const showRightEllipsis = pageNumbers[pageNumbers.length - 1] < totalPages;

  if (totalPages <= 1) {
    return null;
  }

  return (
    <nav className={`flex items-center justify-center space-x-1 ${className}`} aria-label="Pagination">
      {/* Botão Anterior */}
      <button
        onClick={() => {
          onPageChange(Math.max(1, currentPage - 1));
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        disabled={currentPage === 1}
        className="p-2 rounded-md text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Página anterior"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {/* Primeira Página */}
      {showFirstPage && (
        <PageButton 
          page={1} 
          isActive={currentPage === 1}
          onClick={() => onPageChange(1)}
        />
      )}

      {/* Elipse esquerda */}
      {showLeftEllipsis && (
        <span className="px-3 py-2 text-gray-500">
          <MoreHorizontal className="w-4 h-4" />
        </span>
      )}

      {/* Números das Páginas */}
      {pageNumbers.map((page) => (
        <PageButton
          key={page}
          page={page}
          isActive={page === currentPage}
          onClick={() => onPageChange(page)}
        />
      ))}

      {/* Elipse direita */}
      {showRightEllipsis && (
        <span className="px-3 py-2 text-gray-500">
          <MoreHorizontal className="w-4 h-4" />
        </span>
      )}

      {/* Última Página */}
      {showLastPage && (
        <PageButton 
          page={totalPages} 
          isActive={currentPage === totalPages}
          onClick={() => onPageChange(totalPages)}
        />
      )}

      {/* Próximo Botão */}
      <button
        onClick={() => {
          onPageChange(Math.min(totalPages, currentPage + 1));
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        disabled={currentPage === totalPages}
        className="p-2 rounded-md text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Próxima página"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </nav>
  );
}

export default Pagination;
