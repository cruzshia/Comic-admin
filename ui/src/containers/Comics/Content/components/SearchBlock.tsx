import React, { useMemo } from 'react'
import { useIntl } from 'react-intl'
import { Field } from 'react-final-form'
import SearchFilter, { Conditions } from '@src/components/SearchFilter/SearchFilter'
import TimeSpanInput from '@src/components/form/TimeSpanInput'
import { SearchInputAdapter, SelectAdapter } from '@src/components/finalForm'
import commonMessages from '@src/messages'
import messages from '../messages'
import { searchParamsValidator } from '../utils'

export default function SearchBlock({ onSubmit }: { onSubmit: (data: any) => void }) {
  const { formatMessage } = useIntl()

  const conditions: Conditions = useMemo(
    () => ({
      left: [
        {
          label: formatMessage(messages.contentsId),
          input: <Field name='contentId' component={SearchInputAdapter} />
        },
        {
          label: formatMessage(commonMessages.authorName),
          input: <Field name='author' component={SearchInputAdapter} />
        },
        {
          label: formatMessage(commonMessages.workName),
          input: <Field name='workId' component={SearchInputAdapter} />
        },
        {
          label: formatMessage(commonMessages.appId),
          input: <Field name='appId' component={SelectAdapter} options={[]} />
        }
      ],
      right: [
        {
          label: formatMessage(messages.category),
          input: <Field name='category' component={SelectAdapter} options={[]} isShort />
        },
        {
          label: formatMessage(commonMessages.deliveryStartDateTime),
          input: <TimeSpanInput name='deliverStart' />
        },
        {
          label: formatMessage(commonMessages.deliveryEndDateTime),
          input: <TimeSpanInput name='deliverEnd' />
        }
      ]
    }),
    [formatMessage]
  )
  return <SearchFilter conditions={conditions} onSubmit={onSubmit} validate={searchParamsValidator} disableExpand />
}
