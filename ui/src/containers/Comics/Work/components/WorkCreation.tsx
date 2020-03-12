import React, { useRef, useCallback, useMemo } from 'react'
import { useIntl } from 'react-intl'
import Button, { Theme } from '@src/components/Button/Button'
import ContentHeader, { Breadcrumb } from '@src/components/ContentHeader/ContentHeader'
import StickyHeader from './StickyHeader'
import WorkForm from './WorkForm'
import { WORKS_BREADCRUMBS } from '../constants'
import commonMessages from '@src/messages'
import messages from '../messages'

export default function WorkCreation() {
  const { formatMessage } = useIntl()
  const formRef = useRef<HTMLFormElement>(null)
  const handleClickSubmit = useCallback(() => {
    formRef.current?.dispatchEvent(new Event('submit', { cancelable: true }))
  }, [formRef])
  const handleSubmitCreate = useCallback(data => console.log(data), [])

  const titleText = formatMessage(messages.createWork)
  const breadcrumbList: Breadcrumb[] = WORKS_BREADCRUMBS.reduce(
    (acc, { title, route }) =>
      [
        {
          title: formatMessage(title),
          route
        } as Breadcrumb
      ].concat(acc),
    [{ title: titleText }]
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
      <WorkForm onSubmit={handleSubmitCreate} formRef={formRef} />
    </>
  )
}
