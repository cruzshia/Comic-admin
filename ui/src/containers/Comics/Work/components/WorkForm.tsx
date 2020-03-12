import React, { useMemo, useCallback, useRef } from 'react'
import { useIntl } from 'react-intl'
import { Form, Field, FieldMetaState } from 'react-final-form'
import { makeStyles } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import DataTable from '@src/components/table/DataTable'
import TextInput from '@src/components/form/TextInput'
import SearchInput from '@src/components/form/SearchInput'
import TextArea from '@src/components/form/TextArea'
import Select from '@src/components/form/Select'
import Button from '@src/components/Button/Button'
import DropZone from '@src/components/DropZone'
import ScrollTo from '@src/components/scroll/ScrollTo'
import { ReactComponent as AddIcon } from '@src/assets/form/add.svg'
import { IMAGE_NUM, IMAGE_MAX_WIDTH, DATE_TIME_PLACEHOLDER } from '../constants'
import commonMessages from '@src/messages'
import messages from '../messages'
import { required } from '@src/utils/validation'
import clsx from 'clsx'

interface Props {
  workData?: any
  onSubmit: (data: any) => void
  formRef?: React.RefObject<HTMLFormElement>
}

const useStyle = makeStyles({
  buttonMargin: {
    '& button': {
      marginLeft: '15px'
    }
  },
  tableClass: {
    '&. image': {
      maxWidth: IMAGE_MAX_WIDTH
    }
  },
  tableMargin: {
    marginBottom: '30px'
  }
})

export enum ScrollAnchor {
  Delivery = 'delivery',
  Notification = 'notification'
}

export default function WorkForm({ workData, onSubmit, formRef }: Props) {
  const classes = useStyle()
  const { formatMessage } = useIntl()
  const deliveryRef = useRef<HTMLDivElement>(null)
  const notificationRef = useRef<HTMLDivElement>(null)
  const anchorRef = {
    [ScrollAnchor.Delivery]: deliveryRef,
    [ScrollAnchor.Notification]: notificationRef
  }

  const images = workData?.images
  const imageDataSet = useMemo(() => {
    const dataSet = []
    for (let i = 0; i < IMAGE_NUM; i++) {
      const img = images ? images[i] : undefined
      dataSet.push({
        label: `${formatMessage(commonMessages.photo)}${i + 1}`,
        content: img ? <img src={img} alt={img} /> : <DropZone name={`photo${i + 1}`} onDropAccepted={() => {}} />
      })
    }
    return dataSet
  }, [images, formatMessage])

  const checkError = useCallback((meta: FieldMetaState<any>) => {
    return meta.error && meta.touched ? meta.error : undefined
  }, [])

  return (
    <>
      <ScrollTo anchorRef={anchorRef} />
      <Form
        onSubmit={onSubmit}
        initialValues={workData}
        render={({ handleSubmit, form }) => (
          <form onSubmit={handleSubmit} ref={formRef}>
            <DataTable
              title={formatMessage(messages.basicInfo)}
              tableClass={clsx(classes.tableClass, classes.tableMargin)}
              dataSet={[
                {
                  label: formatMessage(messages.id),
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
                  label: formatMessage(messages.titleShort),
                  content: (
                    <Field name='titleShort'>
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
                  content: (
                    <Field name='author'>
                      {({ input, meta }) =>
                        workData ? workData.category : <Select {...input} error={checkError(meta)} list={[1]} isShort />
                      }
                    </Field>
                  )
                },
                {
                  label: formatMessage(messages.storyCategory),
                  content: (
                    <Field name='storyCategory'>
                      {({ input, meta }) => <Select {...input} error={checkError(meta)} list={[1]} isShort />}
                    </Field>
                  )
                },
                {
                  label: formatMessage(messages.updateFrequency),
                  content: (
                    <Field name='updateFrequency'>
                      {({ input, meta }) => <Select {...input} error={checkError(meta)} list={[1]} isShort />}
                    </Field>
                  )
                },
                {
                  label: formatMessage(messages.rensai),
                  content: (
                    <Field name='workSerial'>
                      {({ input, meta }) => <Select {...input} error={checkError(meta)} list={[1]} isShort />}
                    </Field>
                  )
                },
                ...imageDataSet
              ]}
            />
            <DataTable
              title={formatMessage(messages.deliveryDuration)}
              tableClass={classes.tableMargin}
              dataSet={[
                {
                  label: formatMessage(messages.deliveryStartDateTime),
                  content: (
                    <Field name='deliveryStartDateTime'>
                      {({ input, meta }) => (
                        <TextInput {...input} error={checkError(meta)} placeholder={DATE_TIME_PLACEHOLDER} />
                      )}
                    </Field>
                  )
                },
                {
                  label: formatMessage(messages.deliveryEndDateTime),
                  content: (
                    <Field name='deliveryEndDateTime'>
                      {({ input, meta }) => (
                        <TextInput {...input} error={checkError(meta)} placeholder={DATE_TIME_PLACEHOLDER} />
                      )}
                    </Field>
                  )
                }
              ]}
            />
          </form>
        )}
      />
    </>
  )
}
