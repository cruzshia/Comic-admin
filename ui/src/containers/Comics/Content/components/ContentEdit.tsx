import React, { useMemo, useRef, useContext, useEffect } from 'react'
import { useIntl } from 'react-intl'
import { useParams } from 'react-router-dom'
import ContentHeader from '@src/components/ContentHeader'
import Button, { Theme } from '@src/components/Button/Button'
import StickyHeader from '@src/components/StickyBar/StickyHeader'
import ContentForm from './ContentForm'
import commonMessages from '@src/messages'
import ContentContext, { ActionContext } from '../context/ContentContext'
import { CONTENT_BREADCRUMBS } from '../constants'
import messages from '../messages'

export default function ContentEdit() {
  const { currentContent = {} } = useContext(ContentContext)
  const { onGetContent, onUpdateContent } = useContext(ActionContext)
  const { formatMessage } = useIntl()
  const { id } = useParams()

  useEffect(() => {
    onGetContent(id!)
  }, [onGetContent, id])

  const titleText = formatMessage(messages.edit)
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
        onClick={() => {
          formRef.current?.dispatchEvent(new Event('submit', { cancelable: true }))
        }}
      />
    ],
    [formatMessage]
  )

  return currentContent.id ? (
    <>
      <StickyHeader title={titleText} button={buttonList} />
      <ContentHeader breadcrumbList={breadcrumbList} titleText={titleText} buttonList={buttonList} />
      <ContentForm onFormSubmit={onUpdateContent} content={currentContent} formRef={formRef} />
    </>
  ) : null
}
