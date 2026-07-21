/*
 * SCR-018 / Payment Methods
 * getPaymentMethods() → usePaymentMethodDraft → AdminPaymentMethodRow
 */
import AdminTopHeader from "../../components/admin/AdminTopHeader.jsx";
import AdminPaymentMethodRow from "../../components/admin/AdminPaymentMethodRow.jsx";
import AdminSaveBar from "../../components/admin/AdminSaveBar.jsx";
import { getPaymentMethodGlyph } from "../../constants/paymentMethodGlyphs.js";
import { usePaymentMethodDraft } from "../../hooks/usePaymentMethodDraft.js";
import { toast } from "../../utils/toast.js";

const POLICIES = [
  {
    title: "결제 실패 시 초기화 정책",
    body: "결제 실패 시 장바구니 데이터를 5분간 유지한 후 자동으로 초기화합니다",
  },
  {
    title: "영수증 안내 문구",
    body: "주문해주셔서 감사합니다. 맛있게 드시고 리뷰 작성 시 서비스를 드립니다!",
  },
];

function PreviewRow({ method }) {
  return (
    <div className="payment-preview-row">
      <span className="payment-method-row__icon" aria-hidden="true">
        {getPaymentMethodGlyph(method.methodId)}
      </span>
      <div className="payment-method-row__info">
        <strong>{method.name}</strong>
        <span>{method.description}</span>
      </div>
    </div>
  );
}

export default function PaymentMethodPage() {
  const draft = usePaymentMethodDraft();

  async function handleSave() {
    const result = await draft.save();
    if (result.success) {
      toast.success(result.message || "저장되었습니다.");
    } else {
      toast.error(result.message || "저장에 실패했습니다.");
    }
  }

  if (draft.status === "loading") {
    return (
      <section className="payment-settings">
        <AdminTopHeader
          crumb="Admin / 결제수단 설정"
          title="결제수단 설정"
          description="불러오는 중…"
        />
      </section>
    );
  }

  return (
    <section className="payment-settings" aria-label="결제수단 설정">
      <AdminTopHeader
        crumb="Admin / 결제수단 설정"
        title="결제수단 설정"
        description="변경 사항은 키오스크에 즉시 반영됩니다"
      />
      <div className="payment-settings__body">
        <div className="payment-settings__main">
          <h2>결제수단 목록</h2>
          <div className="payment-method-list">
            {draft.rows.map((method, index) => (
              <AdminPaymentMethodRow
                key={method.methodId}
                method={method}
                disabled={draft.isSaving}
                canMoveUp={index > 0}
                canMoveDown={index < draft.rows.length - 1}
                onToggle={() => draft.toggleMethod(method.methodId)}
                onMoveUp={() => draft.moveMethod(method.methodId, "up")}
                onMoveDown={() => draft.moveMethod(method.methodId, "down")}
              />
            ))}
          </div>
          <h2 className="payment-settings__policies-title">결제 정책 설정</h2>
          <div className="payment-policy-row">
            {POLICIES.map((policy) => (
              <article key={policy.title} className="payment-policy-card">
                <div className="payment-policy-card__head">
                  <strong>{policy.title}</strong>
                  <button type="button" disabled>
                    수정
                  </button>
                </div>
                <p>{policy.body}</p>
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
            {draft.activePreviewRows.length > 0 ? (
              draft.activePreviewRows.map((method) => (
                <PreviewRow key={method.methodId} method={method} />
              ))
            ) : (
              <p>활성화된 결제수단이 없습니다.</p>
            )}
          </div>
        </div>
      </div>
      <AdminSaveBar isDirty={draft.isDirty} isSaving={draft.isSaving} onSave={handleSave} />
    </section>
  );
}
