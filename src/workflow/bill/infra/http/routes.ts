import { confirmPaymentController } from '@bill/infra/http/controller/confirm-payment'
import { createBillController } from '@bill/infra/http/controller/create-bill'
import { createInvoiceDocumentController } from '@bill/infra/http/controller/create-invoice-document'
import { getBillController } from '@bill/infra/http/controller/get-bill'
import { getBillsController } from '@bill/infra/http/controller/get-bills'
import { getClientBillsController } from '@bill/infra/http/controller/get-client-bills'
import { FastifyPluginCallback } from 'fastify'

export const billRouter: FastifyPluginCallback = (app, _option, done) => {
  app.post('/v1/bill', createBillController)
  app.post('/v1/bill/confirm', confirmPaymentController)

  app.get('/v1/invoice/document', createInvoiceDocumentController)

  app.get('/v1/bill/:id', getBillController)
  app.get('/v1/bills', getBillsController)
  app.post('/v1/client/bills', getClientBillsController)

  done()
}
