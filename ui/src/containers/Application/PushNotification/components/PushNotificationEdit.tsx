import React, { useContext, useCallback, useRef, useMemo } from 'react'
import { useIntl } from 'react-intl'
import Button, { Theme } from '@src/components/Button/Button'
import ContentHeader from '@src/components/ContentHeader'
import commonMessages from '@src/messages'
import { submitForm } from '@src/utils/validation'
import PushNotificationForm from './pushNotificationForm'
import PushNotificationContext from '../context/PushNotificationContext'
import { BREADCRUMBS } from '../constants'
import messages from '../messages'

export default function PushNotificationEdit() {
  const { formatMessage } = useIntl()
  const { currentNotification } = useContext(PushNotificationContext)
  const formRef = useRef<HTMLFormElement>(null)
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

  const handleSubmit = useCallback((data: any) => {
    console.log(data)
  }, [])
  return (
    <>
      <ContentHeader breadcrumbList={breadcrumbList} titleText={title} buttonList={buttonList} />
      <PushNotificationForm onSubmit={handleSubmit} currentNotification={currentNotification} formRef={formRef} />
    </>
  )
}
