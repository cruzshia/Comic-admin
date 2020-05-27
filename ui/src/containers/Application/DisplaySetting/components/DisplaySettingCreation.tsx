import React, { useMemo, useCallback, useRef, useContext } from 'react'
import { useIntl } from 'react-intl'
import Button, { Theme } from '@src/components/Button/Button'
import ContentHeader from '@src/components/ContentHeader'
import commonMessages from '@src/messages'
import { ReactComponent as PhoneIcon } from '@src/assets/header/phone.svg'
import { ReactComponent as CopyIcon } from '@src/assets/header/copy.svg'
import { BREADCRUMBS } from '../utils'
import messages from '../messages'
import DisplaySettingForm from './DisplaySettingForm'
import { ActionContext } from '../context/DisplaySettingContext'
import { submitForm } from '@src/utils/validation'

export default function DisplaySettingCreation() {
  const { formatMessage } = useIntl()
  const formRef = useRef<HTMLFormElement>(null)
  const { onCreateDisplaySetting } = useContext(ActionContext)

  const breadcrumbList = useMemo(
    () =>
      BREADCRUMBS.map(({ title, route }) => ({ title: formatMessage(title), route })).concat({
        title: formatMessage(messages.creation),
        route: undefined
      }),
    [formatMessage]
  )
  const buttonList = useMemo(
    () => [
      <Button
        theme={Theme.DARK}
        buttonText={formatMessage(commonMessages.create)}
        onClick={() => submitForm(formRef)}
      />,
      <Button
        theme={Theme.DARK_BORDER}
        icon={PhoneIcon}
        buttonText={formatMessage(commonMessages.preview)}
        onClick={() => {}}
      />,
      <Button theme={Theme.LIGHT} icon={CopyIcon} buttonText={formatMessage(commonMessages.copy)} onClick={() => {}} />
    ],
    [formatMessage, formRef]
  )

  const handleSubmit = useCallback(data => onCreateDisplaySetting(data), [onCreateDisplaySetting])

  return (
    <>
      <ContentHeader
        breadcrumbList={breadcrumbList}
        titleText={formatMessage(messages.creation)}
        buttonList={buttonList}
      />
      <DisplaySettingForm onSubmit={handleSubmit} formRef={formRef} />
    </>
  )
}
