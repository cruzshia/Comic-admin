import React, { useMemo, useContext, useCallback, useRef, useEffect } from 'react'
import { useIntl } from 'react-intl'
import { useParams } from 'react-router-dom'
import Button, { Theme } from '@src/components/Button/Button'
import ContentHeader from '@src/components/ContentHeader'
import commonMessages from '@src/messages'
import { ReactComponent as PhoneIcon } from '@src/assets/header/phone.svg'
import { ReactComponent as CopyIcon } from '@src/assets/header/copy.svg'
import { submitForm } from '@src/utils/validation'
import { BREADCRUMBS } from '../utils'
import messages from '../messages'
import DisplaySettingContext, { ActionContext } from '../context/DisplaySettingContext'
import DisplaySettingForm from './DisplaySettingForm'

export default function DisplaySettingEdit() {
  const { formatMessage } = useIntl()
  const { currentSetting } = useContext(DisplaySettingContext)
  const { onGetDisplaySetting, onUpdateDisplaySetting } = useContext(ActionContext)
  const formRef = useRef<HTMLFormElement>(null)
  const { id } = useParams()

  useEffect(() => {
    onGetDisplaySetting(id!)
  }, [onGetDisplaySetting, id])

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

  const handleSubmit = useCallback(data => onUpdateDisplaySetting(data), [onUpdateDisplaySetting])

  return (
    <>
      <ContentHeader breadcrumbList={breadcrumbList} titleText={formatMessage(messages.home)} buttonList={buttonList} />
      <DisplaySettingForm formRef={formRef} onSubmit={handleSubmit} currentSetting={currentSetting} />
    </>
  )
}
