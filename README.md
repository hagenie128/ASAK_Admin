# ASAK Admin

> **작업 시작점:** [ASAK 프로젝트 작업 허브](../ASAK/PROJECT_HUB.md) → 기능 한 개 선택 → 이 저장소 코드 수정 → 워크로그 기록.

## Central documentation

- [ASAK docs index](../ASAK/docs/README.md)
- [Product Bible Pack 12 — Frontend Implementation](../ASAK/docs/product_bible/12_Frontend_Implementation/README.md)
- [Product Bible Pack 11 — Backend Implementation](../ASAK/docs/product_bible/11_Backend_Implementation/README.md)
- [Current Implementation Map](../ASAK/docs/planning/current-implementation-map-2026-07-16.md)
- [Implementation Priority](../ASAK/docs/planning/implementation-priority-2026-07-16.md)
- [Implementation Guide Start](../ASAK/docs/implementation_guide/00-start-here.md)
- [Admin Implementation Guide](../ASAK/docs/implementation_guide/03-admin-implementation.md)
- [API·Response Guide](../ASAK/docs/implementation_guide/04-api-db-implementation.md)

This is the canonical implementation repository for administrator React JavaScript.

ASAK 관리자 운영 화면 전용 React/Vite 애플리케이션입니다. 주문 조회·상태 변경, 품절, 메뉴·결제수단 설정, 매출 조회를 이 저장소에서 담당합니다. 주문 키오스크 화면은 `ASAK-kiosk` 저장소에서 개발합니다.

## 빠른 시작

```bash
git clone https://github.com/hagenie128/ASAK_Admin.git
cd ASAK_Admin
cp .env.example .env
npm install
npm run dev
```

개발 서버는 `http://localhost:5174`에서 실행됩니다.

## 명령어

| 명령어 | 용도 |
| --- | --- |
| `npm run dev` | 개발 서버 실행 |
| `npm run lint` | 정적 검사 |
| `npm run build` | 운영용 `dist/` 생성 |
| `npm run preview` | 빌드 결과 로컬 확인 |

## 문서

- [src/STRUCTURE_GUIDE.md](src/STRUCTURE_GUIDE.md) — 짧은 구조 지도
- [docs/README.md](docs/README.md) — Admin 문서 목차
- [public/mocks/README.md](public/mocks/README.md) — Mock 필드 사전
- [ui-index.md](../ui-index.md)
- [Current Implementation Map](../ASAK/docs/planning/current-implementation-map-2026-07-16.md)
- [작업공간 안내](../README.md)

## 디렉터리

```text
src/
  apps/       AdminApp 라우트 · CSS 로드
  pages/      URL 화면 (조합)
  components/ UI 조각
  hooks/      조회·draft·페이지네이션
  mocks/      adminMockRepository
  styles/     tokens → reset → global → commonStyle
docs/         온보딩·아키텍처·API 등
public/mocks/ asak-admin-data.json
```

## 현재 구현 기준 (2026-07-23)

- **Figma UI + mock 바인딩:** Live·주문·품절·메뉴·결제(4종)·매출 3화면·대시보드 **1차 연결** (1차 mock ≠ DONE)
- **데이터 흐름:** Page → Hook → `adminMockRepository` → `asak-admin-data.json`
- **셸:** 1920×1080 캔버스 + viewport scale · Shared `AdminAsyncState` / `AdminConfirmDialog`
- **코드 경로(실행):** kebab-case · Canonical과 일부 CONFLICT → WBS2-033
- **작업 브랜치:** `feature/admin-mock-figma-parity` (main 미머지)
- Admin 정본은 이 저장소. Kiosk 안 Admin scaffold에 새 기능 넣지 말 것.
- Backend business API 없음 → 저장/환불 등은 stub. mock과 실연동을 구분할 것.
- 실행용 `IMPLEMENTATION_PLAN`은 삭제됨 → `src/STRUCTURE_GUIDE.md` · `public/mocks/README.md` · 중앙 WBS/맵 참고.
