import React from 'react'
import { useIntl } from 'react-intl'
import clsx from 'clsx'
import { Grid, makeStyles, TextField } from '@material-ui/core'
import { borderColorLight } from '@src/common/styles'
import commonMessages from '@src/messages'
import Button, { Theme } from '@src/components/Button/Button'

interface Tab {
  id: string
  label: string
}

interface Props {
  tabList: Tab[]
  selected: string
  onTabClick: (id: string) => () => void
  onSubmit: () => void
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  value?: string
}

const useStyles = makeStyles({
  tabs: {
    transform: 'translateY(2px)',
    '& .MuiGrid-root': {
      cursor: 'pointer',
      border: `2px solid ${borderColorLight}`,
      borderRadius: '4px 4px 0 0',
      padding: '11px 18px',
      marginLeft: '5px',
      '&:first-child': {
        margin: 0
      },
      '&.selected': {
        backgroundColor: '#FFFFFF',
        borderBottom: 0
      }
    }
  },
  box: {
    border: `2px solid ${borderColorLight}`,
    backgroundColor: '#FFFFFF',
    borderRadius: '0 4px 4px',
    padding: '20px',
    marginBottom: '40px'
  },
  textArea: {
    maxWidth: '800px',
    marginBottom: '15px',
    '& .MuiInputBase-root': {
      padding: '15px',
      paddingBottom: '23px',
      '& .MuiInputBase-input': {
        whiteSpace: 'pre-wrap'
      }
    },
    '&~.MuiButtonBase-root': {
      alignSelf: 'flex-start'
    }
  }
})
export default function SwitchTab({ tabList, selected, onTabClick, value = '', onSubmit, onChange }: Props) {
  const classes = useStyles()
  const { formatMessage } = useIntl()

  return (
    <>
      <Grid container className={classes.tabs} wrap='nowrap'>
        {tabList.map(({ id, label }) => (
          <Grid key={id} className={clsx({ selected: selected === id })} onClick={onTabClick(id)}>
            {label}
          </Grid>
        ))}
      </Grid>
      <Grid container className={classes.box}>
        <Grid container direction='column'>
          <TextField
            multiline
            variant='outlined'
            color='secondary'
            className={classes.textArea}
            rows={40}
            value={value}
            onChange={onChange}
          />
          <Button theme={Theme.DARK} buttonText={formatMessage(commonMessages.create)} onClick={onSubmit} />
        </Grid>
      </Grid>
    </>
  )
}
