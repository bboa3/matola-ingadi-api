import { createBillController } from '@bill/infra/http/controller/create-bill'
import { getInvoiceController } from '@bill/infra/http/controller/get-invoice'
import { getPricingController } from '@bill/infra/http/controller/get-pricing'
import { getServicesPricingController } from '@bill/infra/http/controller/get-services-pricing'
import { getUserBillController } from '@bill/infra/http/controller/get-user-bill'
import { getUserBillsController } from '@bill/infra/http/controller/get-user-bills'
import { getUserInvoicesController } from '@bill/infra/http/controller/get-user-invoices'
import { invoicePaymentController } from '@bill/infra/http/controller/invoice-payment'
import { updateUserBillInformationController } from '@bill/infra/http/controller/update-user-bill-information'
import { FastifyPluginCallback } from 'fastify'

export const billRouter: FastifyPluginCallback = (app, _option, done) => {
  app.get('/pricing/:locale', getServicesPricingController)
  app.get('/pricing/:id/:locale', getPricingController)

  app.post('/', createBillController)
  app.put('/', updateUserBillInformationController)
  app.get('/:id', getUserBillController)
  app.get('/', getUserBillsController)

  app.post('/invoice/payment/:paymentMethod', invoicePaymentController)
  app.get('/invoice', getInvoiceController)
  app.get('/invoices/:maxNumber', getUserInvoicesController)

  done()
}
