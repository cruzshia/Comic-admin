import React, { useRef, useContext, useEffect } from 'react'
import { useIntl } from 'react-intl'
import { useParams } from 'react-router-dom'
import ContentHeader from '@src/components/ContentHeader'
import Button, { Theme } from '@src/components/Button/Button'
import { ReactComponent as IconPhone } from '@src/assets/common/phone.svg'
import NotificationContext, { ActionContext } from '../context/NotificationContext'
import NotificationForm from './NotificationForm'
import StickyHeader from '@src/components/StickyBar/StickyHeader'
import { submitForm } from '@src/utils/validation'
import { BREADCRUMBS } from '../constants'
import commonMessages from '@src/messages'
import messages from '../messages'

export default function NotificationEdit() {
  const { formatMessage } = useIntl()
  const { id } = useParams()
  const formRef = useRef<HTMLFormElement>(null)
  const { currentNotification } = useContext(NotificationContext)
  const { onUpdateNotification, onGetNotification, onResetNotification } = useContext(ActionContext)

  useEffect(() => {
    onGetNotification(id!)
    return () => onResetNotification()
  }, [id, onGetNotification, onResetNotification])

  const titleText = formatMessage(messages.edit)
  const breadcrumbList = BREADCRUMBS.map(({ title, route }) => ({
    title: formatMessage(title),
    route
  })).concat([{ title: titleText, route: undefined }])
  const buttonList = [
    <Button theme={Theme.DARK} buttonText={formatMessage(commonMessages.create)} onClick={() => submitForm(formRef)} />,
    <Button icon={IconPhone} theme={Theme.DARK_BORDER} buttonText={formatMessage(commonMessages.preview)} />
  ]
  if (!currentNotification) return null
  return (
    <>
      <StickyHeader title={titleText} button={buttonList} />
      <ContentHeader breadcrumbList={breadcrumbList} titleText={titleText} buttonList={buttonList} />
      <NotificationForm formRef={formRef} onSubmit={onUpdateNotification} currentNotification={currentNotification} />
    </>
  )
}
