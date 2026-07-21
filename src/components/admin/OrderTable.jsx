/*
 * 주문 목록 표 (SCR-010)
 */
import { formatDate } from "../../utils/date.js";
import { formatCurrency } from "../../utils/currency.js";
import {
  ORDER_TYPE_LABEL,
  ORDER_STATUS_LABEL,
  PAYMENT_STATUS_LABEL,
} from "../../constants/orderLabels.js";

export default function OrderTable({ status, orders, onOrderDetail }) {
  return (
    <table className="order-management__table">
      <thead>
        <tr>
          <th>주문번호</th>
          <th>주문일시</th>
          <th>주문유형</th>
          <th>메뉴 요약</th>
          <th>총 수량</th>
          <th>주문금액</th>
          <th>주문상태</th>
          <th>결제상태</th>
        </tr>
      </thead>
      <tbody>
        {status === "success" && orders.length > 0 ? (
          orders.map((order) => (
            <tr key={order.orderId} onClick={() => onOrderDetail(order.orderId)}>
              <td>{order.orderNo}</td>
              <td>{formatDate(order.createdAt)}</td>
              <td>{ORDER_TYPE_LABEL[order.orderType] ?? order.orderType}</td>
              <td>{order.menuSummary}</td>
              <td>{order.itemCount}</td>
              <td>{formatCurrency(order.totalPrice)}</td>
              <td>
                <span className={`order-status order-status--${order.orderStatus}`}>
                  {ORDER_STATUS_LABEL[order.orderStatus] ?? order.orderStatus}
                </span>
              </td>
              <td>
                <span className={`order-status order-status--${order.paymentStatus}`}>
                  {PAYMENT_STATUS_LABEL[order.paymentStatus] ?? order.paymentStatus}
                </span>
              </td>
            </tr>
          ))
        ) : status === "error" ? (
          <tr>
            <td colSpan={8}>주문 내역을 불러오는 중에 실패했습니다.</td>
          </tr>
        ) : status === "empty" ? (
          <tr>
            <td colSpan={8}>주문 내역이 없습니다.</td>
          </tr>
        ) : (
          <tr>
            <td colSpan={8}>주문 내역을 불러오는 중입니다. 잠시 후 다시 시도해주세요.</td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
