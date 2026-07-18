export default function StaticToggle({ label = "활성" }) {
  return <button className="admin-static-toggle" type="button" disabled aria-label={label} />;
}
