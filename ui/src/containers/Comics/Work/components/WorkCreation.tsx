import React, { useMemo } from 'react'
import { useIntl } from 'react-intl'
import Button, { Theme } from '@src/components/Button/Button'
import ContentHeader from '@src/components/ContentHeader/ContentHeader'
import StickyHeader from './StickyHeader'
import WorkForm from './WorkForm'
import { WORKS_BREADCRUMBS } from '../constants'
import commonMessages from '@src/messages'
import messages from '../messages'

export default function WorkCreation() {
  const { formatMessage } = useIntl()
  const titleText = formatMessage(messages.createWork)
  const breadcrumbList: { title: string; route?: string }[] = WORKS_BREADCRUMBS.map(({ title, route }) => ({
    title: formatMessage(title),
    route
  }))
  breadcrumbList.push({ title: titleText })
  const CreateButton = useMemo(() => <Button buttonText={formatMessage(commonMessages.create)} theme={Theme.DARK} />, [
    formatMessage
  ])

  return (
    <>
      <StickyHeader title={formatMessage(messages.createWork)} button={CreateButton} />
      <ContentHeader breadcrumbList={breadcrumbList} titleText={titleText} buttonList={[CreateButton]} />
      <WorkForm />
    </>
  )
}
