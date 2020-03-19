import React, { useMemo } from 'react'
import { useHistory } from 'react-router-dom'
import { useIntl } from 'react-intl'
import Button, { Theme } from '@src/components/Button/Button'
import { routePath } from '@src/common/appConfig'
import { ReactComponent as IconEdit } from '@src/assets/form/button_edit.svg'
import messages from '../messages'
import CommonHeader from './CommonHeader'

export default function CommentDetail() {
  const { formatMessage } = useIntl()
  const history = useHistory()

  const buttonList = useMemo(
    () => [
      <Button
        theme={Theme.DARK_BORDER}
        buttonText={formatMessage(messages.edit)}
        onClick={() => history.push(routePath.user.commentEdit.replace(':id', '123'))}
        icon={IconEdit}
      />
    ],
    [formatMessage, history]
  )

  return <CommonHeader buttonList={buttonList} />
}
