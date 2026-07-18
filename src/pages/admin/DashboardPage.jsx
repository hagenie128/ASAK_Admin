/*
 * SCR-022 / Admin Dashboard / Default (Figma node 227:5008)
 *
 * 이 배열들은 화면 밀도와 상태 표현을 검증하기 위한 정적 목업이다.
 * 실제 조회는 이후 dashboard query/adaptor 계층에서 주입해야 하며,
 * 이 페이지는 API·스토어·저장 동작을 직접 갖지 않는다.
 */
const recentOrders = [
  ["#A-1024", "타코 쉬림프 포케볼 외 1", "12:20", "조리중", "preparing"],
  ["#A-1023", "연어 포케볼", "12:17", "대기", "waiting"],
  ["#A-1022", "바질 치킨 샐러드", "12:10", "완료", "complete"],
];

const statusRows = [
  ["대기", "1건", "#6699ff", "16%"],
  ["조리중", "1건", "#f28c0d", "28%"],
  ["완료", "1건", "#b5e30f", "78%"],
];

const weeklySales = [56, 51, 68, 62, 67];

export default function DashboardPage() {
  return (
    <section className="admin-dashboard" aria-label="대시보드 정적 미리보기">
      <header className="admin-dashboard__header">
        <div><h1>대시보드</h1><p>오늘의 매출 현황 및 핵심 지표</p></div>
        <div className="admin-dashboard__date"><b>오늘</b><span>2026.07.10</span></div>
      </header>

      <div className="admin-dashboard__kpis">
        {[['오늘 매출', '392,500원'], ['결제 승인', '36건'], ['객단가', '10,903원'], ['진행 중 주문', '3건']].map(([label, value]) => (
          <article key={label}><span>{label}</span><strong>{value}</strong></article>
        ))}
      </div>

      <div className="admin-dashboard__middle">
        <section className="dashboard-panel dashboard-orders">
          <div className="dashboard-panel__title"><h2>최근 주문 현황</h2><button type="button" disabled>전체 보기</button></div>
          <div className="dashboard-orders__head"><span>주문번호</span><span>메뉴</span><span>주문시간</span><span>상태</span></div>
          {recentOrders.map(([id, menu, time, status, tone]) => (
            <div className="dashboard-orders__row" key={id}><b>{id}</b><span>{menu}</span><time>{time}</time><em className={`dashboard-status dashboard-status--${tone}`}>{status}</em></div>
          ))}
        </section>
        <section className="dashboard-panel dashboard-status-summary">
          <h2>주문 상태 요약</h2>
          <div className="dashboard-status-summary__rows">
            {statusRows.map(([label, count, color, width]) => <div key={label}><p><span>{label}</span><b>{count}</b></p><i><em style={{ '--status-color': color, width }} /></i></div>)}
          </div>
          <div className="dashboard-order-type"><div><span>매장</span><b>1건</b></div><div><span>포장</span><b>2건</b></div></div>
        </section>
      </div>

      <div className="admin-dashboard__bottom">
        <section className="dashboard-panel dashboard-inventory">
          <h2>품절 / 재고 알림</h2>
          {[['타코 쉬림프 포케볼', '품절', 'danger'], ['아보카도 추가', '기본', 'normal'], ['추가 품절 없음', '기본', 'normal']].map(([label, badge, tone]) => <div className="dashboard-inventory__row" key={label}><span>{label}</span><b className={`dashboard-badge dashboard-badge--${tone}`}>{badge}</b></div>)}
          <p>품절 항목은 키오스크에서 자동 비활성화됩니다</p>
        </section>
        <section className="dashboard-panel dashboard-trend">
          <h2>매출 추이 요약</h2>
          <div className="dashboard-trend__chart">{weeklySales.map((height, index) => <div key={index}><i className={index === 4 ? 'is-current' : ''} style={{ height: `${height * 2}px` }} /><span>{8 + index}일</span></div>)}</div>
          <div className="dashboard-trend__stats"><div><span>이번 주 매출</span><b>1,186,900원</b></div><div><span>일 평균</span><b>395,633원</b></div><div><span>전주 대비</span><b className="is-down">↓ 17.0%</b></div></div>
        </section>
      </div>
    </section>
  );
}
