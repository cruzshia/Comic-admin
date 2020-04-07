import React from 'react'
import { TableCell, TableRow, makeStyles } from '@material-ui/core'
import clsx from 'clsx'

interface Props {
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

export default function ListTableRow({ items, onClick, classnames }: Props) {
  const classes = useStyles({ pointer: !!onClick })
  return (
    <TableRow className={clsx(classes.root, classnames)} data-testid='list-table-row' onClick={onClick}>
      {Object.keys(items).map(key => (
        <TableCell key={key}>{items[key]}</TableCell>
      ))}
    </TableRow>
  )
}
