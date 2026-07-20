/*
 * 주문 상태 배지
 *
 * Props 후보: orderStatus  (RECEIVED|PREPARING|COMPLETED|CANCELLED)
 *             paymentStatus? (READY|APPROVED|FAILED|PAID… — adapter 정규화)
 * PATCH는 Badge에서 호출하지 말 것 (Page/Hook 소유)
 * 표: public/mocks/README.md §2
 */
export default function OrderStatusBadge() {
  return null;
}
