/*
 * SCR-015 / Login / Default (Figma node 134:12033)
 *
 * 정적 UI만 담는다. 입력값은 Figma 시안의 표시용 문자열이며 폼 상태를 갖지 않는다.
 * 인증 API, 세션 저장, 보호 라우트는 이 파일 밖에서 구현한다.
 */
import loginLogo from "../../assets/figma/asak-login-logo.svg";
import loginBg from "../../assets/figma/login-bg.png";

export default function LoginPage() {
  return (
    <main className="admin-login-page">
      {/* decoration-group (134:12034): 사진 위에 흰색 그라데이션 + blur 두 겹, 그 위에 라임 틴트 */}
      <img className="admin-login-page__photo" alt="" aria-hidden="true" src={loginBg} />
      <div className="admin-login-page__veil" aria-hidden="true" />
      <div className="admin-login-page__tint" aria-hidden="true" />

      <section className="admin-login-card">
        <div className="admin-login-card__head">
          <img className="admin-login-card__brand" src={loginLogo} alt="ASAK" />
          <h1>관리자 로그인</h1>
        </div>

        <div className="admin-login-card__form">
          <label className="admin-login-field">
            <span>아이디</span>
            <input value="admin_asak" readOnly disabled />
          </label>
          <label className="admin-login-field">
            <span>비밀번호</span>
            <input type="password" value="password" readOnly disabled />
          </label>

          <label className="admin-login-card__check">
            <input type="checkbox" checked readOnly disabled />
            <span>로그인 상태 유지</span>
          </label>

          <button type="button" className="admin-login-card__submit" disabled>
            로그인
          </button>
        </div>

        <small>© 2025 ASAK. All Rights Reserved.</small>
      </section>
    </main>
  );
}
