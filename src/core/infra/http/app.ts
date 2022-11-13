import { billRouter } from '@bill/infra/http/routes'
import { designRouter } from '@design/infra/http/routes'
import cors from '@fastify/cors'
import helmet from '@fastify/helmet'
import { fastifySchedule } from '@fastify/schedule'
import fastifyStatic from '@fastify/static'
import { userRouter } from '@user/infra/http/routes'
import { config } from 'dotenv'
import fastify from 'fastify'
import fileUpload from 'fastify-file-upload'
import { resolve } from 'path'
config()

const app = fastify()

app.register(helmet)
app.register(cors)
app.register(fileUpload)
app.register(fastifySchedule)

app.register(fastifyStatic, {
  root: resolve(__dirname, '..', '..', '..', 'view'),
  prefix: '/v1/view/'
})

app.register(userRouter)
app.register(billRouter)
app.register(designRouter)

export default app
