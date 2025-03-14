import Link from "next/link";

export default function Pagination({
  url,
  currentPage,
  totalBooks,
  booksPerPage,
}) {
  currentPage = parseInt(currentPage);

  const totalPages = Math.ceil(totalBooks / booksPerPage);
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 3;
    let startPage = Math.max(1, currentPage - 1);
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="col-12 pb-1">
      <nav aria-label="Page navigation">
        <ul className="pagination justify-content-center mb-3">
          <li
            className={currentPage === 1 ? "page-item disabled" : "page-item"}
          >
            <Link
              href={`${url}?page=${currentPage - 1}`}
              className="page-link"
              aria-label="Previous"
            >
              <span aria-hidden="true">&laquo;</span>
              <span className="sr-only">Previous</span>
            </Link>
          </li>
          {pageNumbers.map((page) => (
            <li
              key={page}
              className={`page-item ${currentPage === page ? "active" : ""}`}
            >
              <Link
                href={`${url}?page=${page}`}
                className="page-link"
              >
                {page}
              </Link>
            </li>
          ))}
          <li
            className={`page-item ${currentPage === totalPages && "disabled"}`}
          >
            <Link
              href={`${url}?page=${currentPage + 1}`}
              className="page-link"
              aria-label="Next"
            >
              <span aria-hidden="true">&raquo;</span>
              <span className="sr-only">Next</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
