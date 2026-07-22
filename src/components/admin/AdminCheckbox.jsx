/*
 * Admin/Checkbox — Figma 150:5409
 * 재료 모달 행 체크는 IngredientSelectModal 내부 스타일 유지 (충돌 방지)
 */
export default function AdminCheckbox({
  checked = false,
  disabled = false,
  label,
  onChange,
  className = "",
  id,
  "aria-label": ariaLabel,
}) {
  return (
    <label
      className={`admin-checkbox${checked ? " is-checked" : ""}${disabled ? " is-disabled" : ""}${
        className ? ` ${className}` : ""
      }`}
      data-figma-node="150:5409"
    >
      <input
        id={id}
        type="checkbox"
        checked={checked}
        disabled={disabled}
        aria-label={ariaLabel || (typeof label === "string" ? label : undefined)}
        onChange={(event) => onChange?.(event.target.checked, event)}
      />
      <span className="admin-checkbox__box" aria-hidden="true" />
      {label != null ? <span className="admin-checkbox__label">{label}</span> : null}
    </label>
  );
}
