import React, { useMemo } from 'react'
import { useIntl } from 'react-intl'
import { makeStyles } from '@material-ui/core'
import ListTable, { Props as ListTableProps, SortOrder, Thead } from './ListTable'
import commonMessages from '@src/messages'

const useStyle = makeStyles(() => ({
  table: {
    marginTop: '-55px',
    '& .ListTable-col-2, .ListTable-col-3': {
      width: 132
    },
    '& .ListTable-col-5': {
      width: 270
    },
    '& .ListTable-col-6': {
      width: 80
    },
    '& .ListTable-col-7': {
      width: 280
    }
  }
}))

interface Props extends Omit<ListTableProps, 'theadList'> {
  theadList?: Thead[]
  onSort?: (id: any, order: SortOrder, e?: React.MouseEvent<unknown>) => void
}

export default function CsvImportLogTable({ theadList, onSort, ...restProps }: Props) {
  const classes = useStyle()
  const { formatMessage } = useIntl()
  const defaultTheadList = useMemo(
    () => [
      { id: 'createAt', label: formatMessage(commonMessages.createDateTime), onSort },
      { id: 'scheduledAt', label: formatMessage(commonMessages.scheduledDateTime) },
      { id: 'startAt', label: formatMessage(commonMessages.startDateTime) },
      { id: 'updateAt', label: formatMessage(commonMessages.updateDateTime) },
      { id: 'filename', label: formatMessage(commonMessages.filename) },
      { id: 'status', label: formatMessage(commonMessages.status) },
      { id: 'detail', label: formatMessage(commonMessages.detail) }
    ],
    [formatMessage, onSort]
  )

  return <ListTable classnames={classes.table} theadList={theadList || defaultTheadList} {...restProps} />
}
