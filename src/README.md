# src 폴더 안내 (Admin)

> 기준일: **2026-07-20**  
> 처음이면 [STRUCTURE_GUIDE.md](STRUCTURE_GUIDE.md) → [IMPLEMENTATION_PLAN.md](../IMPLEMENTATION_PLAN.md) → [docs/ui-implementation-map-2026-07-18.md](../docs/ui-implementation-map-2026-07-18.md).

| 폴더 | 역할 | 현재 |
| --- | --- | --- |
| `apps/AdminApp.jsx` | URL ↔ 페이지 | 정적 화면 라우트 연결됨 |
| `pages/admin/` | SCR별 화면 | Figma 정적 UI · 하드코딩 데이터 |
| `components/admin/` | 재사용 UI | Sidebar 등 실사용 · 일부 placeholder |
| `layouts/` | 셸 | AdminLayout |
| `mocks/adminMockRepository.js` | mock **유일한** 입구 | READY · **Page 미연결** |
| `api/`, `hooks/`, `adapters/` | 서버·draft·DTO | placeholder |
| `contracts/` | API 계약 초안 | 백엔드 전 |
| `store/` | 세션 등 | 최소/placeholder |

다음 작업: Page가 하드코딩 대신 `adminMockRepository`를 쓰도록 연결 (WBS2-034~043).  
키오스크 화면은 `ASAK-Kiosk` 책임입니다.
