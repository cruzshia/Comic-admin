import React, { useRef, useCallback, useMemo, useContext } from 'react'
import { useIntl } from 'react-intl'
import { Subscription } from 'rxjs'
import Button, { Theme } from '@src/components/Button/Button'
import ContentHeader, { Breadcrumb } from '@src/components/ContentHeader/ContentHeader'
import { submitForm } from '@src/utils/validation'
import StickyHeader from '@src/components/StickyBar/StickyHeader'
import { WorkActionType } from '@src/reducers/comics/work/workActions'
import { ErrorKey } from '@src/epics/utils'
import { successSubject, errorSubject } from '@src/utils/responseSubject'
import WorkForm from './WorkForm'
import { BREADCRUMBS } from '../utils'
import { ActionContext } from '../context/WorkContext'
import commonMessages from '@src/messages'
import messages from '../messages'

export default function WorkCreation() {
  const { onCreateWork } = useContext(ActionContext)
  const { formatMessage } = useIntl()
  const formRef = useRef<HTMLFormElement>(null)

  const handleSubmitCreate = useCallback(
    data => {
      const subs: Subscription[] = []
      const unsubscribeAll = () => subs.forEach(sub => sub.unsubscribe())
      const resPromise = new Promise(resolve => {
        subs.push(
          successSubject.subscribe([WorkActionType.CREATE_SUCCESS], () => {
            unsubscribeAll()
            resolve()
          })
        )
        subs.push(
          errorSubject.subscribe([WorkActionType.CREATE_ERROR], ({ error }) => {
            unsubscribeAll()
            resolve(error?.[ErrorKey.FieldError])
          })
        )
      })
      onCreateWork(data)
      return resPromise
    },
    [onCreateWork]
  )

  const handleClickSubmit = useCallback(() => submitForm(formRef), [formRef])
  const titleText = formatMessage(messages.createWork)
  const breadcrumbList: Breadcrumb[] = useMemo(
    () =>
      BREADCRUMBS.map(({ title, route }) => ({
        title: formatMessage(title),
        route
      })).concat({ title: titleText, route: undefined }),
    [formatMessage, titleText]
  )

  const CreateButton = useMemo(
    () => <Button buttonText={formatMessage(commonMessages.create)} theme={Theme.DARK} onClick={handleClickSubmit} />,
    [formatMessage, handleClickSubmit]
  )
  const buttonList = useMemo(() => [CreateButton], [CreateButton])

  return (
    <>
      <StickyHeader title={formatMessage(messages.createWork)} button={CreateButton} />
      <ContentHeader breadcrumbList={breadcrumbList} titleText={titleText} buttonList={buttonList} />
      <WorkForm onSubmit={handleSubmitCreate} formRef={formRef} withStickHeader />
    </>
  )
}
