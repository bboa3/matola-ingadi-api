import { producer } from '@core/services/kafka'
import { FailOverdueInvoiceProducerPublish } from '@eventStream/domain/Contracts/FailOverdueInvoiceProducer'

export const failOverdueInvoiceProducerPublish: FailOverdueInvoiceProducerPublish = async (data) => {
  await producer.connect()

  const message = JSON.stringify(data)

  await producer.send({
    topic: 'fail-overdue-invoice',
    messages: [
      { value: message }
    ]
  })
}
