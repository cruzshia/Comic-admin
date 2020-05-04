import React, { useMemo } from 'react'
import { useIntl } from 'react-intl'
import { Field } from 'react-final-form'
import SearchFilter, { Conditions } from '@src/components/SearchFilter/SearchFilter'
import { SearchInputAdapter } from '@src/components/finalForm'
import TimeSpanInput from '@src/components/form/TimeSpanInput'
import commonMessages from '@src/messages'
import messages from '../messages'

export default function SearchBlock({ onSubmit }: { onSubmit: (data: any) => void }) {
  const { formatMessage } = useIntl()
  const conditions: Conditions = useMemo(
    () => ({
      left: [
        {
          label: formatMessage(messages.name),
          input: <Field name='campaignId' component={SearchInputAdapter} />
        }
      ],
      right: [
        {
          label: formatMessage(commonMessages.startDateTime),
          input: <TimeSpanInput name='campaignStart' />
        },
        {
          label: formatMessage(commonMessages.endDateTime),
          input: <TimeSpanInput name='campaignEnd' />
        }
      ]
    }),
    [formatMessage]
  )

  return <SearchFilter conditions={conditions} onSubmit={onSubmit} />
}
