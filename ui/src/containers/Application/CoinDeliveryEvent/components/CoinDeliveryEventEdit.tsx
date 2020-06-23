import React, { useRef, useContext, useMemo, useEffect } from 'react'
import { useIntl } from 'react-intl'
import { useParams } from 'react-router-dom'
import Button, { Theme } from '@src/components/Button/Button'
import ContentHeader from '@src/components/ContentHeader'
import { submitForm } from '@src/utils/validation'
import StickyHeader from '@src/components/StickyBar/StickyHeader'
import { BREADCRUMBS } from '../utils'
import CoinDeliveryEventForm from './CoinDeliveryEventForm'
import CoinEventContext, { ActionContext } from '../context/CoinDeliveryEventContext'
import commonMessages from '@src/messages'
import messages from '../messages'

export default function CoinDeliveryEventEdit() {
  const { formatMessage } = useIntl()
  const { id } = useParams()
  const { currentEvent } = useContext(CoinEventContext)
  const { onUpdateCoinDeliveryEvent, onGetCoinDeliveryEvent, onResetCoinDeliveryEvent } = useContext(ActionContext)
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    onGetCoinDeliveryEvent(id!)
    return () => onResetCoinDeliveryEvent()
  }, [onGetCoinDeliveryEvent, id, onResetCoinDeliveryEvent])

  const titleText = formatMessage(messages.edit)
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

  return !currentEvent ? null : (
    <>
      <StickyHeader title={titleText} button={buttonList} />
      <ContentHeader breadcrumbList={breadcrumbList} titleText={titleText} buttonList={buttonList} />
      <CoinDeliveryEventForm onSubmit={onUpdateCoinDeliveryEvent} coinDeliveryEvent={currentEvent} formRef={formRef} />
    </>
  )
}
