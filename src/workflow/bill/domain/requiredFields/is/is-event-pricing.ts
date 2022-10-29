import { Pricing } from 'ingadi'

export const eventPricing: Pricing[] = [{
  id: 'premium',
  name: 'Premium',
  pricingModel: 'Por Pessoa',
  price: 850,
  services: [
    {
      name: 'Mesas',
      description: 'Mesas de vidro',
      photos: []
    },
    {
      name: 'Loiça',
      description: 'Loiça completa e dourada',
      photos: []
    },
    {
      name: 'Decoração',
      description: 'Decoração',
      photos: []
    },
    {
      name: 'Serventes',
      description: 'Serventes disponíveis para todo o evento',
      photos: []
    },
    {
      name: 'Cenário para fotografias',
      description: 'Cenário para fotografias',
      photos: []
    },
    {
      name: 'Cenário para registro civil',
      description: 'Cenário para registro civil',
      photos: []
    },
    {
      name: 'Cozinha',
      description: 'Cozinha',
      photos: []
    },
    {
      name: 'Sala dos noivos',
      description: 'Sala dos noivos',
      photos: []
    }
  ]
},
{
  id: 'basico',
  name: 'Básico',
  pricingModel: 'Por Pessoa',
  price: 650,
  services: [
    {
      name: 'Mesas',
      description: 'Mesas Redondas com toalhas',
      photos: []
    },
    {
      name: 'Decoração',
      description: 'Decoração',
      photos: []
    },
    {
      name: 'Loiça',
      description: 'Loiça completa',
      photos: []
    },
    {
      name: 'Serventes',
      description: 'Serventes disponíveis para todo o evento',
      photos: []
    },
    {
      name: 'Cenário para fotografias',
      description: 'Cenário para fotografias',
      photos: []
    },
    {
      name: 'Cenário para registro civil',
      description: 'Cenário para registro civil',
      photos: []
    },
    {
      name: 'Cozinha',
      description: 'Cozinha',
      photos: []
    },
    {
      name: 'Sala dos noivos',
      description: 'Sala dos noivos',
      photos: []
    }
  ]
}
]

export const isEventPricingId = (value: string) => {
  const name = value.toLowerCase()

  for (const pricing of eventPricing) {
    if (pricing.id === name) {
      return true
    }
  }

  return false
}

export const getEventPricing = (value: string) => {
  for (const pricing of eventPricing) {
    if (pricing.id === value) {
      return pricing
    }
  }
}
