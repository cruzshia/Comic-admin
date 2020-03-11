import React from 'react'
import { useIntl } from 'react-intl'
import Button from '@src/components/Button/Button'
import { ButtonTheme } from '@src/components/Button/buttonTheme'
import { ReactComponent as IconSave } from '@src/assets/form/button_save.svg'
import { ReactComponent as IconEdit } from '@src/assets/form/button_edit.svg'
import ContentHeader from '@src/components/ContentHeader/ContentHeader'
import { WORKS_BREADCRUMBS } from '../constants'
import messages from '../messages'

export default function WorkList() {
  const { formatMessage } = useIntl()
  const titleText = formatMessage(messages.comicsWork)
  const breadcrumbList: { title: string; route?: string }[] = WORKS_BREADCRUMBS.map(({ title }) => ({
    title: formatMessage(title)
  }))
  const buttonList = [
    <Button
      theme={ButtonTheme.DARK_BORDER}
      buttonText={formatMessage(messages.listButtonCreation)}
      onClick={() => {}}
      icon={IconSave}
    />,
    <Button
      theme={ButtonTheme.DARK_BORDER}
      buttonText={formatMessage(messages.listButtonCSVCreation)}
      onClick={() => {}}
      icon={IconEdit}
    />
  ]

  return (
    <>
      <ContentHeader breadcrumbList={breadcrumbList} titleText={titleText} buttonList={buttonList} />
      WorkList Page
    </>
  )
}
