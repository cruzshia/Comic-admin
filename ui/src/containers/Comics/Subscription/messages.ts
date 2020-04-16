import { defineMessages } from 'react-intl'

const PREFIX = 'comics.subscription.'

export default defineMessages({
  list: {
    id: PREFIX + 'list',
    defaultMessage: 'Subscription List'
  },
  name: {
    id: PREFIX + 'name',
    defaultMessage: 'Subscription Name'
  },
  createStart: {
    id: PREFIX + 'create_start',
    defaultMessage: 'Create subscription'
  },
  monthlyFee: {
    id: PREFIX + 'monthly_fee',
    defaultMessage: 'Monthly Fee'
  },
  image: {
    id: PREFIX + 'image',
    defaultMessage: 'Subscription Image'
  },
  chargeDeviceType: {
    id: PREFIX + 'charge_device_type',
    defaultMessage: 'Charge Device Type'
  }
})
