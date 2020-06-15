import React, { useContext, useCallback, useRef, useMemo, useEffect } from 'react'
import { useIntl } from 'react-intl'
import { useParams } from 'react-router-dom'
import Button, { Theme } from '@src/components/Button/Button'
import ContentHeader from '@src/components/ContentHeader'
import StickyHeader from '@src/components/StickyBar/StickyHeader'
import commonMessages from '@src/messages'
import PushNotification from '@src/models/application/pushNotification'
import { submitForm } from '@src/utils/validation'
import PushNotificationForm from './pushNotificationForm'
import PushNotificationContext, { ActionContext } from '../context/PushNotificationContext'
import { BREADCRUMBS } from '../constants'
import messages from '../messages'

export default function PushNotificationEdit() {
  const { formatMessage } = useIntl()
  const { currentNotification } = useContext(PushNotificationContext)
  const { onGetPushNotification, onUpdatePushNotification } = useContext(ActionContext)
  const { id } = useParams()
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    onGetPushNotification(id!)
  }, [onGetPushNotification, id])

  const title = useMemo(() => formatMessage(messages.pushNotificationEdit), [formatMessage])

  const breadcrumbList = useMemo(
    () =>
      BREADCRUMBS.map(({ title, route }) => ({ title: formatMessage(title), route })).concat([
        { title, route: undefined }
      ]),
    [formatMessage, title]
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

  const handleSubmit = useCallback((data: Partial<PushNotification>) => onUpdatePushNotification(data), [
    onUpdatePushNotification
  ])
  return (
    <>
      <ContentHeader breadcrumbList={breadcrumbList} titleText={title} buttonList={buttonList} />
      <StickyHeader title={title} button={buttonList} />
      <PushNotificationForm onSubmit={handleSubmit} currentNotification={currentNotification} formRef={formRef} />
    </>
  )
}
