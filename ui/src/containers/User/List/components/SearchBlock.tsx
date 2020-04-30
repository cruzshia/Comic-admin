import React from 'react'
import { useIntl } from 'react-intl'
import { Field } from 'react-final-form'
import SearchFilter, { Conditions } from '@src/components/SearchFilter/SearchFilter'
import { SelectAdapter, TextInputAdapter } from '@src/components/finalForm'
import SearchInputAdapter from '@src/components/finalForm/SearchInputAdapter'
import userMessages from '../../messages'
import messages from '../messages'

export default function SearchBlock({ onSubmit }: { onSubmit: (data: any) => void }) {
  const { formatMessage } = useIntl()
  const conditions: Conditions = {
    left: [
      {
        label: formatMessage(messages.email),
        input: <Field name='emailAddress' component={TextInputAdapter} />
      },
      {
        label: formatMessage(messages.nickName),
        input: <Field name='nickName' component={SearchInputAdapter} />
      },
      {
        label: formatMessage(userMessages.userId),
        input: <Field name='userId' component={TextInputAdapter} />
      }
    ],
    right: [
      {
        label: formatMessage(messages.commentAuthority),
        input: <Field name='commentAuthority' component={SelectAdapter} options={[]} isShort />
      },
      {
        label: formatMessage(userMessages.status),
        input: <Field name='status' component={SelectAdapter} options={[]} isShort />
      }
    ]
  }

  return <SearchFilter onSubmit={onSubmit} conditions={conditions} />
}
