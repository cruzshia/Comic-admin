import React, { useRef, useMemo, useCallback } from 'react'
import { useIntl } from 'react-intl'
import ContentHeader, { Breadcrumb } from '@src/components/ContentHeader/ContentHeader'
import Button from '@src/components/Button/Button'
import { ButtonTheme } from '@src/components/Button/buttonTheme'
import StickyHeader from './StickyHeader'
import WorkForm from './WorkForm'
import { mockWork } from '../mockData/mockWork'
import { BREADCRUMBS } from '../constants'
import messages from '../messages'
import commonMessages from '@src/messages'

export default function WorkEdit() {
  const formRef = useRef<HTMLFormElement>(null)
  const { formatMessage } = useIntl()
  const handleClickSubmit = useCallback(() => {
    formRef.current?.dispatchEvent(new Event('submit', { cancelable: true }))
  }, [formRef])
  const handleSubmitUpdate = useCallback(data => console.log(data), [])

  const titleText = mockWork.title
  const breadcrumbList: Breadcrumb[] = useMemo(
    () =>
      BREADCRUMBS.map(({ title, route }) => ({
        title: formatMessage(title),
        route
      })).concat({ title: formatMessage(messages.createWork), route: undefined }),
    [formatMessage]
  )

  const CreateButton = useMemo(
    () => (
      <Button theme={ButtonTheme.DARK} buttonText={formatMessage(commonMessages.create)} onClick={handleClickSubmit} />
    ),
    [formatMessage, handleClickSubmit]
  )
  const buttonList = useMemo(() => [CreateButton], [CreateButton])

  return (
    <>
      <ContentHeader breadcrumbList={breadcrumbList} titleText={titleText} buttonList={buttonList} />
      <StickyHeader title={formatMessage(messages.createWork)} button={CreateButton} />
      <WorkForm workData={mockWork} onSubmit={handleSubmitUpdate} formRef={formRef} />
    </>
  )
}
