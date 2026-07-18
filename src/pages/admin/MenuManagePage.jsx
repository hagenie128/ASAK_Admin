/*
 * 화면: Menu Management 목록 SCR-016
 * 현재 Page 파일: MenuManagePage.jsx
 * 현재 Route: "/menus" → 아직 AdminScreen
 * 필요한 데이터: 메뉴 목록 (카테고리·이름·가격·판매상태)
 * 상태 소유 후보: 검색/카테고리 필터 = Page 또는 목록 Hook / 편집 Form은 MenuEditPage
 * API 호출 후보 위치: api (메뉴 API 계약 확정 후) — 목록 Hook
 * Adapter 필요 여부: 계약 확정 후 menuAdapter 후보 (아직 파일 미생성 — 추측 고정 금지)
 * Hook 분리 필요 여부: 목록과 편집 Form 상태 분리 필수
 * 공통 Component 후보: PageHeader, FilterBar, DataTable, Loading/Empty/Error
 * Figma Component 연결 후보: PageHeader, FilterBar, DataTable
 * 최종 명칭 확인 필요: MenuManage vs MenuList
 * Figma 승인 후 연결할 Props: rows, query, onCreate, onEdit
 * 이 파일이 직접 처리하면 안 되는 상태: 편집 Form 입력 전체, Validation 메시지 소유를 테이블에 넣기
 * 아직 구현하면 안 되는 부분: 완성 목록 JSX, 이미지 업로드 UI
 *
 * TODO 1: MenuEditPage로 등록/수정 진입 경로만 연결
 * TODO 2: API-011 필드 계약 확정 전 mock 필드 고정 금지
 */

import chickenImage from "../../assets/figma/soldout-chicken.png";
import pastaImage from "../../assets/figma/soldout-pasta.png";
import ricottaImage from "../../assets/figma/soldout-ricotta.png";
import salmonImage from "../../assets/figma/soldout-salmon.png";
import sandwichImage from "../../assets/figma/soldout-sandwich.png";
import tomatoImage from "../../assets/figma/soldout-tomato.png";

// Static Figma preview data. Menu fetching, search, creation, and editing are deferred.
const menus = [
  ["리코타 샐러드", "9,300", "샐러드", ricottaImage], ["연어 포케볼", "12,900", "포케볼", salmonImage],
  ["수비드 치킨 샐러드", "10,900", "샐러드", chickenImage], ["토마토 파스타", "11,500", "웜볼", tomatoImage],
  ["트러플 버섯 파스타", "12,500", "웜볼", pastaImage], ["바질 치킨 샌드위치", "8,900", "샌드위치", sandwichImage],
  ["연어 아보카도 랩", "9,900", "랩&롤", salmonImage], ["닭가슴살 또띠아 랩", "8,900", "랩&롤", chickenImage],
];

export default function MenuManagePage() {
  return <section className="menu-management">
    <header className="menu-management__header"><h1>메뉴 관리</h1><p>상품 기본정보 / 가격 / 카테고리 / 옵션그룹 / 노출여부를 관리하세요.</p></header>
    <div className="menu-management__toolbar"><div className="menu-management__tabs">{["전체", "샐러드", "포케볼", "랩&롤", "음료"].map((item, index) => <button type="button" disabled key={item} className={index === 0 ? "is-selected" : ""}>{item}</button>)}</div><label><span className="sr-only">메뉴명 검색</span><span aria-hidden="true">⌕</span><input value="" placeholder="메뉴명 검색" readOnly disabled /></label></div>
    <div className="menu-management__grid">{menus.map(([name, price, category, image]) => <article key={name}><img src={image} alt="" /><div><strong>{name}</strong><b>{price}</b></div><span>{category}</span><button type="button" disabled aria-label={`${name} 편집`}>편집</button></article>)}</div>
  </section>;
}
