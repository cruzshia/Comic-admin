import React, { useMemo } from 'react'
import { useIntl } from 'react-intl'
import { Field } from 'react-final-form'
import SearchFilter, { Conditions } from '@src/components/SearchFilter/SearchFilter'
import { TimeSpanInput } from '@src/components/form'
import commonMessages from '@src/messages'
import comicMessages from '../../messages'
import messages from '../messages'
import { SearchInputAdapter, SelectAdapter } from '@src/components/finalForm'

export default function SearchBlock({ onSubmit }: { onSubmit: (data: any) => void }) {
  const { formatMessage } = useIntl()

  const conditions: Conditions = useMemo(
    () => ({
      left: [
        {
          label: formatMessage(commonMessages.workId),
          input: <Field name='workId' component={SearchInputAdapter} />
        },
        {
          label: formatMessage(commonMessages.author),
          input: <Field name='author' component={SearchInputAdapter} />
        },
        {
          label: formatMessage(messages.category),
          input: <Field name='category' component={SelectAdapter} options={[]} />
        },
        {
          label: formatMessage(commonMessages.deliveryStartDateTime),
          input: <TimeSpanInput name='releaseStart' />
        },
        {
          label: formatMessage(commonMessages.deliveryEndDateTime),
          input: <TimeSpanInput name='releaseEnd' />
        },
        {
          label: formatMessage(comicMessages.adUnit),
          input: <Field name='adUnit' component={SelectAdapter} options={[]} isShort />
        }
      ],
      right: [
        {
          label: formatMessage(messages.rensaiStatus),
          input: <Field name='rensaiStatus' component={SelectAdapter} options={[]} isShort />
        },
        {
          label: formatMessage(messages.rensaiMagazine),
          input: <Field name='rensaiMagazine' component={SelectAdapter} options={[]} />
        },
        {
          label: formatMessage(messages.rensaiFrequency),
          input: <Field name='rensaiFrequency' component={SelectAdapter} options={[]} isShort />
        },
        {
          label: formatMessage(messages.rensaiDay),
          input: <Field name='rensaiDay' component={SelectAdapter} options={[]} isShort />
        },
        {
          label: formatMessage(commonMessages.subscriptionId),
          input: <Field name='subscriptionId' component={SelectAdapter} options={[]} />
        }
      ]
    }),
    [formatMessage]
  )
  return <SearchFilter conditions={conditions} onSubmit={onSubmit} />
}
