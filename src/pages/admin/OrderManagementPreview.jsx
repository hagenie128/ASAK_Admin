import { useState } from "react";
import { useOrdersQuery } from "../../hooks/useOrdersQuery.js";
import AdminTopHeader from "../../components/admin/AdminTopHeader.jsx";
import AdminPagination from "../../components/admin/AdminPagination.jsx";
import OrderTable from "../../components/admin/OrderTable.jsx";
import OrderDetailPanel from "../../components/admin/OrderDetailPanel.jsx";
import { getAdminOrderById } from "../../mocks/adminMockRepository.js";
import { confirm } from "../../utils/confirm.js";
import { toast } from "../../utils/toast.js";
import { refundAdminOrder, printAdminOrderReceipt } from "../../api/adminOrderApi.js";

/*
 * SCR-010 / Order Management
 * getAdminOrders() → useOrdersQuery → OrderTable + OrderDetailPanel
 */
export default function OrderManagementPreview() {
  const [selectedOrder, setSelectedOrder] = useState(null);

  const { status, orders, totalElements, page, pageSize, onPageChange } = useOrdersQuery({
    pageSize: 15,
  });

  function handleOrderDetail(orderId) {
    const result = getAdminOrderById(orderId);
    if (!result.success) {
      toast.error(result.message);
      return;
    }
    setSelectedOrder(result.data);
  }

  function handlePageChange(nextPage) {
    onPageChange(nextPage);
    setSelectedOrder(null);
  }

  function handleRefund(orderId) {
    if (!confirm("환불하시겠습니까?")) return;

    const result = refundAdminOrder(orderId);
    if (!result.success) {
      toast.error(result.message);
      return;
    }
    toast.success("환불 처리가 완료되었습니다.");
    setSelectedOrder(result.data);
  }

  function handlePrintReceipt(orderId) {
    if (!confirm("영수증을 출력하시겠습니까?")) return;

    const result = printAdminOrderReceipt(orderId);
    if (!result.success) {
      toast.error(result.message);
      return;
    }
    toast.success("영수증 출력이 완료되었습니다.");
    setSelectedOrder(result.data);
  }

  return (
    <section className="order-management">
      <AdminTopHeader
        crumb="Admin / 주문 관리"
        title="주문 관리"
        description="주문 원본 데이터 조회, 상태 변경, 결제 상태 확인을 관리하세요."
      />
      <div className="order-management__filters">
        <button disabled type="button">
          주문 상태⌄
        </button>
        <button disabled type="button">
          결제 상태⌄
        </button>
        <button disabled type="button">
          주문 유형⌄
        </button>
        <button disabled type="button">
          날짜 선택
        </button>
        <input aria-label="주문 검색" disabled placeholder="주문번호 / 메뉴명 검색" readOnly />
        <button className="order-management__search" disabled type="button">
          조회
        </button>
      </div>
      <div className="order-management__body">
        <div className="order-management__table-wrap">
          <OrderTable status={status} orders={orders} onOrderDetail={handleOrderDetail} />
          <AdminPagination
            page={page}
            pageSize={pageSize}
            totalElements={totalElements}
            onPageChange={handlePageChange}
          />
        </div>
        <OrderDetailPanel
          selectedOrder={selectedOrder}
          onClose={() => setSelectedOrder(null)}
          onRefund={handleRefund}
          onPrintReceipt={handlePrintReceipt}
        />
      </div>
    </section>
  );
}
