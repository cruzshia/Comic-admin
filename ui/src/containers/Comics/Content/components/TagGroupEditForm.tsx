import React from 'react'
import { useIntl } from 'react-intl'
import { Field } from 'react-final-form'
import { useFieldArray } from 'react-final-form-arrays'
import { Grid, makeStyles } from '@material-ui/core'
import Select from '@src/components/form/Select'
import Button, { Theme } from '@src/components/Button/Button'
import { ReactComponent as AddCircleIcon } from '@src/assets/form/add_circle.svg'
import { checkError } from '@src/utils/validation'
import messages from '../messages'

const TAG_GROUP_FIELD = 'tagGroups'

const useStyle = makeStyles({
  margin: {
    marginBottom: '15px',
    '& button': {
      marginLeft: '15px'
    }
  }
})

interface Props {
  tagGroupKey?: string
  options: {
    label: string
    value: any
  }[]
}

export default function TagGroupEditForm({ tagGroupKey, options }: Props) {
  const classes = useStyle()
  const { fields } = useFieldArray<any>(tagGroupKey || TAG_GROUP_FIELD)
  const { formatMessage } = useIntl()
  const handleAdd = () => fields.push('')

  return (
    <>
      {fields.map(name => (
        <Field key={name} name={name}>
          {({ input, meta }) => (
            <Grid className={classes.margin} container alignItems='center'>
              <Select options={options} {...input} error={checkError(meta)} />
            </Grid>
          )}
        </Field>
      ))}
      <Button
        theme={Theme.DARK_BORDER}
        icon={AddCircleIcon}
        buttonText={formatMessage(messages.addTagGroup)}
        onClick={handleAdd}
      />
    </>
  )
}
