import React, { useMemo } from 'react'
import { useIntl } from 'react-intl'
import { Field } from 'react-final-form'
import SearchFilter, { Conditions } from '@src/components/SearchFilter/SearchFilter'
import { TimeSpanInput } from '@src/components/form'
import { WorkSearchKeys, WorkType } from '@src/models/comics/work'
import { SearchInputAdapter, SelectAdapter } from '@src/components/finalForm'
import { searchParamsValidator } from '../utils'
import commonMessages from '@src/messages'
import comicMessages from '../../messages'
import messages from '../messages'

export default function SearchBlock({ onSubmit }: { onSubmit: (data: { [key in WorkSearchKeys]: any }) => void }) {
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
          input: (
            <Field
              name={WorkSearchKeys.WorkType}
              component={SelectAdapter}
              options={Object.values(WorkType).map(type => ({
                label: formatMessage(messages[type]),
                value: type
              }))}
            />
          )
        },
        {
          label: formatMessage(commonMessages.deliveryStartDateTime),
          input: (
            <TimeSpanInput nameStart={WorkSearchKeys.PublishBeginAtFrom} nameEnd={WorkSearchKeys.PublishBeginAtTo} />
          )
        },
        {
          label: formatMessage(commonMessages.deliveryEndDateTime),
          input: <TimeSpanInput nameStart={WorkSearchKeys.PublishEndAtFrom} nameEnd={WorkSearchKeys.PublishEndAtTo} />
        },
        {
          label: formatMessage(comicMessages.adUnit),
          input: <Field name={WorkSearchKeys.AdSetting} component={SelectAdapter} options={[]} isShort />
        }
      ],
      right: [
        {
          label: formatMessage(messages.rensaiStatus),
          input: <Field name={WorkSearchKeys.SerializedState} component={SelectAdapter} options={[]} isShort />
        },
        {
          label: formatMessage(messages.rensaiMagazine),
          input: <Field name={WorkSearchKeys.MagazineName} component={SelectAdapter} options={[]} />
        },
        {
          label: formatMessage(messages.rensaiFrequency),
          input: <Field name={WorkSearchKeys.UpdateFrequency} component={SelectAdapter} options={[]} isShort />
        },
        {
          label: formatMessage(messages.rensaiDay),
          input: <Field name={WorkSearchKeys.PeriodicalDay} component={SelectAdapter} options={[]} isShort />
        },
        {
          label: formatMessage(commonMessages.subscriptionId),
          input: <Field name={WorkSearchKeys.SubscriptionId} component={SelectAdapter} options={[]} />
        }
      ]
    }),
    [formatMessage]
  )
  return <SearchFilter validate={searchParamsValidator} conditions={conditions} onSubmit={onSubmit} />
}
