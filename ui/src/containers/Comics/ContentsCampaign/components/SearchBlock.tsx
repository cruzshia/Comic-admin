import React, { useMemo } from 'react'
import { useIntl } from 'react-intl'
import { Field } from 'react-final-form'
import { SearchInputAdapter, SelectAdapter } from '@src/components/finalForm'
import TimeSpanInput from '@src/components/form/TimeSpanInput'
import SearchFilter, { Conditions } from '@src/components/SearchFilter/SearchFilter'
import commonMessages from '@src/messages'
import comicMessages from '../../messages'

export default function SearchBlock({ onSubmit }: { onSubmit: (data: any) => void }) {
  const { formatMessage } = useIntl()

  const conditions: Conditions = useMemo(
    () => ({
      left: [
        {
          label: formatMessage(commonMessages.id),
          input: <Field name='id' component={SearchInputAdapter} icon />
        },
        {
          label: formatMessage(comicMessages.campaignId),
          input: <Field name='campaignId' component={SearchInputAdapter} icon />
        },
        {
          label: formatMessage(commonMessages.contentId),
          input: <Field name='contentId' component={SearchInputAdapter} icon />
        }
      ],
      right: [
        {
          label: formatMessage(comicMessages.priority),
          input: <Field name='priority' component={SelectAdapter} options={[]} isShort />
        },
        {
          label: formatMessage(commonMessages.startDateTime),
          input: <TimeSpanInput name='' />
        },
        {
          label: formatMessage(commonMessages.endDateTime),
          input: <TimeSpanInput name='' />
        }
      ]
    }),
    [formatMessage]
  )
  return <SearchFilter conditions={conditions} onSubmit={onSubmit} />
}
