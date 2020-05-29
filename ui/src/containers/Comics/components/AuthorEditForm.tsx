import React from 'react'
import { useIntl } from 'react-intl'
import { Field } from 'react-final-form'
import { useFieldArray } from 'react-final-form-arrays'
import { Grid, makeStyles } from '@material-ui/core'
import SearchInput from '@src/components/form/SearchInput'
import Button, { Theme } from '@src/components/Button/Button'
import { ReactComponent as AddIcon } from '@src/assets/form/add.svg'
import { ReactComponent as AddCircleIcon } from '@src/assets/form/add_circle.svg'
import { checkError } from '@src/utils/validation'
import comicMessages from '../messages'

const useStyle = makeStyles({
  margin: {
    marginBottom: '15px',
    '& button': {
      marginLeft: '15px'
    }
  }
})

const AUTHOR_FIELD = 'authors'

export default function AuthorEditForm({ authorKey }: { authorKey?: string }) {
  const classes = useStyle()
  const { fields } = useFieldArray<any>(authorKey || AUTHOR_FIELD)
  const { formatMessage } = useIntl()
  const handleAdd = () => fields.push('')

  return (
    <>
      {fields.map((name, idx) => (
        <Field key={name} name={name}>
          {({ input, meta }) => (
            <Grid className={classes.margin} container alignItems='center'>
              <SearchInput {...input} error={checkError(meta)} />
              {idx === 0 && <Button buttonText={formatMessage(comicMessages.addNewAuthor)} icon={AddIcon} />}
            </Grid>
          )}
        </Field>
      ))}
      <Button
        theme={Theme.DARK_BORDER}
        icon={AddCircleIcon}
        buttonText={formatMessage(comicMessages.addAuthor)}
        onClick={handleAdd}
      />
    </>
  )
}
