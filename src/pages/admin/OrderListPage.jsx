/*
 * SCR-009 / Live Order / 주문 현황 — path "/" (로그인 후 홈)
 * 실제 UI: LiveOrderPreview (이 Page는 래퍼)
 *
 * mock: getLiveOrders().data.content[]
 *   order: orderId, orderNo, orderTypeLabel, wide, elapsedSec, totalPrice, menus[]
 *   menu:  menuName, quantity, base, dressing, options[{ label, tone }]
 *   tone:  exclude | plus | drink | side
 * 표: public/mocks/README.md §1
 *
 * Hook 후보: useLiveOrders — OrderTable에서 API 직접 호출 금지
 * Adapter: orderAdapter (목록용 items 스키마와 Live menus는 다름)
 */
// TODO: loading / empty / error 상태 분리 (WBS2-044)

import LiveOrderPreview from "../../components/admin/LiveOrderPreview.jsx";

export default function OrderListPage() {
  return <LiveOrderPreview />;
}
