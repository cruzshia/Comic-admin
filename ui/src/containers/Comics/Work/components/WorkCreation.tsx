import React, { useRef, useCallback, useMemo, useContext } from 'react'
import { useIntl } from 'react-intl'
import Button, { Theme } from '@src/components/Button/Button'
import ContentHeader, { Breadcrumb } from '@src/components/ContentHeader/ContentHeader'
import { submitForm } from '@src/utils/validation'
import StickyHeader from './StickyHeader'
import WorkForm from './WorkForm'
import { BREADCRUMBS } from '../constants'
import { ActionContext } from '../context/WorkContext'
import commonMessages from '@src/messages'
import messages from '../messages'

export default function WorkCreation() {
  const { onCreateWork } = useContext(ActionContext)
  const { formatMessage } = useIntl()
  const formRef = useRef<HTMLFormElement>(null)
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
