import React from 'react'
import { makeStyles } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'

import DataTableRow from './DataTableRow'
import { borderColorLight, contentWidth } from '@src/common/styles'
import { ReactComponent as PenIcon } from '@src/assets/common/pen.svg'
import clsx from 'clsx'

const useStyle = makeStyles({
  table: {
    maxWidth: contentWidth,
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
  classes?: string
}

interface Props {
  title?: string
  onEdit?: () => void
  dataSet: DataSet[]
  tableClass?: string
  innerRef?: React.RefObject<HTMLDivElement>
}

export default function DataTable({ title, dataSet, tableClass, onEdit, innerRef }: Props) {
  const classes = useStyle()

  return dataSet.length ? (
    <div ref={innerRef}>
      {(title || onEdit) && (
        <Box
          display='flex'
          justifyContent='space-between'
          alignItems='center'
          marginBottom='15px'
          maxWidth={contentWidth}
        >
          <Typography variant='subtitle1'>{title}</Typography>
          {onEdit && <PenIcon onClick={onEdit} className={classes.penIcon} />}
        </Box>
      )}
      <div className={clsx(classes.table, tableClass)} data-testid='data-table'>
        {dataSet.map(data =>
          data.isSubTitle ? (
            <Typography
              variant='subtitle2'
              className={clsx(classes.subTitle, data.classes)}
              key={data.content.toString()}
            >
              {data.content}
            </Typography>
          ) : (
            <DataTableRow
              key={data.label}
              classnames={clsx(classes.rowItem, data.classes)}
              title={data.label}
              content={data.content}
            />
          )
        )}
      </div>
    </div>
  ) : null
}
