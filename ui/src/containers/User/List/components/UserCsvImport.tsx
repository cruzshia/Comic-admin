import React, { useRef, useContext } from 'react'
import { useIntl } from 'react-intl'
import ContentHeader, { Breadcrumb } from '@src/components/ContentHeader/ContentHeader'
import { ReactComponent as IconDownload } from '@src/assets/common/download.svg'
import Button, { Theme } from '@src/components/Button/Button'
import { submitForm } from '@src/utils/validation'
import CsvImportForm from '@src/components/form/CsvImportForm'
import { ActionContext } from '../context/UserContext'
import { BREADCRUMBS } from '../constants'
import commonMessages from '@src/messages'
import messages from '../messages'

export default function UserCsvImport() {
  const { formatMessage } = useIntl()
  const { onImportUsers } = useContext(ActionContext)
  const formRef = useRef<HTMLFormElement>(null)

  const titleText = formatMessage(messages.userCsvRegistration)
  const breadcrumbList: Breadcrumb[] = BREADCRUMBS.map(({ title, route }) => ({
    title: formatMessage(title),
    route
  })).concat([{ title: titleText, route: undefined }])
  const buttonList = [
    <Button buttonText={formatMessage(commonMessages.create)} theme={Theme.DARK} onClick={() => submitForm(formRef)} />,
    <Button buttonText={formatMessage(commonMessages.templateJIS)} icon={IconDownload} />
  ]

  return (
    <>
      <ContentHeader breadcrumbList={breadcrumbList} titleText={titleText} buttonList={buttonList} />
      <CsvImportForm onSubmit={values => onImportUsers(values)} formRef={formRef} />
    </>
  )
}
