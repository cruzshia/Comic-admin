import React from 'react'
import { useIntl } from 'react-intl'
import { Field } from 'react-final-form'
import SearchFilter, { Conditions } from '@src/components/SearchFilter/SearchFilter'
import { SelectAdapter, TextInputAdapter, SearchInputAdapter } from '@src/components/finalForm'
import { TimeSpanInput } from '@src/components/form'
import userMessages from '../../messages'
import messages from '../messages'

export default function SearchBlock({ onSubmit }: { onSubmit: (data: any) => void }) {
  const { formatMessage } = useIntl()
  const conditions: Conditions = {
    left: [
      {
        label: formatMessage(messages.contentId),
        input: <Field name='contents' component={SearchInputAdapter} />
      },
      {
        label: formatMessage(userMessages.userId),
        input: <Field name='userId' component={TextInputAdapter} />
      },
      {
        label: formatMessage(userMessages.status),
        input: <Field name='status' component={SelectAdapter} options={[]} isShort />
      }
    ],
    right: [
      {
        label: formatMessage(messages.isReported),
        input: <Field name='isReported' component={SelectAdapter} options={[]} isShort />
      },
      {
        label: formatMessage(messages.period),
        input: <TimeSpanInput name='period' />
      }
    ]
  }

  return <SearchFilter onSubmit={onSubmit} conditions={conditions} />
}
