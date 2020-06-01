import React from 'react'
import { useIntl } from 'react-intl'
import { Form, Field } from 'react-final-form'
import commonMessages from '@src/messages'
import { TextAreaAdapter, TextInputAdapter } from '@src/components/finalForm'
import DataTable, { toDataSet } from '@src/components/table/DataTable'
import { emptyApplicationInfo } from '@src/reducers/application/applicationInfo/applicationInfoReducer'
import applicationMessages from '../../messages'
import messages from '../messages'
import UploadButton from '@src/components/form/UploadButton'

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
              toDataSet(formatMessage(applicationMessages.applicationId), currentInfo ? currentInfo.applicationId : ''),
              toDataSet(
                formatMessage(messages.applicationName),
                <Field name='applciationName' component={TextInputAdapter} />
              ),
              toDataSet(
                formatMessage(messages.commonKey),
                <UploadButton text={formatMessage(commonMessages.selectFile)} name='commonKey' />
              ),
              toDataSet(
                formatMessage(messages.apnsAuthKey),
                <UploadButton text={formatMessage(commonMessages.selectFile)} name='apnsAuthKey' />
              ),
              toDataSet(formatMessage(messages.apnsTeamId), <Field name='apnsTeamId' component={TextInputAdapter} />),
              toDataSet(formatMessage(messages.apnsKeyId), <Field name='apnsKeyId' component={TextInputAdapter} />),
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
