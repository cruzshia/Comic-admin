import React from 'react'
import { useIntl } from 'react-intl'
import { Form, Field } from 'react-final-form'
import { makeStyles } from '@material-ui/core'
import DataTable, { toDataSet } from '@src/components/table/DataTable'
import { TextInputAdapter, TextAreaAdapter } from '@src/components/finalForm'
import StartEndForm from '@src/components/form/StartEndForm'
import DropZone from '@src/components/DropZone'
import ScrollTo from '@src/components/scroll/ScrollTo'
import { _range, toDataUri } from '@src/utils/functions'
import worksCampaign from '@src/models/comics/worksCampaign'
import commonMessages from '@src/messages'
import comicMessages from '@src/containers/Comics/messages'
import AdSettingForm from '@src/containers/Comics/components/AdSettingForm'
import { useComicsRef, IMAGE_NUM, IMAGE_MAX_WIDTH } from '@src/containers/Comics/utils'
import { emptyWorksCampaign } from '@src/reducers/comics/campaign/worksCampaignReducer'
import clsx from 'clsx'
import messages from '../messages'

interface Props {
  onSubmit: (data: any) => void
  formRef?: React.RefObject<HTMLFormElement> | null
  worksCampaign?: worksCampaign
}

const useStyle = makeStyles({
  tableClass: {
    '& .MuiGrid-container:not(.display) .MuiGrid-item': {
      padding: '15px 20px'
    }
  },
  tableMargin: {
    marginBottom: '30px'
  },
  photo: {
    maxWidth: IMAGE_MAX_WIDTH
  }
})

export default function WorksCampaignForm({ onSubmit, formRef, worksCampaign }: Props) {
  const classes = useStyle()
  const { formatMessage } = useIntl()
  const { allAnchorRefs, deliveryRef, adSettingRef, episodeInfoRef } = useComicsRef()

  return (
    <>
      <ScrollTo anchorRef={allAnchorRefs} withStickHeader />
      <Form
        onSubmit={onSubmit}
        initialValues={worksCampaign || emptyWorksCampaign}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit} ref={formRef}>
            <DataTable
              title={formatMessage(commonMessages.basicInfo)}
              tableClass={clsx(classes.tableClass, classes.tableMargin)}
              dataSet={[
                toDataSet(
                  formatMessage(comicMessages.campaignId),
                  <Field name='campaignId' component={TextInputAdapter} />
                ),
                toDataSet(formatMessage(comicMessages.workId), <Field name='workId' component={TextInputAdapter} />),
                toDataSet(formatMessage(commonMessages.appId), <Field name='appId' component={TextInputAdapter} />),
                toDataSet(
                  formatMessage(comicMessages.priority),
                  <Field name='priority' component={TextInputAdapter} />
                ),
                toDataSet(
                  formatMessage(commonMessages.introduction),
                  <Field name='description' component={TextAreaAdapter} />
                ),
                toDataSet(formatMessage(messages.freeRange), <Field name='freeRange' component={TextInputAdapter} />),
                toDataSet(
                  formatMessage(messages.freeRangeDisplayString),
                  <Field name='freeRangeDisplayString' component={TextInputAdapter} />
                )
              ]}
            />
            <DataTable
              innerRef={episodeInfoRef}
              title={formatMessage(comicMessages.episodeInfo)}
              tableClass={clsx(classes.tableClass, classes.tableMargin)}
              dataSet={[
                ..._range(0, IMAGE_NUM).map(num => ({
                  label: `${formatMessage(comicMessages.episodeImage)}${num + 1}`,
                  content: (
                    <Field name={`images[${num}]`}>
                      {({ input: { value, onChange } }) => (
                        <DropZone
                          classnames={classes.photo}
                          name={`images${num}`}
                          preview={value && <img src={toDataUri(value)} alt={`images${num}`} />}
                          onDropAccepted={files => onChange(files[0])}
                        />
                      )}
                    </Field>
                  )
                }))
              ]}
            />
            <StartEndForm
              innerRef={deliveryRef}
              classnames={classes.tableMargin}
              title={formatMessage(commonMessages.deliveryDuration)}
              startLabel={formatMessage(commonMessages.startDateTime)}
              startName='startDateTime'
              endLabel={formatMessage(commonMessages.endDateTime)}
              endName='endDateTime'
            />
            <AdSettingForm adSettingRef={adSettingRef} />
          </form>
        )}
      />
    </>
  )
}
