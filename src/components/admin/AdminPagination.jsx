/*
 * 페이지네이션 (공통)
 *
 * Props:
 *   page          — 현재 페이지 (0-based)
 *   pageSize      — 한 페이지 크기
 *   totalElements — 전체 건수
 *   onPageChange  — (nextPage: number) => void
 *
 * mock/실 API 모두 totalElements + page만 있으면 동작한다.
 * 페이지가 많으면 현재 페이지 주변 WINDOW개만 보여 준다.
 */

const WINDOW = 5; // 한 번에 보일 페이지 번호 개수

export default function AdminPagination({
  className = "",
  page,
  pageSize,
  totalElements,
  onPageChange,
}) {
  const totalPages = Math.max(1, Math.ceil((totalElements || 0) / (pageSize || 1)));

  if (totalElements <= pageSize) {
    return null;
  }

  // 현재 page 기준으로 [start, end) 번호 구간
  let start = Math.max(0, page - Math.floor(WINDOW / 2));
  let end = start + WINDOW;
  if (end > totalPages) {
    end = totalPages;
    start = Math.max(0, end - WINDOW);
  }

  const pages = [];
  for (let i = start; i < end; i += 1) pages.push(i);

  return (
    <div
      className={`order-management__pagination${className ? ` ${className}` : ""}`}
      aria-label="페이지네이션"
    >
      <button
        type="button"
        className="order-management__page-nav"
        disabled={page <= 0}
        aria-label="이전 페이지"
        onClick={() => onPageChange(page - 1)}
      >
        ‹
      </button>
      {pages.map((p) =>
        p === page ? (
          <b key={p} aria-current="page">
            {p + 1}
          </b>
        ) : (
          <button
            key={p}
            type="button"
            className="order-management__page-btn"
            onClick={() => onPageChange(p)}
          >
            {p + 1}
          </button>
        ),
      )}

      <button
        type="button"
        className="order-management__page-nav"
        disabled={page >= totalPages - 1}
        aria-label="다음 페이지"
        onClick={() => onPageChange(page + 1)}
      >
        ›
      </button>
    </div>
  );
}
