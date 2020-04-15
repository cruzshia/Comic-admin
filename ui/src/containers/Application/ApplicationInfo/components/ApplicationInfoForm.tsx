import React, { useMemo, useRef } from 'react'
import { useIntl } from 'react-intl'
import { Form, Field } from 'react-final-form'
import Button, { Theme } from '@src/components/Button/Button'
import commonMessages from '@src/messages'
import ContentHeader from '@src/components/ContentHeader'
import { TextAreaAdapter, TextInputAdapter } from '@src/components/finalForm'
import DataTable, { toDataSet } from '@src/components/table/DataTable'
import applicationMessages from '../../messages'
import { BREADCRUMBS } from '../constants'
import messages from '../messages'

export default function ApplicationInfoForm({
  onSubmit,
  currentInfo
}: {
  onSubmit: (data: any) => void
  currentInfo?: { [key: string]: any }
}) {
  const { formatMessage } = useIntl()
  const formRef = useRef<HTMLFormElement>(null)

  const breadcrumbList = useMemo(
    () =>
      BREADCRUMBS.map(({ title, route }) => ({ title: formatMessage(title), route })).concat([
        {
          title: formatMessage(messages.creation),
          route: undefined
        }
      ]),
    [formatMessage]
  )

  const buttonList = useMemo(
    () => [
      <Button
        theme={Theme.DARK}
        buttonText={formatMessage(commonMessages.create)}
        onClick={() => {
          formRef.current?.dispatchEvent(new Event('submit', { cancelable: true }))
        }}
      />
    ],
    [formatMessage]
  )

  return (
    <>
      <ContentHeader
        breadcrumbList={breadcrumbList}
        titleText={formatMessage(messages.creation)}
        buttonList={buttonList}
      />
      <Form
        onSubmit={onSubmit}
        initialValues={{ ...currentInfo }}
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
    </>
  )
}
