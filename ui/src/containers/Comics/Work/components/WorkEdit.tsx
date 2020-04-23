import React, { useRef, useMemo, useCallback, useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useIntl } from 'react-intl'
import ContentHeader, { Breadcrumb } from '@src/components/ContentHeader/ContentHeader'
import Button from '@src/components/Button/Button'
import { ButtonTheme } from '@src/components/Button/buttonTheme'
import commonMessages from '@src/messages'
import StickyHeader from './StickyHeader'
import WorkForm from './WorkForm'
import { BREADCRUMBS } from '../constants'
import messages from '../messages'
import WorkContext, { ActionContext } from '../context/WorkContext'

export default function WorkEdit() {
  const { currentWork } = useContext(WorkContext)
  const { onGetWork, onUpdateWork } = useContext(ActionContext)
  const { id } = useParams()
  const formRef = useRef<HTMLFormElement>(null)
  const { formatMessage } = useIntl()

  useEffect(() => {
    onGetWork(id!)
  }, [onGetWork, id])

  const handleClickSubmit = useCallback(() => {
    formRef.current?.dispatchEvent(new Event('submit', { cancelable: true }))
  }, [formRef])
  const handleSubmitUpdate = useCallback(data => onUpdateWork(data), [onUpdateWork])

  const breadcrumbList: Breadcrumb[] = useMemo(
    () =>
      BREADCRUMBS.map(({ title, route }) => ({
        title: formatMessage(title),
        route
      })).concat({ title: formatMessage(messages.createWork), route: undefined }),
    [formatMessage]
  )

  const UpdateButton = useMemo(
    () => (
      <Button theme={ButtonTheme.DARK} buttonText={formatMessage(commonMessages.create)} onClick={handleClickSubmit} />
    ),
    [formatMessage, handleClickSubmit]
  )
  const buttonList = useMemo(() => [UpdateButton], [UpdateButton])

  return (
    <>
      <ContentHeader breadcrumbList={breadcrumbList} titleText={currentWork?.title} buttonList={buttonList} />
      <StickyHeader title={formatMessage(messages.createWork)} button={UpdateButton} />
      <WorkForm workData={currentWork} onSubmit={handleSubmitUpdate} formRef={formRef} withStickHeader />
    </>
  )
}
