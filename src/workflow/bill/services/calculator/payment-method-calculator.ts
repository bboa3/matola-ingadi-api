import { BillPaymentMethod, PaymentMethod } from 'bill'

interface Props {
  totalAmountToPay: number
  paymentMethod: PaymentMethod
}

export const paymentMethodCalculator = ({ totalAmountToPay, paymentMethod }: Props): BillPaymentMethod => {
  const { commission: { model, value } } = paymentMethod

  if (model === 'PERCENTAGE') {
    return {
      ...paymentMethod,
      totalCommission: totalAmountToPay * value / 100
    }
  }

  return {
    ...paymentMethod,
    totalCommission: value
  }
}
