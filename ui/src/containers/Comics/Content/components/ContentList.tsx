import React, { useMemo, useCallback } from 'react'
import { useIntl } from 'react-intl'
import { useHistory } from 'react-router-dom'
import ContentHeader from '@src/components/ContentHeader'
import Button, { Theme } from '@src/components/Button/Button'
import { ReactComponent as IconEdit } from '@src/assets/form/button_edit.svg'
import { ReactComponent as IconSave } from '@src/assets/form/button_save.svg'
import { routePath } from '@src/common/appConfig'
import commonMessages from '@src/messages'
import { CONTENT_BREADCRUMBS } from '../constants'
import messages from '../messages'
import SearchBlock from './SearchBlock'

export default function ContentList() {
  const history = useHistory()
  const { formatMessage } = useIntl()

  const handleSearch = useCallback(() => {}, [])
  const breadcrumbList = useMemo(() => CONTENT_BREADCRUMBS.map(({ title }) => ({ title: formatMessage(title) })), [
    formatMessage
  ])
  const buttonList = useMemo(
    () => [
      <Button
        theme={Theme.DARK_BORDER}
        icon={IconEdit}
        buttonText={formatMessage(messages.startCreate)}
        onClick={() => {
          history.push(routePath.comics.contentCreation)
        }}
      />,
      <Button
        theme={Theme.DARK_BORDER}
        icon={IconSave}
        buttonText={formatMessage(commonMessages.csvImport)}
        onClick={() => {}}
      />
    ],
    [formatMessage, history]
  )

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
