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
import formMessages from '@src/components/form/messages'
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
              toDataSet(formatMessage(messages.eventId), coinDeliveryEvent ? coinDeliveryEvent.id : ''),
              toDataSet(formatMessage(messages.eventName), <Field name='eventName' component={TextInputAdapter} />),
              toDataSet(
                formatMessage(messages.eventType),
                <Field
                  name='eventType'
                  component={SelectAdapter}
                  options={[]}
                  isShort
                  placeholder={formatMessage(formMessages.textInput)}
                />
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
