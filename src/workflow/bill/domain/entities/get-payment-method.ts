import { GetPaymentMethodDB } from '@bill/domain/Contracts/GetPaymentMethod'
import { paymentMethods } from '@bill/domain/requiredFields/is/is-payment-method'

export const getPaymentMethodDB: GetPaymentMethodDB = async () => {
  return paymentMethods
}
