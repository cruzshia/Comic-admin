import React, { useMemo } from 'react'
import { Field } from 'react-final-form'
import { useIntl } from 'react-intl'
import SearchFilter from '@src/components/SearchFilter'
import commonMessages from '@src/messages'
import { SelectAdapter, TextInputAdapter } from '@src/components/finalForm'
import messages from '../messages'
import { DATE_TIME_PLACEHOLDER } from '@src/common/constants'

interface Props {
  onSubmit: (data: any) => void
}

export default function SearchBlock({ onSubmit }: Props) {
  const { formatMessage } = useIntl()
  const conditions = useMemo(
    () => ({
      left: [
        {
          label: formatMessage(messages.eventName),
          input: <Field name='eventName' component={TextInputAdapter} />
        },
        {
          label: formatMessage(commonMessages.deliveryStartDateTime),
          input: <Field name='deliveryStartTime' component={TextInputAdapter} placeholder={DATE_TIME_PLACEHOLDER} />
        }
      ],
      right: [
        {
          label: formatMessage(messages.eventType),
          input: <Field name='eventType' component={SelectAdapter} options={[]} isShort />
        }
      ]
    }),
    [formatMessage]
  )
  return <SearchFilter onSubmit={onSubmit} conditions={conditions} />
}
