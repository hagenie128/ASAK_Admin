/*
 * SCR-017 / Menu 등록·수정 — 라우트 /menus/new|edit
 *
 * mock 초기값 후보: getAdminMenus / getAdminOrderById 아님 — 단건은 목록 row 재사용
 *   form: menuId?, categoryId, categoryName, name, price, isSoldOut, isActive
 *   (+ 계약 후: imageUrl, optionGroupIds)
 * 표: public/mocks/README.md §5
 *
 * Props 후보: mode, values, errors, onChange, onSave
 * 저장 실패 시 입력 보존 · 목록 필터/품절 Draft와 상태 공유 금지
 */
// TODO: 폼 검증 + mock 저장, 실패 시 입력 보존 (WBS2-039)

import AdminPageHeader from "../../components/admin/AdminPageHeader.jsx";

export default function MenuEditPage() {
  return (
    <section className="admin-page">
      <AdminPageHeader title="메뉴 상세" description="메뉴 등록과 수정에 사용하는 정적 폼입니다." actionLabel="저장하기" />
      <form className="admin-form">
        <label>메뉴명<input value="메뉴명" disabled readOnly /></label>
        <label>카테고리<select disabled value="카테고리" readOnly><option>카테고리</option></select></label>
        <label>판매 가격<input value="0원" disabled readOnly /></label>
        <label>설명<textarea value="메뉴 설명" disabled readOnly /></label>
        <section><strong>옵션 그룹</strong><p>옵션 데이터 연결 전 UI 영역입니다.</p></section>
        <section><strong>재료 구성</strong><p>재료 데이터 연결 전 UI 영역입니다.</p></section>
      </form>
    </section>
  );
}
