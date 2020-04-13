import React, { useMemo, useCallback } from 'react'
import { useIntl } from 'react-intl'
import { useHistory } from 'react-router-dom'
import Button, { Theme } from '@src/components/Button/Button'
import { ReactComponent as IconEdit } from '@src/assets/form/button_edit.svg'
import { routePath } from '@src/common/appConfig'
import HeadBlock from './HeadBlock'
import SearchBlock from './SearchBlock'
import messages from '../messages'

export default function QuestionnaireList() {
  const { formatMessage } = useIntl()
  const history = useHistory()
  const buttonList = useMemo(
    () => [
      <Button
        theme={Theme.DARK_BORDER}
        buttonText={formatMessage(messages.startCreate)}
        onClick={() => history.push(routePath.user.questionnaireCreation)}
        icon={IconEdit}
      />
    ],
    [formatMessage, history]
  )

  const handleSearch = useCallback(() => {}, [])

  return (
    <div>
      <HeadBlock title={formatMessage(messages.questionnaireList)} buttonList={buttonList} />
      <SearchBlock onSubmit={handleSearch} />
    </div>
  )
}
