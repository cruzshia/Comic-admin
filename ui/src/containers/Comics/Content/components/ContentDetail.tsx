import React, { useMemo, useContext } from 'react'
import { useIntl } from 'react-intl'
import { useHistory, useParams } from 'react-router-dom'
import ContentHeader from '@src/components/ContentHeader'
import Button, { Theme } from '@src/components/Button/Button'
import { ReactComponent as IconEdit } from '@src/assets/form/button_edit.svg'
import { routePath } from '@src/common/appConfig'
import ContentContext from '../context/ContentContext'
import { CONTENT_BREADCRUMBS } from '../constants'
import messages from '../messages'

export default function ContentDetail() {
  const { currentContent: mockContent } = useContext(ContentContext)
  const { formatMessage } = useIntl()
  const history = useHistory()
  const { id } = useParams()

  const breadcrumbList = useMemo(
    () =>
      CONTENT_BREADCRUMBS.map(({ title, route }) => ({ title: formatMessage(title), route })).concat([
        { title: formatMessage(messages.detail), route: undefined }
      ]),
    [formatMessage]
  )
  const buttonList = useMemo(
    () => [
      <Button
        theme={Theme.DARK_BORDER}
        icon={IconEdit}
        buttonText={formatMessage(messages.edit)}
        onClick={() => {
          history.push(routePath.comics.contentEdit.replace(':id', id!))
        }}
      />
    ],
    [formatMessage, history, id]
  )

  return (
    <>
      <ContentHeader breadcrumbList={breadcrumbList} titleText={mockContent.title} buttonList={buttonList} />
      <div>ContentDetail</div>
    </>
  )
}
