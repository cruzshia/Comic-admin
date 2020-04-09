import React, { useMemo, useCallback } from 'react'
import { useIntl } from 'react-intl'
import { useHistory } from 'react-router-dom'
import ContentHeader from '@src/components/ContentHeader'
import Button, { Theme } from '@src/components/Button/Button'
import { ReactComponent as IconEdit } from '@src/assets/form/button_edit.svg'
import { routePath } from '@src/common/appConfig'
import SearchBlock from './SearchBlock'
import { BREADCRUMBS } from '../constants'
import messages from '../messages'

export default function ContentCampaignList() {
  const { formatMessage } = useIntl()
  const history = useHistory()
  const breadcrumbList = useMemo(
    () =>
      BREADCRUMBS.map(({ title }) => ({
        title: formatMessage(title)
      })),
    [formatMessage]
  )
  const buttonList = useMemo(
    () => [
      <Button
        icon={IconEdit}
        theme={Theme.DARK_BORDER}
        buttonText={formatMessage(messages.startCreate)}
        onClick={() => history.push(routePath.comics.contentsCampaignCreation)}
      />
    ],
    [formatMessage, history]
  )

  const handleSearch = useCallback(() => {}, [])
  return (
    <>
      <ContentHeader
        breadcrumbList={breadcrumbList}
        titleText={formatMessage(messages.management)}
        buttonList={buttonList}
      />
      <SearchBlock onSubmit={handleSearch} />
    </>
  )
}
