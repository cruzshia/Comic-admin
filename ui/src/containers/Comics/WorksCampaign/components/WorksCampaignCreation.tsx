import React, { useMemo } from 'react'
import { useIntl } from 'react-intl'
import ContentHeader, { Breadcrumb } from '@src/components/ContentHeader/ContentHeader'
import Button, { Theme } from '@src/components/Button/Button'
import commonMessages from '@src/messages'
import messages from '../messages'
import { WORKS_CAMPAIGN_BREADCRUMBS } from '../constants'

export default function WorksCampaignCreation() {
  const { formatMessage } = useIntl()
  const titleText = formatMessage(messages.worksCampaignCreation)
  const breadcrumbList: Breadcrumb[] = useMemo(
    () =>
      WORKS_CAMPAIGN_BREADCRUMBS.map(({ title, route }) => ({
        title: formatMessage(title),
        route
      })).concat([{ title: titleText, route: undefined }]),
    [formatMessage, titleText]
  )
  const buttonList = useMemo(
    () => [<Button theme={Theme.DARK} buttonText={formatMessage(commonMessages.create)} onClick={() => {}} />],
    [formatMessage]
  )

  return (
    <>
      <ContentHeader breadcrumbList={breadcrumbList} titleText={titleText} buttonList={buttonList} />
    </>
  )
}
