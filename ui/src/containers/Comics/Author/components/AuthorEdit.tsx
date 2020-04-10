import React, { useCallback, useMemo, useContext } from 'react'
import { useIntl } from 'react-intl'
import Button, { Theme } from '@src/components/Button/Button'
import ContentHeader, { Breadcrumb } from '@src/components/ContentHeader/ContentHeader'
import commonMessages from '@src/messages'
import AuthorContext from '../context/AuthorContext'
import AuthorForm from './AuthorForm'
import { BREADCRUMBS } from '../utils'
import messages from '../messages'

export default function AuthorEdit() {
  const { currentAuthor } = useContext(AuthorContext)
  const { formatMessage } = useIntl()
  const breadcrumbList: Breadcrumb[] = useMemo(
    () =>
      BREADCRUMBS.map(({ title, route }) => ({ title: formatMessage(title), route })).concat([
        { title: formatMessage(messages.create), route: undefined }
      ]),
    [formatMessage]
  )
  const handleSubmit = useCallback(data => console.log(data), [])
  const buttonList = useMemo(
    () => [<Button buttonText={formatMessage(commonMessages.create)} theme={Theme.DARK} onClick={() => {}} />],
    [formatMessage]
  )

  return (
    <>
      <ContentHeader
        breadcrumbList={breadcrumbList}
        titleText={formatMessage(messages.create)}
        buttonList={buttonList}
      />
      <AuthorForm onSubmit={handleSubmit} author={currentAuthor} />
    </>
  )
}
