import { billRouter } from '@bill/infra/http/routes'
import cors from '@fastify/cors'
import helmet from '@fastify/helmet'
import { userRouter } from '@user/infra/http/routes'
import { config } from 'dotenv'
import fastify from 'fastify'

config()

const app = fastify()

app.register(helmet)
app.register(cors)

app.register(userRouter)
app.register(billRouter)

export default app
