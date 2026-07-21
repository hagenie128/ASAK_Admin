// 목록 페이징 공통 Hook
//
// 배열 전체를 받아 page / pageSize 로 slice 한다.
// mock·드래프트·API 목록 어디서든 재사용.
//
//   const { pageItems, page, pageSize, totalElements, goToPage } =
//     usePagination(items, { pageSize: 12 });

import { useCallback, useEffect, useMemo, useState } from "react";

/** 순수 함수 — 테스트·다른 훅에서도 사용 가능 */
export function paginateItems(items, page, pageSize) {
  const totalElements = items?.length ?? 0;
  const totalPages = Math.max(1, Math.ceil(totalElements / pageSize) || 1);
  const safePage = Math.min(Math.max(0, page), totalPages - 1);
  const start = safePage * pageSize;

  return {
    pageItems: (items ?? []).slice(start, start + pageSize),
    page: safePage,
    pageSize,
    totalElements,
    totalPages,
  };
}

/**
 * @param {unknown[]} items — 전체 목록
 * @param {{ pageSize?: number, initialPage?: number }} options
 */
export function usePagination(items, { pageSize = 10, initialPage = 0 } = {}) {
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
