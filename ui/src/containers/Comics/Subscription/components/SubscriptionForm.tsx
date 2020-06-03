import React from 'react'
import { useIntl } from 'react-intl'
import { Form, Field } from 'react-final-form'
import DataTable, { toDataSet } from '@src/components/table/DataTable'
import TextFieldAdapter from '@src/components/finalForm/TextInputAdapter'
import { DropZoneAdapter } from '@src/components/finalForm'
import { DATE_TIME_PLACEHOLDER } from '@src/common/constants'
import { validateSubscription } from '../utils'
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
      validate={validateSubscription}
      initialValues={currentSubscription || { deviceType: DeviceType.Common }}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit} ref={formRef}>
          <DataTable
            title={formatMessage(commonMessages.basicInfo)}
            dataSet={[
              toDataSet(formatMessage(commonMessages.id), currentSubscription ? currentSubscription.id : ''),
              toDataSet(formatMessage(messages.name), <Field name='name' component={TextFieldAdapter} />),
              toDataSet(formatMessage(messages.subscriptionImage), <Field name='image' component={DropZoneAdapter} />),
              toDataSet(
                formatMessage(commonMessages.publicStartTime),
                <Field name='publicStartTime' placeholder={DATE_TIME_PLACEHOLDER} component={TextFieldAdapter} />
              ),
              toDataSet(
                formatMessage(commonMessages.publicEndTime),
                <Field name='publicEndTime' placeholder={DATE_TIME_PLACEHOLDER} component={TextFieldAdapter} />
              )
            ]}
            marginBottom
          />
        </form>
      )}
    />
  )
}
