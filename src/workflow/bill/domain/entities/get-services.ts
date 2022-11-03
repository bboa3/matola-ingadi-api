import { GetServicesDB } from '@bill/domain/Contracts/GetServices'
import { eventPricing } from '@bill/domain/requiredFields/is/is-event-pricing'

export const getServicesDB: GetServicesDB = async () => {
  return eventPricing
}
