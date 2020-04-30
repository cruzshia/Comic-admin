import React from 'react'
import { useIntl } from 'react-intl'
import { Form, Field } from 'react-final-form'
import arrayMutators from 'final-form-arrays'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core'
import DataTable from '@src/components/table/DataTable'
import { TextInputAdapter, TextAreaAdapter } from '@src/components/finalForm'
import StartEndForm from '@src/components/form/StartEndForm'
import DropZone from '@src/components/DropZone'
import ScrollTo from '@src/components/scroll/ScrollTo'
import { _range, toDataUri } from '@src/utils/functions'
import commonMessages from '@src/messages'
import comicMessages from '@src/containers/Comics/messages'
import AdSettingForm from '@src/containers/Comics/components/AdSettingForm'
import { useComicsRef, IMAGE_NUM, IMAGE_MAX_WIDTH } from '@src/containers/Comics/utils'
import messages from '../messages'

interface Props {
  onSubmit: (data: any) => void
  formRef?: React.RefObject<HTMLFormElement> | null
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

export default function WorksCampaignForm({ onSubmit, formRef }: Props) {
  const classes = useStyle()
  const { formatMessage } = useIntl()
  const { allAnchorRefs, deliveryRef, adSettingRef, episodeInfoRef } = useComicsRef()

  return (
    <>
      <ScrollTo anchorRef={allAnchorRefs} withStickHeader />
      <Form
        onSubmit={onSubmit}
        mutators={{ ...arrayMutators }}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit} ref={formRef}>
            <DataTable
              title={formatMessage(commonMessages.basicInfo)}
              tableClass={clsx(classes.tableClass, classes.tableMargin)}
              dataSet={[
                {
                  label: formatMessage(comicMessages.campaignId),
                  content: <Field name='campaignId' component={TextInputAdapter} />
                },
                {
                  label: formatMessage(comicMessages.workId),
                  content: <Field name='workId' component={TextInputAdapter} />
                },
                {
                  label: formatMessage(commonMessages.appId),
                  content: <Field name='appId' component={TextInputAdapter} />
                },
                {
                  label: formatMessage(comicMessages.priority),
                  content: <Field name='priority' component={TextInputAdapter} short />
                },
                {
                  label: formatMessage(commonMessages.introduction),
                  content: <Field name='description' component={TextAreaAdapter} />
                },
                {
                  label: formatMessage(messages.freeContentId),
                  content: <Field name='freeContentId' component={TextAreaAdapter} />
                }
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
