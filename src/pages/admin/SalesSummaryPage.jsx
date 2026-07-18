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

const chartBars = [40, 30, 45, 60, 50, 35, 25, 20, 15, 10, 5];
const paymentShare = [["카드", "72%", 72], ["간편결제", "15%", 15], ["현금", "13%", 13]];
const orderShare = [["매장", "58%", 58], ["포장", "32%", 32], ["배달", "10%", 10]];

function ShareCard({ title, rows }) {
  return <section className="sales-share-card"><h2>{title}</h2>{rows.map(([label, amount, width]) => <div key={label}><p><span>{label}</span><b>{amount}</b></p><i><em style={{ width: `${width}%` }} /></i></div>)}</section>;
}

export default function SalesSummaryPage({ view = "summary" }) {
  const title = view === "daily" ? "일별 매출" : view === "monthly" ? "월별 매출" : "매출 요약";
  return <section className="sales-summary">
    <header><div><h1>{title}</h1><p>매출 현황 및 시간대 분석</p></div><button type="button" disabled>오늘 ⌄</button></header>
    <div className="sales-summary__kpis">{[["당일 총매출", "468,000원", "↓ 2.8%  전일 대비"], ["주문 수", "39건", "↓ 4.5%  전일 대비"], ["평균 객단가", "12,000원", "↑ 0.5%  전일 대비"], ["피크 시간대", "13:00~14:00", "117,000원"]].map(([label,value,note]) => <article key={label}><span>{label}</span><strong>{value}</strong><small>{note}</small></article>)}</div>
    <div className="sales-summary__body"><section className="sales-chart"><h2>시간대별 매출</h2><div className="sales-chart__bars">{chartBars.map((height,index) => <i key={index} style={{ height: `${height}%` }} />)}</div><div className="sales-chart__ticks"><span>10시</span><span>12시</span><span>14시</span><span>16시</span><span>18시</span><span>20시</span><span>21시</span></div><p><b>126,000원</b> 피크 시간 12:00</p></section><aside><ShareCard title="결제수단별 매출" rows={paymentShare} /><ShareCard title="주문 유형별 매출" rows={orderShare} /></aside></div>
  </section>;
}
