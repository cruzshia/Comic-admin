import React, { useMemo, useContext, useCallback, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useIntl } from 'react-intl'
import { makeStyles } from '@material-ui/core'
import { routePath } from '@src/common/appConfig'
import { ApplicationInfoKeys } from '@src/models/application/applicationInfo'
import { usePaging } from '@src/hooks'
import Button, { Theme } from '@src/components/Button/Button'
import ContentHeader from '@src/components/ContentHeader'
import { ReactComponent as EditIcon } from '@src/assets/common/pen.svg'
import ListTable from '@src/components/table/ListTable'
import ApplicationInfoContext, { ActionContext } from '../context/ApplicationInfoContext'
import { BREADCRUMBS } from '../constants'
import messages from '../messages'
import applicationMessages from '../../messages'

const useStyle = makeStyles({
  table: {
    '& .ListTable-col-1': {
      width: 200
    }
  }
})

export default function ApplicationInfoList() {
  const history = useHistory()
  const classes = useStyle()
  const { formatMessage } = useIntl()
  const { infoList, infoTotal } = useContext(ApplicationInfoContext)
  const { onGetApplicationInfoList } = useContext(ActionContext)
  const { pagination, handlePageChange } = usePaging({ total: infoTotal })

  useEffect(() => {
    onGetApplicationInfoList()
  }, [onGetApplicationInfoList])

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
      { id: ApplicationInfoKeys.AppIdToken, label: formatMessage(applicationMessages.applicationId) },
      { id: ApplicationInfoKeys.Name, label: formatMessage(messages.applicationName) }
    ],
    [formatMessage]
  )

  return (
    <>
      <ContentHeader breadcrumbList={breadcrumbList} titleText={formatMessage(messages.list)} buttonList={buttonList} />
      <ListTable
        theadList={theadList}
        dataList={infoList}
        pagination={pagination}
        onPageChange={handlePageChange}
        tableClass={classes.table}
        rowIdKey={ApplicationInfoKeys.AppIdToken}
        onRowClick={useCallback(id => history.push(routePath.application.applicationInfoDetail.replace(':id', id)), [
          history
        ])}
      />
    </>
  )
}
