import { formatDateTime } from "../../utils/date.js";
import { formatCurrency } from "../../utils/currency.js";
import {
  PAYMENT_METHOD_LABEL,
  ORDER_STATUS,
  PAYMENT_STATUS,
} from "../../constants/orderLabels.js";

export default function OrderDetailPanel({ selectedOrder, onClose, onRefund, onPrintReceipt }) {
  const canRefund =
    selectedOrder?.paymentStatus === PAYMENT_STATUS.PAID &&
    selectedOrder?.orderStatus !== ORDER_STATUS.CANCELLED;
  const canPrintReceipt = selectedOrder?.paymentStatus === PAYMENT_STATUS.PAID;

  return (
    <aside className="order-management__detail">
      <h2>주문 상세</h2>
      {selectedOrder?.orderId ? (
        <>
          <dl>
            <div>
              <dt>주문번호</dt>
              <dd>{selectedOrder.orderNo}</dd>
            </div>
            <div>
              <dt>주문일시</dt>
              <dd>{formatDateTime(selectedOrder.createdAt)}</dd>
            </div>
            <div>
              <dt>결제수단</dt>
              <dd>{PAYMENT_METHOD_LABEL[selectedOrder.paymentMethod] || "-"}</dd>
            </div>
          </dl>
          <div className="order-management__items">
            {(selectedOrder.items ?? []).map((item) => (
              <div key={item.menuId} className="order-management__item">
                <strong>{item.menuName}</strong>
                <span>
                  {item.quantity}개　<b>{formatCurrency(item.unitPrice)}</b>
                </span>
                <small>
                  옵션: {(item.optionItems ?? []).map((o) => o.name).join(", ") || "-"}
                  {" | "}
                  제외: {(item.excludedIngredients ?? []).map((e) => e.name).join(", ") || "-"}
                </small>
              </div>
            ))}
          </div>
          <section>
            <h3>요청사항</h3>
            <p>{selectedOrder.requestNote || "요구사항 없음"}</p>
          </section>
          <div className="order-management__total">
            <strong>총 결제 금액</strong>
            <b>{formatCurrency(selectedOrder.totalPrice)}</b>
          </div>
          <footer>
            {canRefund ? (
              <button type="button" onClick={() => onRefund(selectedOrder.orderId)}>
                환불
              </button>
            ) : null}
            {canPrintReceipt ? (
              <button type="button" onClick={() => onPrintReceipt(selectedOrder.orderId)}>
                영수증 출력
              </button>
            ) : null}
            <button onClick={onClose} type="button">
              닫기
            </button>
          </footer>
        </>
      ) : (
        <div>주문을 선택해주세요</div>
      )}
    </aside>
  );
}
