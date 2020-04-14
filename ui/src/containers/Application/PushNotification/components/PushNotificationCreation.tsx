import React, { useMemo, useCallback, useRef } from 'react'
import { useIntl } from 'react-intl'
import Button, { Theme } from '@src/components/Button/Button'
import ContentHeader from '@src/components/ContentHeader'
import commonMessages from '@src/messages'
import PushNotificationTable from './pushNotificationTable'
import { BREADCRUMBS } from '../constants'
import messages from '../messages'

export default function PushNotificationCreation() {
  const { formatMessage } = useIntl()
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
        onClick={() => {
          formRef.current?.dispatchEvent(new Event('submit', { cancelable: true }))
        }}
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
      <PushNotificationTable onSubmit={handleSubmit} formRef={formRef} />
    </>
  )
}
