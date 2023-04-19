import { billRouter } from '@bill/infra/http/routes'
import cors from '@fastify/cors'
import helmet from '@fastify/helmet'
import { fastifySchedule } from '@fastify/schedule'
import { config } from 'dotenv'
import Fastify from 'fastify'

config()

const app = Fastify()

app.register(helmet)
app.register(cors)
app.register(fastifySchedule)

app.register(billRouter, { prefix: '/v1/billing' })

export default app
