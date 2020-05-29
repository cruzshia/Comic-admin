import React, { useMemo, useContext, useEffect } from 'react'
import { useIntl } from 'react-intl'
import { makeStyles } from '@material-ui/core'
import ContentHeader from '@src/components/ContentHeader'
import { DownloadBlock } from '@src/components/styled'
import ListTable from '@src/components/table/ListTable'
import { DetailText } from '@src/components/table/CsvImportLogTable'
import usePaging from '@src/hooks/usePaging'
import { errorColor, fontWeightBold } from '@src/common/styles'
import commonMessages from '@src/messages'
import { BREADCRUMBS } from '../constants'
import UserContext, { ActionContext } from '../context/UserContext'

const useStyles = makeStyles({
  listTable: {
    '& > .MuiGrid-root': {
      marginTop: '5px'
    },
    '& .ListTable-col-1,& .ListTable-col-2': {
      width: 150
    },
    '& .ListTable-col-3': {
      width: 270
    },
    '& .ListTable-col-4': {
      width: 80
    }
  },

  error: {
    color: errorColor,
    fontWeight: fontWeightBold,
    '& > svg': {
      marginRight: '6px'
    }
  },
  fileName: {
    '& svg': {
      marginLeft: '5px'
    }
  }
})

export default function UserExportLogs() {
  const { formatMessage } = useIntl()
  const classes = useStyles()
  const { csvExportLogs, csvExportLogsTotal } = useContext(UserContext)
  const { onGetUserExportLogList } = useContext(ActionContext)
  const titleText = formatMessage(commonMessages.csvExportLogs)
  const { pagination, handlePageChange } = usePaging({ total: csvExportLogsTotal })

  useEffect(() => {
    onGetUserExportLogList()
  }, [onGetUserExportLogList])

  const breadcrumbList = useMemo(
    () =>
      BREADCRUMBS.map(({ title, route }) => ({ title: formatMessage(title), route })).concat([
        {
          title: titleText,
          route: undefined
        }
      ]),
    [formatMessage, titleText]
  )

  const theadList = [
    { id: 'createDateTime', label: formatMessage(commonMessages.createDateTime) },
    { id: 'updateDateTime', label: formatMessage(commonMessages.updateDateTime) },
    { id: 'fileName', label: formatMessage(commonMessages.filename) },
    { id: 'status', label: formatMessage(commonMessages.status) },
    { id: 'detail', label: formatMessage(commonMessages.detail) }
  ]

  const displayData = csvExportLogs.map(({ fileName, detail, ...item }) => ({
    ...item,
    fileName: <DownloadBlock filename={fileName} />,
    detail: <DetailText status={item.status} detail={detail} />
  }))

  return (
    <>
      <ContentHeader breadcrumbList={breadcrumbList} titleText={titleText} />
      <ListTable
        classnames={classes.listTable}
        theadList={theadList}
        dataList={displayData}
        pagination={pagination}
        onPageChange={handlePageChange}
      />
    </>
  )
}
