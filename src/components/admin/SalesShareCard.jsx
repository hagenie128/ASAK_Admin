/* 매출 비중 카드 (요약·일별 공용) */
export default function SalesShareCard({ title, rows = [] }) {
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
