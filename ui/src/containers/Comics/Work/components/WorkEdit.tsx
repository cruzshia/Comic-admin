import React, { useMemo } from 'react'
import { useIntl } from 'react-intl'
import ContentHeader from '@src/components/ContentHeader/ContentHeader'
import Button from '@src/components/Button/Button'
import { ButtonTheme } from '@src/components/Button/buttonTheme'
import StickyHeader from './StickyHeader'
import WorkForm from './WorkForm'
import { mockWork } from '../mockData/mockWork'
import { WORKS_BREADCRUMBS } from '../constants'
import messages from '../messages'
import commonMessages from '@src/messages'

export default function WorkEdit() {
  const { formatMessage } = useIntl()
  const titleText = mockWork.title
  const breadcrumbList: { title: string; route?: string }[] = WORKS_BREADCRUMBS.map(({ title, route }) => ({
    title: formatMessage(title),
    route
  }))
  breadcrumbList.push({ title: formatMessage(messages.createWork) })
  const CreateButton = useMemo(
    () => <Button theme={ButtonTheme.DARK} buttonText={formatMessage(commonMessages.create)} onClick={() => {}} />,
    [formatMessage]
  )
  return (
    <>
      <ContentHeader breadcrumbList={breadcrumbList} titleText={titleText} buttonList={[CreateButton]} />
      <StickyHeader title={formatMessage(messages.createWork)} button={CreateButton} />
      <WorkForm workData={mockWork} />
    </>
  )
}
