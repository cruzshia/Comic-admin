import React from 'react'
import { useIntl } from 'react-intl'
import WorkForm from './WorkForm'
import ContentHeader from '@src/components/ContentHeader/ContentHeader'
import Button from '@src/components/Button/Button'
import { ButtonTheme } from '@src/components/Button/buttonTheme'
import { WORKS_BREADCRUMBS } from '../constants'
import messages from '../messages'

export default function WorkCreation() {
  const { formatMessage } = useIntl()
  const titleText = formatMessage(messages.creation)
  const breadcrumbList: { title: string; route?: string }[] = WORKS_BREADCRUMBS.map(({ title, route }) => ({
    title: formatMessage(title),
    route
  }))
  breadcrumbList.push({ title: titleText })

  const creationButtonList = [
    <Button theme={ButtonTheme.DARK} buttonText={formatMessage(messages.creationButton)} onClick={() => {}} />
  ]
  return (
    <>
      <ContentHeader breadcrumbList={breadcrumbList} titleText={titleText} buttonList={creationButtonList} />
      <WorkForm />
    </>
  )
}
