/*
 * SCR-020 / Monthly Sales / Default — Figma 134:10957
 * 정적 플레이스홀더. 조회·집계는 sales adapter 소유.
 *
 * mock: getMonthlySales().data
 *   year
 *   rows[{ month, orderCount, totalAmount, avgAmount }]
 * 표: public/mocks/README.md §7
 */
// TODO: getMonthlySales + 연도 필터 연결 (WBS2-042)
import AdminTopHeader from "../../components/admin/AdminTopHeader.jsx";

const DAILY_BARS = [48, 62, 40, 55, 70, 44, 38, 52, 60, 35];
const DAILY_TICKS = ["8일", "9일", "10일", "11일", "12일", "13일", "14일", "15일", "16일", "17일"];
const PEAK_INDEX = 4;

const DETAIL_ROWS = [
  ["07.10", "금", "36", "392,500원", "10,903원"],
  ["07.09", "목", "42", "481,600원", "11,467원"],
  ["07.08", "수", "28", "312,800원", "11,171원"],
  ["07.07", "화", "—", "—", "—"],
];

const ranking = [
  ["1", "탄단지 샐러디", "11건", "97,900원"],
  ["2", "우삼겹 포케볼", "8건", "87,200원"],
  ["3", "시저치킨 랩", "7건", "53,200원"],
  ["4", "우삼겹 메밀면 누들볼", "5건", "49,500원"],
  ["5", "—", "—", "—"],
];

export default function MonthlySalesPage() {
  return (
    <section className="sales-monthly" data-figma-node="134:10957">
      <AdminTopHeader crumb="Admin / 월별 매출" title="월별 매출" description="월간 매출 추이 및 상세 분석">
        <div className="sales-monthly__year">
          <button type="button" disabled aria-label="이전 해">
            ‹
          </button>
          <span>2026년</span>
          <button type="button" disabled aria-label="다음 해">
            ›
          </button>
        </div>
      </AdminTopHeader>

      <div className="sales-monthly__kpis">
        <article>
          <span>7월 누적 매출</span>
          <strong>1,186,900원</strong>
          <p className="is-ok">
            <small>3일 누적 목표 기준</small>
          </p>
        </article>
        <article>
          <span>주문 수</span>
          <strong>106건</strong>
          <p className="is-ok">
            <small>3일 누적 목표 기준</small>
          </p>
        </article>
        <article>
          <span>평균 객단가</span>
          <strong>11,197원</strong>
          <p className="is-ok">
            <small>3일 기준 목표 기준</small>
          </p>
        </article>
      </div>

      <div className="sales-monthly__middle">
        <section className="sales-chart">
          <h2>일별 매출 추이</h2>
          <div className="sales-chart__body">
            <div className="sales-chart__bars">
              {DAILY_BARS.map((height, index) => (
                <i
                  key={index}
                  className={index === PEAK_INDEX ? "is-peak" : ""}
                  style={{ height: `${height}px` }}
                />
              ))}
            </div>
            <div className="sales-chart__ticks">
              {DAILY_TICKS.map((tick) => (
                <span key={tick}>{tick}</span>
              ))}
            </div>
          </div>
          <p className="sales-chart__peak">
            <b>481,600원</b>
            <span>최고 매출일 7/09</span>
          </p>
        </section>

        <div className="sales-monthly__right">
          <section className="sales-compare-card">
            <h2>평일 vs 주말</h2>
            <div className="sales-compare-card__row">
              <p>
                <span>평일 평균 매출</span>
                <b>395,633원/일</b>
              </p>
              <i>
                <em className="is-primary" style={{ width: "82%" }} />
              </i>
            </div>
            <div className="sales-compare-card__row">
              <p>
                <span>주말 데이터</span>
                <b>없음</b>
              </p>
              <i>
                <em style={{ width: "0%" }} />
              </i>
            </div>
            <p className="sales-compare-card__note">주말 매출 비중 0%</p>
          </section>

          <section className="sales-chart sales-chart--compact">
            <h2>일별 주문 수</h2>
            <div className="sales-chart__body">
              <div className="sales-chart__bars">
                {[28, 42, 36, 30, 25, 33, 40].map((height, index) => (
                  <i key={index} style={{ height: `${height}px` }} />
                ))}
              </div>
            </div>
            <p className="sales-chart__peak">
              <span>일 평균 35건</span>
            </p>
          </section>
        </div>
      </div>

      <div className="sales-monthly__bottom">
        <section className="sales-table">
          <h2>일자별 상세</h2>
          <div className="sales-table__grid sales-table__grid--monthly">
            <div className="sales-table__head">
              <span>날짜</span>
              <span>요일</span>
              <span>주문 수</span>
              <span>순매출</span>
              <span>객단가</span>
            </div>
            {DETAIL_ROWS.map(([date, day, count, net, avg]) => (
              <div className="sales-table__row" key={date}>
                <span>{date}</span>
                <span>{day}</span>
                <span>{count}</span>
                <span>{net}</span>
                <span>{avg}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="sales-ranking">
          <h2>7월 인기 메뉴</h2>
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
