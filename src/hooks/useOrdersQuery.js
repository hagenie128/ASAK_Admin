// 주문 목록 조회 Hook (SCR-010 / WBS2-036)
//
// mock: getAdminOrders() 전체 → usePagination 으로 화면에 slice

import { useEffect, useState } from "react";
import { getAdminOrders } from "../mocks/adminMockRepository.js";
import { usePagination } from "./usePagination.js";

export function useOrdersQuery({ pageSize = 15 } = {}) {
  const [status, setStatus] = useState("loading");
  const [allOrders, setAllOrders] = useState([]);

  useEffect(() => {
    try {
      const envelope = getAdminOrders();
      const rows = envelope.data?.content ?? [];
      setAllOrders(rows);
      setStatus(rows.length === 0 ? "empty" : "success");
    } catch {
      setStatus("error");
      setAllOrders([]);
    }
  }, []);

  const pagination = usePagination(allOrders, { pageSize });

  return {
    status,
    orders: pagination.pageItems,
    totalElements: pagination.totalElements,
    page: pagination.page,
    pageSize: pagination.pageSize,
    onPageChange: pagination.goToPage,
  };
}
