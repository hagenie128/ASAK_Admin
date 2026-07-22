/*
 * SCR-009 / Live 주문 현황 — path "/" (로그인 후 홈)
 * 이 Page는 래퍼만 담당. 실제 UI·상태·액션은 LiveOrderPreview.
 */
import LiveOrderPreview from "../../components/admin/LiveOrderPreview.jsx";

export default function OrderListPage() {
  return <LiveOrderPreview />;
}
