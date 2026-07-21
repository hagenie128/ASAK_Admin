/** 결제수단 아이콘 대체 — Figma SVG 미수집 시 글리프로 표시 */
export const PAYMENT_METHOD_GLYPHS = {
  card: "💳",
  kakao: "K",
  naver: "N",
  toss: "T",
  payco: "P",
  apple: "",
  cash: "₩",
  zero: "0",
};

export function getPaymentMethodGlyph(methodId) {
  return PAYMENT_METHOD_GLYPHS[methodId] ?? methodId?.[0]?.toUpperCase() ?? "?";
}
