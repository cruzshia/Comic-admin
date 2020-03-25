import React, { useMemo, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { useIntl } from 'react-intl'
import ActionButton, { Theme } from '@src/components/Button/ActionButton'
import commonMessages from '@src/messages'
import { routePath } from '@src/common/appConfig'
import CommentContext from '../context/CommentContext'
import CommonHeader from './CommonHeader'
import CommentTable from './CommentTable'

export default function CommentEdit() {
  const { currentComment } = useContext(CommentContext)
  const { formatMessage } = useIntl()
  const history = useHistory()

  const buttonList = useMemo(
    () => [
      <ActionButton
        theme={Theme.DARK}
        buttonText={formatMessage(commonMessages.create)}
        onClick={() => {
          history.push(routePath.user.comment)
        }}
      />
    ],
    [formatMessage, history]
  )

  return (
    <>
      <CommonHeader buttonList={buttonList} />
      <CommentTable comment={currentComment} isEdit={true} />
    </>
  )
}
