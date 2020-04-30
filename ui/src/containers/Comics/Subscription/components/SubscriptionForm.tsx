import React from 'react'
import { useIntl } from 'react-intl'
import { Form, Field } from 'react-final-form'
import DataTable, { toDataSet } from '@src/components/table/DataTable'
import TextFieldAdapter from '@src/components/finalForm/TextInputAdapter'
import { SelectAdapter, DropZoneAdapter } from '@src/components/finalForm'
import { StartEndForm } from '@src/components/form'
import commonMessages from '@src/messages'
import Subscription from '@src/models/comics/subscription'
import messages from '../messages'

enum DeviceType {
  Common = 'common',
  Different = 'different'
}

interface Props {
  onSubmit: (data: Subscription) => void
  currentSubscription?: any
  formRef: React.RefObject<HTMLFormElement>
}

export default function SubscriptionForm({ onSubmit, currentSubscription, formRef }: Props) {
  const { formatMessage } = useIntl()

  return (
    <Form
      onSubmit={onSubmit}
      initialValues={currentSubscription || { deviceType: DeviceType.Common }}
      render={({ handleSubmit, values }) => (
        <form onSubmit={handleSubmit} ref={formRef}>
          <DataTable
            title={formatMessage(commonMessages.basicInfo)}
            dataSet={[
              toDataSet(formatMessage(commonMessages.id), <Field name='id' component={TextFieldAdapter} />),
              toDataSet(formatMessage(messages.name), <Field name='magazineName' component={TextFieldAdapter} />),
              toDataSet(
                formatMessage(messages.deviceType),
                <Field
                  name='deviceType'
                  component={SelectAdapter}
                  isShort
                  options={[
                    { label: formatMessage(messages.deviceCommon), value: DeviceType.Common },
                    { label: formatMessage(messages.deviceDifferent), value: DeviceType.Different }
                  ]}
                />
              ),
              ...(values.deviceType === DeviceType.Common
                ? [
                    toDataSet(
                      formatMessage(messages.monthlyFeeCommon),
                      <Field name='monthlyFee' component={TextFieldAdapter} isShort />
                    )
                  ]
                : [
                    toDataSet(
                      formatMessage(messages.monthlyFeeIos),
                      <Field name='monthlyFeeIos' component={TextFieldAdapter} isShort />
                    ),
                    toDataSet(
                      formatMessage(messages.monthlyFeeAndroid),
                      <Field name='monthlyFeeAndroid' component={TextFieldAdapter} isShort />
                    ),
                    toDataSet(
                      formatMessage(messages.monthlyFeeBrowser),
                      <Field name='monthlyFeeBrowser' component={TextFieldAdapter} isShort />
                    )
                  ]),
              toDataSet(formatMessage(messages.subscriptionImage), <Field name='image' component={DropZoneAdapter} />)
            ]}
            marginBottom
          />
          <StartEndForm
            title={formatMessage(commonMessages.deliveryDuration)}
            startLabel={formatMessage(commonMessages.deliveryStartDateTime)}
            startName='deliverStart'
            endLabel={formatMessage(commonMessages.deliveryEndDateTime)}
            endName='deliverEnd'
          />
        </form>
      )}
    />
  )
}
