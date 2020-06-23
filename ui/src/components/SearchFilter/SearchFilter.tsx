import React, { useState, useCallback } from 'react'
import { useIntl } from 'react-intl'
import { FORM_ERROR } from 'final-form'
import { Form } from 'react-final-form'
import { Paper, Grid, makeStyles } from '@material-ui/core'
import expandImg from '@src/assets/common/expand_more_black.svg'
import { borderColorLight, backgroundColorLight, contentWidth, minWidth } from '@src/common/styles'
import ActionButton from '@src/components/Button/ActionButton'
import Button from '@src/components/Button/Button'
import useBreakpoint from '@src/hooks/useBreakpoint'
import { ButtonTheme } from '../Button/buttonTheme'
import commonMessages from '@src/messages'
import messages from './messages'
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
  onSubmit: (data: any) => void
  conditions: Conditions
  formRef?: React.RefObject<HTMLFormElement>
  disableExpand?: boolean
  disableReset?: boolean
  validate?: (data: any) => object | undefined
  width?: string | number
}

const useStyles = makeStyles(() => ({
  root: {
    maxWidth: contentWidth,
    minWidth,
    '& > div': {
      padding: '20px 40px',
      borderColor: borderColorLight
    }
  },
  left: {
    paddingRight: '40px',
    margin: '-7.5px 0',
    '&.margin': {
      marginBottom: '12px'
    },
    '& + div': {
      margin: '-7.5px 0'
    }
  },
  item: {
    margin: '7.5px 0',
    width: '100%',
    '& .title': {
      fontSize: 12,
      fontWeight: 600,
      width: ({ width }: { width?: string | number }) => (width ? width : 120)
    },
    '& .MuiGrid-item:not(.title)': {
      maxWidth: 'calc(100% - 120px)',
      flexGrow: 1
    },
    '&.hide': {
      display: 'none'
    }
  },
  expand: {
    height: 30,
    marginTop: '12.5px',
    backgroundColor: backgroundColorLight,
    cursor: 'pointer',
    '&.fold > img': {
      transform: 'rotate(180deg)'
    }
  },
  buttons: {
    marginTop: '15px',
    maxWidth: contentWidth,
    minWidth
  }
}))

export default function SearchFilter({
  onSubmit,
  conditions,
  formRef,
  disableExpand,
  disableReset,
  validate,
  width
}: Props) {
  const { formatMessage } = useIntl()
  const [isExpand, setIsExpand] = useState<boolean>(!!disableExpand)
  const classes = useStyles({ width })
  const { isSearchResponsive } = useBreakpoint()
  const gridSize = isSearchResponsive ? 12 : 6
  const generateItem = useCallback(
    (side: Item[]) =>
      side.map((item: Item, idx) => {
        const hide = !isExpand && idx > 2
        return (
          <Grid
            key={item.label}
            container
            alignItems='center'
            className={clsx(classes.item, { hide })}
            wrap='nowrap'
            data-testid={hide ? '' : 'search_filter_item'}
          >
            <Grid item className='title' data-testid={hide ? '' : 'search-filter-item-label'}>
              {item.label}
            </Grid>
            <Grid item>{item.input}</Grid>
          </Grid>
        )
      }),
    [isExpand, classes.item]
  )
  const handleExpand = useCallback(() => setIsExpand(isExpand => !isExpand), [setIsExpand])
  const formValidation = (values: object) => {
    const customCheckError = validate ? validate(values) : {}
    return {
      [FORM_ERROR]: !Object.values(values).some((val: string | number) => String(val).trim() !== '')
        ? formatMessage(commonMessages.errorEmptyInput)
        : undefined,
      ...(customCheckError || {})
    }
  }

  return (
    <div data-testid='search_filter'>
      <Form
        onSubmit={onSubmit}
        validate={formValidation}
        render={({ handleSubmit, form: { reset }, error, valid }) => (
          <form onSubmit={handleSubmit} ref={formRef}>
            <Grid container direction='column' className={classes.root}>
              <Paper variant='outlined'>
                <Grid container wrap='nowrap' justify='space-evenly' direction={isSearchResponsive ? 'column' : 'row'}>
                  <Grid
                    container
                    data-testid='search-filter-items-left'
                    direction='column'
                    item
                    xs={gridSize}
                    className={clsx(classes.left, { margin: isSearchResponsive })}
                  >
                    {generateItem(conditions.left)}
                  </Grid>
                  <Grid container direction='column' item xs={gridSize} data-testid='search-filter-items-right'>
                    {generateItem(conditions.right)}
                  </Grid>
                </Grid>
                {!disableExpand && conditions.left.length > 3 && (
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
            <Grid container justify='space-between' className={classes.buttons} data-testid='search-filter-buttons'>
              <ActionButton
                theme={ButtonTheme.DARK}
                buttonText={formatMessage(messages.search)}
                type='submit'
                disabled={!!error || !valid}
              />
              {!disableReset && (
                <Button
                  theme={ButtonTheme.LIGHT}
                  buttonText={formatMessage(messages.reset)}
                  onClick={reset}
                  disabled={!!error}
                />
              )}
            </Grid>
          </form>
        )}
      />
    </div>
  )
}
