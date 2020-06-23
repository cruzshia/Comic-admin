import React, { useMemo } from 'react'
import { useIntl } from 'react-intl'
import { Form, Field } from 'react-final-form'
import arrayMutators from 'final-form-arrays'
import { TextInputAdapter, SelectAdapter } from '@src/components/finalForm'
import StartEndForm from '@src/components/form/StartEndForm'
import DataTable, { toDataSet } from '@src/components/table/DataTable'
import RewardForm from './RewardForm'
import commonMessages from '@src/messages'
import formMessages from '@src/components/form/messages'
import { CoinEventKeys, EventType } from '@src/models/application/coinDeliveryEvent'
import messages from '../messages'
import { validateCoinEvent } from '../utils'

interface Props {
  coinDeliveryEvent?: any
  onSubmit: (data: any) => void
  formRef: React.RefObject<HTMLFormElement>
}

export default function CoinDeliveryEventForm({ coinDeliveryEvent, onSubmit, formRef }: Props) {
  const { formatMessage } = useIntl()
  const eventTypeOptions = useMemo(
    () =>
      Object.values(EventType).map(type => ({
        label: formatMessage(messages[type]),
        value: type
      })),
    [formatMessage]
  )

  return (
    <Form
      onSubmit={onSubmit}
      validate={validateCoinEvent}
      initialValues={coinDeliveryEvent}
      mutators={{ ...arrayMutators }}
      render={({ handleSubmit, form: { mutators } }) => (
        <form onSubmit={handleSubmit} ref={formRef}>
          <DataTable
            title={formatMessage(commonMessages.basicInfo)}
            dataSet={[
              toDataSet(formatMessage(messages.eventId), coinDeliveryEvent ? coinDeliveryEvent[CoinEventKeys.ID] : ''),
              toDataSet(
                formatMessage(messages.eventName),
                <Field name={CoinEventKeys.Name} component={TextInputAdapter} />
              ),
              toDataSet(
                formatMessage(messages.eventType),
                <Field
                  name={CoinEventKeys.EventType}
                  component={SelectAdapter}
                  options={eventTypeOptions}
                  isShort
                  placeholder={formatMessage(formMessages.textInput)}
                />
              )
            ]}
            marginBottom
          />
          <DataTable
            title={formatMessage(messages.eventRewardSetting)}
            dataSet={[
              toDataSet(
                formatMessage(messages.eventReward),
                <RewardForm name={CoinEventKeys.Rewards} mutators={mutators as any} />
              )
            ]}
            marginBottom
          />
          <StartEndForm
            title={formatMessage(commonMessages.releaseDuration)}
            startLabel={formatMessage(commonMessages.publicStartTime)}
            startName={CoinEventKeys.PublishBeginAt}
            endLabel={formatMessage(commonMessages.publicEndTime)}
            endName={CoinEventKeys.PublishEndAt}
          />
        </form>
      )}
    />
  )
}
