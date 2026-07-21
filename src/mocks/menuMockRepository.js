// ⚠️ WIP — 키오스크 kiosk.json 직접 파싱용. SCR-011 품절 화면에는 쓰지 말 것.
// 품절: adminMockRepository.getSoldOutCatalog()
// 메뉴 관리: adminMockRepository.getAdminMenus()
//
// kiosk.json 구조: { categories, menusByCategory, menuDetail, ... }
// 아래 코드는 구조가 맞지 않아 동작하지 않음.

import kioskMock from "../../public/mocks/kiosk.json";

function clone(value) {
  return structuredClone(value);
}

/** @deprecated Admin 품절/메뉴 화면은 adminMockRepository 사용 */
export function getKioskCategories() {
  return clone(kioskMock.categories?.data ?? []);
}
