import React, { useState, useCallback } from 'react'
import { Paper, Grid, makeStyles } from '@material-ui/core'
import messages from './messages'
import { useIntl } from 'react-intl'
import expandImg from '@src/assets/common/expand_more_black.svg'
import { borderColorLight, backgroundColorLight } from '@src/common/styles'
import ActionButton from '@src/components/Button/ActionButton'
import { ButtonTheme } from '../Button/buttonTheme'
import clsx from 'clsx'

interface Item {
  label: string
  input: JSX.Element
}

export interface Conditions {
  left: Item[]
  right: Item[]
}

interface Props {
  onSubmit?: () => void
  conditions: Conditions
}

const useStyles = makeStyles(() => ({
  root: {
    width: 1180,
    '&>div': {
      padding: '20px 40px',
      borderColor: borderColorLight
    }
  },
  left: {
    marginRight: 40,
    margin: '-7.5px 0',
    '&+div': {
      margin: '-7.5px 0'
    }
  },
  item: {
    margin: '7.5px 0',
    '& .title': {
      fontSize: 12,
      fontWeight: 600,
      width: 120
    }
  },
  expand: {
    height: 30,
    marginTop: 12.5,
    backgroundColor: backgroundColorLight,
    cursor: 'pointer',
    '&.fold>img': {
      transform: 'rotate(180deg)'
    }
  },
  buttons: {
    marginTop: 20,
    width: 1180,
    '& .MuiButton-root': {
      margin: '0 7.5px'
    }
  }
}))

export default function SearchFilter({ onSubmit, conditions }: Props) {
  const { formatMessage } = useIntl()
  const [isExpand, setIsExpand] = useState<boolean>(false)
  const classes = useStyles()
  const generateItem = useCallback(
    (side: Item[]) => {
      const items = isExpand ? side : side.slice(0, 3)
      return items.map((item: Item) => (
        <Grid
          key={item.label}
          container
          alignItems='center'
          className={classes.item}
          wrap='nowrap'
          data-testid='search_filter_item'
        >
          <Grid item className='title'>
            {item.label}
          </Grid>
          <Grid item>{item.input}</Grid>
        </Grid>
      ))
    },
    [isExpand, classes.item]
  )
  const handleExpand = useCallback(() => setIsExpand(isExpand => !isExpand), [setIsExpand])
  const handleReset = useCallback(() => {}, [])
  const handleSubmit = useCallback(() => {
    onSubmit && onSubmit()
  }, [onSubmit])

  return (
    <div data-testid='search_filter'>
      <Grid container direction='column' className={classes.root}>
        <Paper variant='outlined'>
          <Grid container wrap='nowrap'>
            <Grid container direction='column' className={classes.left}>
              {generateItem(conditions.left)}
            </Grid>
            <Grid container direction='column'>
              {generateItem(conditions.right)}
            </Grid>
          </Grid>
          {conditions.left.length > 3 && (
            <Grid
              container
              justify='center'
              className={clsx(classes.expand, { fold: !!isExpand })}
              onClick={handleExpand}
              data-testid='search_filter_expand'
            >
              <img src={expandImg} alt='expand' />
            </Grid>
          )}
        </Paper>
      </Grid>
      <Grid container justify='center' className={classes.buttons}>
        <ActionButton
          theme={ButtonTheme.LIGHT}
          buttonText={formatMessage(messages.reset)}
          onClick={handleReset}
          type='reset'
        />
        <ActionButton
          theme={ButtonTheme.DARK}
          buttonText={formatMessage(messages.search)}
          onClick={handleSubmit}
          type='submit'
        />
      </Grid>
    </div>
  )
}
