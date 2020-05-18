import React, { useState } from 'react'
import { useIntl } from 'react-intl'
import Button, { Theme } from '@src/components/Button/Button'
import { makeStyles, TextField, Grid } from '@material-ui/core'
import commonMessages from '@src/messages'
import { borderColorLight } from '@src/common/styles'

const useStyles = makeStyles({
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

export default function NGWordForm({ ngWord, onSubmit }: { ngWord: string; onSubmit: (ngWord: string) => void }) {
  const { formatMessage } = useIntl()
  const classes = useStyles()
  const [currentWord, setCurrentNgWord] = useState<string>(ngWord)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentNgWord(e.target.value)
  }
  const handleClick = () => onSubmit(currentWord)

  return (
    <Grid data-testId='ng-word-form' className={classes.box} container direction='column'>
      <TextField
        multiline
        variant='outlined'
        color='secondary'
        className={classes.textArea}
        rows={40}
        value={currentWord}
        onChange={handleChange}
      />
      <Button theme={Theme.DARK} buttonText={formatMessage(commonMessages.create)} onClick={handleClick} />
    </Grid>
  )
}
