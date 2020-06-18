import React, { useMemo } from 'react'
import { useIntl } from 'react-intl'
import { Form, Field } from 'react-final-form'
import arrayMutators from 'final-form-arrays'
import { makeStyles } from '@material-ui/core'
import DataTable, { toDataSet } from '@src/components/table/DataTable'
import { StartEndForm } from '@src/components/form'
import { DropZoneAdapter, SelectAdapter, TextInputAdapter, TextAreaAdapter, Condition } from '@src/components/finalForm'
import ScrollTo from '@src/components/scroll/ScrollTo'
import { _range } from '@src/utils/functions'
import { emptyWork } from '@src/reducers/comics/work/workReducer'
import WorkDetail, { WorkKeys, WorkType, EpisodeWorkType } from '@src/models/comics/work'
import AuthorEditForm from '../../components/AuthorEditForm'
import AdSettingForm from '../../components/AdSettingForm'
import AppCheckboxes from '../../components/AppCheckboxes'
import { validateWork, returnOptions } from '../utils'
import { useComicsRef, workTypes, IMAGE_NUM, IMAGE_MAX_WIDTH } from '../../utils'
import commonMessages from '@src/messages'
import comicsMessages from '../../messages'
import messages from '../messages'
import clsx from 'clsx'

interface Props {
  workData?: WorkDetail
  onSubmit: (data: Partial<WorkDetail>) => void
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
      workTypes.map(({ label, value }) => ({
        label: formatMessage(label),
        value
      })),
    [formatMessage]
  )

  const episodeTypeOptions = useMemo(
    () =>
      Object.values(EpisodeWorkType).map(type => ({
        label: formatMessage(messages[type]),
        value: type
      })),
    [formatMessage]
  )

  const reductions = useMemo(
    () =>
      returnOptions.map(({ label, value }) => ({
        label: formatMessage(label),
        value
      })),
    [formatMessage]
  )

  return (
    <>
      <ScrollTo anchorRef={allAnchorRefs} withStickHeader />
      <Form
        onSubmit={onSubmit}
        mutators={{ ...arrayMutators }}
        subscription={{ pristine: true, values: true }}
        validate={validateWork}
        initialValues={workData || { ...emptyWork }}
        render={({ handleSubmit, values }) => {
          const workType = values[WorkKeys.WorkType]
          return (
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
                    formatMessage(comicsMessages.workName),
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
                  toDataSet(
                    formatMessage(commonMessages.appId),
                    <AppCheckboxes
                      name={WorkKeys.AppId}
                      options={[
                        {
                          id: 1,
                          name: 'SHJP01I'
                        },
                        {
                          id: 2,
                          name: 'SHJP01A'
                        },
                        {
                          id: 3,
                          name: 'BROWSER_RENSAI'
                        }
                      ]}
                    />
                  ),
                  {
                    label: formatMessage(messages.category),
                    classes: workData ? 'display' : undefined,
                    content: (
                      <Field name={WorkKeys.WorkType} component={SelectAdapter} options={workTypeOptions} isShort />
                    )
                  },
                  ...(workType === WorkType.Episode
                    ? [
                        {
                          label: formatMessage(messages.reduction),
                          classes: workData ? 'display' : undefined,
                          content: (
                            <Field
                              name={WorkKeys.ReturnAdRevenue}
                              component={SelectAdapter}
                              options={reductions}
                              isShort
                            />
                          )
                        }
                      ]
                    : []),
                  ...(workType === WorkType.Magazine
                    ? [
                        toDataSet(
                          formatMessage(commonMessages.subscriptionId),
                          <Field
                            name={WorkKeys.SubscriptionId}
                            component={SelectAdapter}
                            options={[{ label: 'subs', value: '2' }]}
                          />
                        )
                      ]
                    : [])
                ]}
              />
              <StartEndForm
                innerRef={deliveryRef}
                title={formatMessage(commonMessages.deliveryDuration)}
                classnames={clsx(classes.tableClass, classes.tableMargin)}
                startLabel={formatMessage(commonMessages.deliveryStartDateTime)}
                startName={WorkKeys.PublishBeginAt}
                endLabel={formatMessage(commonMessages.deliveryEndDateTime)}
                endName={WorkKeys.PublishEndAt}
              />
              <Condition when={WorkKeys.WorkType} is={WorkType.Episode}>
                <>
                  <DataTable
                    innerRef={episodeInfoRef}
                    title={formatMessage(comicsMessages.episodeInfo)}
                    tableClass={clsx(classes.tableClass, classes.tableMargin)}
                    dataSet={[
                      toDataSet(
                        formatMessage(messages.episodeCategory),
                        <Field
                          name={WorkKeys.EpisodeWorkType}
                          component={SelectAdapter}
                          options={episodeTypeOptions}
                          isShort
                        />
                      ),
                      toDataSet(
                        formatMessage(messages.episodeFrequency),
                        <Field name={WorkKeys.UpdateFrequency} component={TextInputAdapter} />
                      ),
                      toDataSet(
                        formatMessage(messages.freePeriodicalDay),
                        <Field name={WorkKeys.FreePeriodicalDay} component={TextInputAdapter} />
                      ),
                      toDataSet(
                        formatMessage(messages.rensai),
                        <Field name={WorkKeys.MagazineName} component={TextInputAdapter} />
                      ),
                      ..._range(1, IMAGE_NUM + 1).map(index =>
                        toDataSet(
                          `${formatMessage(comicsMessages.episodeImage)}${index}`,
                          <Field
                            name={`${WorkKeys.Images}.image${index}`}
                            className={classes.photo}
                            component={DropZoneAdapter}
                          />
                        )
                      )
                    ]}
                  />
                  <Field name={WorkKeys.AdSetting} subscription={{ pristine: true, value: true }}>
                    {({ input: { value } }) =>
                      value?.map((_: any, index: number) => (
                        <AdSettingForm
                          key={`adSetting-${index}`}
                          adSettingRef={!index ? adSettingRef : undefined}
                          adKey={`${WorkKeys.AdSetting}[${index}]`}
                        />
                      ))
                    }
                  </Field>
                </>
              </Condition>
            </form>
          )
        }}
      />
    </>
  )
}
