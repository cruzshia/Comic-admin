import React, { useCallback } from 'react'
import { useIntl } from 'react-intl'
import {
  Paper,
  TableContainer,
  TableBody,
  TableHead,
  styled,
  TableRow,
  TableCell,
  Table,
  makeStyles,
  Grid,
  TableSortLabel
} from '@material-ui/core'
import { ReactComponent as SortImg } from '@src/assets/common/expand_more.svg'
import { mainColor, backgroundColor, borderColor, borderColorLight, contentWidth } from '@src/common/styles'
import ListTableRow from './ListTableRow'
import messages from './messages'
import clsx from 'clsx'

interface ListTableTitle {
  id: string
  label: string
  onSort?: (id: any, order?: 'asc' | 'desc', e?: React.MouseEvent<unknown>) => void
}

interface Pagination {
  total: number
  start: number
}

interface RowData {
  id: string
  data: { [key: string]: any }
}

interface Props {
  titleList: ListTableTitle[]
  dataList: RowData[]
  tableClass?: string
  buttonList?: JSX.Element[]
  pagination: Pagination
  onRowClick?: (id: string) => void
  sortOrder?: 'asc' | 'desc'
  sortBy?: string
}

const Container = styled(Paper)({
  border: `2px solid ${borderColorLight}`,
  boxShadow: 'none',
  maxWidth: contentWidth,
  '& .MuiTableCell-root': {
    overflowWrap: 'break-word',
    fontSize: 12
  },
  '& table': {
    tableLayout: 'fixed'
  },
  '& tbody .MuiTableRow-root:last-child .MuiTableCell-root': {
    borderBottom: 'none'
  }
})

const useStyles = makeStyles({
  tableHeadRow: {
    '& .MuiTableCell-root': {
      padding: '9px 10px',
      border: 'none',
      borderBottom: `2px solid ${borderColor}`,
      lineHeight: '18px',
      '&:first-child': {
        paddingLeft: 23
      },
      '&:last-child': {
        paddingRight: 23
      },
      '&:hover .MuiTableSortLabel-icon': {
        opacity: 0.5
      }
    },
    '& .MuiTableSortLabel': {
      '&-root': {
        color: mainColor,
        '& svg path': {
          fill: mainColor
        }
      },
      '&-icon': {
        color: 'auto'
      },
      '&-iconDirectionAsc': { transform: 'rotate(180deg)' }
    },
    '& .sortable': {
      color: mainColor
    },
    '& .sorting, .sortable:hover': {
      backgroundColor,
      fontWeight: 600,
      cursor: 'pointer'
    }
  },
  pagination: {
    margin: '60px 0 20px 0',
    maxWidth: contentWidth,
    '& .MuiButtonBase-root': {
      margin: '0 5px',
      '&:last-child': {
        marginRight: 0
      }
    }
  }
})

export default function ListTable({
  titleList,
  dataList,
  tableClass,
  buttonList,
  pagination: { total, start },
  onRowClick,
  sortOrder = 'desc',
  sortBy
}: Props) {
  const classes = useStyles()
  const { formatMessage } = useIntl()

  const handleSort = useCallback(
    (id, sortFunction, sortOrder) => (e: React.MouseEvent<unknown>) => {
      sortFunction && sortFunction(id, sortOrder, e)
    },
    []
  )
  const handleRowClick = useCallback(
    (id: string) => () => {
      onRowClick && onRowClick(id)
    },
    [onRowClick]
  )

  return (
    <div data-testid='list-table'>
      <Grid container justify='space-between' alignItems='center' className={classes.pagination}>
        <div>{formatMessage(messages.pagination, { total, start, end: start + dataList.length - 1 })}</div>
        <div>
          {buttonList?.map((button, index) => (
            <React.Fragment key={index}>{button}</React.Fragment>
          ))}
        </div>
      </Grid>
      <TableContainer component={Container}>
        <Table>
          <TableHead>
            <TableRow className={clsx(classes.tableHeadRow, tableClass)}>
              {titleList.map(({ id, label, onSort }, index) => {
                const sortClass = clsx({ sortable: !!onSort, sorting: sortBy === id })
                return (
                  <TableCell
                    align='left'
                    key={id}
                    className={clsx(`col${index}`, sortClass)}
                    onClick={onSort && handleSort(id, onSort, sortOrder)}
                    data-testid={sortClass}
                  >
                    {onSort ? (
                      <TableSortLabel
                        children={label}
                        IconComponent={props => (
                          <SortImg
                            {...props}
                            preserveAspectRatio='xMidYMid slice'
                            height={10}
                            width={24}
                            data-testid='sort-icon'
                          />
                        )}
                        active={sortBy === id}
                        direction={sortBy === id ? sortOrder : 'desc'}
                        data-testid={id}
                      />
                    ) : (
                      label
                    )}
                  </TableCell>
                )
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {dataList.map(data => (
              <ListTableRow items={data.data} key={data.id} onClick={onRowClick && handleRowClick(data.id)} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}
