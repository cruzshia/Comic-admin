import React, { useMemo } from 'react'
import { useIntl } from 'react-intl'
import { Field } from 'react-final-form'
import SearchFilter, { Conditions } from '@src/components/SearchFilter/SearchFilter'
import { TimeSpanInput } from '@src/components/form'
import { WorkSearchKeys } from '@src/models/comics/work'
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
          input: <Field name={WorkSearchKeys.ID} component={SearchInputAdapter} />
        },
        {
          label: formatMessage(commonMessages.author),
          input: <Field name={WorkSearchKeys.Author} component={SearchInputAdapter} />
        },
        {
          label: formatMessage(messages.category),
          input: <Field name={WorkSearchKeys.WorkType} component={SelectAdapter} options={[]} />
        },
        {
          label: formatMessage(commonMessages.deliveryStartDateTime),
          input: <TimeSpanInput name={WorkSearchKeys.PublishBeginAt} />
        },
        {
          label: formatMessage(commonMessages.deliveryEndDateTime),
          input: <TimeSpanInput name={WorkSearchKeys.PublishEndAt} />
        },
        {
          label: formatMessage(comicMessages.adUnit),
          input: <Field name={WorkSearchKeys.AdSetting} component={SelectAdapter} options={[]} isShort />
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
