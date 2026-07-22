// 레거시: window.confirm 동기 래퍼.
// 신규 확인 UI는 AdminConfirmDialog(open / onConfirm)를 화면에서 직접 연결한다.
// 남은 import가 있으면 다이얼로그 패턴으로 교체한 뒤 이 파일을 제거한다.

export function confirm(message) {
  return window.confirm(message);
}
