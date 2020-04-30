import React, { useContext, useMemo, useRef, useEffect } from 'react'
import { useIntl } from 'react-intl'
import { useParams } from 'react-router-dom'
import ContentHeader from '@src/components/ContentHeader'
import Button, { Theme } from '@src/components/Button/Button'
import SubscriptionForm from './SubscriptionForm'
import SubscriptionContext, { ActionContext } from '../context/SubscriptionContext'
import { BREADCRUMBS } from '../utils'
import commonMessages from '@src/messages'
import messages from '../messages'

export default function SubscriptionEdit() {
  const { id } = useParams()
  const { formatMessage } = useIntl()
  const { onGetSubscription, onUpdateSubscription, onResetSubscription } = useContext(ActionContext)
  const { currentSubscription = {} } = useContext(SubscriptionContext)
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    onGetSubscription(id!)
    return () => onResetSubscription()
  }, [id, onGetSubscription, onResetSubscription])

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
      <SubscriptionForm onSubmit={onUpdateSubscription} currentSubscription={currentSubscription} formRef={formRef} />
    </>
  )
}
