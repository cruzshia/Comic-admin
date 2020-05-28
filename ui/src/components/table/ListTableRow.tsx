import React from 'react'
import { TableCell, TableRow, makeStyles } from '@material-ui/core'
import clsx from 'clsx'
import { backgroundColor } from '@src/common/styles'

interface Props {
  headerKeys: string[]
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

export default function ListTableRow({ items, onClick, classnames, headerKeys }: Props) {
  const classes = useStyles({ pointer: !!onClick })
  return (
    <TableRow hover className={clsx(classes.root, classnames)} data-testid='list-table-row' onClick={onClick}>
      {headerKeys.map(key => (
        <TableCell data-testid='list-table-row-cell' key={key}>
          {items[key]}
        </TableCell>
      ))}
    </TableRow>
  )
}
