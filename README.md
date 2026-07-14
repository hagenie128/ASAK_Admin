# ASAK Admin

ASAK 키오스크와 분리 배포하는 관리자 전용 React/Vite 애플리케이션입니다.

## 시작

```powershell
npm.cmd install
npm.cmd run dev
```

개발 서버는 `http://localhost:5174`에서 실행됩니다.

## 명령어

```powershell
npm.cmd run lint
npm.cmd run build
npm.cmd run preview
```

빌드 결과는 `dist/`이며, 운영 서버에서는 SPA fallback을 `index.html`로 설정합니다.

## 구조

```text
src/
  apps/       관리자 화면과 라우트
  api/        관리자 API 클라이언트
  styles/     관리자 전용 스타일
```

API 주소와 mock 사용 여부는 `.env.example`을 복사한 `.env`에서 관리합니다. 키오스크 코드 및 고객 주문 UI는 이 저장소에 포함하지 않습니다.
