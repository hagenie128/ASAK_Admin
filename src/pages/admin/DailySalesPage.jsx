/*
 * SCR-021 / Daily Sales
 */
import AdminTopHeader from "../../components/admin/AdminTopHeader.jsx";

export default function DailySalesPage() {
  return (
    <section className="sales-daily" data-figma-node="134:11150">
      <AdminTopHeader crumb="Admin / 일별 매출" title="일별 매출" description="일자별 매출 현황 및 시간대 분석">
        <div className="sales-daily__date">
          <button type="button" disabled aria-label="이전 날짜">
            ‹
          </button>
          <span>2026.07.10 (금)</span>
          <button type="button" disabled aria-label="다음 날짜">
            ›
          </button>
        </div>
      </AdminTopHeader>

      <div className="sales-daily__kpis">
        <article>
          <span>총매출</span>
          <strong>392,500원</strong>
          <p>
            <b>↓ 18.5%</b>
            <small>전일 대비</small>
          </p>
        </article>
        <article>
          <span>주문 수</span>
          <strong>36건</strong>
          <p>
            <b>↓ 14.3%</b>
            <small>전일 대비</small>
          </p>
        </article>
        <article>
          <span>평균 객단가</span>
          <strong>10,903원</strong>
          <p>
            <b>↓ 4.9%</b>
            <small>전일 대비</small>
          </p>
        </article>
        <article>
          <span>피크 시간대</span>
          <strong>12:00~13:00</strong>
          <p className="is-peak">
            <b>128,000원</b>
          </p>
        </article>
      </div>

      <div className="sales-daily__middle">
        <section className="sales-chart">
          <h2>시간대별 매출</h2>
          <div className="sales-chart__body">
            <div className="sales-chart__bars">
              {[40, 30, 45, 60, 50, 35, 25, 20, 15, 10, 5, 5].map((height, index) => (
                <i
                  key={index}
                  className={index === 3 ? "is-peak" : ""}
                  style={{ height: `${height}px` }}
                />
              ))}
            </div>
            <div className="sales-chart__ticks">
              {["10시", "12시", "14시", "16시", "18시", "20시", "21시"].map((tick) => (
                <span key={tick}>{tick}</span>
              ))}
            </div>
          </div>
          <p className="sales-chart__peak">
            <b>128,000원</b>
            <span>피크 시간 12:00</span>
          </p>
        </section>

        <div className="sales-daily__right">
          <ShareCard
            title="결제수단별 매출"
            rows={[
              ["카드", "67%", "67%", true],
              ["카카오페이", "33%", "33%", false],
              ["현금", "0%", "0%", false],
            ]}
          />
          <ShareCard
            title="주문 유형별 매출"
            rows={[
              ["매장", "33%", "33%", true],
              ["포장", "67%", "67%", false],
              ["배달", "0%", "0%", false],
            ]}
          />
          <RankingCard />
        </div>
      </div>

      <section className="sales-table">
        <h2>시간대별 상세</h2>
        <div className="sales-table__grid sales-table__grid--hourly">
          <div className="sales-table__head">
            <span>시간대</span>
            <span>주문 수</span>
            <span>매출</span>
            <span>객단가</span>
          </div>
          {[
            ["10:00-11:00", "4", "42,000원", "10,500원"],
            ["11:00-12:00", "6", "68,400원", "11,400원"],
            ["12:00-13:00", "12", "128,000원", "10,667원"],
            ["13:00-14:00", "8", "87,200원", "10,900원"],
            ["14:00-15:00", "6", "66,900원", "11,150원"],
          ].map(([time, count, sales, avg]) => (
            <div key={time} className="sales-table__row">
              <span>{time}</span>
              <span>{count}</span>
              <span>{sales}</span>
              <span>{avg}</span>
            </div>
          ))}
        </div>
      </section>
    </section>
  );
}

function ShareCard({ title, rows }) {
  return (
    <section className="sales-share-card">
      <h2>{title}</h2>
      <div className="sales-share-card__rows">
        {rows.map(([label, percent, width, isPrimary]) => (
          <div className="sales-share-card__row" key={label}>
            <p>
              <span>{label}</span>
              <b>{percent}</b>
            </p>
            <i>
              <em className={isPrimary ? "is-primary" : ""} style={{ width }} />
            </i>
          </div>
        ))}
      </div>
    </section>
  );
}

function RankingCard() {
  const rows = [
    ["1", "탄단지 샐러디", "11건", "97,900원"],
    ["2", "우삼겹 포케볼", "8건", "87,200원"],
    ["3", "시저치킨 랩", "7건", "53,200원"],
    ["4", "우삼겹 메밀면 누들볼", "5건", "49,500원"],
    ["5", "—", "—", "—"],
  ];

  return (
    <section className="sales-ranking">
      <h2>메뉴별 판매 순위</h2>
      <div className="sales-ranking__rows">
        {rows.map(([rank, name, count, amount]) => (
          <div className="sales-ranking__row" key={rank}>
            <span className="sales-ranking__rank">{rank}</span>
            <span className="sales-ranking__name">{name}</span>
            <span className="sales-ranking__count">{count}</span>
            <b className="sales-ranking__amount">{amount}</b>
          </div>
        ))}
      </div>
    </section>
  );
}
