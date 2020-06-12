import React from 'react'
import { makeStyles } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import { borderColorLight, contentWidth, minWidth, lightColorHover, backgroundColorLightGray } from '@src/common/styles'
import { ReactComponent as PenIcon } from '@src/assets/common/pen.svg'
import DataTableRow, { LABEL_WIDTH } from './DataTableRow'
import clsx from 'clsx'

const useStyle = makeStyles({
  table: {
    maxWidth: contentWidth,
    minWidth: innerTable => (innerTable ? `calc(100% - ${LABEL_WIDTH}px)` : minWidth),
    border: `2px solid ${borderColorLight}`,
    borderRadius: '4px'
  },
  marginBottom: {
    marginBottom: '30px'
  },
  subTitle: {
    padding: '15px 20px',
    backgroundColor: backgroundColorLightGray,
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
      cursor: 'pointer',
      backgroundColor: lightColorHover
    },
    '& svg, path': {
      fill: '#000000'
    }
  },
  innerTable: {
    margin: '-20px',
    border: 'none',
    '& .MuiGrid-container .MuiGrid-item': {
      maxWidth: 'calc(100% - 120px)',
      wordBreak: 'break-all',
      '&:first-child': {
        maxWidth: 120
      }
    }
  }
})

export interface DataSet {
  label: string
  content: any
  isSubTitle?: boolean
  classes?: string
}

export const toDataSet = (label: string, content?: any, isSubTitle?: boolean) => ({
  label,
  content: content || '',
  isSubTitle
})

export const toPreWrapDataSet = (label: string, content?: string | JSX.Element) => ({
  label,
  content: <Box whiteSpace='pre-wrap'>{content || ''}</Box>
})

interface Props {
  title?: string
  onEdit?: () => void
  dataSet: DataSet[]
  tableClass?: string
  innerRef?: React.RefObject<HTMLDivElement>
  innerTable?: boolean
  marginBottom?: boolean
  buttons?: JSX.Element
  titleClass?: string
}

export default function DataTable({
  title,
  dataSet,
  tableClass,
  onEdit,
  innerRef,
  innerTable,
  marginBottom,
  buttons,
  titleClass
}: Props) {
  const classes = useStyle(!!innerTable)

  return dataSet.length ? (
    <div className={marginBottom ? classes.marginBottom : ''} ref={innerRef} data-testid='data-table-container'>
      {(title || onEdit) && (
        <Box
          display='flex'
          justifyContent='space-between'
          alignItems='center'
          marginBottom='15px'
          maxWidth={contentWidth}
          className={titleClass}
        >
          <Typography variant='subtitle1' data-testid='data-table-title'>
            {title}
          </Typography>
          {onEdit && <PenIcon onClick={onEdit} className={classes.penIcon} data-testid='data-table-button' />}
          {buttons}
        </Box>
      )}
      <div className={clsx(classes.table, tableClass, { [classes.innerTable]: innerTable })} data-testid='data-table'>
        {dataSet.map((data, idx) =>
          data.isSubTitle ? (
            <Typography
              variant='subtitle2'
              className={clsx(classes.subTitle, data.classes)}
              key={data.content.toString() + idx}
              data-testid='data-table-subtitle'
            >
              {data.content}
            </Typography>
          ) : (
            <DataTableRow
              key={data.label + idx}
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
