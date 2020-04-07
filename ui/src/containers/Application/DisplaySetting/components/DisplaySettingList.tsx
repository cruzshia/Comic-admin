import React, { useMemo } from 'react'
import { useHistory } from 'react-router-dom'
import { useIntl } from 'react-intl'
import Button, { Theme } from '@src/components/Button/Button'
import { routePath } from '@src/common/appConfig'
import ContentHeader from '@src/components/ContentHeader'
import { BREADCRUMBS } from '../constants'
import messages from '../messages'
import { ReactComponent as EditIcon } from '@src/assets/common/pen.svg'

export default function DisplaySettingList() {
  const history = useHistory()
  const { formatMessage } = useIntl()

  const breadcrumbList = useMemo(() => BREADCRUMBS.map(({ title }) => ({ title: formatMessage(title) })), [
    formatMessage
  ])
  const buttonList = useMemo(
    () => [
      <Button
        theme={Theme.DARK_BORDER}
        icon={EditIcon}
        buttonText={formatMessage(messages.create)}
        onClick={() => {
          history.push(routePath.application.displaySettingCreation)
        }}
      />
    ],
    [formatMessage, history]
  )

  return (
    <>
      <ContentHeader breadcrumbList={breadcrumbList} titleText={formatMessage(messages.list)} buttonList={buttonList} />
    </>
  )
}