import React, { forwardRef } from 'react'
import { makeStyles } from '@material-ui/core'
import MPagination from '@material-ui/lab/Pagination'
import PaginationItem from '@material-ui/lab/PaginationItem'
import { ReactComponent as PrevIco } from '@src/assets/common/arrow_previos.svg'
import { ReactComponent as NextIco } from '@src/assets/common/arrow_next.svg'
import { borderColorLight, backgroundColor, disableColor, contentWidth } from '@src/common/styles'

const icons = {
  previous: () => <PrevIco />,
  next: () => <NextIco />
}
const useStyle = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: '15px',
    maxWidth: contentWidth,
    '& li:last-child, li:first-child': {
      '& .MuiPaginationItem-page': {
        width: 48
      }
    },
    '& li:first-child .MuiPaginationItem-page': {
      borderRadius: '4px 0 0 4px'
    },
    '& li:last-child .MuiPaginationItem-page': {
      borderRadius: '0 4px 4px 0'
    },
    '& .MuiPaginationItem-page.Mui-selected': {
      fontWeight: 600,
      background: backgroundColor
    },
    '& .MuiPaginationItem-page.Mui-disabled': {
      opacity: 1,
      color: disableColor
    }
  },
  page: {
    minWidth: 36,
    height: 36,
    margin: 0,
    borderRadius: 0,
    border: `1px solid ${borderColorLight}`,
    fontSize: '14px',
    backgroundColor: '#FFFFFF',
    borderRightWidth: 0
  },
  last: {
    borderRightWidth: 1
  }
})

interface Props {
  total: number
  onChange: (e: React.ChangeEvent<unknown>, page: number) => void
}

export default function Pagination({ total, onChange }: Props) {
  const classes = useStyle()
  return (
    <MPagination
      data-testid='pagination'
      className={classes.root}
      count={total}
      variant='outlined'
      shape='rounded'
      boundaryCount={10}
      onChange={onChange}
      renderItem={(item: any) => (
        <PaginationItem
          {...item}
          className={classes.page}
          component={forwardRef(({ children, className, ...rest }: any, ref: React.Ref<HTMLDivElement | null>) => (
            <div
              ref={ref}
              data-testid={`${item.type}-${item.page}`}
              className={className + (item.type === 'next' ? ` ${classes.last}` : '')}
              {...rest}
            >
              {item.type !== 'page' ? icons[item.type as keyof typeof icons]() : children}
            </div>
          ))}
        />
      )}
    />
  )
}
