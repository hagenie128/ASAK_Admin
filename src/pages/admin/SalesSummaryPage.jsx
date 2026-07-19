/*
 * SCR-019 / Sales Summary / Default (Figma node 134:10661)
 *
 * 아래 상수는 Figma 시안 값을 그대로 옮긴 정적 플레이스홀더다.
 * 기간 조회, 집계, 차트 변환은 이후 sales query/adapter가 소유한다.
 * 이 파일은 API 호출·스토어 쓰기·기간 계산을 직접 하지 않는다.
 */
import calendarIcon from "../../assets/figma/icon-calendar.svg";
import AdminTopHeader from "../../components/admin/AdminTopHeader.jsx";

const PERIODS = ["오늘", "이번 주", "이번 달"];
const ACTIVE_PERIOD = "이번 달";
const DATE_RANGE = "2025.02.01 ~ 2025.02.28";

const kpis = [
  ["오늘 총매출", "392,500원", "↓ 18.5%", "전일 대비"],
  ["주문 수", "36건", "↓ 14.3%", "전일 대비"],
  ["평균 객단가", "10,903원", "↓ 4.9%", "전일 대비"],
];

// Figma Admin/HourlySalesChart (534:20933) — 막대 높이는 시안 실측값(px)이다.
const chartBars = [40, 30, 45, 60, 50, 35, 25, 20, 15, 10, 5, 5];
const PEAK_BAR_INDEX = 3;
const chartTicks = ["10시", "12시", "14시", "16시", "18시", "20시", "21시"];

// Figma Admin/AnalyticsBreakdownCard (551:19921) — fill 너비는 시안의 px 값이다.
const BREAKDOWN_TRACK = 400;
const paymentShare = [
  ["카드", "67%", 288, true],
  ["카카오페이", "33%", 60, false],
  ["현금", "0%", 52, false],
];
const orderShare = [
  ["매장", "33%", 132, true],
  ["포장", "67%", 268, false],
  ["배달", "0%", 52, false],
];

const dailyRows = [
  ["07.10", "36", "392,500원", "10,903원"],
  ["07.09", "42", "481,600원", "11,467원"],
  ["07.08", "28", "312,800원", "11,171원"],
  ["—", "—", "—", "—"],
];

// Figma Admin/RankingCard (551:74185) — 제목은 TOP 4지만 5행(마지막은 빈 자리)이다.
const ranking = [
  ["1", "탄단지 샐러디", "11건", "97,900원"],
  ["2", "우삼겹 포케볼", "8건", "87,200원"],
  ["3", "시저치킨 랩", "7건", "53,200원"],
  ["4", "우삼겹 메밀면 누들볼", "5건", "49,500원"],
  ["5", "—", "—", "—"],
];

function BreakdownCard({ title, rows }) {
  return (
    <section className="sales-share-card">
      <h2>{title}</h2>
      <div className="sales-share-card__rows">
        {rows.map(([label, percent, fill, isPrimary]) => (
          <div className="sales-share-card__row" key={label}>
            <p>
              <span>{label}</span>
              <b>{percent}</b>
            </p>
            <i>
              <em
                className={isPrimary ? "is-primary" : ""}
                style={{ width: `${(fill / BREAKDOWN_TRACK) * 100}%` }}
              />
            </i>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function SalesSummaryPage({ view = "summary" }) {
  const title = view === "daily" ? "일별 매출" : view === "monthly" ? "월별 매출" : "매출 요약";

  return (
    <section className="sales-summary">
      <AdminTopHeader crumb="Admin / 매출 관리" title={title} description="전체 매출 현황 및 핵심 지표">
        <div className="sales-summary__filters">
          {PERIODS.map((period) => (
            <button
              key={period}
              type="button"
              disabled
              className={period === ACTIVE_PERIOD ? "is-selected" : ""}
            >
              {period}
            </button>
          ))}
          <div className="sales-summary__range">
            <span>{DATE_RANGE}</span>
            <img alt="" aria-hidden="true" src={calendarIcon} />
          </div>
        </div>
      </AdminTopHeader>

      <div className="sales-summary__kpis">
        {kpis.map(([label, value, delta, note]) => (
          <article key={label}>
            <span>{label}</span>
            <strong>{value}</strong>
            <p>
              <b>{delta}</b>
              <small>{note}</small>
            </p>
          </article>
        ))}
      </div>

      <div className="sales-summary__middle">
        <section className="sales-chart">
          <h2>시간대별 매출</h2>
          <div className="sales-chart__body">
            <div className="sales-chart__bars">
              {chartBars.map((height, index) => (
                <i
                  key={index}
                  className={index === PEAK_BAR_INDEX ? "is-peak" : ""}
                  style={{ height: `${height}px` }}
                />
              ))}
            </div>
            <div className="sales-chart__ticks">
              {chartTicks.map((tick) => (
                <span key={tick}>{tick}</span>
              ))}
            </div>
          </div>
          <p className="sales-chart__peak">
            <b>1,260,000원</b>
            <span>피크 시간 12:00</span>
          </p>
        </section>

        <div className="sales-summary__right">
          <BreakdownCard title="결제수단 비중" rows={paymentShare} />
          <BreakdownCard title="주문 유형" rows={orderShare} />
        </div>
      </div>

      <div className="sales-summary__bottom">
        <section className="sales-table">
          <h2>일자별 매출</h2>
          <div className="sales-table__grid">
            <div className="sales-table__head">
              <span>날짜</span>
              <span>주문 수</span>
              <span>순매출</span>
              <span>객단가</span>
            </div>
            {dailyRows.map(([date, count, net, avg], index) => (
              <div className="sales-table__row" key={`${date}-${index}`}>
                <span>{date}</span>
                <span>{count}</span>
                <span>{net}</span>
                <span>{avg}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="sales-ranking">
          <h2>인기 메뉴 TOP 4</h2>
          <div className="sales-ranking__rows">
            {ranking.map(([rank, name, count, amount]) => (
              <div className="sales-ranking__row" key={rank}>
                <span className="sales-ranking__rank">{rank}</span>
                <span className="sales-ranking__name">{name}</span>
                <span className="sales-ranking__count">{count}</span>
                <b className="sales-ranking__amount">{amount}</b>
              </div>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}
