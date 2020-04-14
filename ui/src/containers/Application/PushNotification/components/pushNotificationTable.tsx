import React, { useMemo } from 'react'
import { useIntl } from 'react-intl'
import { Form, Field } from 'react-final-form'
import DataTable from '@src/components/table/DataTable'
import TextFieldAdapter from '@src/components/finalForm/TextInputAdapter'
import { TextAreaAdapter, SelectAdapter } from '@src/components/finalForm'
import { DATE_TIME_PLACEHOLDER } from '@src/common/constants'
import commonMessages from '@src/messages'
import messages from '../messages'
import IconPreview from './IconPreview'

export default function PushNotificationTable({
  currentNotification,
  onSubmit,
  formRef
}: {
  currentNotification?: { [key: string]: any }
  onSubmit?: (data: any) => void
  formRef?: React.RefObject<HTMLFormElement> | null
}) {
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
      schedule: formatMessage(messages.schedule),
      deliveryDateTime: formatMessage(commonMessages.deliveryDateTime)
    }),
    [formatMessage]
  )

  const dataSet = useMemo(() => {
    if (onSubmit) {
      return {
        basicInfo: [
          { label: tableTitles.id, content: currentNotification?.id || 'id' },
          { label: tableTitles.title, content: <Field name='title' component={TextFieldAdapter} /> },
          { label: tableTitles.message, content: <Field name='message' component={TextAreaAdapter} /> },
          {
            label: tableTitles.application,
            content: <Field name='application' component={SelectAdapter} options={[]} />
          },
          {
            label: tableTitles.deepLinkUrl,
            content: (
              <Field name='deepLinkUrl' component={TextFieldAdapter} placeholder={formatMessage(messages.inputUrl)} />
            )
          },
          { label: tableTitles.bigIconUrl, content: <IconPreview /> }
        ],
        schedule: [
          {
            label: tableTitles.deliveryDateTime,
            content: <Field name='schedule' component={TextFieldAdapter} placeholder={DATE_TIME_PLACEHOLDER} />
          }
        ]
      }
    } else if (currentNotification) {
      return {
        basicInfo: [
          { label: tableTitles.id, content: currentNotification.id },
          { label: tableTitles.message, content: currentNotification.message },
          { label: tableTitles.application, content: currentNotification.application },
          { label: tableTitles.deepLinkUrl, content: currentNotification.deepLinkUrl },
          { label: tableTitles.bigIconUrl, content: currentNotification.bigIconUrl }
        ],
        schedule: [{ label: tableTitles.deliveryDateTime, content: currentNotification.deliveryDuration }]
      }
    }
    return { basicInfo: [], schedule: [] }
  }, [currentNotification, formatMessage, onSubmit, tableTitles])

  return onSubmit ? (
    <Form
      onSubmit={onSubmit ?? function() {}}
      initialValues={{ ...currentNotification }}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit} ref={formRef}>
          <input name='id' disabled style={{ display: 'none' }} />
          <DataTable dataSet={dataSet.basicInfo} title={tableTitles.basicInfo} marginBottom />
          <DataTable dataSet={dataSet.schedule} title={tableTitles.schedule} />
        </form>
      )}
    />
  ) : (
    <>
      <DataTable dataSet={dataSet.basicInfo} title={tableTitles.basicInfo} marginBottom />
      <DataTable dataSet={dataSet.schedule} title={tableTitles.schedule} />
    </>
  )
}
