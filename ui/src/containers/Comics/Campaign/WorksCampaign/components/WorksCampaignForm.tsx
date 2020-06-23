import React from 'react'
import { useIntl } from 'react-intl'
import { Form, Field } from 'react-final-form'
import arrayMutators from 'final-form-arrays'
import { makeStyles } from '@material-ui/core'
import DataTable, { toDataSet } from '@src/components/table/DataTable'
import { TextInputAdapter, TextAreaAdapter, DropZoneAdapter } from '@src/components/finalForm'
import StartEndForm from '@src/components/form/StartEndForm'
import ScrollTo from '@src/components/scroll/ScrollTo'
import { _range } from '@src/utils/functions'
import commonMessages from '@src/messages'
import comicMessages from '@src/containers/Comics/messages'
import AdSettingForm from '@src/containers/Comics/components/AdSettingForm'
import { useComicsRef, IMAGE_NUM, IMAGE_MAX_WIDTH } from '@src/containers/Comics/utils'
import { emptyWorksCampaign } from '@src/reducers/comics/campaign/worksCampaignReducer'
import { WorksCampaign, WorkCampaignCreate, WorksCampaignKeys } from '@src/models/comics/worksCampaign'
import { WorkType } from '@src/models/comics/work'
import AppCheckboxes from '@src/containers/Comics/components/AppCheckboxes'
import { validateWorkCampaign } from '../utils'
import clsx from 'clsx'
import formMessages from '@src/components/form/messages'
import messages from '../messages'

interface Props {
  onSubmit: (data: Partial<WorkCampaignCreate>) => void
  onWorkBlur?: (e: React.MouseEvent<HTMLInputElement>) => void
  formRef?: React.RefObject<HTMLFormElement> | null
  worksCampaign?: WorksCampaign
  campaignId: string
  workType?: WorkType
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

const mockAppList = [
  {
    id: 123,
    name: 'SHJP01I'
  },
  {
    id: 456,
    name: 'SHJP01A'
  },
  {
    id: 6666,
    name: 'BROWSER_RENSAI'
  }
]

export default function WorksCampaignForm({
  onSubmit,
  formRef,
  worksCampaign,
  campaignId,
  workType,
  onWorkBlur
}: Props) {
  const classes = useStyle()
  const { formatMessage } = useIntl()
  const { allAnchorRefs, deliveryRef, adSettingRef, episodeInfoRef } = useComicsRef()
  const isEpisodeWork = workType === WorkType.Episode

  const handleValidate = (values: Partial<WorkCampaignCreate>) =>
    validateWorkCampaign({
      ...values,
      isEpisodeWork
    })

  return (
    <>
      <ScrollTo anchorRef={allAnchorRefs} withStickHeader />
      <Form
        onSubmit={onSubmit}
        validate={handleValidate}
        mutators={{ ...arrayMutators }}
        subscription={{ pristine: true }}
        initialValues={worksCampaign || emptyWorksCampaign}
        render={({ handleSubmit, values }) => (
          <form onSubmit={handleSubmit} ref={formRef}>
            <Field name={WorksCampaignKeys.CampaignID} component='input' type='hidden' defaultValue={campaignId} />
            <DataTable
              title={formatMessage(commonMessages.basicInfo)}
              tableClass={clsx(classes.tableClass, classes.tableMargin)}
              dataSet={[
                toDataSet(
                  formatMessage(messages.name),
                  <Field name={WorksCampaignKeys.Name} component={TextInputAdapter} />
                ),
                toDataSet(
                  formatMessage(comicMessages.workIdBrackets),
                  <Field
                    name={WorksCampaignKeys.WorkId}
                    component={TextInputAdapter}
                    placeholder={formatMessage(formMessages.search)}
                    onBlur={onWorkBlur}
                  />
                ),
                toDataSet(
                  formatMessage(commonMessages.appId),
                  <AppCheckboxes name={WorksCampaignKeys.AppIds} options={mockAppList} />
                ),
                toDataSet(
                  formatMessage(comicMessages.priority),
                  <Field name={WorksCampaignKeys.Priority} component={TextInputAdapter} type='number' />
                ),
                toDataSet(
                  formatMessage(commonMessages.introduction),
                  <Field name={WorksCampaignKeys.Description} component={TextAreaAdapter} />
                ),
                toDataSet(
                  formatMessage(messages.freeRange),
                  <Field name={WorksCampaignKeys.FreeRange} component={TextInputAdapter} />
                ),
                toDataSet(
                  formatMessage(messages.freeRangeDisplayString),
                  <Field name={WorksCampaignKeys.FreeRangeDisplay} component={TextInputAdapter} />
                )
              ]}
            />
            {isEpisodeWork && (
              <DataTable
                innerRef={episodeInfoRef}
                title={formatMessage(comicMessages.episodeInfo)}
                tableClass={clsx(classes.tableClass, classes.tableMargin)}
                dataSet={[
                  ..._range(1, IMAGE_NUM + 1).map(num => ({
                    label: `${formatMessage(comicMessages.episodeImage)}${num + 1}`,
                    content: (
                      <Field
                        name={`${WorksCampaignKeys.Images}[image${num}]`}
                        className={classes.photo}
                        component={DropZoneAdapter}
                      />
                    )
                  }))
                ]}
              />
            )}
            <StartEndForm
              innerRef={deliveryRef}
              classnames={classes.tableMargin}
              title={formatMessage(commonMessages.deliveryDuration)}
              startLabel={formatMessage(commonMessages.startDateTime)}
              startName={WorksCampaignKeys.BeginAt}
              endLabel={formatMessage(commonMessages.endDateTime)}
              endName={WorksCampaignKeys.EndAt}
            />
            {isEpisodeWork && (
              <Field name={WorksCampaignKeys.AdSetting}>
                {({ input: { value } }) =>
                  value?.map((_: any, index: number) => (
                    <AdSettingForm
                      key={`adSetting-${index}`}
                      adSettingRef={!index ? adSettingRef : undefined}
                      adKey={`${WorksCampaignKeys.AdSetting}[${index}]`}
                    />
                  ))
                }
              </Field>
            )}
          </form>
        )}
      />
    </>
  )
}
