/*
 * SCR-017 / 메뉴 등록·수정 진입
 * Page 역할: 라우트만 받고 MenuManagePage에 모드를 넘겨 조합한다.
 * 실제 편집 UI는 MenuEditPanel (메뉴 관리 우측 카드).
 * menuId 쿼리는 MenuManagePage → useMenusQuery가 읽는다.
 */
import { useLocation } from "react-router-dom";
import MenuManagePage from "./MenuManagePage.jsx";

export default function MenuEditPage() {
  const { pathname } = useLocation();
  // /menus/new → create, /menus/edit(?menuId=) → edit
  const initialMode = pathname.endsWith("/new") ? "create" : "edit";
  return <MenuManagePage initialMode={initialMode} />;
}
