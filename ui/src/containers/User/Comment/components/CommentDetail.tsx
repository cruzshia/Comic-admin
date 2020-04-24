import React, { useMemo, useContext, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useIntl } from 'react-intl'
import Button, { Theme } from '@src/components/Button/Button'
import { routePath } from '@src/common/appConfig'
import { ReactComponent as IconEdit } from '@src/assets/form/button_edit.svg'
import CommentContext, { ActionContext } from '../context/CommentContext'
import messages from '../messages'
import CommonHeader from './CommonHeader'
import CommentTable from './CommentTable'

export default function CommentDetail() {
  const { currentComment = {} } = useContext(CommentContext)
  const { onGetComment } = useContext(ActionContext)
  const { id } = useParams()
  const { formatMessage } = useIntl()
  const history = useHistory()

  useEffect(() => {
    onGetComment(id!)
  }, [onGetComment, id])

  const buttonList = useMemo(
    () => [
      <Button
        theme={Theme.DARK_BORDER}
        buttonText={formatMessage(messages.edit)}
        onClick={() => history.push(routePath.user.commentEdit.replace(':id', id!))}
        icon={IconEdit}
      />
    ],
    [formatMessage, history, id]
  )

  if (!currentComment.id) {
    return null
  }
  return (
    <>
      <CommonHeader buttonList={buttonList} />
      <CommentTable comment={currentComment} />
    </>
  )
}
