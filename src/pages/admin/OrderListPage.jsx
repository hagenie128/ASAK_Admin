/*
 * 화면: Live Order / 주문 현황 SCR-009 (라벨 "주문 현황", path "/")
 * 현재 Page 파일: OrderListPage.jsx
 * 현재 Route: "/" → 아직은 AdminApp의 AdminScreen이 렌더 (이 파일 미연결)
 * 필요한 데이터: 주문 목록 (orderNo, orderType, orderStatus, paymentStatus, totalPrice, createdAt)
 * 상태 소유 후보: useLiveOrders (listStatus, filters, selectedId)
 * API 호출 후보 위치: api/admin + useLiveOrders — OrderTable에서 호출 금지
 * Adapter 필요 여부: orderAdapter.toOrderListRows
 * Hook 분리 필요 여부: 예 (조회·선택·상태변경 분리)
 * 공통 Component 후보: PageHeader, FilterBar, DataTable/OrderTable, DetailPanel, Loading/Empty/Error
 * Figma Component 연결 후보: FilterBar, DataTable, DetailPanel, OrderStatusBadge
 * 최종 명칭 확인 필요: Live Order vs Order List vs Order Management 명칭
 * Figma 승인 후 연결할 Props: rows, filters, onSelect, listStatus
 * 이 파일이 직접 처리하면 안 되는 상태: KPI 계산, 품절 Draft, Sales 기간
 * 아직 구현하면 안 되는 부분: 완성 테이블 JSX, 폴링 간격 추측, 픽셀 CSS
 *
 * Order Management와의 관계:
 *   - 검색·이력 중심 화면이 따로 생기면 상태 구조를 억지로 공유하지 말 것
 *   - Adapter만 공유 후보
 *
 * TODO 1: AdminApp Route element를 이 Page로 교체하기 전 Figma·계약 확인
 * TODO 2: loading/empty/error 분리
 */

export default function OrderListPage() {
  return null;
}
