import React from 'react'
import { useIntl } from 'react-intl'
import { Field } from 'react-final-form'
import { SearchInputAdapter, SelectAdapter } from '@src/components/finalForm'
import SearchFilter, { Conditions } from '@src/components/SearchFilter/SearchFilter'
import { TimeSpanInput } from '@src/components/form'
import commonMessage from '@src/messages'

export default function SearchBlock({ onSubmit }: { onSubmit: (data: any) => void }) {
  const { formatMessage } = useIntl()

  const conditions: Conditions = {
    left: [
      { label: formatMessage(commonMessage.id), input: <Field name='id' component={SearchInputAdapter} icon /> },
      { label: formatMessage(commonMessage.title), input: <Field name='title' component={SearchInputAdapter} icon /> }
    ],
    right: [
      {
        label: formatMessage(commonMessage.application),
        input: <Field name='title' component={SelectAdapter} options={[]} />
      },
      { label: formatMessage(commonMessage.startDateTime), input: <TimeSpanInput /> }
    ]
  }

  return <SearchFilter onSubmit={onSubmit} conditions={conditions} />
}
