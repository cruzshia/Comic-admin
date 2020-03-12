import React, { useMemo } from 'react'
import { useIntl } from 'react-intl'
import { useHistory } from 'react-router-dom'
import Button from '@src/components/Button/Button'
import { ButtonTheme } from '@src/components/Button/buttonTheme'
import { ReactComponent as IconSave } from '@src/assets/form/button_save.svg'
import { ReactComponent as IconEdit } from '@src/assets/form/button_edit.svg'
import ContentHeader, { Breadcrumb } from '@src/components/ContentHeader/ContentHeader'
import { routePath } from '@src/common/appConfig'
import { WORKS_BREADCRUMBS } from '../constants'
import commonMessages from '@src/messages'
import messages from '../messages'

export default function WorkList() {
  const { formatMessage } = useIntl()
  const titleText = formatMessage(messages.comicsWork)
  const history = useHistory()
  const breadcrumbList: Breadcrumb[] = WORKS_BREADCRUMBS.reduce(
    (acc, current) => [{ title: formatMessage(current.title) }].concat(acc),
    [] as Breadcrumb[]
  )
  const buttonList = useMemo(
    () => [
      <Button
        theme={ButtonTheme.DARK_BORDER}
        buttonText={formatMessage(messages.startCreate)}
        onClick={() => history.push(routePath.comics.workCreation)}
        icon={IconSave}
      />,
      <Button
        theme={ButtonTheme.DARK_BORDER}
        buttonText={formatMessage(commonMessages.csvImport)}
        onClick={() => {}}
        icon={IconEdit}
      />
    ],
    [formatMessage, history]
  )

  return (
    <>
      <ContentHeader breadcrumbList={breadcrumbList} titleText={titleText} buttonList={buttonList} />
      WorkList Page
    </>
  )
}
