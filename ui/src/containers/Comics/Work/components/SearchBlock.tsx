import React, { useMemo } from 'react'
import { useIntl } from 'react-intl'
import { Field } from 'react-final-form'
import SearchFilter, { Conditions } from '@src/components/SearchFilter/SearchFilter'
import { TimeSpanInput } from '@src/components/form'
import { WorkSearchKeys, WorkType, RensaiStatus } from '@src/models/comics/work'
import { SearchInputAdapter, SelectAdapter } from '@src/components/finalForm'
import { searchParamsValidator } from '../utils'
import commonMessages from '@src/messages'
import comicMessages from '../../messages'
import messages from '../messages'

const days = ['日', '月', '水', '火', '木', '金', '土']
const dayOfWeekOptions = days.map(day => ({ label: `${day}曜日`, value: day }))

export default function SearchBlock({
  onSubmit
}: {
  onSubmit: (data: Partial<{ [key in WorkSearchKeys]: any }>) => void
}) {
  const { formatMessage } = useIntl()

  const typeOptions = useMemo(
    () =>
      Object.values(WorkType).map(type => ({
        label: formatMessage(messages[type]),
        value: type
      })),
    [formatMessage]
  )

  const statusOptions = useMemo(
    () =>
      Object.values(RensaiStatus).map((status, idx) => ({
        label: formatMessage(messages[status]),
        value: idx
      })),
    [formatMessage]
  )

  const conditions: Conditions = useMemo(
    () => ({
      left: [
        {
          label: formatMessage(commonMessages.workId),
          input: <Field name={WorkSearchKeys.WorkKey} component={SearchInputAdapter} />
        },
        {
          label: formatMessage(commonMessages.author),
          input: <Field name={WorkSearchKeys.Author} component={SearchInputAdapter} />
        },
        {
          label: formatMessage(messages.category),
          input: <Field name={WorkSearchKeys.WorkType} component={SelectAdapter} options={typeOptions} />
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
          input: (
            <Field name={WorkSearchKeys.SerializedState} component={SelectAdapter} options={statusOptions} isShort />
          )
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
          input: (
            <Field
              name={WorkSearchKeys.FreePeriodicalDay}
              component={SelectAdapter}
              options={dayOfWeekOptions}
              isShort
            />
          )
        },
        {
          label: formatMessage(commonMessages.subscriptionId),
          input: <Field name={WorkSearchKeys.SubscriptionId} component={SelectAdapter} options={[]} />
        }
      ]
    }),
    [formatMessage, typeOptions, statusOptions]
  )
  return <SearchFilter validate={searchParamsValidator} conditions={conditions} onSubmit={onSubmit} />
}
