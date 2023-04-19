import { Kafka } from 'kafkajs'

export const kafkaConfig = new Kafka({
  clientId: 'billing-system',
  brokers: ['localhost:9092']
})

export const producer = kafkaConfig.producer()
export const consumer = kafkaConfig.consumer({ groupId: 'billing-group' })
