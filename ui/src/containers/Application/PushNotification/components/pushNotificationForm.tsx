import React, { useMemo } from 'react'
import { useIntl } from 'react-intl'
import { Form, Field } from 'react-final-form'
import DataTable, { toDataSet } from '@src/components/table/DataTable'
import TextFieldAdapter from '@src/components/finalForm/TextInputAdapter'
import { TextAreaAdapter, SelectAdapter } from '@src/components/finalForm'
import { DATE_TIME_PLACEHOLDER } from '@src/common/constants'
import { PushNotification } from '@src/models/application/pushNotification'
import commonMessages from '@src/messages'
import messages from '../messages'
import IconPreview from './IconPreview'

interface Props {
  currentNotification?: PushNotification
  onSubmit?: (data: any) => void
  formRef?: React.RefObject<HTMLFormElement> | null
}

export default function PushNotificationForm({ currentNotification, onSubmit, formRef }: Props) {
  const { formatMessage } = useIntl()

  const tableTitles = useMemo(
    () => ({
      basicInfo: formatMessage(commonMessages.basicInfo),
      id: formatMessage(commonMessages.id),
      title: formatMessage(commonMessages.title),
      message: formatMessage(commonMessages.message),
      application: formatMessage(commonMessages.application),
      deepLinkUrl: formatMessage(messages.deepLinkUrl),
      bigIconUrl: formatMessage(messages.bigIconUrl),
      schedule: formatMessage(commonMessages.schedule),
      deliveryDateTime: formatMessage(commonMessages.deliveryDateTime)
    }),
    [formatMessage]
  )

  return (
    <Form
      onSubmit={onSubmit!}
      initialValues={{ ...currentNotification }}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit} ref={formRef}>
          <DataTable
            dataSet={[
              toDataSet(tableTitles.id, currentNotification?.id || ''),
              toDataSet(tableTitles.title, <Field name='title' component={TextFieldAdapter} />),
              toDataSet(tableTitles.message, <Field name='message' component={TextAreaAdapter} />),
              toDataSet(tableTitles.application, <Field name='application' component={SelectAdapter} options={[]} />),
              toDataSet(
                tableTitles.deepLinkUrl,
                <Field name='deepLinkUrl' component={TextFieldAdapter} placeholder={formatMessage(messages.inputUrl)} />
              ),
              toDataSet(tableTitles.bigIconUrl, <IconPreview />)
            ]}
            title={tableTitles.basicInfo}
            marginBottom
          />
          <DataTable
            dataSet={[
              toDataSet(
                tableTitles.deliveryDateTime,
                <Field name='schedule' component={TextFieldAdapter} placeholder={DATE_TIME_PLACEHOLDER} />
              )
            ]}
            title={tableTitles.schedule}
          />
        </form>
      )}
    />
  )
}
