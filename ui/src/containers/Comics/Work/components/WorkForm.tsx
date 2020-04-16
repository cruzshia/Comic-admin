import React, { useMemo } from 'react'
import { useIntl } from 'react-intl'
import { Form, Field } from 'react-final-form'
import arrayMutators from 'final-form-arrays'
import { makeStyles } from '@material-ui/core'
import DataTable from '@src/components/table/DataTable'
import { TextInput, TextArea, Select, StartEndForm } from '@src/components/form'
import DropZoneAdapter from '@src/components/finalForm/DropZoneAdapter'
import ScrollTo from '@src/components/scroll/ScrollTo'
import { checkError, required } from '@src/utils/validation'
import commonMessages from '@src/messages'
import comicsMessages from '../../messages'
import AuthorEditForm from '../../components/AuthorEditForm'
import AdSettingForm from '../../components/AdSettingForm'
import { useComicsRef, IMAGE_NUM, IMAGE_MAX_WIDTH } from '../../utils'
import messages from '../messages'
import clsx from 'clsx'

interface Props {
  workData?: any
  onSubmit: (data: any) => void
  formRef?: React.RefObject<HTMLFormElement>
  withStickHeader?: boolean
}

const useStyle = makeStyles({
  tableClass: {
    '& .MuiGrid-container:not(.display) .MuiGrid-item': {
      padding: '15px 20px'
    }
  },
  photo: {
    maxWidth: IMAGE_MAX_WIDTH
  },
  tableMargin: {
    marginBottom: '30px'
  }
})

export default function WorkForm({ workData, onSubmit, formRef }: Props) {
  const classes = useStyle()
  const { formatMessage } = useIntl()
  const { allAnchorRefs, deliveryRef, adSettingRef, episodeInfoRef } = useComicsRef()

  const imageDataSet = useMemo(() => {
    const dataSet = []
    for (let i = 0; i < IMAGE_NUM; i++) {
      dataSet.push({
        label: `${formatMessage(comicsMessages.episodeImage)}${i + 1}`,
        content: <Field name={`images[${i}]`} className={classes.photo} component={DropZoneAdapter} />
      })
    }
    return dataSet
  }, [formatMessage, classes.photo])

  return (
    <>
      <ScrollTo anchorRef={allAnchorRefs} withStickHeader />
      <Form
        onSubmit={onSubmit}
        mutators={{ ...arrayMutators }}
        initialValues={workData || { author: [''] }}
        render={({ handleSubmit, form }) => (
          <form onSubmit={handleSubmit} ref={formRef}>
            <DataTable
              title={formatMessage(commonMessages.basicInfo)}
              tableClass={clsx(classes.tableClass, classes.tableMargin)}
              dataSet={[
                {
                  label: formatMessage(comicsMessages.workId),
                  classes: workData ? 'display' : undefined,
                  content: (
                    <Field name='id' validate={required}>
                      {({ input, meta }) =>
                        workData ? workData.id : <TextInput {...input} error={checkError(meta)} />
                      }
                    </Field>
                  )
                },
                {
                  label: formatMessage(commonMessages.title),
                  content: (
                    <Field name='title'>{({ input, meta }) => <TextInput {...input} error={checkError(meta)} />}</Field>
                  )
                },
                {
                  label: formatMessage(messages.titleKana),
                  content: (
                    <Field name='titleKana'>
                      {({ input, meta }) => <TextInput {...input} error={checkError(meta)} />}
                    </Field>
                  )
                },
                {
                  label: formatMessage(messages.introduction),
                  content: (
                    <Field name='introduction'>
                      {({ input, meta }) => <TextArea {...input} error={checkError(meta)} />}
                    </Field>
                  )
                },
                {
                  label: formatMessage(commonMessages.author),
                  content: <AuthorEditForm mutators={form.mutators as any} />
                },
                {
                  label: formatMessage(messages.category),
                  classes: workData ? 'display' : undefined,
                  content: (
                    <Field name='category'>
                      {({ input, meta }) =>
                        workData ? (
                          workData.category
                        ) : (
                          <Select {...input} error={checkError(meta)} options={[]} isShort />
                        )
                      }
                    </Field>
                  )
                },
                {
                  label: formatMessage(messages.reduction),
                  classes: workData ? 'display' : undefined,
                  content: (
                    <Field name='reduction'>
                      {({ input, meta }) =>
                        workData ? (
                          workData.reduction
                        ) : (
                          <Select {...input} error={checkError(meta)} options={[]} isShort />
                        )
                      }
                    </Field>
                  )
                }
              ]}
            />
            <StartEndForm
              innerRef={deliveryRef}
              title={formatMessage(commonMessages.deliveryDuration)}
              classnames={clsx(classes.tableClass, classes.tableMargin)}
              startLabel={formatMessage(commonMessages.deliveryStartDateTime)}
              startName='deliveryStartDateTime'
              endLabel={formatMessage(commonMessages.deliveryEndDateTime)}
              endName='deliveryEndDateTime'
            />
            <DataTable
              innerRef={episodeInfoRef}
              title={formatMessage(comicsMessages.episodeInfo)}
              tableClass={clsx(classes.tableClass, classes.tableMargin)}
              dataSet={[
                {
                  label: formatMessage(messages.episodeCategory),
                  content: (
                    <Field name='episodeCategory'>
                      {({ input, meta }) => <Select {...input} error={checkError(meta)} options={[]} isShort />}
                    </Field>
                  )
                },
                {
                  label: formatMessage(messages.episodeFrequency),
                  content: (
                    <Field name='episodeFrequency'>
                      {({ input, meta }) => <Select {...input} error={checkError(meta)} options={[]} isShort />}
                    </Field>
                  )
                },
                {
                  label: formatMessage(messages.rensai),
                  content: (
                    <Field name='workSerial'>
                      {({ input, meta }) => <Select {...input} error={checkError(meta)} options={[]} isShort />}
                    </Field>
                  )
                },
                ...imageDataSet
              ]}
            />
            <AdSettingForm adSettingRef={adSettingRef} mutators={form.mutators as any} />
          </form>
        )}
      />
    </>
  )
}
