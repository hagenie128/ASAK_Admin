/*
 * SCR-018 / Payment Methods / Default (Figma node 134:11493)
 *
 * 정적 UI만 담는다. 순서 변경, 활성 토글, 정책 수정, 저장은 이후 결제수단 draft/mutation이 소유한다.
 * 아이콘은 Figma(551:74301)와 동일하게 이모지를 쓴다. OS별 글리프 차이는 토큰 보고서에 기록했다.
 */
import arrowUpIcon from "../../assets/figma/icon-arrow-up.svg";
import arrowDownIcon from "../../assets/figma/icon-arrow-down.svg";
import AdminTopHeader from "../../components/admin/AdminTopHeader.jsx";

const methods = [
  ["💳", "카드 / 삼성페이 결제", "신용 · 체크카드"],
  ["🟡", "카카오페이 결제", "모바일 간편결제"],
  ["🟢", "네이버페이 결제", "모바일 간편결제"],
  ["🔵", "제로페이 결제", "QR 결제"],
];

const policies = [
  ["결제 실패 시 초기화 정책", "결제 실패 시 장바구니 데이터를 5분간 유지한 후 자동으로 초기화합니다"],
  ["영수증 안내 문구", "주문해주셔서 감사합니다. 맛있게 드시고 리뷰 작성 시 서비스를 드립니다!"],
];

function Toggle() {
  return (
    <span className="payment-toggle" aria-hidden="true">
      <i />
    </span>
  );
}

function MethodInfo({ name, desc }) {
  return (
    <div className="payment-method-row__info">
      <strong>{name}</strong>
      <span>{desc}</span>
    </div>
  );
}

export default function PaymentMethodPage() {
  return (
    <section className="payment-settings" aria-label="결제수단 정적 미리보기">
      <AdminTopHeader
        crumb="Admin / 결제수단 설정"
        title="결제수단 설정"
        description="변경 사항은 키오스크에 즉시 반영됩니다"
      />

      <div className="payment-settings__body">
        <div className="payment-settings__main">
          <h2>결제수단 목록</h2>
          <div className="payment-method-list">
            {methods.map(([glyph, name, desc]) => (
              <article className="payment-method-row" key={name}>
                <span className="payment-method-row__icon" aria-hidden="true">{glyph}</span>
                <MethodInfo name={name} desc={desc} />
                <div className="payment-method-row__reorder">
                  <button type="button" disabled aria-label={`${name} 위로 이동`}>
                    <img alt="" aria-hidden="true" src={arrowUpIcon} />
                  </button>
                  <button type="button" disabled aria-label={`${name} 아래로 이동`}>
                    <img alt="" aria-hidden="true" src={arrowDownIcon} />
                  </button>
                </div>
                <Toggle />
              </article>
            ))}
          </div>

          <h2 className="payment-settings__policies-title">결제 정책 설정</h2>
          <div className="payment-policy-row">
            {policies.map(([title, body]) => (
              <article className="payment-policy-card" key={title}>
                <div className="payment-policy-card__head">
                  <strong>{title}</strong>
                  <button type="button" disabled>수정</button>
                </div>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="payment-settings__preview">
          <div className="payment-settings__preview-head">
            <h2>결제수단 목록</h2>
            <p>설정한 결제수단 순서대로 키오스크/웹 결제 화면에 노출됩니다.</p>
          </div>
          <div className="payment-preview-card">
            {methods.map(([glyph, name, desc]) => (
              <div className="payment-preview-row" key={name}>
                <span className="payment-method-row__icon" aria-hidden="true">{glyph}</span>
                <MethodInfo name={name} desc={desc} />
                <Toggle />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="payment-settings__footer">
        <div className="payment-save-bar">
          <p>저장하지 않은 변경 사항이 있습니다</p>
          <button type="button" disabled>저장하기</button>
        </div>
      </div>
    </section>
  );
}
