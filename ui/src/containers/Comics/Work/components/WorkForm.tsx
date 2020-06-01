import React, { useMemo } from 'react'
import { useIntl } from 'react-intl'
import { Form, Field } from 'react-final-form'
import arrayMutators from 'final-form-arrays'
import { makeStyles } from '@material-ui/core'
import DataTable, { toDataSet } from '@src/components/table/DataTable'
import { StartEndForm } from '@src/components/form'
import { DropZoneAdapter, SelectAdapter, TextInputAdapter, TextAreaAdapter } from '@src/components/finalForm'
import ScrollTo from '@src/components/scroll/ScrollTo'
import { emptyWork } from '@src/reducers/comics/work/workReducer'
import { WorkKeys, WorkType } from '@src/models/comics/work'
import AuthorEditForm from '../../components/AuthorEditForm'
import AdSettingForm from '../../components/AdSettingForm'
import { useComicsRef, IMAGE_NUM, IMAGE_MAX_WIDTH } from '../../utils'
import commonMessages from '@src/messages'
import comicsMessages from '../../messages'
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

  const workTypeOptions = useMemo(
    () =>
      Object.values(WorkType).map(type => ({
        label: formatMessage(messages[type]),
        value: type
      })),
    [formatMessage]
  )

  const returnOptions = useMemo(
    () => [
      {
        label: formatMessage(commonMessages.have),
        value: true
      },
      {
        label: formatMessage(commonMessages.no),
        value: false
      }
    ],
    [formatMessage]
  )

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
        subscription={{ pristine: true }}
        initialValues={workData || { ...emptyWork }}
        render={({ handleSubmit, form }) => (
          <form onSubmit={handleSubmit} ref={formRef}>
            <DataTable
              title={formatMessage(commonMessages.basicInfo)}
              tableClass={clsx(classes.tableClass, classes.tableMargin)}
              dataSet={[
                {
                  label: formatMessage(comicsMessages.workId),
                  classes: workData ? 'display' : undefined,
                  content: workData ? workData.id : ''
                },
                toDataSet(
                  formatMessage(commonMessages.title),
                  <Field name={WorkKeys.Title} component={TextInputAdapter} />
                ),
                toDataSet(
                  formatMessage(messages.titleKana),
                  <Field name={WorkKeys.TitleKana} component={TextInputAdapter} />
                ),
                toDataSet(
                  formatMessage(messages.introduction),
                  <Field name={WorkKeys.Description} component={TextAreaAdapter} />
                ),
                toDataSet(formatMessage(commonMessages.author), <AuthorEditForm authorKey={WorkKeys.AuthorIds} />),
                {
                  label: formatMessage(messages.category),
                  classes: workData ? 'display' : undefined,
                  content: (
                    <Field name={WorkKeys.WorkType} component={SelectAdapter} options={workTypeOptions} isShort />
                  )
                },
                {
                  label: formatMessage(messages.reduction),
                  classes: workData ? 'display' : undefined,
                  content: (
                    <Field name={WorkKeys.ReturnAdRevenue} component={SelectAdapter} options={returnOptions} isShort />
                  )
                },
                {
                  label: formatMessage(commonMessages.subscriptionId),
                  content: <Field name='subscriptionId' component={SelectAdapter} options={[]} />
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
                  content: <Field name='episodeCategory' component={SelectAdapter} options={[]} isShort />
                },
                {
                  label: formatMessage(messages.episodeFrequency),
                  content: <Field name='episodeFrequency' component={SelectAdapter} options={[]} isShort />
                },
                {
                  label: formatMessage(messages.freePeriodicalDay),
                  content: <Field name='freePeriodicalDay' component={SelectAdapter} options={[]} isShort />
                },
                {
                  label: formatMessage(messages.rensai),
                  content: <Field name='workSerial' component={SelectAdapter} options={[]} isShort />
                },
                ...imageDataSet
              ]}
            />
            <AdSettingForm adSettingRef={adSettingRef} adKey={WorkKeys.AdSetting} />
          </form>
        )}
      />
    </>
  )
}
