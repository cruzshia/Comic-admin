import React from 'react'
import { action } from '@storybook/addon-actions'
import { storiesOf } from '@storybook/react'
import { text, select, boolean } from '@storybook/addon-knobs'
import SearchInput from '@src/components/form/SearchInput'
import Select from '@src/components/form/Select'
import TextInput from '@src/components/form/TextInput'
import DropZone from '@src/components/DropZone'
import TextArea from '@src/components/form/TextArea'
import ActionButton from '@src/components/Button/ActionButton'
import Button from '@src/components/Button/Button'
import ContentHeader from '@src/components/ContentHeader/ContentHeader'
import { ButtonTheme } from '@src/components/Button/buttonTheme'
import { ReactComponent as IconSave } from '@src/assets/form/button_save.svg'

storiesOf('Common components', module)
  .add('TextArea', () => <TextArea />)
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
      theme={select(
        'theme',
        { dark_border: ButtonTheme.DARK_BORDER, dark: ButtonTheme.DARK, light: ButtonTheme.LIGHT },
        ButtonTheme.DARK_BORDER
      )}
      buttonText='CSV登録'
      onClick={action('button-click')}
      disabled={boolean('disabled', false)}
      icon={IconSave}
    />
  ))
  .add('ContentHeader', () => (
    <ContentHeader
      breadcrumbList={[{ title: 'マンガ管理' }, { title: '作品管理', route: '/comics/work' }, { title: '作品登録' }]}
      titleText='作品登録'
      buttonList={[
        <Button theme={ButtonTheme.DARK} buttonText='登録する' onClick={action('button-click')} disabled={false} />,
        <Button
          theme={ButtonTheme.DARK_BORDER}
          buttonText='作品を編集'
          onClick={action('button-click')}
          disabled={false}
          icon={IconSave}
        />
      ]}
    />
  ))
