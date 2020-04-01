import React, { useMemo } from 'react'
import { useIntl } from 'react-intl'
import Button, { Theme } from '@src/components/Button/Button'
import ContentHeader from '@src/components/ContentHeader'
import commonMessages from '@src/messages'
import { ReactComponent as PhoneIcon } from '@src/assets/header/phone.svg'
import { ReactComponent as CopyIcon } from '@src/assets/header/copy.svg'
import { BREADCRUMBS } from '../constants'
import messages from '../messages'

export default function DisplaySettingEdit() {
  const { formatMessage } = useIntl()

  const breadcrumbList = useMemo(
    () =>
      BREADCRUMBS.map(({ title, route }) => ({ title: formatMessage(title), route })).concat({
        title: formatMessage(messages.edit),
        route: undefined
      }),
    [formatMessage]
  )
  const buttonList = useMemo(
    () => [
      <Button theme={Theme.DARK} buttonText={formatMessage(commonMessages.create)} onClick={() => {}} />,
      <Button
        theme={Theme.DARK_BORDER}
        icon={PhoneIcon}
        buttonText={formatMessage(commonMessages.preview)}
        onClick={() => {}}
      />,
      <Button theme={Theme.LIGHT} icon={CopyIcon} buttonText={formatMessage(commonMessages.copy)} onClick={() => {}} />
    ],
    [formatMessage]
  )

  return (
    <>
      <ContentHeader breadcrumbList={breadcrumbList} titleText={formatMessage(messages.home)} buttonList={buttonList} />
    </>
  )
}
