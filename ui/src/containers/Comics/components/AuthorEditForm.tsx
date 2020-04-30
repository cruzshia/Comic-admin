import React, { useCallback } from 'react'
import { useIntl } from 'react-intl'
import { Field } from 'react-final-form'
import { FieldArray } from 'react-final-form-arrays'
import { Mutators } from 'final-form-arrays'
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

const AUTHOR_FIELD = 'author'
export default function AuthorEditForm({ prefix, mutators }: { prefix?: string; mutators: Mutators }) {
  const classes = useStyle()
  const { formatMessage } = useIntl()
  const handleAdd = useCallback(() => mutators.push(AUTHOR_FIELD, ''), [mutators])

  return (
    <FieldArray name={prefix || AUTHOR_FIELD}>
      {({ fields }) =>
        fields.map((name, idx) => {
          return (
            <Field key={name} name={name}>
              {({ input, meta }) => (
                <>
                  <Grid className={classes.margin} container alignItems='center'>
                    <SearchInput {...input} error={checkError(meta)} icon={true} />
                    {idx === 0 && (
                      <Button
                        buttonText={formatMessage(comicMessages.addNewAuthor)}
                        onClick={handleAdd}
                        icon={AddIcon}
                      />
                    )}
                  </Grid>
                  <Button
                    theme={Theme.DARK_BORDER}
                    icon={AddCircleIcon}
                    buttonText={formatMessage(comicMessages.addAuthor)}
                    onClick={() => {}}
                  />
                </>
              )}
            </Field>
          )
        })
      }
    </FieldArray>
  )
}
