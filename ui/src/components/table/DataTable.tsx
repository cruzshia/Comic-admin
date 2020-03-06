import React from 'react'
import { makeStyles } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'

import TableRowContainer from './TableRowContainer'
import { borderColorLight } from '@src/common/styles'
import { ReactComponent as PenIcon } from '@src/assets/common/pen.svg'
import clsx from 'clsx'

const MAX_WIDTH = 1180
const useStyle = makeStyles({
  table: {
    maxWidth: MAX_WIDTH,
    border: `2px solid ${borderColorLight}`,
    borderRadius: '4px'
  },
  subTitle: {
    padding: '20px',
    borderBottom: `2px solid ${borderColorLight}`
  },
  rowItem: {
    borderBottom: `1px solid ${borderColorLight}`,
    '&:last-child': {
      border: 'none'
    }
  },
  penIcon: {
    width: 34,
    height: 34,
    padding: '6px',
    border: `1px solid ${borderColorLight}`,
    borderRadius: '50%',
    backgroundColor: '#FFFFFF',
    '&:hover': {
      cursor: 'pointer'
    },
    '& svg, path': {
      fill: '#000000'
    }
  }
})

export interface DataSet {
  label: string
  content: string | JSX.Element
  isSubTitle?: boolean
}

interface Props {
  title?: string
  onEdit?: () => void
  dataSet: DataSet[]
  tableClass?: string
}

export default function DataTable({ title, dataSet, tableClass, onEdit }: Props) {
  const classes = useStyle()

  return dataSet.length ? (
    <>
      {(title || onEdit) && (
        <Box display='flex' justifyContent='space-between' alignItems='center' marginBottom='15px' maxWidth={MAX_WIDTH}>
          <Typography variant='subtitle1'>{title}</Typography>
          {onEdit && <PenIcon className={classes.penIcon} />}
        </Box>
      )}
      <div className={clsx(classes.table, tableClass)} data-testid='data-table'>
        {dataSet.map(data =>
          data.isSubTitle ? (
            <Typography variant='subtitle2' className={classes.subTitle} key={data.content.toString()}>
              {data.content}
            </Typography>
          ) : (
            <TableRowContainer
              key={data.label}
              classnames={classes.rowItem}
              title={data.label}
              content={data.content}
            />
          )
        )}
      </div>
    </>
  ) : null
}
