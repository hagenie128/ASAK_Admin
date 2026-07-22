// SCR-010 주문 관리 API 자리. 현재는 mock repository stub만 wrapping.

import {
  refundAdminOrder as refundAdminOrderMock,
  printAdminOrderReceipt as printAdminOrderReceiptMock,
} from "../mocks/adminMockRepository.js";

export function refundAdminOrder(orderId) {
  return refundAdminOrderMock(orderId);
}

export function printAdminOrderReceipt(orderId) {
  return printAdminOrderReceiptMock(orderId);
}
