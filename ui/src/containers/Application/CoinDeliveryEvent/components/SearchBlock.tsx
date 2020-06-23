import React, { useMemo } from 'react'
import { Field } from 'react-final-form'
import { useIntl } from 'react-intl'
import SearchFilter from '@src/components/SearchFilter'
import commonMessages from '@src/messages'
import { SelectAdapter, TextInputAdapter } from '@src/components/finalForm'
import TimeSpanInput from '@src/components/form/TimeSpanInput'
import { CoinEventKeys, EventType } from '@src/models/application/coinDeliveryEvent'
import messages from '../messages'
import { searchParamsValidator } from '../utils'

interface Props {
  onSubmit: (data: object) => void
}

export default function SearchBlock({ onSubmit }: Props) {
  const { formatMessage } = useIntl()

  const conditions = useMemo(
    () => ({
      left: [
        {
          label: formatMessage(messages.eventName),
          input: <Field name={CoinEventKeys.Name} component={TextInputAdapter} />
        },
        {
          label: formatMessage(commonMessages.publicStartTime),
          input: <TimeSpanInput nameStart={CoinEventKeys.PublishBeginAtFrom} nameEnd={CoinEventKeys.PublishBeginAtTo} />
        }
      ],
      right: [
        {
          label: formatMessage(messages.eventType),
          input: (
            <Field
              name={CoinEventKeys.EventType}
              component={SelectAdapter}
              options={Object.values(EventType).map(type => ({
                label: formatMessage(messages[type]),
                value: type
              }))}
              isShort
            />
          )
        }
      ]
    }),
    [formatMessage]
  )
  return <SearchFilter onSubmit={onSubmit} validate={searchParamsValidator} conditions={conditions} />
}
