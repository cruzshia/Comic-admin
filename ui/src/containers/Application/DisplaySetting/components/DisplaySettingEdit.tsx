import React, { useMemo, useContext, useCallback, useRef, useState } from 'react'
import { useIntl } from 'react-intl'
import { Form, Field } from 'react-final-form'
import { makeStyles, ButtonGroup, Button as MuiButton } from '@material-ui/core'
import Button, { Theme } from '@src/components/Button/Button'
import ContentHeader from '@src/components/ContentHeader'
import commonMessages from '@src/messages'
import { fontWeightBold, borderColorLight, textColor } from '@src/common/styles'
import { checkError } from '@src/utils/validation'
import { ReactComponent as PhoneIcon } from '@src/assets/header/phone.svg'
import { ReactComponent as CopyIcon } from '@src/assets/header/copy.svg'
import DataTable, { toDataSet } from '@src/components/table/DataTable'
import { TextAreaAdapter, TextInputAdapter } from '@src/components/finalForm'
import { StartEndForm, TextArea } from '@src/components/form'
import { BREADCRUMBS } from '../constants'
import applicationMessages from '../../messages'
import messages from '../messages'
import DisplaySettingContext from '../context/DisplaySettingContext'

enum Mode {
  batch = 'batch',
  section = 'section'
}

const useStyles = makeStyles({
  tableMargin: {
    marginBottom: '30px'
  },
  buttons: {
    '& .MuiButton-root': {
      padding: '6px 14px',
      minWidth: 'unset',
      fontSize: '12px',
      backgroundColor: '#FFFFFF',
      borderColor: borderColorLight,
      '& span': {
        width: 90,
        fontWeight: fontWeightBold
      },
      '&.selected': {
        backgroundColor: textColor,
        borderColor: textColor,
        color: '#FFFFFF'
      }
    }
  },
  setting: {
    maxWidth: 'unset'
  }
})

export default function DisplaySettingEdit() {
  const { formatMessage } = useIntl()
  const classes = useStyles()
  const { currentSetting } = useContext(DisplaySettingContext)
  const formRef = useRef<HTMLFormElement>(null)
  const [mode, setMode] = useState<Mode>(Mode.batch)

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
        onClick={() => {
          formRef.current?.dispatchEvent(new Event('submit', { cancelable: true }))
        }}
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

  const handleSubmit = useCallback(data => {
    console.log(data)
  }, [])

  const handleModeChange = useCallback(mode => () => setMode(mode), [setMode])

  return (
    <>
      <ContentHeader breadcrumbList={breadcrumbList} titleText={formatMessage(messages.home)} buttonList={buttonList} />
      <Form
        onSubmit={handleSubmit}
        initialValues={currentSetting}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit} ref={formRef}>
            <DataTable
              title={formatMessage(commonMessages.basicInfo)}
              tableClass={classes.tableMargin}
              dataSet={[
                toDataSet(
                  formatMessage(messages.screen),
                  formatMessage(messages[currentSetting.screen as keyof typeof messages])
                ),
                toDataSet(
                  formatMessage(applicationMessages.applicationId),
                  <Field name='applicationId' component={TextInputAdapter} />
                ),
                toDataSet(formatMessage(messages.supplement), <Field name='supplement' component={TextAreaAdapter} />)
              ]}
            />
            <StartEndForm
              classnames={classes.tableMargin}
              title={formatMessage(commonMessages.deliveryDuration)}
              startLabel={formatMessage(commonMessages.deliveryStartDateTime)}
              startName='deliveryStartTime'
              endLabel={formatMessage(commonMessages.deliveryEndDateTime)}
              endName='deliveryEndTime'
            />
            <DataTable
              title={formatMessage(commonMessages.setting)}
              buttons={
                <ButtonGroup size='small' aria-label='outlined button group' className={classes.buttons}>
                  <MuiButton className={mode === Mode.batch ? 'selected' : ''} onClick={handleModeChange(Mode.batch)}>
                    {formatMessage(messages.batch)}
                  </MuiButton>
                  <MuiButton
                    className={mode === Mode.section ? 'selected' : ''}
                    onClick={handleModeChange(Mode.section)}
                  >
                    {formatMessage(messages.section)}
                  </MuiButton>
                </ButtonGroup>
              }
              dataSet={[
                toDataSet(
                  formatMessage(commonMessages.setting),
                  <Field name='setting'>
                    {({ input, meta }) => (
                      <TextArea rows={40} {...input} error={checkError(meta)} classnames={classes.setting} />
                    )}
                  </Field>
                )
              ]}
            />
          </form>
        )}
      />
    </>
  )
}
