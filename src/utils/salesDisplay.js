// 매출 화면 공통 표시 헬퍼 (Page에서만 사용)

const WEEKDAY_LABEL = ["일", "월", "화", "수", "목", "금", "토"];

/** "2026-07-10" → Date */
export function parseYmd(ymd) {
  if (!ymd) return null;
  const d = new Date(`${ymd}T00:00:00`);
  return Number.isNaN(d.getTime()) ? null : d;
}

/** Date → "YYYY-MM-DD" */
export function toYmd(date) {
  if (!(date instanceof Date) || Number.isNaN(date.getTime())) return null;
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

/** "YYYY-MM-DD" ± days → "YYYY-MM-DD" */
export function shiftYmd(ymd, days) {
  const date = parseYmd(ymd);
  if (!date) return null;
  date.setDate(date.getDate() + Number(days || 0));
  return toYmd(date);
}

/** "2026-07-10" → "07.10" */
export function formatMd(ymd) {
  const d = parseYmd(ymd);
  if (!d) return "-";
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${mm}.${dd}`;
}

/** "2026-07-10" → "2026.07.10 (금)" */
export function formatYmdWeekday(ymd) {
  const d = parseYmd(ymd);
  if (!d) return "-";
  const y = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${y}.${mm}.${dd} (${WEEKDAY_LABEL[d.getDay()]})`;
}

/**
 * 일별 내비 라벨
 * - 기준과 같은 해·같은 달 → "10일 (금)"
 * - 같은 해·다른 달 → "07.10 (금)"
 * - 다른 해 → "2026.07.10 (금)"
 * @param {string} ymd 선택일
 * @param {string} [baseYmd] 기준일 (보통 data.from / 첫 row)
 */
export function formatDailyNavLabel(ymd, baseYmd) {
  const d = parseYmd(ymd);
  if (!d) return "-";
  const base = parseYmd(baseYmd) || d;
  const wd = WEEKDAY_LABEL[d.getDay()];
  const sameYear = d.getFullYear() === base.getFullYear();
  const sameMonth = sameYear && d.getMonth() === base.getMonth();
  if (sameMonth) return `${d.getDate()}일 (${wd})`;
  if (sameYear) {
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${mm}.${dd} (${wd})`;
  }
  return formatYmdWeekday(ymd);
}

/**
 * 월별 내비 라벨
 * - 기준과 같은 해 → "7월"
 * - 다른 해 → "2026년 7월"
 */
export function formatMonthlyNavLabel(year, month, baseYear) {
  const y = Number(year);
  const m = Number(month);
  if (y === Number(baseYear)) return `${m}월`;
  return `${y}년 ${m}월`;
}

/** "2026-07-10" → "금" */
export function weekdayLabel(ymd) {
  const d = parseYmd(ymd);
  if (!d) return "-";
  return WEEKDAY_LABEL[d.getDay()];
}

/** year=2026, month=7 → "2026-07" */
export function toYearMonthKey(year, month) {
  return `${year}-${String(month).padStart(2, "0")}`;
}

/** rows에서 해당 월만 */
export function filterRowsByYearMonth(rows, year, month) {
  const key = toYearMonthKey(year, month);
  return (rows ?? []).filter((row) => String(row.date).startsWith(key));
}

/** 차트 막대 높이(px) — 값 비율로 스케일 */
export function toBarHeights(values, maxPx = 70) {
  const list = values ?? [];
  const max = Math.max(...list.map(Number), 1);
  return list.map((v) => Math.max(4, Math.round((Number(v) / max) * maxPx)));
}

export function findMaxIndex(values) {
  const list = values ?? [];
  if (!list.length) return -1;
  let maxAt = 0;
  list.forEach((v, i) => {
    if (Number(v) > Number(list[maxAt])) maxAt = i;
  });
  return maxAt;
}

/** 전일 대비 % (소수 1자리). prev가 0이면 null */
export function calcDeltaPercent(current, prev) {
  if (prev == null || prev === 0) return null;
  return Math.round(((current - prev) / prev) * 1000) / 10;
}
