import React from 'react'
import { Form, Field } from 'react-final-form'
import { useIntl } from 'react-intl'
import { SubscriptionProduct } from '@src/models/comics/subscription'
import DataTable, { toDataSet } from '@src/components/table/DataTable'
import { SelectAdapter, AmountInputAdapter, TextInputAdapter } from '@src/components/finalForm'
import commonMessages from '@src/messages'
import { DATE_TIME_PLACEHOLDER } from '@src/common/constants'
import subscriptionMessages from '../../messages'
import messages from '../messages'

interface Props {
  onSubmit: (data: SubscriptionProduct) => void
  formRef: React.RefObject<HTMLFormElement>
  currentSubscriptionProduct?: SubscriptionProduct
}

export default function SubscriptionProductForm({ onSubmit, formRef, currentSubscriptionProduct }: Props) {
  const { formatMessage } = useIntl()

  return (
    <Form
      onSubmit={onSubmit}
      initialValues={currentSubscriptionProduct}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit} ref={formRef}>
          <DataTable
            title={formatMessage(commonMessages.basicInfo)}
            dataSet={[
              toDataSet(
                formatMessage(commonMessages.application),
                <Field name='app' component={SelectAdapter} options={[]} />
              ),
              toDataSet(
                formatMessage(subscriptionMessages.productId),
                <Field
                  name='productId'
                  placeholder={formatMessage(commonMessages.enterId)}
                  component={TextInputAdapter}
                />
              ),
              toDataSet(
                formatMessage(subscriptionMessages.monthlyFee),
                <Field
                  name='monthlyFee'
                  placeholder={formatMessage(commonMessages.enterFee)}
                  component={AmountInputAdapter}
                />
              ),
              toDataSet(
                formatMessage(messages.status),
                <Field
                  name='status'
                  placeholder={formatMessage(commonMessages.selectStatus)}
                  component={SelectAdapter}
                  options={[]}
                />
              ),
              toDataSet(
                formatMessage(commonMessages.publicStartTime),
                <Field name='publicStartTime' placeholder={DATE_TIME_PLACEHOLDER} component={TextInputAdapter} />
              ),
              toDataSet(
                formatMessage(commonMessages.publicEndTime),
                <Field name='publicEndTime' placeholder={DATE_TIME_PLACEHOLDER} component={TextInputAdapter} />
              )
            ]}
          />
        </form>
      )}
    />
  )
}
