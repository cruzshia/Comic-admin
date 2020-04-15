import React, { useMemo, useContext, useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import { useIntl } from 'react-intl'
import Button, { Theme } from '@src/components/Button/Button'
import { routePath } from '@src/common/appConfig'
import ContentHeader from '@src/components/ContentHeader'
import { ReactComponent as EditIcon } from '@src/assets/common/pen.svg'
import ListTable from '@src/components/table/ListTable'
import { usePaging } from '@src/hooks'
import { BREADCRUMBS } from '../constants'
import messages from '../messages'
import ApplicationInfoContext from '../context/ApplicationInfoContext'
import applicationMessages from '../../messages'

export default function ApplicationInfoList() {
  const history = useHistory()
  const { formatMessage } = useIntl()
  const { infoList, infoTotal } = useContext(ApplicationInfoContext)
  const { pagination, handlePageChange } = usePaging({ total: infoTotal })

  const breadcrumbList = useMemo(() => BREADCRUMBS.map(({ title }) => ({ title: formatMessage(title) })), [
    formatMessage
  ])
  const buttonList = useMemo(
    () => [
      <Button
        theme={Theme.DARK_BORDER}
        icon={EditIcon}
        buttonText={formatMessage(messages.create)}
        onClick={() => {
          history.push(routePath.application.applicationInfoCreation)
        }}
      />
    ],
    [formatMessage, history]
  )

  const theadList = useMemo(
    () => [
      { id: 'applicationId', label: formatMessage(applicationMessages.applicationId) },
      { id: 'applicationName', label: formatMessage(messages.applicationName) },
      { id: 'commonKey', label: formatMessage(messages.commonKey) }
    ],
    [formatMessage]
  )

  const listTableData = useMemo(
    () =>
      infoList.map(data => ({
        id: data.applicationId,
        data
      })),
    [infoList]
  )

  return (
    <>
      <ContentHeader breadcrumbList={breadcrumbList} titleText={formatMessage(messages.list)} buttonList={buttonList} />
      <ListTable
        theadList={theadList}
        dataList={listTableData}
        pagination={pagination}
        onPageChange={handlePageChange}
        onRowClick={useCallback(
          id => {
            history.push(routePath.application.applicationInfoDetail.replace(':id', id))
          },
          [history]
        )}
      />
    </>
  )
}
