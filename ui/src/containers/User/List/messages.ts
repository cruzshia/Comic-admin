import { defineMessages } from 'react-intl'

const PREFIX = 'user.list'

export default defineMessages({
  userList: {
    id: PREFIX,
    defaultMessage: 'User List'
  },
  email: {
    id: PREFIX + '.email_address',
    defaultMessage: 'Email Address'
  },
  nickName: {
    id: PREFIX + '.nick_name',
    defaultMessage: 'Nick Name'
  },
  commentAuthority: {
    id: PREFIX + '.comment_authority',
    defaultMessage: 'Comment Authority'
  },
  lastLoginTime: {
    id: PREFIX + '.last_login_time',
    defaultMessage: 'Last Login Time'
  }
})
