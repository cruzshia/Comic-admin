import React from 'react'
import { useIntl } from 'react-intl'
import { Field } from 'react-final-form'
import SearchFilter, { Conditions } from '@src/components/SearchFilter/SearchFilter'
import { SelectAdapter, TextInputAdapter, SearchInputAdapter } from '@src/components/finalForm'
import TimeSpanInput from '@src/components/form/TimeSpanInput'
import commonMessages from '@src/messages'
import messages from '../messages'

export default function SearchBlock({ onSubmit }: { onSubmit: (data: any) => void }) {
  const { formatMessage } = useIntl()
  const conditions: Conditions = {
    left: [
      {
        label: formatMessage(commonMessages.id),
        input: <Field name='id' component={SearchInputAdapter} icon />
      },
      {
        label: formatMessage(messages.mail),
        input: <Field name='mail' component={TextInputAdapter} />
      },
      {
        label: formatMessage(messages.name),
        input: <Field name='name' component={TextInputAdapter} />
      },
      {
        label: formatMessage(messages.message),
        input: <Field name='message' component={TextInputAdapter} />
      }
    ],
    right: [
      {
        label: formatMessage(commonMessages.application),
        input: <Field name='app' component={TextInputAdapter} />
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
