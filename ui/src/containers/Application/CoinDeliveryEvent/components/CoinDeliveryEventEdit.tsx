import React, { useRef, useContext, useMemo, useEffect } from 'react'
import { useIntl } from 'react-intl'
import { useParams } from 'react-router-dom'
import Button, { Theme } from '@src/components/Button/Button'
import ContentHeader from '@src/components/ContentHeader'
import { submitForm } from '@src/utils/validation'
import { BREADCRUMBS } from '../constants'
import CoinDeliveryEventForm from './CoinDeliveryEventForm'
import CoinEventContext, { ActionContext } from '../context/CoinDeliveryEventContext'
import commonMessages from '@src/messages'
import messages from '../messages'

export default function CoinDeliveryEventEdit() {
  const { formatMessage } = useIntl()
  const { id } = useParams()
  const { currentEvent = {} } = useContext(CoinEventContext)
  const { onUpdateCoinDeliveryEvent, onGetCoinDeliveryEvent, onResetCoinDeliveryEvent } = useContext(ActionContext)
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    onGetCoinDeliveryEvent(id!)
    return () => onResetCoinDeliveryEvent()
  }, [onGetCoinDeliveryEvent, id, onResetCoinDeliveryEvent])

  const breadcrumbList = useMemo(
    () =>
      BREADCRUMBS.map(({ title, route }) => ({ title: formatMessage(title), route })).concat([
        {
          title: formatMessage(messages.creation),
          route: undefined
        }
      ]),
    [formatMessage]
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

  if (!currentEvent.id) return null

  return (
    <>
      <ContentHeader
        breadcrumbList={breadcrumbList}
        titleText={formatMessage(messages.creation)}
        buttonList={buttonList}
      />
      <CoinDeliveryEventForm onSubmit={onUpdateCoinDeliveryEvent} coinDeliveryEvent={currentEvent} formRef={formRef} />
    </>
  )
}
