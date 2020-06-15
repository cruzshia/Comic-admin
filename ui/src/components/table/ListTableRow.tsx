import React from 'react'
import { TableCell, TableRow, makeStyles } from '@material-ui/core'
import clsx from 'clsx'
import { backgroundColor } from '@src/common/styles'

interface Props {
  headers: { id: string; formatter?: (data: any) => any }[]
  items: { [key: string]: any }
  onClick?: () => void
  classnames?: string
}

const useStyles = makeStyles({
  root: {
    '& .MuiTableCell-root': {
      padding: '15px 10px',
      '&:first-child': {
        paddingLeft: 20
      },
      '&:last-child': {
        paddingRight: 20
      }
    },
    '&.MuiTableRow-hover:hover': {
      backgroundColor
    },
    '& img': {
      height: 60,
      width: 60,
      objectFit: 'cover'
    },
    '&:hover': {
      cursor: 'pointer'
    }
  }
})

export default function ListTableRow({ items, onClick, classnames, headers }: Props) {
  const classes = useStyles({ pointer: !!onClick })
  return (
    <TableRow hover className={clsx(classes.root, classnames)} data-testid='list-table-row' onClick={onClick}>
      {headers.map(({ id, formatter }) => (
        <TableCell data-testid='list-table-row-cell' key={id}>
          {formatter ? formatter(items) : items[id]}
        </TableCell>
      ))}
    </TableRow>
  )
}
