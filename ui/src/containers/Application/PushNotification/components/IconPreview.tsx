import React, { useState, useCallback } from 'react'
import { Field, useField } from 'react-final-form'
import { useIntl } from 'react-intl'
import { makeStyles, Grid } from '@material-ui/core'
import { borderColor } from '@src/common/styles'
import TextFieldAdapter from '@src/components/finalForm/TextInputAdapter'
import Button from '@src/components/Button/Button'
import commonMessages from '@src/messages'
import messages from '../messages'

const useStyles = makeStyles({
  iconPreview: {
    border: `1px dashed ${borderColor}`,
    height: 126,
    width: 126,
    marginTop: '15px'
  },
  button: {
    marginLeft: '10px'
  },
  img: {
    marginTop: '15px',
    maxWidth: 126
  }
})

export default function IconPreview() {
  const { formatMessage } = useIntl()
  const classes = useStyles()
  const [url, setUrl] = useState<string>('')
  const value = useField('bigIconUrl').input.value

  const handleClick = useCallback(() => {
    setUrl(value)
  }, [setUrl, value])

  return (
    <div>
      <Grid container>
        <Field name='bigIconUrl' component={TextFieldAdapter} placeholder={formatMessage(messages.inputUrl)} />
        <Button classnames={classes.button} buttonText={formatMessage(commonMessages.preview)} onClick={handleClick} />
      </Grid>
      {url ? <img className={classes.img} alt='iconPreview' src={url} /> : <div className={classes.iconPreview} />}
    </div>
  )
}
