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
import Pagination from '@src/components/table/Pagination'
import { ReactComponent as SortImg } from '@src/assets/common/expand_more.svg'
import { mainColor, backgroundColor, borderColor, borderColorLight, contentWidth } from '@src/common/styles'
import { PAGE_LIMIT } from '@src/common/constants'
import ListTableRow from './ListTableRow'
import messages from './messages'
import clsx from 'clsx'

export enum SortOrder {
  Asc = 'asc',
  Desc = 'desc'
}

export enum Padding {
  Checkbox = 'checkbox',
  Default = 'default',
  None = 'none'
}

interface Thead {
  id: string
  label: string | JSX.Element
  onSort?: (id: any, order?: SortOrder, e?: React.MouseEvent<unknown>) => void
  padding?: Padding
  classes?: string
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
  classnames?: string
  theadList: Thead[]
  dataList: RowData[]
  tableClass?: string
  buttonList?: JSX.Element[]
  pagination: Pagination
  onPageChange: (event: React.ChangeEvent<unknown>, page: number) => void
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
  theadList,
  dataList,
  classnames,
  tableClass,
  buttonList,
  pagination: { start, total },
  onPageChange,
  onRowClick,
  sortOrder = 'desc',
  sortBy
}: Props) {
  const classes = useStyles()
  const { formatMessage } = useIntl()

  const handleSort = useCallback(
    (id, sortFunction, sortOrder) => (e: React.MouseEvent<HTMLTableHeaderCellElement, MouseEvent>) =>
      sortFunction(id, sortOrder, e),
    []
  )
  const handleRowClick = useCallback((id: string) => () => onRowClick!(id), [onRowClick])

  return (
    <div className={classnames} data-testid='list-table'>
      <Grid container justify='space-between' alignItems='center' className={classes.pagination}>
        <div>{formatMessage(messages.pagination, { total: 1000, start, end: start + PAGE_LIMIT - 1 })}</div>
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
              {theadList.map(({ id, label, onSort, padding, classes }, index) => {
                const sorting = sortBy === id
                const sortClass = clsx({ sortable: !!onSort, sorting })
                return (
                  <TableCell
                    align='left'
                    key={id}
                    padding={padding}
                    className={clsx(`ListTable-col-${index + 1}`, classes, sortClass)}
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
                        active={sorting}
                        direction={sorting ? sortOrder : 'desc'}
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
      <Pagination total={Math.ceil(total / PAGE_LIMIT)} onChange={onPageChange} />
    </div>
  )
}
