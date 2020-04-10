import React, { useMemo } from 'react'
import { useIntl } from 'react-intl'
import { Field } from 'react-final-form'
import SearchFilter, { Conditions } from '@src/components/SearchFilter/SearchFilter'
import TimeSpanInput from '@src/components/form/TimeSpanInput'
import { SearchInputAdapter, SelectAdapter } from '@src/components/finalForm'
import commonMessages from '@src/messages'
import comicMessages from '../../messages'
import messages from '../messages'

export default function SearchBlock({ onSubmit }: { onSubmit: (data: any) => void }) {
  const { formatMessage } = useIntl()

  const conditions: Conditions = useMemo(
    () => ({
      left: [
        {
          label: formatMessage(commonMessages.contentId),
          input: <Field name='contentId' component={SearchInputAdapter} icon />
        },
        {
          label: formatMessage(messages.name),
          input: <Field name='name' component={SearchInputAdapter} icon />
        },
        {
          label: formatMessage(commonMessages.author),
          input: <Field name='author' component={SelectAdapter} options={[]} />
        },
        {
          label: formatMessage(comicMessages.workId),
          input: <Field name='workId' component={SearchInputAdapter} icon />
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
          label: formatMessage(comicMessages.adUnit),
          input: <Field name='adUnit' component={SelectAdapter} options={[]} isShort />
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
  return <SearchFilter conditions={conditions} onSubmit={onSubmit} />
}
