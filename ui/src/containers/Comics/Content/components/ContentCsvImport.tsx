import React, { useMemo, useRef } from 'react'
import { useIntl } from 'react-intl'
import { Form, Field } from 'react-final-form'
import ContentHeader from '@src/components/ContentHeader'
import Button, { Theme } from '@src/components/Button/Button'
import DataTable, { toDataSet } from '@src/components/table/DataTable'
import TextInputAdapter from '@src/components/finalForm/TextInputAdapter'
import UploadButton from '@src/components/form/UploadButton'
import { DATE_TIME_PLACEHOLDER } from '@src/common/constants'
import { ReactComponent as IconDownload } from '@src/assets/common/download.svg'
import { submitForm } from '@src/utils/validation'
import { CONTENT_BREADCRUMBS } from '../constants'
import commonMessages from '@src/messages'
import messages from '../messages'

export default function ContentCsvImport() {
  const { formatMessage } = useIntl()
  const formRef = useRef<HTMLFormElement>(null)
  const titleText = formatMessage(messages.csvImport)
  const breadcrumbList = useMemo(
    () =>
      CONTENT_BREADCRUMBS.map(({ title, route }) => ({
        title: formatMessage(title),
        route
      })).concat([{ title: titleText, route: undefined }]),
    [formatMessage, titleText]
  )
  const buttonList = useMemo(
    () => [
      <Button
        theme={Theme.DARK}
        buttonText={formatMessage(commonMessages.create)}
        onClick={() => submitForm(formRef)}
      />,
      <Button buttonText={formatMessage(commonMessages.templateJIS)} icon={IconDownload} normalCase />
    ],
    [formatMessage]
  )

  return (
    <>
      <ContentHeader breadcrumbList={breadcrumbList} titleText={titleText} buttonList={buttonList} />
      <Form
        onSubmit={console.log}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit} ref={formRef}>
            <DataTable
              title={formatMessage(commonMessages.basicInfo)}
              dataSet={[
                toDataSet(
                  formatMessage(commonMessages.csvFile),
                  <UploadButton text={formatMessage(commonMessages.selectFile)} name='file' accept='.csv' />
                ),
                toDataSet(
                  formatMessage(commonMessages.schedule),
                  <Field name='schedule' placeholder={DATE_TIME_PLACEHOLDER} component={TextInputAdapter} />
                )
              ]}
            />
          </form>
        )}
      />
    </>
  )
}
