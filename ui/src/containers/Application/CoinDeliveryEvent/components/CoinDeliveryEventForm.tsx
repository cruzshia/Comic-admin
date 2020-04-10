import React, { useMemo } from 'react'
import { useIntl } from 'react-intl'
import Button, { Theme } from '@src/components/Button/Button'
import commonMessages from '@src/messages'
import ContentHeader from '@src/components/ContentHeader'
import { BREADCRUMBS } from '../constants'
import messages from '../messages'

export default function CoinDeliveryEventForm() {
  const { formatMessage } = useIntl()

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
    () => [<Button theme={Theme.DARK} buttonText={formatMessage(commonMessages.create)} onClick={() => {}} />],
    [formatMessage]
  )

  return (
    <>
      <ContentHeader
        breadcrumbList={breadcrumbList}
        titleText={formatMessage(messages.creation)}
        buttonList={buttonList}
      />
    </>
  )
}
