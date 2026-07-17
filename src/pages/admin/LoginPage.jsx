/*
 * 화면: 로그인 SCR-015
 * 현재 Page 파일: pages/admin/LoginPage.jsx
 * 현재 Route: AdminApp에 미연결 (constants/routes.js LOGIN hint만)
 * 필요한 데이터: 계정 입력(로컬), mock 세션 결과
 * 상태 소유 후보: 폼 입력·오류 = Page 로컬 / 세션 = adminSessionStore
 * API 호출 후보 위치: api/admin 또는 별도 auth API (계약 확정 후) ← Page 직접·Presentational 금지
 * Adapter 필요 여부: 낮음 (세션 필드 확정 후)
 * Hook 분리 필요 여부: useAdminAuth (가드), 로그인 submit 중복 방지 로컬 상태
 * 공통 Component 후보: ErrorState (실패 메시지), LoadingState (제출 중)
 * Figma Component 연결 후보: (로그인 전용 프레임 — 공통 Layout 밖일 수 있음)
 * 최종 명칭 확인 필요: LoginPage
 * Figma 승인 후 연결할 Props: onSubmit, errorMessage, isSubmitting
 * 이 파일이 직접 처리하면 안 되는 상태: 비밀번호 영구 저장, 주문 데이터
 * 아직 구현하면 안 되는 부분: 완성 폼 JSX/CSS, 실제 토큰 연동
 *
 * TODO 1: Route 연결 전 보호 라우트 정책 합의
 * TODO 2: 실패해도 입력값 유지 (IMPLEMENTATION_PLAN)
 */

export default function LoginPage() {
  return null;
}
