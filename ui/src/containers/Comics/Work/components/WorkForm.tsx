import React, { useMemo, useRef } from 'react'
import { useIntl } from 'react-intl'
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
import { IMAGE_NUM, IMAGE_MAX_WIDTH } from '../constants'
import commonMessages from '@src/messages'
import messages from '../messages'
import clsx from 'clsx'

interface Props {
  workData?: any
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

export default function WorkForm({ workData }: Props) {
  const { formatMessage } = useIntl()
  const classes = useStyle()
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

  return (
    <>
      <ScrollTo anchorRef={anchorRef} />
      <DataTable
        title={formatMessage(messages.basicInfo)}
        tableClass={clsx(classes.tableClass, classes.tableMargin)}
        dataSet={[
          {
            label: formatMessage(messages.id),
            content: workData ? workData.id : <TextInput name='id' />
          },
          {
            label: formatMessage(messages.title),
            content: <TextInput name='title' />
          },
          {
            label: formatMessage(messages.titleShort),
            content: <TextInput name='titleShort' />
          },
          {
            label: formatMessage(messages.introduction),
            content: <TextArea name='introduction' />
          },
          {
            label: formatMessage(commonMessages.author),
            content: (
              <Grid className={classes.buttonMargin} container alignItems='center'>
                <SearchInput name='author' icon={true} />
                <Button buttonText='新規作成' onClick={() => {}} icon={AddIcon} />
              </Grid>
            )
          },
          {
            label: formatMessage(messages.category),
            content: workData ? workData.category : <Select name='category' list={[1]} isShort />
          },
          {
            label: formatMessage(messages.storyCategory),
            content: <Select name='storyCategory' list={[1]} isShort />
          },
          {
            label: formatMessage(messages.updateFrequency),
            content: <Select name='updateFrequency' list={[1]} isShort />
          },
          {
            label: formatMessage(messages.rensai),
            content: <Select name='workRensai' list={[1]} isShort />
          },
          ...imageDataSet
        ]}
      />
      <DataTable
        title={formatMessage(messages.deliveryDuration)}
        tableClass={classes.tableMargin}
        innerRef={deliveryRef}
        dataSet={[
          {
            label: formatMessage(messages.deliveryStartDateTime),
            content: <TextInput name='deliveryStartDateTime' />
          },
          {
            label: formatMessage(messages.deliveryEndDateTime),
            content: <TextInput name='deliveryEndDateTime' />
          }
        ]}
      />
    </>
  )
}
