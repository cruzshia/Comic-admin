import React from 'react'
import { useIntl } from 'react-intl'
import { Field } from 'react-final-form'
import SearchFilter, { Conditions } from '@src/components/SearchFilter/SearchFilter'
import { SelectAdapter } from '@src/components/finalForm'
import SearchInputAdapter from '@src/components/finalForm/SearchInputAdapter'
import commonMessages from '@src/messages'
import userMessages from '../../messages'
import messages from '../messages'
import { TimeSpanInput } from '@src/components/form'

export default function SearchBlock({ onSubmit }: { onSubmit: (data: any) => void }) {
  const { formatMessage } = useIntl()
  const conditions: Conditions = {
    left: [
      {
        label: formatMessage(commonMessages.email),
        input: (
          <Field
            name='emailAddress'
            component={SearchInputAdapter}
            placeholder={formatMessage(commonMessages.searchByEmail)}
          />
        )
      },
      {
        label: formatMessage(messages.nickName),
        input: <Field name='nickName' component={SearchInputAdapter} />
      },
      {
        label: formatMessage(userMessages.userId),
        input: (
          <Field name='userId' component={SearchInputAdapter} placeholder={formatMessage(commonMessages.searchById)} />
        )
      },
      {
        label: formatMessage(userMessages.status),
        input: <Field name='status' component={SelectAdapter} options={[]} isShort />
      }
    ],
    right: [
      {
        label: formatMessage(messages.commentAuthority),
        input: <Field name='commentAuthority' component={SelectAdapter} options={[]} isShort />
      },
      {
        label: formatMessage(commonMessages.createDateTime),
        input: <TimeSpanInput name='createAt' />
      },
      {
        label: formatMessage(messages.lastLoginTime),
        input: <TimeSpanInput name='latestLogIn' />
      }
    ]
  }

  return <SearchFilter onSubmit={onSubmit} conditions={conditions} disableExpand />
}