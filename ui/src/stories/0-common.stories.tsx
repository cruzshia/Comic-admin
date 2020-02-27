import React from 'react'
import { action } from '@storybook/addon-actions'
import { storiesOf } from '@storybook/react'
import { text, select, boolean } from '@storybook/addon-knobs'
import TableRowContainer from '@src/components/table/TableRowContainer'
import SearchInput from '@src/components/form/SearchInput'
import Select from '@src/components/form/Select'
import TextInput from '@src/components/form/TextInput'
import DropZone from '@src/components/DropZone'
import TextArea from '@src/components/form/TextArea'
import ActionButton from '@src/components/Button/ActionButton'
import Button from '@src/components/Button/Button'
import { ButtonTheme } from '@src/components/Button/buttonTheme'
import { ReactComponent as IconSave } from '@src/assets/form/button_save.svg'

storiesOf('Common components', module)
  .add('TextArea', () => <TextArea />)
  .add('TableRow', () => <TableRowContainer content={<TextArea />} title='Textfield' />)
  .add('SearchInput', () => <SearchInput />)
  .add('Long Select', () => <Select list={[1, 2, 3, 4, 5]} />)
  .add('Short Select', () => <Select isShort list={[1, 2, 3, 4, 5]} />)
  .add('TextInput', () => <TextInput />)
  .add('DropZone', () => <DropZone onDropAccepted={action('Drop accepted')} onDropRejected={action('Drop rejected')} />)
  .add('ActionButton', () => (
    <ActionButton
      theme={select(
        'theme',
        {
          dark: ButtonTheme.DARK,
          light: ButtonTheme.LIGHT
        },
        ButtonTheme.DARK
      )}
      buttonText={text('buttonText', '検索する')}
      onClick={action('action-button-click')}
      disabled={boolean('disabled', false)}
    />
  ))
  .add('Button', () => (
    <Button
      theme={select('theme', { dark: ButtonTheme.DARK, light: ButtonTheme.LIGHT }, ButtonTheme.DARK)}
      buttonText={'CSV登録'}
      onClick={action('button-click')}
      disabled={boolean('disabled', false)}
      icon={IconSave}
    />
  ))
