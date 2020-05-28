import React, { useMemo, useContext, useRef, useEffect } from 'react'
import { useIntl } from 'react-intl'
import { useParams } from 'react-router-dom'
import { Form } from 'react-final-form'
import ActionButton, { Theme } from '@src/components/Button/ActionButton'
import ContentHeader, { Breadcrumb } from '@src/components/ContentHeader/ContentHeader'
import { submitForm } from '@src/utils/validation'
import commonMessages from '@src/messages'
import StickyHeader from '@src/components/StickyBar/StickyHeader'
import CommentContext, { ActionContext } from '../context/CommentContext'
import CommentTable from './CommentTable'
import { COMMENT_BREADCRUMBS } from '../utils'
import messages from '../messages'

export default function CommentEdit() {
  const { currentComment = {} } = useContext(CommentContext)
  const { onUpdateComment, onGetComment } = useContext(ActionContext)
  const { id } = useParams()
  const { formatMessage } = useIntl()
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    onGetComment(id!)
  }, [onGetComment, id])

  const titleText = formatMessage(messages.commentEdit)
  const breadcrumbList: Breadcrumb[] = COMMENT_BREADCRUMBS.map(({ title, route }) => ({
    title: formatMessage(title),
    route: route
  })).concat([{ title: titleText, route: undefined }])
  const buttonList = useMemo(
    () => [
      <ActionButton
        theme={Theme.DARK}
        buttonText={formatMessage(commonMessages.create)}
        onClick={() => {
          submitForm(formRef)
        }}
      />
    ],
    [formatMessage]
  )

  if (!currentComment.id) {
    return null
  }
  return (
    <>
      <StickyHeader title={titleText} button={buttonList} />
      <ContentHeader breadcrumbList={breadcrumbList} buttonList={buttonList} titleText={titleText} />
      <Form
        onSubmit={values => {
          onUpdateComment(values)
        }}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit} ref={formRef}>
            <CommentTable comment={currentComment} isEdit={true} />
          </form>
        )}
      />
    </>
  )
}
