/*
 * 화면: Menu 등록·수정 SCR-017
 * 현재 Page 파일: MenuEditPage.jsx
 * 현재 Route: 미연결
 * 필요한 데이터: categoryId, name, price, imageUrl, optionGroupIds 등 (계약 후)
 * 상태 소유 후보: Form 로컬 또는 useMenuEditForm / 목록 상태와 분리
 * API 호출 후보 위치: 저장 시 api — Validation 통과 후
 * Adapter 필요 여부: Form → 요청 body 변환 분리 (계약 후)
 * Hook 분리 필요 여부: Validation과 API 변환 분리
 * 공통 Component 후보: PageHeader, SaveBar, ConfirmDialog, ErrorState
 * Figma Component 연결 후보: SaveBar, (폼 컨트롤은 Figma 명칭 확인)
 * 최종 명칭 확인 필요: create/edit 동일 Page 여부
 * Figma 승인 후 연결할 Props: mode, values, errors, onChange, onSave
 * 이 파일이 직접 처리하면 안 되는 상태: 목록 필터, 품절 Draft
 * 아직 구현하면 안 되는 부분: 완성 폼 JSX/CSS, 이미지 처리 완성
 *
 * TODO 1: 필수값·가격 0 이하·문자 입력 구분 검증 (IMPLEMENTATION_PLAN)
 * TODO 2: 저장 실패 시 입력 보존
 */

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
