/*
 * 화면: Sales SCR-019
 * 현재 Page 파일: SalesSummaryPage.jsx
 * 현재 Route: "/sales" → 아직 AdminScreen
 * 필요한 데이터: 기간, 일별 매출, 메뉴별 판매 요약
 * 상태 소유 후보: useSalesQuery (from/to, listStatus)
 * API 호출 후보 위치: api/sales + useSalesQuery
 * Adapter 필요 여부: salesAdapter (Chart 변환 ≠ Table 변환)
 * Hook 분리 필요 여부: 예 — Filter·조회·변환 분리
 * 공통 Component 후보: PageHeader, FilterBar, SalesChart, DataTable, Loading/Empty/Error
 * Figma Component 연결 후보: FilterBar, SalesChart, DataTable, EmptyState, ErrorState
 * 최종 명칭 확인 필요: SalesSummary vs SalesDashboard (DashboardPage와 혼동 주의)
 * Figma 승인 후 연결할 Props: from, to, chartSeries, tableRows, listStatus
 * 이 파일이 직접 처리하면 안 되는 상태: Empty와 Error 동일 처리, Mock을 계약으로 고정
 * 아직 구현하면 안 되는 부분: 완성 차트 JSX/CSS, KPI 공식 창작
 *
 * TODO 1: from<=to·미래 날짜 막기, 잘못된 기간은 요청 안 함
 * TODO 2: Mock/API 출처를 UI에 표시할지는 제품 결정 후
 */

export default function SalesSummaryPage() {
  return null;
}
