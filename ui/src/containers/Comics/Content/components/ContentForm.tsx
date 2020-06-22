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
  Condition
} from '@src/components/finalForm'
import DataTable, { toDataSet } from '@src/components/table/DataTable'
import ScrollTo from '@src/components/scroll/ScrollTo'
import Content, { ContentKeys } from '@src/models/comics/content'
import { emptyContent } from '@src/reducers/comics/content/contentReducer'
import { _range } from '@src/utils/functions'
import { WorkType } from '@src/models/comics/work'
import { SettingType, DeviceType } from '@src/models/comics/advertisement'
import AppCheckboxes from '@src/containers/Comics/components/AppCheckboxes'
import commonMessages from '@src/messages'
import StartEndGroupForm from './StartEndGroupForm'
import { workTypes } from '../../utils'
import AdSettingBlock from '../../components/AdSettingBlock'
import comicMessages from '../../messages'
import messages from '../messages'
import AuthorEditForm from '../../components/AuthorEditForm'
import MagazineForm from './MagazineForm'
import { MAGAZINE_BANNER_NUM, validateContent } from '../utils'
import LabelCheckbox from '../../components/LabelCheckbox'
import TagGroupEditForm from './TagGroupEditForm'
import TagEditForm from './TagEditForm'

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

const mockAppList = [
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
]

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

  const adSettingTitle = formatMessage(commonMessages.advertisementSetting)
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
        validate={validateContent}
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
                  formatMessage(messages.subtitle),
                  <Field name='subtitle' component={TextInputAdapter} isShort />
                ),
                toDataSet(
                  formatMessage(commonMessages.introduction),
                  <Field name='description' component={TextAreaAdapter} isShort />
                ),
                toDataSet(formatMessage(commonMessages.author), <AuthorEditForm />),
                toDataSet(formatMessage(commonMessages.appId), <AppCheckboxes name='appId' options={mockAppList} />),
                toDataSet(formatMessage(comicMessages.workId), <Field name='workId' component={TextAreaAdapter} />),
                toDataSet(
                  formatMessage(comicMessages.contentPrice),
                  <Field name='price' component={TextInputAdapter} short />
                ),
                toDataSet(formatMessage(messages.sort), <Field name='sort' component={TextInputAdapter} short />),
                toDataSet(
                  formatMessage(messages.limitedTimeFree),
                  <LabelCheckbox
                    name='limitedTimeFree'
                    value='limitedTimeFree'
                    label={formatMessage(messages.isLimitedTimeFree)}
                  />
                ),
                toDataSet(
                  formatMessage(comicMessages.episodeNumber),
                  <Field name='episodeNumber' component={TextInputAdapter} short />
                ),
                toDataSet(
                  formatMessage(comicMessages.volumeNumber),
                  <Field name='volumeNumber' component={TextInputAdapter} short />
                ),
                toDataSet(
                  formatMessage(messages.thumbnailImage),
                  <Field name='thumbnail' component={DropZoneAdapter} />
                ),
                toDataSet(
                  formatMessage(messages.requestContentId),
                  <Field name='requestId' component={SearchInputAdapter} />
                ),
                toDataSet(
                  formatMessage(messages.requestSubscriptionId),
                  <Field name='requestSubscriptionId' component={SearchInputAdapter} />
                ),
                toDataSet(formatMessage(messages.tagGroup), <TagGroupEditForm options={[]} />),
                toDataSet(formatMessage(messages.tag), <TagEditForm />),
                toDataSet(
                  formatMessage(messages.deliveryUrl),
                  <Field name='deliveryUrl' component={TextInputAdapter} />
                ),
                toDataSet(
                  formatMessage(messages.allowComment),
                  <LabelCheckbox
                    name='allowComment'
                    value='allowComment'
                    label={formatMessage(messages.beAllowedComment)}
                  />
                ),
                toDataSet(
                  formatMessage(messages.allowStartWithExtraServer),
                  <LabelCheckbox
                    name='allowStartWithExtraServer'
                    value='allowStartWithExtraServer'
                    label={formatMessage(messages.beAllowStartWithExtraServer)}
                  />
                ),
                toDataSet(
                  formatMessage(messages.notDisplayTodayRanking),
                  <LabelCheckbox
                    name='notDisplayTodayRanking'
                    value='notDisplayTodayRanking'
                    label={formatMessage(messages.notDisplay)}
                  />
                ),
                toDataSet(
                  formatMessage(messages.allowPrContent),
                  <LabelCheckbox
                    name='allowPrContent'
                    value='allowPrContent'
                    label={formatMessage(messages.beAllowPrContent)}
                  />
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
              <DataTable
                title={formatMessage(commonMessages.advertisementSetting)}
                dataSet={[
                  toDataSet(
                    formatMessage(comicMessages.deviceCategory),
                    <Field
                      name={ContentKeys.SettingType}
                      component={SelectAdapter}
                      options={Object.values(SettingType).map(device => ({
                        label: formatMessage(commonMessages[device as keyof typeof commonMessages]),
                        value: device
                      }))}
                      isShort
                      placeholder={formatMessage(commonMessages.common)}
                    />
                  ),
                  ...(values[ContentKeys.SettingType] === SettingType.Common
                    ? [
                        toDataSet(
                          adSettingTitle,
                          <AdSettingBlock adKey={`${ContentKeys.AdSettingEdit}.${DeviceType.Common}`} />
                        )
                      ]
                    : [
                        toDataSet(
                          formatMessage(commonMessages.ios) + adSettingTitle,
                          <AdSettingBlock adKey={`${ContentKeys.AdSettingEdit}.${DeviceType.IOS}`} />
                        ),
                        toDataSet(
                          formatMessage(commonMessages.android) + adSettingTitle,
                          <AdSettingBlock adKey={`${ContentKeys.AdSettingEdit}.${DeviceType.Android}`} />
                        )
                      ])
                ]}
                innerRef={adSettingRef}
              />
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
