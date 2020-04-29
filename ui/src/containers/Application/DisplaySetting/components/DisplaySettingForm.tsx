import React, { useCallback, useState } from 'react'
import { useIntl } from 'react-intl'
import { Form, Field } from 'react-final-form'
import { makeStyles, ButtonGroup, Button as MuiButton } from '@material-ui/core'
import commonMessages from '@src/messages'
import { fontWeightBold, borderColorLight, textColor } from '@src/common/styles'
import { checkError } from '@src/utils/validation'
import DataTable, { toDataSet } from '@src/components/table/DataTable'
import { TextAreaAdapter, SelectAdapter } from '@src/components/finalForm'
import { StartEndForm, TextArea } from '@src/components/form'
import { emptyDisplaySetting } from '@src/reducers/application/displaySetting/displaySettingReducer'
import applicationMessages from '../../messages'
import messages from '../messages'
import Section from './Section'

enum Mode {
  Batch = 'batch',
  Section = 'section'
}

interface Props {
  onSubmit: (data: any) => void
  formRef: React.RefObject<HTMLFormElement>
  currentSetting?: any
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

export default function DisplaySettingForm({ onSubmit, formRef, currentSetting }: Props) {
  const { formatMessage } = useIntl()
  const classes = useStyles()
  const [mode, setMode] = useState<Mode>(Mode.Batch)
  const handleModeChange = useCallback(mode => () => setMode(mode), [setMode])

  return (
    <Form
      onSubmit={onSubmit}
      initialValues={currentSetting || emptyDisplaySetting}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit} ref={formRef}>
          <DataTable
            title={formatMessage(commonMessages.basicInfo)}
            tableClass={classes.tableMargin}
            dataSet={[
              toDataSet(
                formatMessage(messages.screen),
                <Field
                  name='screen'
                  component={SelectAdapter}
                  options={[
                    {
                      label: formatMessage(messages.home),
                      value: 'home'
                    }
                  ]}
                />
              ),
              toDataSet(
                formatMessage(applicationMessages.applicationId),
                <Field name='applicationId' component={SelectAdapter} options={[]} />
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
                <MuiButton className={mode === Mode.Batch ? 'selected' : ''} onClick={handleModeChange(Mode.Batch)}>
                  {formatMessage(messages.batch)}
                </MuiButton>
                <MuiButton className={mode === Mode.Section ? 'selected' : ''} onClick={handleModeChange(Mode.Section)}>
                  {formatMessage(messages.section)}
                </MuiButton>
              </ButtonGroup>
            }
            dataSet={[
              toDataSet(
                formatMessage(commonMessages.setting),
                <Field name='setting'>
                  {({ input, meta }) =>
                    mode === Mode.Batch ? (
                      <TextArea rows={40} {...input} error={checkError(meta)} classnames={classes.setting} />
                    ) : (
                      <Section />
                    )
                  }
                </Field>
              )
            ]}
          />
        </form>
      )}
    />
  )
}
