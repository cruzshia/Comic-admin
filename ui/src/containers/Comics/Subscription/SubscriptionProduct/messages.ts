import { defineMessages } from 'react-intl'

const PREFIX = 'comics.subscription.product_'

export default defineMessages({
  product: {
    id: 'comics.subscription.product',
    defaultMessage: 'Subscription Product'
  },
  creation: {
    id: PREFIX + 'creation',
    defaultMessage: 'Subscription Product Creation'
  },
  status: {
    id: PREFIX + 'status',
    defaultMessage: 'Status'
  },
  detail: {
    id: PREFIX + 'detail',
    defaultMessage: 'Subscription Product Detail'
  },
  editStart: {
    id: PREFIX + 'edit_start',
    defaultMessage: 'Edit subscription product'
  },
  edit: {
    id: PREFIX + 'edit',
    defaultMessage: 'Subscription Product Edit'
  }
})
