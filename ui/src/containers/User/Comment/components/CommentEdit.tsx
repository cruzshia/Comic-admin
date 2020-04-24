import React, { useMemo, useContext, useRef, useEffect } from 'react'
import { useIntl } from 'react-intl'
import { useParams } from 'react-router-dom'
import { Form } from 'react-final-form'
import ActionButton, { Theme } from '@src/components/Button/ActionButton'
import commonMessages from '@src/messages'
import CommentContext, { ActionContext } from '../context/CommentContext'
import CommonHeader from './CommonHeader'
import CommentTable from './CommentTable'
import { submitForm } from '@src/utils/validation'

export default function CommentEdit() {
  const { currentComment = {} } = useContext(CommentContext)
  const { onUpdateComment, onGetComment } = useContext(ActionContext)
  const { id } = useParams()
  const { formatMessage } = useIntl()
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    onGetComment(id!)
  }, [onGetComment, id])

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
      <CommonHeader buttonList={buttonList} />
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
