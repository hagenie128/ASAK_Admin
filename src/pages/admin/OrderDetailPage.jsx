/*
 * 화면: 주문 상세·상태 변경 SCR-010
 * 현재 Page 파일: OrderDetailPage.jsx
 * 현재 Route: 미연결 (목록 선택 후 진입 예정 — DetailPanel 인라인 가능성도 Figma 확인)
 * 필요한 데이터: 주문 상세, 품목·옵션·제외재료, 현재 orderStatus
 * 상태 소유 후보: 선택 orderId는 목록 Hook 또는 이 Page / 상태변경 중 locking
 * API 호출 후보 위치: PATCH status — Hook 또는 이 Page의 action 핸들러 (Badge에서 호출 금지)
 * Adapter 필요 여부: orderAdapter.toOrderDetailView
 * Hook 분리 필요 여부: useLiveOrders에 둘지 상세 전용 hook인지는 Figma 구조 보고 결정
 * 공통 Component 후보: DetailPanel, OrderStatusBadge, ConfirmDialog, ErrorState
 * Figma Component 연결 후보: DetailPanel, Modal/ConfirmDialog
 * 최종 명칭 확인 필요: 전체 Page vs Panel
 * Figma 승인 후 연결할 Props: order, nextStatusActions, isUpdating, onChangeStatus
 * 이 파일이 직접 처리하면 안 되는 상태: 목록 필터, 매출, 품절
 * 아직 구현하면 안 되는 부분: 완성 상세 JSX, 409 메시지 카피 확정 전 하드코딩 남발
 *
 * TODO 1: 상태 전이 RECEIVED→PREPARING→COMPLETED (IMPLEMENTATION_PLAN)
 * TODO 2: 요청 중 버튼 잠금, 성공 시 목록·상세 배지 일치
 */

import AdminPageHeader from "../../components/admin/AdminPageHeader.jsx";

export default function OrderDetailPage() {
  return (
    <section className="admin-page">
      <AdminPageHeader title="주문 관리" description="주문 상세와 상태 변경 UI 미리보기" />
      <div className="admin-filter-bar">
        <button type="button" disabled>오늘</button><button type="button" disabled>전체 상태</button>
        <input value="주문번호 또는 메뉴명 검색" disabled readOnly />
      </div>
      <table className="admin-static-table"><thead><tr><th>주문번호</th><th>주문일시</th><th>주문방식</th><th>메뉴</th><th>수량</th><th>결제</th><th>상태</th></tr></thead><tbody><tr><td>#----------</td><td>----.--.-- --:--</td><td>포장</td><td>주문 메뉴</td><td>-</td><td>결제완료</td><td>접수</td></tr></tbody></table>
      <aside className="admin-detail-panel">
        <div><span>주문 상세</span><strong>#----------</strong></div>
        <p>주문 데이터 연결 후 메뉴와 옵션이 표시됩니다.</p>
        <button type="button" disabled>상태 변경</button>
      </aside>
    </section>
  );
}
