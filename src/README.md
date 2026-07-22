# src 폴더 안내 (Admin)

> 기준일: **2026-07-23**  
> 짧은 지도: [STRUCTURE_GUIDE.md](STRUCTURE_GUIDE.md)  
> 공부 본문(로컬): [`_local_study/ADMIN_MOCK_STUDY.md`](../_local_study/ADMIN_MOCK_STUDY.md)  
> Mock 필드: [`../public/mocks/README.md`](../public/mocks/README.md)

| 폴더 | 역할 | 현재 |
| --- | --- | --- |
| `apps/AdminApp.jsx` | URL ↔ 페이지 · CSS 로드 | 라우트 + mock 연결 화면 |
| `pages/admin/` | SCR별 화면 · **조합만** | Hook + components 조립 |
| `components/admin/` | UI 조각 | 패널·표·달력·페이지네이션 등 |
| `layouts/` | 셸 | AdminLayout |
| `hooks/` | 조회·draft·페이지네이션 | orders/sales/menus/soldOut 등 |
| `mocks/adminMockRepository.js` | mock **권장 유일** 입구 | READY |
| `constants/pagination.js` | 화면별 pageSize | orders/live/soldOut/menus |
| `styles/` | tokens→reset→global→commonStyle | 키오스크와 동일 계층 |
| `api/`, `adapters/` | 실서버·DTO | placeholder / stub 일부 |
| `contracts/` | API 계약 초안 | 참고 |
| `store/` | 세션 등 | mock 세션 |

키오스크 화면은 `ASAK-Kiosk` 책임입니다. Admin 정본은 이 저장소입니다.
