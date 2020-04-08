import React, { useMemo, useContext, useCallback, useRef } from 'react'
import { useIntl } from 'react-intl'
import { Form, Field } from 'react-final-form'
import { makeStyles } from '@material-ui/core'
import Button, { Theme } from '@src/components/Button/Button'
import ContentHeader from '@src/components/ContentHeader'
import commonMessages from '@src/messages'
import { ReactComponent as PhoneIcon } from '@src/assets/header/phone.svg'
import { ReactComponent as CopyIcon } from '@src/assets/header/copy.svg'
import DataTable, { toDataSet } from '@src/components/table/DataTable'
import { TextAreaAdapter, TextInputAdapter } from '@src/components/finalForm'
import { StartEndForm } from '@src/components/form'
import { BREADCRUMBS } from '../constants'
import messages from '../messages'
import DisplaySettingContext from '../context/DisplaySettingContext'

const useStyles = makeStyles({
  tableMargin: {
    marginBottom: '30px'
  }
})

export default function DisplaySettingEdit() {
  const { formatMessage } = useIntl()
  const classes = useStyles()
  const { currentSetting } = useContext(DisplaySettingContext)
  const formRef = useRef<HTMLFormElement>(null)

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
                  formatMessage(messages.applicationId),
                  <Field name='applicationId' component={TextInputAdapter} />
                ),
                toDataSet(formatMessage(messages.supplement), <Field name='supplement' component={TextAreaAdapter} />)
              ]}
            />
            <StartEndForm
              title={formatMessage(commonMessages.deliveryDuration)}
              startLabel={formatMessage(commonMessages.deliveryStartDateTime)}
              startName='deliveryStartTime'
              endLabel={formatMessage(commonMessages.deliveryEndDateTime)}
              endName='deliveryEndTime'
            />
          </form>
        )}
      />
    </>
  )
}
