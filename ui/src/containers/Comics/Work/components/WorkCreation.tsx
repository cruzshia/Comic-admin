import React, { useRef, useCallback, useMemo, useContext, useEffect } from 'react'
import { useIntl } from 'react-intl'
import Button, { Theme } from '@src/components/Button/Button'
import ContentHeader, { Breadcrumb } from '@src/components/ContentHeader/ContentHeader'
import { submitForm } from '@src/utils/validation'
import StickyHeader from '@src/components/StickyBar/StickyHeader'
import { WorkActionType } from '@src/reducers/comics/work/workActions'
import { successSubject } from '@src/utils/responseSubject'
import WorkForm from './WorkForm'
import Logger from '@src/utils/logger'
import { BREADCRUMBS } from '../utils'
import { ActionContext } from '../context/WorkContext'
import commonMessages from '@src/messages'
import messages from '../messages'

export default function WorkCreation() {
  const { onCreateWork } = useContext(ActionContext)
  const { formatMessage } = useIntl()
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    const sub = successSubject.subscribe([WorkActionType.CREATE_SUCCESS], (data: any) => {
      Logger.info('create work success')
    })
    return () => sub.unsubscribe()
  }, [])

  const handleClickSubmit = useCallback(() => submitForm(formRef), [formRef])
  const handleSubmitCreate = useCallback(data => onCreateWork(data), [onCreateWork])
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
