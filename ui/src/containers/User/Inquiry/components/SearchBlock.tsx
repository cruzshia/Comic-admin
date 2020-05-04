import React from 'react'
import { useIntl } from 'react-intl'
import { Field } from 'react-final-form'
import SearchFilter, { Conditions } from '@src/components/SearchFilter/SearchFilter'
import { SelectAdapter, SearchInputAdapter } from '@src/components/finalForm'
import TimeSpanInput from '@src/components/form/TimeSpanInput'
import commonMessages from '@src/messages'
import messages from '../messages'

export default function SearchBlock({ onSubmit }: { onSubmit: (data: any) => void }) {
  const { formatMessage } = useIntl()
  const conditions: Conditions = {
    left: [
      {
        label: formatMessage(commonMessages.id),
        input: <Field name='id' component={SearchInputAdapter} />
      },
      {
        label: formatMessage(messages.mail),
        input: (
          <Field name='mail' component={SearchInputAdapter} placeholder={formatMessage(commonMessages.searchByEmail)} />
        )
      },
      {
        label: formatMessage(messages.name),
        input: <Field name='name' component={SearchInputAdapter} />
      },
      {
        label: formatMessage(messages.message),
        input: <Field name='message' component={SearchInputAdapter} />
      }
    ],
    right: [
      {
        label: formatMessage(commonMessages.appId),
        input: <Field name='app' component={SelectAdapter} options={[]} />
      },
      {
        label: formatMessage(messages.questionType),
        input: <Field name='questionType' component={SelectAdapter} options={[]} isShort />
      },
      {
        label: formatMessage(messages.period),
        input: <TimeSpanInput />
      }
    ]
  }

  return <SearchFilter onSubmit={onSubmit} conditions={conditions} disableExpand />
}
