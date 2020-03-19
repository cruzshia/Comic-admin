import { defineMessages } from 'react-intl'

const PREFIX = 'user.comment'

export default defineMessages({
  commentList: {
    id: PREFIX,
    defaultMessage: 'Comment list'
  },
  detail: {
    id: PREFIX + '.detail',
    defaultMessage: 'Comment detail'
  },
  edit: {
    id: PREFIX + '.edit',
    defaultMessage: 'Comment edit'
  }
})
