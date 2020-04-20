import React from 'react'
import { Form, Field } from 'react-final-form'
import { useIntl } from 'react-intl'
import { makeStyles } from '@material-ui/core'
import DataTable, { toDataSet } from '@src/components/table/DataTable'
import { SelectAdapter, TextInputAdapter, TextAreaAdapter } from '@src/components/finalForm'
import { StartEndForm, StyledCheckBox } from '@src/components/form'
import commonMessages from '@src/messages'
import messages from '../messages'

const useStyles = makeStyles({
  checked: {
    '& .MuiCheckbox-root': {
      marginRight: '15px'
    },
    '& span:last-child': {
      position: 'relative',
      top: '2px'
    }
  }
})

interface Props {
  formRef: React.RefObject<HTMLFormElement>
  onSubmit: (data: any) => void
}
export default function NotificationForm({ formRef, onSubmit }: Props) {
  const { formatMessage } = useIntl()
  const classes = useStyles()

  const defaultText = `<html>
  <head>
  <meta charset="utf-8">
  <title>タイトル</title>
  </head>
  <body>
  本文
  </body>
  </html>`

  return (
    <>
      <Form onSubmit={onSubmit} initialValues={{ text: defaultText }}>
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit} ref={formRef}>
            <DataTable
              title={formatMessage(commonMessages.basicInfo)}
              dataSet={[
                toDataSet(formatMessage(commonMessages.id), <Field name='id' component={TextInputAdapter} />),
                toDataSet(
                  formatMessage(commonMessages.application),
                  <Field name='application' component={SelectAdapter} options={[]} />
                )
              ]}
              marginBottom
            />
            <StartEndForm
              title={formatMessage(commonMessages.releaseDuration)}
              startName='releaseStartTime'
              startLabel={formatMessage(commonMessages.releaseStartTime)}
              endName='releaseEndTime'
              endLabel={formatMessage(commonMessages.releaseEndTime)}
              marginBottom
            />
            <DataTable
              title={formatMessage(commonMessages.basicInfo)}
              dataSet={[
                toDataSet(
                  formatMessage(messages.contentDetail),
                  <Field name='application' component={SelectAdapter} options={[]} isShort />
                ),
                toDataSet(
                  formatMessage(messages.majorFlag),
                  <Field
                    name='majorFlag'
                    render={({ input: { onChange, value } }) => (
                      <div className={classes.checked}>
                        <StyledCheckBox
                          checked={!!value}
                          onCheck={(_, checked) => {
                            onChange(checked)
                          }}
                          value='significantEvent'
                        />
                        <span>{formatMessage(messages.significantEvent)}</span>
                      </div>
                    )}
                  />
                ),
                toDataSet(
                  formatMessage(commonMessages.title),
                  <Field name='title' component={TextInputAdapter} placeholder={formatMessage(messages.enterTitle)} />
                ),
                toDataSet(formatMessage(messages.text), <Field name='text' component={TextAreaAdapter} rows={41} />)
              ]}
            />
          </form>
        )}
      </Form>
    </>
  )
}