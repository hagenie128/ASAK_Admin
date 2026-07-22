// 주문 목록 조회 Hook (SCR-010 / WBS2-036)
import { useEffect, useState } from "react";
import { ADMIN_PAGINATION } from "../constants/pagination.js";
import { getAdminOrders } from "../mocks/adminMockRepository.js";
import { usePagination } from "./usePagination.js";

/**
 * @param {object} [options]
 * @param {number} [options.pageSize] — 기본: ADMIN_PAGINATION.orders.pageSize
 * @param {object} [options.filters]
 */
export function useOrdersQuery({
  pageSize = ADMIN_PAGINATION.orders.pageSize,
  filters = {},
} = {}) {
  const [status, setStatus] = useState("loading");
  const [allOrders, setAllOrders] = useState([]);
  const [error, setError] = useState(null);
  const [tick, setTick] = useState(0);

  const {
    orderStatus = "",
    paymentStatus = "",
    orderType = "",
    dateFrom = "",
    dateTo = "",
    keyword = "",
  } = filters;

  useEffect(() => {
    setStatus("loading");
    setError(null);
    try {
      const envelope = getAdminOrders({
        orderStatus,
        paymentStatus,
        orderType,
        dateFrom,
        dateTo,
        keyword,
      });
      const rows = envelope.data?.content ?? [];
      setAllOrders(rows);
      setStatus(rows.length === 0 ? "empty" : "success");
    } catch (err) {
      setError(err);
      setStatus("error");
      setAllOrders([]);
    }
  }, [orderStatus, paymentStatus, orderType, dateFrom, dateTo, keyword, tick]);

  const pagination = usePagination(allOrders, { pageSize });

  return {
    status,
    error,
    orders: pagination.pageItems,
    totalElements: pagination.totalElements,
    page: pagination.page,
    pageSize: pagination.pageSize,
    onPageChange: pagination.goToPage,
    refetch: () => setTick((n) => n + 1),
  };
}
