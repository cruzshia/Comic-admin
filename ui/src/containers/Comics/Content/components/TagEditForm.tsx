import React from 'react'
import { useIntl } from 'react-intl'
import { Field } from 'react-final-form'
import { useFieldArray } from 'react-final-form-arrays'
import { Grid, makeStyles } from '@material-ui/core'
import TextInput from '@src/components/form/TextInput'
import Button, { Theme } from '@src/components/Button/Button'
import { ReactComponent as AddCircleIcon } from '@src/assets/form/add_circle.svg'
import { checkError } from '@src/utils/validation'
import messages from '../messages'

const TAG_FIELD = 'tags'

const useStyle = makeStyles({
  margin: {
    marginBottom: '15px',
    '& button': {
      marginLeft: '15px'
    }
  }
})

export default function TagEditForm({ tagKey }: { tagKey?: string }) {
  const classes = useStyle()
  const { fields } = useFieldArray<any>(tagKey || TAG_FIELD)
  const { formatMessage } = useIntl()
  const handleAdd = () => fields.push('')

  return (
    <>
      {fields.map(name => (
        <Field key={name} name={name}>
          {({ input, meta }) => (
            <Grid className={classes.margin} container alignItems='center'>
              <TextInput {...input} error={checkError(meta)} />
            </Grid>
          )}
        </Field>
      ))}
      <Button
        theme={Theme.DARK_BORDER}
        icon={AddCircleIcon}
        buttonText={formatMessage(messages.addTag)}
        onClick={handleAdd}
      />
    </>
  )
}
