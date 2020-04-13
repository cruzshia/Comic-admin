import React, { useMemo, useContext } from 'react'
import { useIntl } from 'react-intl'
import { Grid, makeStyles } from '@material-ui/core'
import UserContext from '../context/UserContext'
import ContentHeader from '@src/components/ContentHeader'
import ListTable from '@src/components/table/ListTable'
import { ReactComponent as DownloadIcon } from '@src/assets/common/download.svg'
import { ReactComponent as AlertIcon } from '@src/assets/form/error_alert.svg'
import usePaging from '@src/hooks/usePaging'
import useSort from '@src/hooks/useSort'
import { errorColor, fontWeightBold } from '@src/common/styles'
import commonMessages from '@src/messages'
import { BREADCRUMBS } from '../constants'

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
    '& > svg': {
      marginLeft: '10px'
    }
  }
})

export default function UserExportLogs() {
  const { formatMessage } = useIntl()
  const classes = useStyles()
  const { csvExportLogs, csvLogsTotal } = useContext(UserContext)
  const titleText = formatMessage(commonMessages.csvExportLogs)
  const { pagination, handlePageChange } = usePaging({ total: csvLogsTotal })
  const { sortBy, handleSort } = useSort('createDateTime')
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
    { id: 'createDateTime', label: formatMessage(commonMessages.createDateTime), onSort: handleSort },
    { id: 'updateDateTime', label: formatMessage(commonMessages.updateDateTime) },
    { id: 'fileName', label: formatMessage(commonMessages.filename) },
    { id: 'status', label: formatMessage(commonMessages.status) },
    { id: 'detail', label: formatMessage(commonMessages.detail) }
  ]

  const displayData = csvExportLogs
    .map(({ id, fileName, status, detail, ...res }) => ({
      id,
      data: {
        ...res,
        fileName: (
          <Grid container alignItems='center' className={classes.fileName}>
            {fileName}
            <DownloadIcon />
          </Grid>
        ),
        status,
        detail:
          status === 'failure' ? (
            <Grid container alignItems='center' className={classes.error}>
              <AlertIcon />
              {formatMessage(commonMessages.errorAsyncFailed)}
            </Grid>
          ) : (
            detail
          )
      }
    }))
    .sort((a, b) => (Date.parse(a.data.createDateTime) - Date.parse(b.data.createDateTime)) * sortBy.multiplier)

  return (
    <>
      <ContentHeader breadcrumbList={breadcrumbList} titleText={titleText} />
      <ListTable
        classnames={classes.listTable}
        theadList={theadList}
        dataList={displayData}
        pagination={pagination}
        onPageChange={handlePageChange}
        sortOrder={sortBy.order}
        sortBy={sortBy.key}
      />
    </>
  )
}
