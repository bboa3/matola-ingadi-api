import { billRouter } from '@bill/infra/http/routes'
import cors from '@fastify/cors'
import helmet from '@fastify/helmet'
import { fastifySchedule } from '@fastify/schedule'
import { mailRouter } from '@mail/infra/http/routes'
import { config } from 'dotenv'
import Fastify from 'fastify'

config()

const app = Fastify()

app.register(helmet)
app.register(cors)
app.register(fastifySchedule)

app.register(billRouter, { prefix: '/v1/billing' })
app.register(mailRouter, { prefix: '/v1/mail' })

export default app
