import React, { useMemo, useContext, useEffect, useRef } from 'react'
import { useIntl } from 'react-intl'
import { useParams } from 'react-router-dom'
import Button, { Theme } from '@src/components/Button/Button'
import ContentHeader, { Breadcrumb } from '@src/components/ContentHeader/ContentHeader'
import commonMessages from '@src/messages'
import { submitForm } from '@src/utils/validation'
import AuthorContext, { ActionContext } from '../context/AuthorContext'
import AuthorForm from './AuthorForm'
import { BREADCRUMBS } from '../utils'
import messages from '../messages'

export default function AuthorEdit() {
  const { onGetAuthor, onUpdateAuthor } = useContext(ActionContext)
  const { currentAuthor = {} } = useContext(AuthorContext)
  const formRef = useRef<HTMLFormElement>(null)
  const { formatMessage } = useIntl()
  const { id } = useParams()

  useEffect(() => {
    onGetAuthor(id!)
  }, [onGetAuthor, id])

  const breadcrumbList: Breadcrumb[] = useMemo(
    () =>
      BREADCRUMBS.map(({ title, route }) => ({ title: formatMessage(title), route })).concat([
        { title: formatMessage(messages.create), route: undefined }
      ]),
    [formatMessage]
  )
  const buttonList = useMemo(
    () => [
      <Button
        buttonText={formatMessage(commonMessages.create)}
        theme={Theme.DARK}
        onClick={() => submitForm(formRef)}
      />
    ],
    [formatMessage]
  )

  return (
    <>
      <ContentHeader
        breadcrumbList={breadcrumbList}
        titleText={formatMessage(messages.create)}
        buttonList={buttonList}
      />
      <AuthorForm formRef={formRef} onSubmit={onUpdateAuthor} author={currentAuthor} />
    </>
  )
}
