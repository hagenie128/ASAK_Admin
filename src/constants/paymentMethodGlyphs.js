/** 결제수단 아이콘 — Figma SCR-018 (134:11493) 글리프 */
export const PAYMENT_METHOD_GLYPHS = {
  card: "💳",
  kakao: "🟡",
  naver: "🟢",
  zero: "🔵",
};

export function getPaymentMethodGlyph(methodId) {
  return PAYMENT_METHOD_GLYPHS[methodId] ?? methodId?.[0]?.toUpperCase() ?? "?";
}
