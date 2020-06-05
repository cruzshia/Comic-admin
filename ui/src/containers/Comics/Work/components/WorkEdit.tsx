import React, { useRef, useMemo, useCallback, useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useIntl } from 'react-intl'
import { Subscription } from 'rxjs'
import ContentHeader, { Breadcrumb } from '@src/components/ContentHeader/ContentHeader'
import Button from '@src/components/Button/Button'
import { ButtonTheme } from '@src/components/Button/buttonTheme'
import { successSubject, errorSubject } from '@src/utils/responseSubject'
import { WorkActionType } from '@src/reducers/comics/work/workActions'
import { submitForm } from '@src/utils/validation'
import StickyHeader from '@src/components/StickyBar/StickyHeader'
import { ErrorKey } from '@src/epics/utils'
import WorkForm from './WorkForm'
import { BREADCRUMBS } from '../utils'
import commonMessages from '@src/messages'
import messages from '../messages'
import WorkContext, { ActionContext } from '../context/WorkContext'

export default function WorkEdit() {
  const { currentWork } = useContext(WorkContext)
  const { onGetWork, onUpdateWork, onResetWork } = useContext(ActionContext)
  const { id } = useParams()
  const formRef = useRef<HTMLFormElement>(null)
  const { formatMessage } = useIntl()

  useEffect(() => {
    onGetWork(id!)
    return () => onResetWork()
  }, [onGetWork, id, onResetWork])

  const handleClickSubmit = useCallback(() => submitForm(formRef), [formRef])
  const handleSubmitUpdate = useCallback(
    data => {
      const subs: Subscription[] = []
      const unsubscribeAll = () => subs.forEach(sub => sub.unsubscribe())
      const resPromise = new Promise(resolve => {
        subs.push(
          successSubject.subscribe([WorkActionType.UPDATE_SUCCESS], () => {
            unsubscribeAll()
            resolve()
          })
        )
        subs.push(
          errorSubject.subscribe([WorkActionType.UPDATE_ERROR], ({ error }) => {
            unsubscribeAll()
            resolve(error?.[ErrorKey.FieldError])
          })
        )
      })
      onUpdateWork(data)
      return resPromise
    },
    [onUpdateWork]
  )

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

  return currentWork?.id ? (
    <>
      <ContentHeader breadcrumbList={breadcrumbList} titleText={title} buttonList={buttonList} />
      <StickyHeader title={formatMessage(messages.createWork)} button={UpdateButton} />
      <WorkForm workData={currentWork} onSubmit={handleSubmitUpdate} formRef={formRef} withStickHeader />
    </>
  ) : null
}
