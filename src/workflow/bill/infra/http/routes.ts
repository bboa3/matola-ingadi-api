import { confirmPaymentByAdminController } from '@bill/infra/http/controller/confirm-payment-by-admin'
import { createBillController } from '@bill/infra/http/controller/create-bill'
import { createInvoiceDocumentController } from '@bill/infra/http/controller/create-invoice-document'
import { createInvoiceDocumentByAdminController } from '@bill/infra/http/controller/create-invoice-document-by-admin'
import { getAllBillsController } from '@bill/infra/http/controller/get-all-bills'
import { getBillController } from '@bill/infra/http/controller/get-bill'
import { getBillsController } from '@bill/infra/http/controller/get-bills'
import { getClientBillsController } from '@bill/infra/http/controller/get-client-bills'
import { getPaymentMethodController } from '@bill/infra/http/controller/get-payment-method'
import { getReservedDatesController } from '@bill/infra/http/controller/get-reserved-dates'
import { getServicesController } from '@bill/infra/http/controller/get-services'
import { FastifyPluginCallback } from 'fastify'

export const billRouter: FastifyPluginCallback = (app, _option, done) => {
  app.get('/v1/dates', getReservedDatesController)
  app.get('/v1/services', getServicesController)
  app.get('/v1/payment-method', getPaymentMethodController)

  app.post('/v1/bill', createBillController)
  app.post('/v1/confirm-payment/admin', confirmPaymentByAdminController)

  app.get('/v1/invoice/document', createInvoiceDocumentController)
  app.post('/v1/invoice/document/admin', createInvoiceDocumentByAdminController)

  app.get('/v1/bill/:id', getBillController)
  app.get('/v1/bills', getBillsController)
  app.get('/v1/all-bills', getAllBillsController)
  app.post('/v1/client/bills', getClientBillsController)

  done()
}
