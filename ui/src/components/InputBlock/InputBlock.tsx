import React, { PropsWithChildren } from 'react'
import { DragElementWrapper, DragSourceOptions, DragPreviewOptions } from 'react-dnd'
import { Grid, makeStyles } from '@material-ui/core'
import { backgroundColorLightGray, disableColorDark, textColor } from '@src/common/styles'
import menuIcon from '@src/assets/common/menu.svg'
import { ReactComponent as CloseIcon } from '@src/assets/common/close.svg'
import clsx from 'clsx'

interface Prop {
  onDelete?: () => void
  dndProp?: {
    drag: DragElementWrapper<DragSourceOptions>
    drop: DragElementWrapper<any>
    preview: DragElementWrapper<DragPreviewOptions>
  }
}

const useStyle = makeStyles({
  root: {
    position: 'relative',
    width: 920,
    padding: '20px 40px 21px 15px',
    backgroundColor: backgroundColorLightGray,
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.1)',
    borderRadius: '4px'
  },
  menu: {
    minWidth: 24,
    marginRight: '30px'
  },
  delete: {
    position: 'absolute',
    right: '-12px',
    top: '-12px',
    cursor: 'pointer',
    '& path': {
      fill: disableColorDark,
      '&:hover': {
        fill: textColor
      }
    }
  },
  cursor: {
    cursor: 'pointer'
  }
})

export default function InputBlock({ dndProp, onDelete, children }: PropsWithChildren<Prop>) {
  const classes = useStyle()
  const { drag, drop, preview } = dndProp || {
    drag: undefined,
    drop: undefined,
    preview: undefined
  }

  return (
    <div ref={drop}>
      <div className={clsx(classes.root)} ref={preview}>
        <Grid container>
          <img className={clsx(classes.menu, { [classes.cursor]: !!dndProp })} src={menuIcon} ref={drag} alt='menu' />
          <CloseIcon className={classes.delete} onClick={onDelete} data-testid='del-ico' />
          {children}
        </Grid>
      </div>
    </div>
  )
}
