import { producer } from '@core/services/kafka'
import { InvoicePaymentProducerPublish } from '@eventStream/domain/Contracts/InvoicePaymentProducer'

export const invoicePaymentProducerPublish: InvoicePaymentProducerPublish = async (data) => {
  await producer.connect()

  const message = JSON.stringify(data)

  await producer.send({
    topic: 'invoice-payment',
    messages: [
      { value: message }
    ]
  })
}
