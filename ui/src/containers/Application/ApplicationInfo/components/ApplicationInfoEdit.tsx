import React, { useContext, useEffect, useMemo, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { useIntl } from 'react-intl'
import Button, { Theme } from '@src/components/Button/Button'
import ContentHeader from '@src/components/ContentHeader'
import { submitForm } from '@src/utils/validation'
import { BREADCRUMBS } from '../constants'
import ApplicationInfoForm from './ApplicationInfoForm'
import ApplicationInfoContext, { ActionContext } from '../context/ApplicationInfoContext'
import messages from '../messages'
import commonMessages from '@src/messages'

export default function ApplicationInfoEdit() {
  const { currentInfo } = useContext(ApplicationInfoContext)
  const { formatMessage } = useIntl()
  const formRef = useRef<HTMLFormElement>(null)
  const { onGetApplicationInfo, onResetApplicationInfo, onUpdateApplicationInfo } = useContext(ActionContext)
  const { id } = useParams()

  useEffect(() => {
    onGetApplicationInfo(id!)
    return () => onResetApplicationInfo()
  }, [onResetApplicationInfo, onGetApplicationInfo, id])

  const breadcrumbList = useMemo(
    () =>
      BREADCRUMBS.map(({ title, route }) => ({ title: formatMessage(title), route })).concat([
        {
          title: formatMessage(messages.edit),
          route: undefined
        }
      ]),
    [formatMessage]
  )

  const buttonList = useMemo(
    () => [
      <Button
        theme={Theme.DARK}
        buttonText={formatMessage(commonMessages.create)}
        onClick={() => submitForm(formRef)}
      />
    ],
    [formatMessage]
  )

  return (
    <>
      <ContentHeader breadcrumbList={breadcrumbList} titleText={formatMessage(messages.edit)} buttonList={buttonList} />
      <ApplicationInfoForm onSubmit={onUpdateApplicationInfo} currentInfo={currentInfo} formRef={formRef} />
    </>
  )
}