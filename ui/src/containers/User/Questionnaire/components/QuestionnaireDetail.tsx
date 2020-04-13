import React, { useMemo, useCallback } from 'react'
import { useIntl } from 'react-intl'
import { useHistory, useParams } from 'react-router-dom'
import Button, { Theme } from '@src/components/Button/Button'
import { ReactComponent as IconEdit } from '@src/assets/form/button_edit.svg'
import { ReactComponent as IconPC } from '@src/assets/common/pc.svg'
import { ReactComponent as IconPhone } from '@src/assets/common/phone.svg'
import { routePath, ANCHOR_QUERY } from '@src/common/appConfig'
import HeadBlock from './HeadBlock'
import messages from '../messages'

export default function QuestionnaireDetail() {
  const history = useHistory()
  const { formatMessage } = useIntl()
  const { id } = useParams()
  const handleRedirect = useCallback(
    (target?: string) =>
      history.push(routePath.user.questionnaireEdit.replace(':id', id!) + (target ? `?${ANCHOR_QUERY}=${target}` : '')),
    [history, id]
  )
  const buttonList = useMemo(
    () => [
      <Button
        theme={Theme.DARK_BORDER}
        buttonText={formatMessage(messages.startEdit)}
        onClick={() => handleRedirect()}
        icon={IconEdit}
      />,
      <Button
        theme={Theme.DARK_BORDER}
        buttonText={formatMessage(messages.previewPhone)}
        onClick={() => {}}
        icon={IconPhone}
      />,
      <Button
        theme={Theme.DARK_BORDER}
        buttonText={formatMessage(messages.previewPC)}
        onClick={() => {}}
        icon={IconPC}
      />
    ],
    [formatMessage, handleRedirect]
  )
  const title = formatMessage(messages.detail)

  return (
    <>
      <HeadBlock breadcrumb={title} title={title} buttonList={buttonList} />
    </>
  )
}
