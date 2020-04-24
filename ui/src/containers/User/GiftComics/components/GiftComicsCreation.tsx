import React from 'react'
import { Field, Form } from 'react-final-form'
import { useIntl } from 'react-intl'
import ContentHeader from '@src/components/ContentHeader'
import { ReactComponent as IconDownload } from '@src/assets/common/download.svg'
import Button, { Theme } from '@src/components/Button/Button'
import DataTable, { toDataSet } from '@src/components/table/DataTable'
import { DATE_TIME_PLACEHOLDER } from '@src/common/constants'
import { TextInputAdapter } from '@src/components/finalForm'
import UploadButton from '../../components/UploadButton'
import { BREADCRUMBS } from '../constants'
import commonMessages from '@src/messages'
import userMessages from '../../messages'
import messages from '../messages'

export default function GiftComicsCreation() {
  const { formatMessage } = useIntl()
  const breadcrumbList = BREADCRUMBS.map(({ title }) => ({ title: formatMessage(title) }))
  const buttonList = [
    <Button theme={Theme.DARK} buttonText={formatMessage(commonMessages.create)} />,
    <Button buttonText={formatMessage(userMessages.templateJIS)} icon={IconDownload} normalCase />,
    <Button buttonText={formatMessage(userMessages.templateUTF8)} icon={IconDownload} />
  ]
  return (
    <>
      <ContentHeader
        breadcrumbList={breadcrumbList}
        titleText={formatMessage(messages.csvBatchGift)}
        buttonList={buttonList}
      />
      <Form
        onSubmit={() => {}}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <DataTable
              title={formatMessage(commonMessages.basicInfo)}
              dataSet={[
                toDataSet(
                  formatMessage(commonMessages.csvFile),
                  <UploadButton text={formatMessage(userMessages.csvFile)} name='csv_file' />
                ),
                toDataSet(
                  formatMessage(commonMessages.schedule),
                  <Field name='schedule' component={TextInputAdapter} placeholder={DATE_TIME_PLACEHOLDER} />
                )
              ]}
            />
          </form>
        )}
      />
    </>
  )
}
