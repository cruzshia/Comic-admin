import React, { PropsWithChildren } from 'react'
import { Grid, makeStyles } from '@material-ui/core'
import { backgroundColorLightGray } from '@src/common/styles'
import clsx from 'clsx'
import menuIcon from '@src/assets/common/menu.svg'
import closeIcon from '@src/assets/common/close.svg'

interface Prop {
  onDelete?: () => void
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
    marginRight: '30px'
  },
  delete: {
    position: 'absolute',
    right: '-12px',
    top: '-12px',
    cursor: 'pointer'
  }
})

export default function InputBlock({ onDelete, children }: PropsWithChildren<Prop>) {
  const classes = useStyle()
  return (
    <div className={clsx(classes.root)}>
      <Grid container>
        <img className={classes.menu} src={menuIcon} alt='menu' />
        <img className={classes.delete} onClick={onDelete} src={closeIcon} alt='del' data-testid='del-ico' />
        {children}
      </Grid>
    </div>
  )
}
