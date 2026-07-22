// 목록 페이징 공통 Hook
//
// 배열 전체를 받아 page / pageSize 로 slice 한다.
// pageSize는 화면별 constants/pagination.js 값을 넘긴다 (전역 고정 금지).
//
//   import { ADMIN_PAGINATION } from "../constants/pagination.js";
//   const { pageItems, page, pageSize, totalElements, goToPage } =
//     usePagination(items, { pageSize: ADMIN_PAGINATION.orders.pageSize });

import { useCallback, useEffect, useMemo, useState } from "react";

/** 순수 함수 — 테스트·다른 훅·mock repository에서도 사용 가능 */
export function paginateItems(items, page, pageSize) {
  const size = Math.max(1, Number(pageSize) || 1);
  const totalElements = items?.length ?? 0;
  const totalPages = Math.max(1, Math.ceil(totalElements / size) || 1);
  const safePage = Math.min(Math.max(0, page), totalPages - 1);
  const start = safePage * size;

  return {
    pageItems: (items ?? []).slice(start, start + size),
    page: safePage,
    pageSize: size,
    totalElements,
    totalPages,
  };
}

/**
 * @param {unknown[]} items — 전체 목록
 * @param {{ pageSize: number, initialPage?: number }} options — pageSize는 화면 설정 필수
 */
export function usePagination(items, { pageSize, initialPage = 0 } = {}) {
  if (pageSize == null || Number(pageSize) <= 0) {
    throw new Error("usePagination: pageSize는 화면별 ADMIN_PAGINATION 값으로 넘겨야 합니다.");
  }
  const [page, setPage] = useState(initialPage);

  const { pageItems, totalElements, totalPages, page: safePage } = useMemo(
    () => paginateItems(items, page, pageSize),
    [items, page, pageSize],
  );

  // 항목 이동·삭제로 페이지 수가 줄면 현재 page 를 안전한 값으로 맞춤
  useEffect(() => {
    if (safePage !== page) {
      setPage(safePage);
    }
  }, [safePage, page]);

  const goToPage = useCallback((nextPage) => {
    setPage(Math.max(0, nextPage));
  }, []);

  const resetPage = useCallback(() => {
    setPage(0);
  }, []);

  return {
    page: safePage,
    pageSize,
    pageItems,
    totalElements,
    totalPages,
    goToPage,
    resetPage,
  };
}
