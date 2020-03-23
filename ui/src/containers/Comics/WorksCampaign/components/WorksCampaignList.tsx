import React, { useMemo } from 'react'
import { useIntl } from 'react-intl'
import { useHistory } from 'react-router-dom'
import { routePath } from '@src/common/appConfig'
import ContentHeader, { Breadcrumb } from '@src/components/ContentHeader/ContentHeader'
import Button, { Theme } from '@src/components/Button/Button'
import { ReactComponent as penIcon } from '@src/assets/common/pen.svg'
import messages from '../messages'
import { WORKS_CAMPAIGN_BREADCRUMBS } from '../constants'

export default function WorksCampaignList() {
  const { formatMessage } = useIntl()
  const history = useHistory()

  const breadcrumbList: Breadcrumb[] = useMemo(
    () => WORKS_CAMPAIGN_BREADCRUMBS.map(({ title }) => ({ title: formatMessage(title) })),
    [formatMessage]
  )
  const buttonList = useMemo(
    () => [
      <Button
        theme={Theme.DARK_BORDER}
        buttonText={formatMessage(messages.worksCampaignCreation)}
        onClick={() => history.push(routePath.comics.worksCampaignCreation)}
        icon={penIcon}
      />
    ],
    [history, formatMessage]
  )

  return (
    <>
      <ContentHeader
        breadcrumbList={breadcrumbList}
        titleText={formatMessage(messages.comicsWorksCampaign)}
        buttonList={buttonList}
      />
    </>
  )
}
