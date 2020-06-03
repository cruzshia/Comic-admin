import React, { useMemo } from 'react'
import { useIntl } from 'react-intl'
import { Field } from 'react-final-form'
import SearchFilter, { Conditions } from '@src/components/SearchFilter/SearchFilter'
import { TimeSpanInput } from '@src/components/form'
import { WorkSearchKeys, WorkType } from '@src/models/comics/work'
import { SearchInputAdapter, SelectAdapter } from '@src/components/finalForm'
import { searchParamsValidator } from '../utils'
import { daysOfWeekOptions } from '../../utils'
import commonMessages from '@src/messages'
import comicMessages from '../../messages'
import messages from '../messages'

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

  const conditions: Conditions = useMemo(
    () => ({
      left: [
        {
          label: formatMessage(messages.nameBrackets),
          input: <Field name={WorkSearchKeys.WorkKey} component={SearchInputAdapter} />
        },
        {
          label: formatMessage(commonMessages.authorName),
          input: <Field name={WorkSearchKeys.Author} component={SearchInputAdapter} />
        },
        {
          label: formatMessage(messages.category),
          input: <Field name={WorkSearchKeys.WorkType} component={SelectAdapter} options={typeOptions} />
        },
        {
          label: formatMessage(commonMessages.appId),
          input: <Field name={WorkSearchKeys.AppId} component={SelectAdapter} options={[]} />
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
        }
      ],
      right: [
        {
          label: formatMessage(messages.rensai),
          input: <Field name={WorkSearchKeys.MagazineName} component={SelectAdapter} options={[]} />
        },
        {
          label: formatMessage(messages.episodeFrequency),
          input: <Field name={WorkSearchKeys.UpdateFrequency} component={SelectAdapter} options={[]} isShort />
        },
        {
          label: formatMessage(messages.freePeriodicalDay),
          input: (
            <Field
              name={WorkSearchKeys.FreePeriodicalDay}
              component={SelectAdapter}
              options={daysOfWeekOptions}
              isShort
            />
          )
        },
        {
          label: formatMessage(commonMessages.subscriptionId),
          input: <Field name={WorkSearchKeys.SubscriptionId} component={SelectAdapter} options={[]} />
        },
        {
          label: formatMessage(comicMessages.adUnit),
          input: <Field name={WorkSearchKeys.AdSetting} component={SelectAdapter} options={[]} isShort />
        }
      ]
    }),
    [formatMessage, typeOptions]
  )
  return <SearchFilter validate={searchParamsValidator} conditions={conditions} onSubmit={onSubmit} />
}
