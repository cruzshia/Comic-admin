import React, { useMemo } from 'react'
import { useHistory } from 'react-router-dom'
import { useIntl } from 'react-intl'
import ActionButton, { Theme } from '@src/components/Button/ActionButton'
import commonMessages from '@src/messages'
import { routePath } from '@src/common/appConfig'
import ComonHeader from './CommonHeader'

export default function CommentEdit() {
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

  return <ComonHeader buttonList={buttonList} />
}
