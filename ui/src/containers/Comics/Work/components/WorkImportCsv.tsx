import React, { useMemo, useRef } from 'react'
import { useIntl } from 'react-intl'
import ContentHeader from '@src/components/ContentHeader'
import Button, { Theme } from '@src/components/Button/Button'
import { CsvImportForm } from '@src/components/form'
import { ReactComponent as IconDownload } from '@src/assets/common/download.svg'
import { submitForm } from '@src/utils/validation'
import { BREADCRUMBS } from '../utils'
import commonMessages from '@src/messages'
import messages from '../messages'

export default function ContentCsvImport() {
  const { formatMessage } = useIntl()
  const formRef = useRef<HTMLFormElement>(null)
  const titleText = formatMessage(messages.csvImport)
  const breadcrumbList = useMemo(
    () =>
      BREADCRUMBS.map(({ title, route }) => ({
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
      <CsvImportForm onSubmit={console.log} formRef={formRef} />
    </>
  )
}
