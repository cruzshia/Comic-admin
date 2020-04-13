import React, { useMemo } from 'react'
import { useIntl } from 'react-intl'
import { Field } from 'react-final-form'
import SearchFilter, { Conditions } from '@src/components/SearchFilter/SearchFilter'
import { SearchInputAdapter, SelectAdapter } from '@src/components/finalForm'
import commonMessages from '@src/messages'
import messages from '../messages'

export default function SearchBlock({ onSubmit }: { onSubmit: (data: any) => void }) {
  const { formatMessage } = useIntl()

  const conditions: Conditions = useMemo(
    () => ({
      left: [
        {
          label: formatMessage(messages.id),
          input: <Field name='id' component={SearchInputAdapter} />
        },
        {
          label: formatMessage(messages.name),
          input: <Field name='name' component={SearchInputAdapter} />
        }
      ],
      right: [
        {
          label: formatMessage(commonMessages.contents),
          input: <Field name='content' component={SearchInputAdapter} />
        },
        {
          label: formatMessage(messages.category),
          input: <Field name='category' component={SelectAdapter} options={[]} isShort />
        }
      ]
    }),
    [formatMessage]
  )
  return <SearchFilter conditions={conditions} onSubmit={onSubmit} />
}
