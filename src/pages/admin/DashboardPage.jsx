import AdminTopHeader from "../../components/admin/AdminTopHeader.jsx";
import { formatCurrency } from "../../utils/currency.js";
import { ORDER_TYPE_LABEL, ORDER_STATUS_LABEL } from "../../constants/orderLabels.js";
import { useDashboard } from "../../hooks/useDashboard.js";

/*
 * SCR-022 / Dashboard
 * getDashboard() → useDashboard
 */
export default function DashboardPage() {
  const { data, status } = useDashboard();

  if (status === "loading" || !data) {
    return (
      <section className="admin-dashboard">
        <AdminTopHeader crumb="Admin / 대시보드" title="대시보드" description="불러오는 중…" />
      </section>
    );
  }

  const trendStats = buildWeeklyTrendStats(data.weeklySales);

  return (
    <section className="admin-dashboard" aria-label="대시보드">
      <AdminTopHeader crumb="Admin / 대시보드" title="대시보드" description="오늘의 매출 현황 및 핵심 지표">
        <div className="admin-dashboard__date">
          <b>오늘</b>
          <span>{data.dateLabel}</span>
        </div>
      </AdminTopHeader>
      <div className="admin-dashboard__kpis">
        {data.kpis.map((kpi) => (
          <article key={kpi.label}>
            <span>{kpi.label}</span>
            <strong>{kpi.display}</strong>
          </article>
        ))}
      </div>
      <div className="admin-dashboard__middle">
        <RecentOrders orders={data.recentOrders} />
        <StatusSummary
          statusSummary={data.statusSummary}
          orderTypeSummary={data.orderTypeSummary}
        />
      </div>
      <div className="admin-dashboard__bottom">
        <InventoryAlerts alerts={data.inventoryAlerts} />
        <WeeklyTrend weeklySales={data.weeklySales} stats={trendStats} />
      </div>
    </section>
  );
}

const STATUS_CLASS = {
  RECEIVED: "waiting",
  PREPARING: "preparing",
  COMPLETED: "complete",
  CANCELLED: "cancelled",
};

function RecentOrders({ orders = [] }) {
  return (
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
        {orders.slice(0, 3).map((order) => (
          <div key={order.orderNo} className="dashboard-orders__row">
            <b>{order.orderNo}</b>
            <span>{ORDER_TYPE_LABEL[order.orderType] ?? order.orderType}</span>
            <span>{order.menuSummary}</span>
            <span>{formatCurrency(order.totalPrice)}</span>
            <em
              className={`dashboard-status dashboard-status--${STATUS_CLASS[order.orderStatus] ?? "waiting"}`}
            >
              {ORDER_STATUS_LABEL[order.orderStatus] ?? order.orderStatus}
            </em>
            <span>{order.createdAtLabel}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function StatusSummary({ statusSummary = [], orderTypeSummary = {} }) {
  const total = statusSummary.reduce((sum, row) => sum + row.count, 0) || 1;

  return (
    <section className="dashboard-panel dashboard-status-summary">
      <h2>주문 상태 요약</h2>
      {statusSummary.map((row) => (
        <div key={row.label} className="dashboard-status-summary__row">
          <p>
            <span>{row.label}</span>
            <b>{row.count}건</b>
          </p>
          <i>
            <em
              className={`dashboard-status-fill dashboard-status-fill--${row.tone}`}
              style={{ width: `${(row.count / total) * 100}%` }}
            />
          </i>
        </div>
      ))}
      <div className="dashboard-order-type">
        <div>
          <span>매장</span>
          <b>{orderTypeSummary.eatIn ?? 0}건</b>
        </div>
        <div>
          <span>포장</span>
          <b>{orderTypeSummary.takeOut ?? 0}건</b>
        </div>
      </div>
    </section>
  );
}

function InventoryAlerts({ alerts = [] }) {
  return (
    <section className="dashboard-panel dashboard-inventory">
      <h2>품절 / 재고 알림</h2>
      {alerts.map((alert) => (
        <div key={alert.label} className="dashboard-inventory__row">
          <span>{alert.label}</span>
          <b className={`dashboard-badge dashboard-badge--${alert.tone}`}>{alert.badge}</b>
        </div>
      ))}
      <p className="dashboard-inventory__note">품절 항목은 키오스크에서 자동 비활성화됩니다</p>
    </section>
  );
}

function WeeklyTrend({ weeklySales = [], stats = {} }) {
  return (
    <section className="dashboard-panel dashboard-trend">
      <h2>매출 추이 요약</h2>
      <div className="dashboard-trend__chart">
        {weeklySales.map((bar, index) => (
          <div key={`${bar.label}-${index}`}>
            <i
              className={bar.isCurrent ? "is-current" : ""}
              style={{ height: `${bar.barHeight}px` }}
            />
            <span>{bar.label}</span>
          </div>
        ))}
      </div>
      <div className="dashboard-trend__stats">
        <div>
          <span>이번 주 매출</span>
          <b>{stats.weekTotal ?? "-"}</b>
        </div>
        <div>
          <span>일 평균</span>
          <b>{stats.dailyAverage ?? "-"}</b>
        </div>
        <div>
          <span>전주 대비</span>
          <b className={stats.weekDeltaTone === "down" ? "is-down" : ""}>{stats.weekDelta ?? "-"}</b>
        </div>
      </div>
    </section>
  );
}

function buildWeeklyTrendStats(weeklySales = []) {
  const amounts = weeklySales.map((row) => row.amount).filter((value) => value > 0);
  const weekTotal = amounts.reduce((sum, value) => sum + value, 0);
  const dailyAverage = amounts.length ? Math.round(weekTotal / amounts.length) : 0;

  return {
    weekTotal: formatCurrency(weekTotal),
    dailyAverage: formatCurrency(dailyAverage),
    weekDelta: "—",
    weekDeltaTone: "neutral",
  };
}
