import React, { useMemo } from 'react'
import { useIntl } from 'react-intl'
import { Field } from 'react-final-form'
import SearchFilter, { Conditions } from '@src/components/SearchFilter/SearchFilter'
import { SelectAdapter } from '@src/components/finalForm'
import TimeSpanInput from '@src/components/form/TimeSpanInput'
import commonMessages from '@src/messages'
import messages from '@src/containers/Comics/messages'

interface Prop {
  onSubmit: (data: any) => void
}

export default function SearchBlock({ onSubmit }: Prop) {
  const { formatMessage } = useIntl()
  const conditions: Conditions = useMemo(
    () => ({
      left: [
        {
          label: formatMessage(messages.campaignId),
          input: <Field name='campaignId' component={SelectAdapter} options={[]} />
        },
        {
          label: formatMessage(commonMessages.contentId),
          input: <Field name='contentId' component={SelectAdapter} options={[]} />
        },
        {
          label: formatMessage(commonMessages.appId),
          input: <Field name='appId' component={SelectAdapter} options={[]} />
        }
      ],
      right: [
        {
          label: formatMessage(messages.priority),
          input: <Field name='priority' component={SelectAdapter} options={[]} isShort={true} />
        },
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
