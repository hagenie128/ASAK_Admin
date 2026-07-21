// 브라우저 confirm 래퍼. 나중에 AdminConfirmDialog로 교체 가능.

export function confirm(message) {
  return window.confirm(message);
}
