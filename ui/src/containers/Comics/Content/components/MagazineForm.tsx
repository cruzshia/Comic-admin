import React, { useState, useCallback } from 'react'
import { useFieldArray } from 'react-final-form-arrays'
import { useIntl } from 'react-intl'
import { Field } from 'react-final-form'
import { makeStyles, Grid } from '@material-ui/core'
import { ReactComponent as AddIcon } from '@src/assets/common/add_circle.svg'
import InputBlock, { InputRow } from '@src/components/InputBlock'
import { SelectAdapter, TextInputAdapter } from '@src/components/finalForm'
import { ImagePreview } from '@src/components/form'
import Button, { Theme } from '@src/components/Button/Button'
import { _uuid } from '@src/utils/functions'
import commonMessages from '@src/messages'
import comicMessages from '../../messages'
import messages from '../messages'

interface Props {
  name: string
}

const useStyle = makeStyles({
  rowContainer: {
    maxWidth: 655
  },
  margin: {
    maxWidth: 857,
    paddingLeft: '30px',
    marginBottom: '20px'
  },
  button: {
    marginLeft: '10px'
  }
})
export default function MagazineForm({ name }: Props) {
  const { fields } = useFieldArray(name)
  const classes = useStyle()
  const { formatMessage } = useIntl()
  const [previewImage, setPreviewImage] = useState<{ [key: string]: string | undefined }>({})
  const urlPlaceholder = formatMessage(commonMessages.enterUrl)

  const handleClick = useCallback(
    (image: { [key: string]: string }) => () => {
      setPreviewImage(preImage => ({
        ...preImage,
        ...image
      }))
    },
    [setPreviewImage]
  )

  const handleAdd = () => fields.push({ id: _uuid() })
  const handleDelete = (index: number) => () => fields.remove(index)

  return (
    <>
      {fields.map((name, index) => (
        <InputBlock key={fields.value[index].id} classnames={classes.margin} onDelete={handleDelete(index)} hideDnd>
          <Grid className={classes.rowContainer} container direction='row'>
            <InputRow title={formatMessage(messages.displayCondition)}>
              <Field name={`${name}.condition`} component={SelectAdapter} options={[]} />
            </InputRow>
            <InputRow title={formatMessage(comicMessages.imageUrl)}>
              <Field name={`${name}.image`} component={TextInputAdapter} placeholder={urlPlaceholder} />
              <Button
                buttonText={formatMessage(commonMessages.preview)}
                classnames={classes.button}
                onClick={handleClick({ [fields.value[index].id]: fields.value[index].image })}
              />
            </InputRow>
            <InputRow title={formatMessage(messages.transitionUrl)}>
              <Field name={`${name}.url`} component={TextInputAdapter} placeholder={urlPlaceholder} />
            </InputRow>
          </Grid>
          <ImagePreview imageUrl={previewImage[fields.value[index].id]} width={92} height={138} />
        </InputBlock>
      ))}
      <Button
        classnames={classes.button}
        theme={Theme.DARK_BORDER}
        icon={AddIcon}
        buttonText={formatMessage(messages.magazineAddCondition)}
        onClick={handleAdd}
      />
    </>
  )
}
