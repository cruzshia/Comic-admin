import React, { useMemo, useRef, useContext } from 'react'
import { useIntl } from 'react-intl'
import ContentHeader from '@src/components/ContentHeader'
import Button, { Theme } from '@src/components/Button/Button'
import { submitForm } from '@src/utils/validation'
import ContentForm from './ContentForm'
import commonMessages from '@src/messages'
import { CONTENT_BREADCRUMBS } from '../constants'
import messages from '../messages'
import { ActionContext } from '../context/ContentContext'

export default function ContentCreation() {
  const { onCreateContent } = useContext(ActionContext)
  const { formatMessage } = useIntl()
  const titleText = formatMessage(messages.create)
  const formRef = useRef<HTMLFormElement>(null)
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
      />
    ],
    [formatMessage]
  )

  return (
    <>
      <ContentHeader breadcrumbList={breadcrumbList} titleText={titleText} buttonList={buttonList} />
      <ContentForm onFormSubmit={onCreateContent} formRef={formRef} />
    </>
  )
}
