import React, { useContext, useMemo, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { useIntl } from 'react-intl'
import { submitForm } from '@src/utils/validation'
import ContentHeader from '@src/components/ContentHeader/ContentHeader'
import Button, { Theme } from '@src/components/Button/Button'
import commonMessages from '@src/messages'
import SubscriptionProductContext, { ActionContext } from '../context/SubscriptionProductContext'
import SubscriptionProductForm from './SubscriptionProductForm'
import messages from '../messages'
import { BREADCRUMBS } from '../utils'

export default function SubscriptionProductEdit() {
  const { onGetSubscriptionProduct, onResetSubscriptionProduct, onUpdateSubscriptionProduct } = useContext(
    ActionContext
  )
  const { currentSubscriptionProduct = {} } = useContext(SubscriptionProductContext)
  const formRef = useRef<HTMLFormElement>(null)
  const { subscriptionId, id } = useParams()
  const { formatMessage } = useIntl()
  const titleText = formatMessage(messages.edit)

  useEffect(() => {
    onGetSubscriptionProduct(id!)
    return () => onResetSubscriptionProduct()
  }, [onGetSubscriptionProduct, onResetSubscriptionProduct, id])

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
      <ContentHeader breadcrumbList={breadcrumbList} titleText={titleText} buttonList={buttonList} />
      <SubscriptionProductForm
        onSubmit={onUpdateSubscriptionProduct}
        currentSubscriptionProduct={currentSubscriptionProduct}
        formRef={formRef}
      />
    </>
  )
}
