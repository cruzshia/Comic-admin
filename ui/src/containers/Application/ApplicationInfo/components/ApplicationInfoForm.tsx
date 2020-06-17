import React from 'react'
import { useIntl } from 'react-intl'
import { Form, Field } from 'react-final-form'
import commonMessages from '@src/messages'
import { TextAreaAdapter, TextInputAdapter } from '@src/components/finalForm'
import DataTable, { toDataSet } from '@src/components/table/DataTable'
import { emptyApplicationInfo } from '@src/reducers/application/applicationInfo/applicationInfoReducer'
import { ApplicationInfoKeys } from '@src/models/application/applicationInfo'
import { validateAppInfo } from '../utils'
import UploadButton from '@src/components/form/UploadButton'
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
      validate={validateAppInfo}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit} ref={formRef}>
          <DataTable
            dataSet={[
              toDataSet(formatMessage(applicationMessages.applicationId), currentInfo ? currentInfo.applicationId : ''),
              toDataSet(
                formatMessage(messages.applicationName),
                <Field name={ApplicationInfoKeys.Name} component={TextInputAdapter} />
              ),
              toDataSet(
                formatMessage(messages.commonKey),
                <UploadButton text={formatMessage(commonMessages.selectFile)} name={ApplicationInfoKeys.CommonKey} />
              ),
              toDataSet(
                formatMessage(messages.apnsAuthKey),
                <UploadButton
                  accept='.p8'
                  text={formatMessage(commonMessages.selectFile)}
                  name={ApplicationInfoKeys.ApnsAuthKey}
                />
              ),
              toDataSet(
                formatMessage(messages.apnsTeamId),
                <Field name={ApplicationInfoKeys.ApnsTeamIdToken} component={TextInputAdapter} />
              ),
              toDataSet(
                formatMessage(messages.apnsKeyId),
                <Field name={ApplicationInfoKeys.ApnsKeyIdToken} component={TextInputAdapter} />
              ),
              toDataSet(
                formatMessage(messages.fcnmApiKey),
                <Field name={ApplicationInfoKeys.FcmApiKey} component={TextInputAdapter} />
              ),
              toDataSet(
                formatMessage(messages.androidPublicKey),
                <Field name={ApplicationInfoKeys.AndroidPublicKey} component={TextInputAdapter} />
              ),
              toDataSet(
                formatMessage(messages.iTunesPublicKey),
                <Field name={ApplicationInfoKeys.ItunesSharedSecret} component={TextInputAdapter} />
              ),
              toDataSet(
                formatMessage(messages.supplementSetting),
                <Field name={ApplicationInfoKeys.AdditionalSetting} component={TextAreaAdapter} rows={18} />
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
