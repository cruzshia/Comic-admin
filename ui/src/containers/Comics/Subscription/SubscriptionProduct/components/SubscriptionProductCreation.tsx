import React, { useMemo, useContext, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { useIntl } from 'react-intl'
import ContentHeader from '@src/components/ContentHeader'
import Button, { Theme } from '@src/components/Button/Button'
import commonMessages from '@src/messages'
import { submitForm } from '@src/utils/validation'
import messages from '../messages'
import { BREADCRUMBS } from '../utils'
import SubscriptionProductForm from './SubscriptionProductForm'
import { ActionContext } from '../context/SubscriptionProductContext'

export default function SubscriptionProductCreation() {
  const { onCreateSubscriptionProduct } = useContext(ActionContext)
  const { formatMessage } = useIntl()
  const { subscriptionId } = useParams()
  const titleText = formatMessage(messages.creation)
  const formRef = useRef<HTMLFormElement>(null)

  const breadcrumbList = useMemo(
    () =>
      BREADCRUMBS.map(({ title, route }) => ({
        title: formatMessage(title),
        route: route?.replace(':id', subscriptionId!)
      })).concat([{ title: titleText, route: undefined }]),
    [formatMessage, titleText, subscriptionId]
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
      <ContentHeader
        breadcrumbList={breadcrumbList}
        titleText={formatMessage(messages.creation)}
        buttonList={buttonList}
      />
      <SubscriptionProductForm onSubmit={onCreateSubscriptionProduct} formRef={formRef} />
    </>
  )
}
