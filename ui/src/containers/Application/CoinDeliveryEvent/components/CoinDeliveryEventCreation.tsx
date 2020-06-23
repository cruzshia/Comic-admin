import React, { useMemo, useRef, useContext } from 'react'
import { useIntl } from 'react-intl'
import Button, { Theme } from '@src/components/Button/Button'
import ContentHeader from '@src/components/ContentHeader'
import StickyHeader from '@src/components/StickyBar/StickyHeader'
import { submitForm } from '@src/utils/validation'
import { BREADCRUMBS } from '../utils'
import CoinDeliveryEventForm from './CoinDeliveryEventForm'
import commonMessages from '@src/messages'
import messages from '../messages'
import { ActionContext } from '../context/CoinDeliveryEventContext'

export default function CoinDeliveryEventCreation() {
  const { formatMessage } = useIntl()
  const formRef = useRef<HTMLFormElement>(null)
  const { onCreateCoinDeliveryEvent } = useContext(ActionContext)

  const titleText = formatMessage(messages.creation)
  const breadcrumbList = useMemo(
    () =>
      BREADCRUMBS.map(({ title, route }) => ({ title: formatMessage(title), route })).concat([
        {
          title: titleText,
          route: undefined
        }
      ]),
    [formatMessage, titleText]
  )

  const buttonList = useMemo(
    () => [
      <Button
        theme={Theme.DARK}
        buttonText={formatMessage(commonMessages.create)}
        onClick={() => submitForm(formRef)}
      />
    ],
    [formatMessage, formRef]
  )

  return (
    <>
      <StickyHeader title={titleText} button={buttonList} />
      <ContentHeader breadcrumbList={breadcrumbList} titleText={titleText} buttonList={buttonList} />
      <CoinDeliveryEventForm onSubmit={onCreateCoinDeliveryEvent} formRef={formRef} />
    </>
  )
}
