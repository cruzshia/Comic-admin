import React from 'react'
import { useIntl } from 'react-intl'
import { Form, Field } from 'react-final-form'
import commonMessages from '@src/messages'
import { TextAreaAdapter, TextInputAdapter } from '@src/components/finalForm'
import DataTable, { toDataSet } from '@src/components/table/DataTable'
import { emptyApplicationInfo } from '@src/reducers/application/applicationInfo/applicationInfoReducer'
import applicationMessages from '../../messages'
import messages from '../messages'

interface Props {
  onSubmit: (data: any) => void
  currentInfo?: { [key: string]: any }
  formRef: React.RefObject<HTMLFormElement>
}

export default function ApplicationInfoForm({ onSubmit, currentInfo, formRef }: Props) {
  const { formatMessage } = useIntl()

  return (
    <Form
      onSubmit={onSubmit}
      initialValues={currentInfo || emptyApplicationInfo}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit} ref={formRef}>
          <DataTable
            dataSet={[
              toDataSet(
                formatMessage(applicationMessages.applicationId),
                currentInfo ? currentInfo.applicationId : <Field name='id' component={TextInputAdapter} />
              ),
              toDataSet(
                formatMessage(messages.applicationName),
                <Field name='applciationName' component={TextInputAdapter} />
              ),
              toDataSet(formatMessage(messages.commonKey), <Field name='commonKey' component={TextInputAdapter} />),
              toDataSet(
                formatMessage(messages.apnsCertificate),
                <Field name='apnsCertificate' component={TextAreaAdapter} />
              ),
              toDataSet(
                formatMessage(messages.apnsValidityPeriod),
                currentInfo ? (
                  currentInfo.apnsValidityPeriod
                ) : (
                  <Field name='apnsValidityPeriod' component={TextInputAdapter} />
                )
              ),
              toDataSet(formatMessage(messages.fcnmApiKey), <Field name='fcnmApiKey' component={TextInputAdapter} />),
              toDataSet(
                formatMessage(messages.androidPublicKey),
                <Field name='androidPublicKey' component={TextInputAdapter} />
              ),
              toDataSet(
                formatMessage(messages.iTunesPublicKey),
                <Field name='iTunesPublicKey' component={TextInputAdapter} />
              ),
              toDataSet(
                formatMessage(messages.supplementSetting),
                <Field name='supplementSetting' component={TextAreaAdapter} rows={18} />
              )
            ]}
            title={formatMessage(commonMessages.basicInfo)}
            marginBottom
          />
        </form>
      )}
    />
  )
}
