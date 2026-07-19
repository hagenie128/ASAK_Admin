import AdminTopHeader from "../../components/admin/AdminTopHeader.jsx";

const kpis = [
  ["오늘 매출", "392,500원"],
  ["결제 승인", "36건"],
  ["객단가", "10,903원"],
  ["현재 대기 주문", "1건"],
];

// Figma Dashboard Recent Orders Panel (551:74447)
const recentOrders = [
  ["A-003", "포장", "로스트닭다리살 샐러드", "9,900원", "대기", "waiting", "오전 9:05"],
  ["A-1024", "매장", "로스트닭다리살 샐러드 외 3건", "128,800원", "조리중", "preparing", "오후 12:48"],
  ["A-001", "포장", "탄단지 샐러디", "11,400원", "완료", "complete", "오후 1:03"],
];

// Fill 너비는 Figma의 픽셀값(패널 내부 472px 기준)을 비율로 옮겼다.
const statusRows = [
  ["대기", "1건", "waiting", 33],
  ["조리중", "1건", "preparing", 57],
  ["완료", "1건", "complete", 382],
];
const STATUS_TRACK_WIDTH = 472;

const inventoryAlerts = [
  ["타코 쉬림프 포케볼", "품절", "danger"],
  ["아보카도 추가", "기본", "normal"],
  ["추가 품절 없음", "기본", "normal"],
];

// Figma Dashboard Sales Trend Panel (551:74615) — 막대 높이는 시안 실측값(px)이다.
const weeklySales = [
  [113, "8일"],
  [102, "9일"],
  [137, "10일"],
  [124, "—"],
  [136, "—"],
];

export default function DashboardPage() {
  return (
    <section className="admin-dashboard" aria-label="대시보드 정적 미리보기">
      <AdminTopHeader crumb="Admin / 대시보드" title="대시보드" description="오늘의 매출 현황 및 핵심 지표">
        <div className="admin-dashboard__date">
          <b>오늘</b>
          <span>2026.07.10</span>
        </div>
      </AdminTopHeader>

      <div className="admin-dashboard__kpis">
        {kpis.map(([label, value]) => (
          <article key={label}>
            <span>{label}</span>
            <strong>{value}</strong>
          </article>
        ))}
      </div>

      <div className="admin-dashboard__middle">
        <section className="dashboard-panel dashboard-orders">
          <h2>최근 주문</h2>
          <div className="dashboard-orders__table">
            <div className="dashboard-orders__head">
              <span>주문번호</span>
              <span>유형</span>
              <span>메뉴</span>
              <span>금액</span>
              <span>상태</span>
              <span>시간</span>
            </div>
            {recentOrders.map(([id, type, menu, price, status, tone, time]) => (
              <div className="dashboard-orders__row" key={id}>
                <b>{id}</b>
                <span>{type}</span>
                <span>{menu}</span>
                <span>{price}</span>
                <em className={`dashboard-status dashboard-status--${tone}`}>{status}</em>
                <span>{time}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="dashboard-panel dashboard-status-summary">
          <h2>주문 상태 요약</h2>
          {statusRows.map(([label, count, tone, fill]) => (
            <div className="dashboard-status-summary__row" key={label}>
              <p>
                <span>{label}</span>
                <b>{count}</b>
              </p>
              <i>
                <em
                  className={`dashboard-status-fill dashboard-status-fill--${tone}`}
                  style={{ width: `${(fill / STATUS_TRACK_WIDTH) * 100}%` }}
                />
              </i>
            </div>
          ))}
          <div className="dashboard-order-type">
            <div>
              <span>매장</span>
              <b>1건</b>
            </div>
            <div>
              <span>포장</span>
              <b>2건</b>
            </div>
          </div>
        </section>
      </div>

      <div className="admin-dashboard__bottom">
        <section className="dashboard-panel dashboard-inventory">
          <h2>품절 / 재고 알림</h2>
          {inventoryAlerts.map(([label, badge, tone]) => (
            <div className="dashboard-inventory__row" key={label}>
              <span>{label}</span>
              <b className={`dashboard-badge dashboard-badge--${tone}`}>{badge}</b>
            </div>
          ))}
          <p className="dashboard-inventory__note">품절 항목은 키오스크에서 자동 비활성화됩니다</p>
        </section>

        <section className="dashboard-panel dashboard-trend">
          <h2>매출 추이 요약</h2>
          <div className="dashboard-trend__chart">
            {weeklySales.map(([height, label], index) => (
              <div key={index}>
                <i
                  className={index === weeklySales.length - 1 ? "is-current" : ""}
                  style={{ height: `${height}px` }}
                />
                <span>{label}</span>
              </div>
            ))}
          </div>
          <div className="dashboard-trend__stats">
            <div>
              <span>이번 주 매출</span>
              <b>1,186,900원</b>
            </div>
            <div>
              <span>일 평균</span>
              <b>395,633원</b>
            </div>
            <div>
              <span>전주 대비</span>
              <b className="is-down">↓ 17.0%</b>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}
