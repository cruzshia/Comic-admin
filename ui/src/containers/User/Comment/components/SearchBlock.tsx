import React from 'react'
import { useIntl } from 'react-intl'
import { Field } from 'react-final-form'
import SearchFilter, { Conditions } from '@src/components/SearchFilter/SearchFilter'
import { SelectAdapter, SearchInputAdapter } from '@src/components/finalForm'
import { TimeSpanInput } from '@src/components/form'
import commonMessages from '@src/messages'
import userMessages from '../../messages'
import messages from '../messages'

export default function SearchBlock({ onSubmit }: { onSubmit: (data: any) => void }) {
  const { formatMessage } = useIntl()
  const conditions: Conditions = {
    left: [
      {
        label: formatMessage(messages.contentId),
        input: <Field name='contentId' component={SearchInputAdapter} />
      },
      {
        label: formatMessage(commonMessages.workId),
        input: <Field name='workId' component={SearchInputAdapter} />
      },
      {
        label: formatMessage(userMessages.userId),
        input: (
          <Field name='userId' component={SearchInputAdapter} placeholder={formatMessage(commonMessages.searchById)} />
        )
      },
      {
        label: formatMessage(commonMessages.email),
        input: (
          <Field
            name='email'
            component={SearchInputAdapter}
            placeholder={formatMessage(commonMessages.searchByEmail)}
          />
        )
      }
    ],
    right: [
      {
        label: formatMessage(messages.isReported),
        input: <Field name='isReported' component={SelectAdapter} options={[]} isShort />
      },
      {
        label: formatMessage(userMessages.status),
        input: <Field name='status' component={SelectAdapter} options={[]} isShort />
      },
      {
        label: formatMessage(commonMessages.appId),
        input: <Field name='appId' component={SelectAdapter} options={[]} />
      },
      {
        label: formatMessage(messages.period),
        input: <TimeSpanInput name='period' />
      }
    ]
  }

  return <SearchFilter onSubmit={onSubmit} conditions={conditions} disableExpand />
}
