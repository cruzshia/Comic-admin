import React from 'react'
import { TableCell, TableRow, makeStyles } from '@material-ui/core'

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

export default function ListTableRow({ items, onClick }: { items: { [key: string]: any }; onClick?: () => void }) {
  const classes = useStyles({ pointer: !!onClick })
  return (
    <TableRow className={classes.root} data-testid='list_table_row' onClick={onClick}>
      {Object.keys(items).map(key => (
        <TableCell key={key}>{items[key]}</TableCell>
      ))}
    </TableRow>
  )
}
