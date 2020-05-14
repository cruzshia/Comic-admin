import React, { useMemo, useRef } from 'react'
import { useIntl } from 'react-intl'
import { useHistory } from 'react-router-dom'
import { ReactComponent as IconDownload } from '@src/assets/common/download.svg'
import Button, { Theme } from '@src/components/Button/Button'
import ContentHeader from '@src/components/ContentHeader'
import { routePath } from '@src/common/appConfig'
import CsvImportForm from '@src/components/form/CsvImportForm'
import { submitForm } from '@src/utils/validation'
import { BREADCRUMBS } from '../constants'
import commonMessages from '@src/messages'
import messages from '../messages'

export default function GiftCoinsCreation() {
  const { formatMessage } = useIntl()
  const history = useHistory()
  const formRef = useRef<HTMLFormElement>(null)

  const breadcrumbList = BREADCRUMBS.map(({ title }) => ({ title: formatMessage(title) }))
  const buttonList = useMemo(
    () => [
      <Button
        theme={Theme.DARK}
        buttonText={formatMessage(commonMessages.create)}
        onClick={() => submitForm(formRef)}
      />,
      <Button buttonText={formatMessage(commonMessages.templateJIS)} icon={IconDownload} normalCase />,
      <Button
        buttonText={formatMessage(commonMessages.csvImportLogs)}
        onClick={() => {
          history.push(routePath.user.giftCoinsBatchLogs)
        }}
      />
    ],
    [history, formatMessage, formRef]
  )

  return (
    <>
      <ContentHeader
        breadcrumbList={breadcrumbList}
        titleText={formatMessage(messages.csvBatchGift)}
        buttonList={buttonList}
      />
      <CsvImportForm onSubmit={console.log} formRef={formRef} />
    </>
  )
}
