import React, { useCallback, useMemo } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useIntl } from 'react-intl'
import { routePath } from '@src/common/appConfig'
import ContentHeader, { Breadcrumb } from '@src/components/ContentHeader/ContentHeader'
import Button, { Theme } from '@src/components/Button/Button'
import { ReactComponent as penIcon } from '@src/assets/common/pen.svg'
import messages from '../messages'
import { WORKS_CAMPAIGN_BREADCRUMBS } from '../constants'

export default function WorksCampaignDetail() {
  const { formatMessage } = useIntl()
  const history = useHistory()
  const { id } = useParams()
  const titleText = formatMessage(messages.worksCampaignDetail)

  const handleRedirect = useCallback(() => history.push(routePath.comics.worksCampaignEdit.replace(':id', id!)), [
    history,
    id
  ])

  const breadcrumbList: Breadcrumb[] = useMemo(
    () =>
      WORKS_CAMPAIGN_BREADCRUMBS.map(({ title, route }) => ({
        title: formatMessage(title),
        route
      })).concat([{ title: titleText, route: undefined }]),
    [formatMessage, titleText]
  )

  const buttonList = useMemo(
    () => [
      <Button
        theme={Theme.DARK_BORDER}
        buttonText={formatMessage(messages.worksCampaignEdit)}
        onClick={handleRedirect}
        icon={penIcon}
      />
    ],
    [formatMessage, handleRedirect]
  )

  return (
    <>
      <ContentHeader breadcrumbList={breadcrumbList} titleText={titleText} buttonList={buttonList} />
    </>
  )
}
