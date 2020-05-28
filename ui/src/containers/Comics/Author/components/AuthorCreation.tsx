import React, { useMemo, useContext, useRef } from 'react'
import { useIntl } from 'react-intl'
import Button, { Theme } from '@src/components/Button/Button'
import ContentHeader, { Breadcrumb } from '@src/components/ContentHeader/ContentHeader'
import commonMessages from '@src/messages'
import { submitForm } from '@src/utils/validation'
import StickyHeader from '@src/components/StickyBar/StickyHeader'
import { ActionContext } from '../context/AuthorContext'
import AuthorForm from './AuthorForm'
import { BREADCRUMBS } from '../utils'
import messages from '../messages'

export default function AuthorCreation() {
  const { onCreateAuthor } = useContext(ActionContext)
  const formRef = useRef<HTMLFormElement>(null)
  const { formatMessage } = useIntl()
  const titleText = formatMessage(messages.create)
  const breadcrumbList: Breadcrumb[] = useMemo(
    () =>
      BREADCRUMBS.map(({ title, route }) => ({ title: formatMessage(title), route })).concat([
        { title: titleText, route: undefined }
      ]),
    [formatMessage, titleText]
  )

  const CreateButton = useMemo(
    () => (
      <Button
        buttonText={formatMessage(commonMessages.create)}
        theme={Theme.DARK}
        onClick={() => submitForm(formRef)}
      />
    ),
    [formatMessage]
  )
  const buttonList = useMemo(() => [CreateButton], [CreateButton])

  return (
    <>
      <StickyHeader title={titleText} button={CreateButton} />
      <ContentHeader breadcrumbList={breadcrumbList} titleText={titleText} buttonList={buttonList} />
      <AuthorForm formRef={formRef} onSubmit={onCreateAuthor} />
    </>
  )
}
