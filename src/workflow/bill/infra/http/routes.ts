import { confirmPaymentController } from '@bill/infra/http/controller/confirm-payment'
import { createBillController } from '@bill/infra/http/controller/create-bill'
import { createBillDocumentController } from '@bill/infra/http/controller/create-bill-document'
import { getBillController } from '@bill/infra/http/controller/get-bill'
import { getClientBillsController } from '@bill/infra/http/controller/get-client-bills'
import { FastifyPluginCallback } from 'fastify'

export const billRouter: FastifyPluginCallback = (app, _option, done) => {
  app.post('/v1/bill', createBillController)
  app.post('/v1/bill/confirm', confirmPaymentController)
  app.get('/v1/bill/document/:id', createBillDocumentController)
  app.get('/v1/client/bills', getClientBillsController)
  app.get('/v1/bill/:id', getBillController)

  done()
}
