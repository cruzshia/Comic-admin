import React, { useMemo, useRef, useCallback } from 'react'
import { useIntl } from 'react-intl'
import ContentHeader from '@src/components/ContentHeader'
import Button, { Theme } from '@src/components/Button/Button'
import ContentForm from './ContentForm'
import commonMessages from '@src/messages'
import { CONTENT_BREADCRUMBS } from '../constants'
import messages from '../messages'

export default function ContentCreation() {
  const { formatMessage } = useIntl()

  const titleText = formatMessage(messages.create)
  const formRef = useRef<HTMLFormElement>(null)
  const handleSubmitCreate = useCallback(() => {}, [])
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
        onClick={() => {
          formRef.current?.dispatchEvent(new Event('submit', { cancelable: true }))
        }}
      />
    ],
    [formatMessage]
  )

  return (
    <>
      <ContentHeader breadcrumbList={breadcrumbList} titleText={titleText} buttonList={buttonList} />
      <ContentForm onFormSubmit={handleSubmitCreate} formRef={formRef} />
    </>
  )
}
