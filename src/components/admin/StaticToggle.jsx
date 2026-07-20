/*
 * 정적 토글 시안 (비활성)
 * Props: label?
 * 실데이터: SoldOutToggle / PaymentMethod isActive 로 교체
 */
export default function StaticToggle({ label = "활성" }) {
  return <button className="admin-static-toggle" type="button" disabled aria-label={label} />;
}
