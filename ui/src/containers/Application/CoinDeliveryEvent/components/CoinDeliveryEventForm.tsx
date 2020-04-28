import React from 'react'
import { useIntl } from 'react-intl'
import { Form, Field } from 'react-final-form'
import arrayMutators from 'final-form-arrays'
import { TextInputAdapter, SelectAdapter } from '@src/components/finalForm'
import StartEndForm from '@src/components/form/StartEndForm'
import DataTable, { toDataSet } from '@src/components/table/DataTable'
import { emptyCoinDeliveryEvent } from '@src/reducers/application/coinDeliveryEvent/coinDeliveryEventReducer'
import RewardForm from './RewardForm'
import commonMessages from '@src/messages'
import messages from '../messages'

interface Props {
  coinDeliveryEvent?: any
  onSubmit: (data: any) => void
  formRef: React.RefObject<HTMLFormElement>
}

export default function CoinDeliveryEventForm({ coinDeliveryEvent, onSubmit, formRef }: Props) {
  const { formatMessage } = useIntl()

  return (
    <Form
      onSubmit={onSubmit}
      initialValues={coinDeliveryEvent || emptyCoinDeliveryEvent}
      mutators={{ ...arrayMutators }}
      render={({ handleSubmit, form: { mutators } }) => (
        <form onSubmit={handleSubmit} ref={formRef}>
          <DataTable
            title={formatMessage(commonMessages.basicInfo)}
            dataSet={[
              toDataSet(
                formatMessage(commonMessages.id),
                coinDeliveryEvent ? coinDeliveryEvent.id : <Field name='id' component={TextInputAdapter} />
              ),
              toDataSet(
                formatMessage(messages.eventId),
                coinDeliveryEvent ? coinDeliveryEvent.eventId : <Field name='eventId' component={TextInputAdapter} />
              ),
              toDataSet(formatMessage(messages.eventName), <Field name='eventName' component={TextInputAdapter} />),
              toDataSet(
                formatMessage(messages.eventType),
                <Field name='eventType' component={SelectAdapter} options={[]} isShort />
              ),
              toDataSet(
                formatMessage(messages.eventRewardSetting),
                <Field name='eventRewardSetting' component={SelectAdapter} options={[]} />
              )
            ]}
            marginBottom
          />
          <DataTable
            title={formatMessage(messages.eventRewardSetting)}
            dataSet={[toDataSet(formatMessage(messages.eventReward), <RewardForm mutators={mutators as any} />)]}
            marginBottom
          />
          <StartEndForm
            title={formatMessage(commonMessages.releaseDuration)}
            startLabel={formatMessage(commonMessages.publicStartTime)}
            startName='releaseStartAt'
            endLabel={formatMessage(commonMessages.publicEndTime)}
            endName='releaseEndAt'
          />
        </form>
      )}
    />
  )
}
