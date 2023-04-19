import { Pricing } from 'bill'

export const eventPricing: Pricing[] = [
  {
    _id: {
      $oid: '63f496d3271f942aec9612c5'
    },
    name: {
      pt: 'Premium',
      en: 'Premium'
    },
    activity: {
      id: 'events-hall',
      name: {
        en: 'Events Hall',
        pt: 'Salão de Eventos'
      }
    },
    price: 850,
    baseGuestsNumber: 1,
    discount: {},
    services: [
      {
        id: 'mesas',
        description: {
          pt: 'Mesas de vidro',
          en: 'Glass tables'
        },
        photos: []
      },
      {
        id: 'loica',
        description: {
          pt: 'Loiça dourada completa',
          en: 'Complete golden crockery'
        },
        photos: []
      },
      {
        id: 'decoracao',
        description: {
          pt: 'Decoração',
          en: 'Decoration'
        },
        photos: []
      },
      {
        id: 'serventes',
        description: {
          pt: 'Serventes disponíveis para todo o evento',
          en: 'Event hall servers available for the entire event'
        },
        photos: []
      },
      {
        id: 'cenario-para-fotografias',
        description: {
          pt: 'Cenário para fotografias',
          en: 'Scenery for photographs'
        },
        photos: []
      },
      {
        id: 'cenario-para-registro-civil',
        description: {
          pt: 'Cenário para registro civil',
          en: 'Scenario for civil registration'
        },
        photos: []
      },
      {
        id: 'cozinha',
        description: {
          pt: 'Cozinha',
          en: 'Kitchen'
        },
        photos: []
      },
      {
        id: 'sala-dos-noivos',
        description: {
          pt: 'Sala dos noivos',
          en: 'bridal room'
        },
        photos: []
      }
    ]
  },
  {
    _id: {
      $oid: '640449efee0b8dcbd7098b44'
    },
    name: {
      pt: 'Padrão',
      en: 'Standard'
    },
    activity: {
      id: 'events-hall',
      name: {
        en: 'Events Hall',
        pt: 'Salão de Eventos'
      }
    },
    price: 650,
    baseGuestsNumber: 1,
    discount: {},
    services: [
      {
        id: 'mesas',
        description: {
          pt: 'Mesas Redondas com toalhas',
          en: 'Round tables with tablecloths'
        },
        photos: []
      },
      {
        id: 'decoracao',
        description: {
          pt: 'Decoração',
          en: 'Decoration'
        },
        photos: []
      },
      {
        id: 'loica',
        description: {
          pt: 'Loiça completa',
          en: 'Complete crockery'
        },
        photos: []
      },
      {
        id: 'serventes',
        description: {
          pt: 'Serventes disponíveis para todo o evento',
          en: 'Event hall servers available for the entire event'
        },
        photos: []
      },
      {
        id: 'cenario-para-fotografias',
        description: {
          pt: 'Cenário para fotografias',
          en: 'Scenery for photographs'
        },
        photos: []
      },
      {
        id: 'cenario-para-registro-civil',
        description: {
          pt: 'Cenário para registro civil',
          en: 'Scenario for civil registration'
        },
        photos: []
      },
      {
        id: 'cozinha',
        description: {
          pt: 'Cozinha',
          en: 'Kitchen'
        },
        photos: []
      },
      {
        id: 'sala-dos-noivos',
        description: {
          pt: 'Sala dos noivos',
          en: 'bridal room'
        },
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
