import app from '@core/infra/http/app'

const port = Number(process.env.PORT || 3002)

const start = async () => {
  try {
    await app.listen({ port, host: '0.0.0.0' })
    await app.ready()
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}
start()
