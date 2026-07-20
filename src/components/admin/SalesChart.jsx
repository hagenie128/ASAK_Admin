/*
 * 매출 차트
 *
 * mock:
 *   getSalesSummary(period).data.chartBars
 *   getDailySales().data.rows[{ date, orderCount, totalAmount, avgAmount }]
 *   getMonthlySales().data.rows[{ month, orderCount, totalAmount, avgAmount }]
 * Props 후보: bars | rows, variant: "summary"|"daily"|"monthly"
 * 표: public/mocks/README.md §7
 */
export default function SalesChart() {
  return null;
}
