import React, { useMemo, useRef } from 'react'
import { useIntl } from 'react-intl'
import { Form, Field } from 'react-final-form'
import arrayMutators from 'final-form-arrays'
import { makeStyles } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import DataTable from '@src/components/table/DataTable'
import { TextInput, SearchInput, TextArea, Select, StartEndForm } from '@src/components/form'
import Button from '@src/components/Button/Button'
import DropZone from '@src/components/DropZone'
import ScrollTo from '@src/components/scroll/ScrollTo'
import { ReactComponent as AddIcon } from '@src/assets/form/add.svg'
import { checkError } from '@src/utils/validation'
import commonMessages from '@src/messages'
import { required } from '@src/utils/validation'
import comicsMessages from '../../messages'
import AdSettingForm from '../../components/AdSettingForm'
import { IMAGE_NUM, IMAGE_MAX_WIDTH } from '../constants'
import messages from '../messages'
import clsx from 'clsx'

interface Props {
  workData?: any
  onSubmit: (data: any) => void
  formRef?: React.RefObject<HTMLFormElement>
  withStickHeader?: boolean
}

const useStyle = makeStyles({
  buttonMargin: {
    '& button': {
      marginLeft: '15px'
    }
  },
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

export enum ScrollAnchor {
  Delivery = 'delivery',
  AdSetting = 'adSetting',
  EpisodeInfo = 'episodeInfo'
}

export default function WorkForm({ workData, onSubmit, formRef }: Props) {
  const classes = useStyle()
  const { formatMessage } = useIntl()
  const deliveryRef = useRef<HTMLDivElement>(null)
  const adSettingRef = useRef<HTMLDivElement>(null)
  const episodeInfoRef = useRef<HTMLDivElement>(null)
  const anchorRef = {
    [ScrollAnchor.Delivery]: deliveryRef,
    [ScrollAnchor.AdSetting]: adSettingRef,
    [ScrollAnchor.EpisodeInfo]: episodeInfoRef
  }

  const images = workData?.images
  const imageDataSet = useMemo(() => {
    const dataSet = []
    for (let i = 0; i < IMAGE_NUM; i++) {
      const img = images ? images[i] : undefined
      dataSet.push({
        label: `${formatMessage(comicsMessages.episodeImage)}${i + 1}`,
        classes: img ? 'display' : undefined,
        content: img ? (
          <img src={img} alt={img} className={classes.photo} />
        ) : (
          <DropZone name={`photo${i + 1}`} onDropAccepted={() => {}} />
        )
      })
    }
    return dataSet
  }, [images, formatMessage, classes])

  return (
    <>
      <ScrollTo anchorRef={anchorRef} withStickHeader />
      <Form
        onSubmit={onSubmit}
        mutators={{ ...arrayMutators }}
        initialValues={{ ...workData }}
        render={({ handleSubmit, form }) => (
          <form onSubmit={handleSubmit} ref={formRef}>
            <DataTable
              title={formatMessage(messages.basicInfo)}
              tableClass={clsx(classes.tableClass, classes.tableMargin)}
              dataSet={[
                {
                  label: formatMessage(messages.id),
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
                  label: formatMessage(messages.title),
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
                  content: (
                    <Field name='author'>
                      {({ input, meta }) => (
                        <Grid className={classes.buttonMargin} container alignItems='center'>
                          <SearchInput {...input} error={checkError(meta)} icon={true} />
                          <Button buttonText='新規作成' onClick={() => {}} icon={AddIcon} />
                        </Grid>
                      )}
                    </Field>
                  )
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
              title={formatMessage(commonMessages.deliveryDuration)}
              classnames={clsx(classes.tableClass, classes.tableMargin)}
              startLabel={formatMessage(messages.deliveryStartDateTime)}
              startName='deliveryStartDateTime'
              endLabel={formatMessage(messages.deliveryEndDateTime)}
              endName='deliveryEndDateTime'
            />
            <DataTable
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
