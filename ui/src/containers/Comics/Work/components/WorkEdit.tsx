import React, { useRef, useMemo, useCallback, useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useIntl } from 'react-intl'
import ContentHeader, { Breadcrumb } from '@src/components/ContentHeader/ContentHeader'
import Button from '@src/components/Button/Button'
import { ButtonTheme } from '@src/components/Button/buttonTheme'
import commonMessages from '@src/messages'
import { submitForm } from '@src/utils/validation'
import StickyHeader from './StickyHeader'
import WorkForm from './WorkForm'
import { BREADCRUMBS } from '../constants'
import messages from '../messages'
import WorkContext, { ActionContext } from '../context/WorkContext'

export default function WorkEdit() {
  const { currentWork = {} } = useContext(WorkContext)
  const { onGetWork, onUpdateWork, onResetWork } = useContext(ActionContext)
  const { id } = useParams()
  const formRef = useRef<HTMLFormElement>(null)
  const { formatMessage } = useIntl()

  useEffect(() => {
    onGetWork(id!)
    return () => onResetWork()
  }, [onGetWork, id, onResetWork])

  const handleClickSubmit = useCallback(() => submitForm(formRef), [formRef])
  const handleSubmitUpdate = useCallback(data => onUpdateWork(data), [onUpdateWork])

  const title = formatMessage(messages.edit)
  const breadcrumbList: Breadcrumb[] = useMemo(
    () =>
      BREADCRUMBS.map(({ title, route }) => ({
        title: formatMessage(title),
        route
      })).concat({ title, route: undefined }),
    [formatMessage, title]
  )

  const UpdateButton = useMemo(
    () => (
      <Button theme={ButtonTheme.DARK} buttonText={formatMessage(commonMessages.create)} onClick={handleClickSubmit} />
    ),
    [formatMessage, handleClickSubmit]
  )
  const buttonList = useMemo(() => [UpdateButton], [UpdateButton])

  return currentWork.id ? (
    <>
      <ContentHeader breadcrumbList={breadcrumbList} titleText={title} buttonList={buttonList} />
      <StickyHeader title={formatMessage(messages.createWork)} button={UpdateButton} />
      <WorkForm workData={currentWork} onSubmit={handleSubmitUpdate} formRef={formRef} withStickHeader />
    </>
  ) : null
}
