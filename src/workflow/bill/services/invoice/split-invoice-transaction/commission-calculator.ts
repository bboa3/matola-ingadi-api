import { findPaymentMethodCommission } from '@bill/domain/requiredFields/is/is-payment-method'
import { PaymentMethod } from '@bill/domain/requiredFields/payment-method'
import { percentageCalculator } from '@utils/percentage'

interface Props {
  amount: number
  paymentMethod: PaymentMethod
}

export const commissionCalculator = ({ amount, paymentMethod }: Props) => {
  const commission = findPaymentMethodCommission(paymentMethod)

  const { model, value } = commission
  const paymentGatewayFee = model === 'VALUE' ? value : percentageCalculator(amount, value)

  const total = paymentGatewayFee + amount

  return {
    paymentGatewayFee,
    subTotal: amount,
    total
  }
}
