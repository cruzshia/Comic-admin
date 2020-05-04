import { defineMessages } from 'react-intl'

const PREFIX = 'comics.campaign.'

export default defineMessages({
  list: {
    id: PREFIX + 'list',
    defaultMessage: 'Campaign List'
  },
  create: {
    id: PREFIX + 'create',
    defaultMessage: 'Create Campaign'
  },
  name: {
    id: PREFIX + 'name',
    defaultMessage: 'Campaign Name'
  },
  detail: {
    id: PREFIX + 'detail',
    defaultMessage: 'Campaign Detail'
  },
  edit: {
    id: PREFIX + 'edit',
    defaultMessage: 'Edit Campaign'
  },
  adminComment: {
    id: PREFIX + 'admin_comment',
    defaultMessage: "Admin's Comment"
  },
  adminUsage: {
    id: PREFIX + 'admin_usage',
    defaultMessage: 'Admin Usage'
  },
  target: {
    id: PREFIX + 'target',
    defaultMessage: 'Campaign Target'
  },
  category: {
    id: PREFIX + 'category',
    defaultMessage: 'Campaign Category'
  }
})
