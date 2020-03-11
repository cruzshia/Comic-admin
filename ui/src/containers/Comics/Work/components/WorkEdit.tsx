import React from 'react'
import { useIntl } from 'react-intl'
import ContentHeader from '@src/components/ContentHeader/ContentHeader'
import Button from '@src/components/Button/Button'
import { ButtonTheme } from '@src/components/Button/buttonTheme'
import { mockWork } from '../mockData/mockWork'
import WorkForm from './WorkForm'
import { WORKS_BREADCRUMBS } from '../constants'
import messages from '../messages'

export default function WorkEdit() {
  const { formatMessage } = useIntl()
  const titleText = mockWork.title
  const breadcrumbList: { title: string; route?: string }[] = WORKS_BREADCRUMBS.map(({ title, route }) => ({
    title: formatMessage(title),
    route
  }))
  breadcrumbList.push({ title: formatMessage(messages.creation) })
  const editButtonList = [
    <Button theme={ButtonTheme.DARK} buttonText={formatMessage(messages.creationButton)} onClick={() => {}} />
  ]
  return (
    <>
      <ContentHeader breadcrumbList={breadcrumbList} titleText={titleText} buttonList={editButtonList} />
      <WorkForm workData={mockWork} />
    </>
  )
}
