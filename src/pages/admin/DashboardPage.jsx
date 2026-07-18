import AdminPageHeader from "../../components/admin/AdminPageHeader.jsx";

export default function DashboardPage() {
  return (
    <section className="admin-page">
      <AdminPageHeader title="관리자 대시보드" description="운영 현황을 한눈에 보는 정적 UI입니다." />
      <div className="admin-kpi-grid">
        <article><span>진행 중 주문</span><strong>-건</strong></article>
        <article><span>오늘 주문</span><strong>-건</strong></article>
        <article><span>오늘 매출</span><strong>0원</strong></article>
      </div>
      <div className="admin-dashboard-grid">
        <section><h2>최근 주문</h2><p>주문 데이터를 연결하면 실시간 주문 목록이 표시됩니다.</p></section>
        <section><h2>품절 현황</h2><p>품절 관리 데이터 연결 전 UI 영역입니다.</p></section>
      </div>
    </section>
  );
}
