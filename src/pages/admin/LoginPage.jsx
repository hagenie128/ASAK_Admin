/*
 * SCR-015 / Login / Default (Figma node 134:12033)
 *
 * UI는 Figma 시안을 따른다. 인증 API는 아직 없으므로
 * 로그인 버튼은 mock 세션(localStorage)만 켠 뒤 `/`(주문 현황)으로 보낸다.
 */
import { useState } from "react";
import loginLogo from "../../assets/svg/logo-F.svg";
import loginBg from "../../assets/figma/login-bg.png";
import { loginAdmin } from "../../auth/adminSession.js";

export default function LoginPage({ onLoggedIn } = {}) {
  const [remember, setRemember] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    try {
      loginAdmin({ remember });
      onLoggedIn?.();
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="admin-login-page">
      <img className="admin-login-page__photo" alt="" aria-hidden="true" src={loginBg} />
      <div className="admin-login-page__veil" aria-hidden="true" />
      <div className="admin-login-page__tint" aria-hidden="true" />

      <section className="admin-login-card">
        <div className="admin-login-card__head">
          <img className="admin-login-card__brand" src={loginLogo} alt="ASAK" />
          <h1>관리자 로그인</h1>
        </div>

        <form className="admin-login-card__form" onSubmit={handleSubmit}>
          <label className="admin-login-field">
            <span>아이디</span>
            <input name="username" defaultValue="admin_asak" autoComplete="username" />
          </label>
          <label className="admin-login-field">
            <span>비밀번호</span>
            <input
              name="password"
              type="password"
              defaultValue="password"
              autoComplete="current-password"
            />
          </label>

          <label className="admin-login-card__check">
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
            />
            <span>로그인 상태 유지</span>
          </label>

          <button type="submit" className="admin-login-card__submit" disabled={submitting}>
            {submitting ? "로그인 중…" : "로그인"}
          </button>
        </form>

        <small>© 2025 ASAK. All Rights Reserved.</small>
      </section>
    </main>
  );
}
