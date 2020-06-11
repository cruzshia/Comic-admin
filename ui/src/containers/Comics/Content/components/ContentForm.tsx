import React, { useRef, useMemo } from 'react'
import { useIntl } from 'react-intl'
import { Form, Field } from 'react-final-form'
import arrayMutators from 'final-form-arrays'
import {
  TextInputAdapter,
  SelectAdapter,
  TextAreaAdapter,
  DropZoneAdapter,
  SearchInputAdapter,
  CheckboxInputAdapter,
  Condition
} from '@src/components/finalForm'
import DataTable, { toDataSet } from '@src/components/table/DataTable'
import ScrollTo from '@src/components/scroll/ScrollTo'
import Content from '@src/models/comics/content'
import { emptyContent } from '@src/reducers/comics/content/contentReducer'
import { _range } from '@src/utils/functions'
import { WorkType } from '@src/models/comics/work'
import StartEndGroupForm from './StartEndGroupForm'
import { workTypes } from '../../utils'
import commonMessages from '@src/messages'
import AdSettingForm from '../../components/AdSettingForm'
import comicMessages from '../../messages'
import messages from '../messages'
import AuthorEditForm from '../../components/AuthorEditForm'
import MagazineForm from './MagazineForm'
import { MAGAZINE_BANNER_NUM } from '../constants'

interface Props {
  content?: Content
  onFormSubmit: (data: Content) => void
  formRef?: React.RefObject<HTMLFormElement> | null
}

export enum ContentAnchor {
  Delivery = 'delivery',
  FreePPV = 'freePPV',
  AdSetting = 'adSetting',
  Magazine = 'magazine'
}

export default function ContentForm({ content, onFormSubmit, formRef }: Props) {
  const { formatMessage } = useIntl()
  const deliveryRef = useRef<HTMLDivElement>(null)
  const freePPVRef = useRef<HTMLDivElement>(null)
  const adSettingRef = useRef<HTMLDivElement>(null)
  const magazineRef = useRef<HTMLDivElement>(null)
  const allAnchors = {
    [ContentAnchor.Delivery]: deliveryRef,
    [ContentAnchor.FreePPV]: freePPVRef,
    [ContentAnchor.AdSetting]: adSettingRef,
    [ContentAnchor.Magazine]: magazineRef
  }

  const workTypeOptions = useMemo(
    () =>
      workTypes.map(({ label, value }) => ({
        label: formatMessage(label),
        value
      })),
    [formatMessage]
  )

  return (
    <>
      <ScrollTo anchorRef={allAnchors} />
      <Form
        onSubmit={onFormSubmit}
        mutators={{ ...arrayMutators }}
        subscription={{ pristine: true, values: true }}
        initialValues={content || emptyContent}
        render={({ handleSubmit, values }) => (
          <form onSubmit={handleSubmit} ref={formRef}>
            <DataTable
              title={formatMessage(commonMessages.basicInfo)}
              dataSet={[
                toDataSet(formatMessage(commonMessages.contentId), content?.id),
                toDataSet(
                  formatMessage(commonMessages.contentName),
                  <Field name='title' component={TextInputAdapter} />
                ),
                toDataSet(formatMessage(messages.titleKana), <Field name='titleKana' component={TextInputAdapter} />),
                toDataSet(
                  formatMessage(messages.category),
                  <Field name='category' component={SelectAdapter} options={workTypeOptions} isShort />
                ),
                toDataSet(
                  formatMessage(commonMessages.introduction),
                  <Field name='description' component={TextAreaAdapter} options={[]} isShort />
                ),
                toDataSet(formatMessage(commonMessages.author), <AuthorEditForm />),
                toDataSet(
                  formatMessage(commonMessages.appId),
                  <Field name='appId' component={SelectAdapter} options={[]} />
                ),
                toDataSet(formatMessage(comicMessages.workId), <Field name='workId' component={TextAreaAdapter} />),
                toDataSet(
                  formatMessage(comicMessages.contentPrice),
                  <Field name='price' component={TextInputAdapter} short />
                ),
                toDataSet(
                  formatMessage(messages.openAdUrl),
                  <Field name='openingAdUrl' component={TextInputAdapter} />
                ),
                toDataSet(formatMessage(messages.sort), <Field name='sort' component={TextInputAdapter} short />),
                toDataSet(
                  formatMessage(messages.limitedTimeFree),
                  <Field name='limitedTimeFree' type='checkbox' component={CheckboxInputAdapter} />
                ),
                toDataSet(
                  formatMessage(comicMessages.episodeNumber),
                  <Field name='episodeNumber' component={TextInputAdapter} short />
                ),
                toDataSet(
                  formatMessage(messages.thumbnailImage),
                  <Field name='thumbnail' component={DropZoneAdapter} />
                ),
                toDataSet(formatMessage(messages.openAdImage), <Field name='adImage' component={DropZoneAdapter} />),
                toDataSet(
                  formatMessage(messages.requestContentId),
                  <Field name='requestId' component={SearchInputAdapter} />
                )
              ]}
              marginBottom
            />
            <StartEndGroupForm
              innerRef={deliveryRef}
              title={formatMessage(commonMessages.deliveryDuration)}
              startLabel1={formatMessage(commonMessages.deliveryStartDateTime)}
              startName1='deliverStart'
              endLabel1={formatMessage(commonMessages.deliveryEndDateTime)}
              endName1='deliverEnd'
              startLabel2={formatMessage(messages.paidCoinStartTime)}
              startName2={values.category === WorkType.Episode ? 'paidCoinDeliverStart' : undefined}
              endLabel2={formatMessage(messages.paidCoinEndTime)}
              endName2='paidCoinDeliverEnd'
            />
            <Condition when='category' is={WorkType.Episode}>
              <StartEndGroupForm
                innerRef={freePPVRef}
                title={formatMessage(messages.freePPVDuration)}
                startLabel1={formatMessage(messages.freePPVStart, { num: 1 })}
                startName1='freePPVStart1'
                endLabel1={formatMessage(messages.freePPVEnd, { num: 1 })}
                endName1='freePPVEnd1'
                startLabel2={formatMessage(messages.freePPVStart, { num: 2 })}
                startName2='freePPVStart2'
                endLabel2={formatMessage(messages.freePPVEnd, { num: 2 })}
                endName2='freePPVEnd2'
              />
              <AdSettingForm marginBottom />
            </Condition>
            <Condition when='category' is={WorkType.Magazine}>
              <DataTable
                innerRef={magazineRef}
                title={formatMessage(messages.magazineBannerSetting)}
                dataSet={[
                  toDataSet(
                    formatMessage(comicMessages.deviceCategory),
                    <Field
                      name='advertisement.deviceCategory'
                      component={SelectAdapter}
                      placeholder={formatMessage(commonMessages.common)}
                      options={[]}
                      isShort
                    />
                  ),
                  ..._range(0, MAGAZINE_BANNER_NUM).map(num =>
                    toDataSet(
                      `${formatMessage(messages.magazineBannerSetting)}${num + 1}`,
                      <MagazineForm name={`magazineBanner.contents[${num}]`} />
                    )
                  )
                ]}
              />
            </Condition>
          </form>
        )}
      ></Form>
    </>
  )
}
