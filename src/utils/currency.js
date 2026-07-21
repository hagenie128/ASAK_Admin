// 학습용: 금액을 원화 문자열로 표시하는 함수.
// Page에서는 toLocaleString을 직접 쓰지 말고 여기만 호출한다.

export function formatCurrency(amount) {
  if (amount == null || Number.isNaN(Number(amount))) return "-";
  return `${Number(amount).toLocaleString("ko-KR")}원`;
}
