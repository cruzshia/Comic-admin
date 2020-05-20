import React, { useMemo, useRef, useContext } from 'react'
import { useIntl } from 'react-intl'
import Button, { Theme } from '@src/components/Button/Button'
import ContentHeader from '@src/components/ContentHeader'
import commonMessages from '@src/messages'
import { submitForm } from '@src/utils/validation'
import PushNotificationTable from './pushNotificationTable'
import { BREADCRUMBS } from '../constants'
import messages from '../messages'
import { ActionContext } from '../context/PushNotificationContext'

export default function PushNotificationCreation() {
  const { formatMessage } = useIntl()
  const { onCreatePushNotification } = useContext(ActionContext)
  const formRef = useRef<HTMLFormElement>(null)
  const title = useMemo(() => formatMessage(messages.creation), [formatMessage])

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

  return (
    <>
      <ContentHeader breadcrumbList={breadcrumbList} titleText={title} buttonList={buttonList} />
      <PushNotificationTable onSubmit={onCreatePushNotification} formRef={formRef} />
    </>
  )
}