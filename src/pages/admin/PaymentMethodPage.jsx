/*
 * SCR-018 / Payment Methods / Default (Figma node 134:11493)
 * 정렬·토글·수정은 의도적으로 비활성 표시만 한다. 실제 draft와 저장은 API 계약 후 분리한다.
 */
import StaticToggle from "../../components/admin/StaticToggle.jsx";

const methods = [
  ["CARD", "카드 / 삼성페이 결제", "신용 · 체크카드", "payment-mark--card"],
  ["K", "카카오페이 결제", "모바일 간편결제", "payment-mark--kakao"],
  ["N", "네이버페이 결제", "모바일 간편결제", "payment-mark--naver"],
  ["QR", "제로페이 결제", "QR 결제", "payment-mark--zero"],
];

function PaymentMethodRow({ method, compact = false }) {
  const [mark, title, description, tone] = method;
  return <article className={`payment-method-row${compact ? ' payment-method-row--compact' : ''}`}>
    <span className={`payment-mark ${tone}`}>{mark}</span>
    <div><strong>{title}</strong><small>{description}</small></div>
    {!compact && <div className="payment-method-row__reorder"><button type="button" disabled aria-label={`${title} 위로 이동`}>↑</button><button type="button" disabled aria-label={`${title} 아래로 이동`}>↓</button></div>}
    <StaticToggle label={`${title} 활성`} />
  </article>;
}

export default function PaymentMethodPage() {
  return <section className="payment-settings" aria-label="결제수단 정적 미리보기">
    <header className="payment-settings__header"><div><h1>결제수단 설정</h1><p>키오스크 및 웹 결제 화면에 노출할 수단과 안내 문구를 확인합니다.</p></div></header>
    <div className="payment-settings__content">
      <div className="payment-settings__main">
        <section><h2>결제수단 관리</h2><p className="payment-settings__guide">표시 순서는 정적 목업입니다. 실제 변경은 저장 기능 구현 단계에서 연결합니다.</p><div className="payment-method-list">{methods.map((method) => <PaymentMethodRow key={method[1]} method={method} />)}</div></section>
        <section className="payment-policies"><h2>결제 정책 설정</h2><div>{[["결제 실패 시 초기화 정책", "결제 실패 시 장바구니 데이터를 5분간 유지한 후 자동으로 초기화합니다"], ["영수증 안내 문구", "주문해주셔서 감사합니다. 맛있게 드시고 리뷰 작성 시 서비스를 드립니다!"]].map(([title, text]) => <article key={title}><header><h3>{title}</h3><button type="button" disabled>수정</button></header><p>{text}</p></article>)}</div></section>
      </div>
      <aside className="payment-preview"><header><h2>결제수단 목록</h2><p>설정한 순서대로 결제 화면에 노출됩니다.</p></header><div>{methods.map((method) => <PaymentMethodRow compact key={method[1]} method={method} />)}</div></aside>
    </div>
    <footer className="payment-save-bar"><span>저장하지 않은 변경 사항이 있습니다</span><button type="button" disabled>저장하기</button></footer>
  </section>;
}
