import React, { useMemo, useRef, useContext } from 'react'
import { useIntl } from 'react-intl'
import ContentHeader from '@src/components/ContentHeader'
import Button, { Theme } from '@src/components/Button/Button'
import SubscriptionForm from './SubscriptionForm'
import { BREADCRUMBS } from '../utils'
import { ActionContext } from '../context/SubscriptionContext'
import commonMessages from '@src/messages'
import messages from '../messages'

export default function SubscriptionCreation() {
  const { onCreateSubscription } = useContext(ActionContext)
  const { formatMessage } = useIntl()
  const formRef = useRef<HTMLFormElement>(null)
  const breadcrumbList = useMemo(
    () =>
      BREADCRUMBS.map(({ title, route }) => ({
        title: formatMessage(title),
        route
      })).concat([{ title: formatMessage(messages.creation), route: undefined }]),
    [formatMessage]
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
      <ContentHeader
        breadcrumbList={breadcrumbList}
        titleText={formatMessage(messages.creation)}
        buttonList={buttonList}
      />
      <SubscriptionForm onSubmit={onCreateSubscription} formRef={formRef} />
    </>
  )
}
