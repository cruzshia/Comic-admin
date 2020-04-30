import React, { useMemo } from 'react'
import { useIntl } from 'react-intl'
import { Field } from 'react-final-form'
import SearchInputAdapter from '@src/components/finalForm/SearchInputAdapter'
import SearchFilter, { Conditions } from '@src/components/SearchFilter/SearchFilter'
import commonMessages from '@src/messages'

export default function SearchBlock({ onSubmit }: { onSubmit: (data: any) => void }) {
  const { formatMessage } = useIntl()
  const conditions: Conditions = useMemo(
    () => ({
      left: [
        {
          label: formatMessage(commonMessages.id),
          input: <Field name='id' component={SearchInputAdapter} />
        }
      ],
      right: [
        {
          label: formatMessage(commonMessages.authorName),
          input: <Field name='authorName' component={SearchInputAdapter} />
        }
      ]
    }),
    [formatMessage]
  )

  return <SearchFilter conditions={conditions} onSubmit={onSubmit} />
}
