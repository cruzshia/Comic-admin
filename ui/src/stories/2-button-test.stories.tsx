import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { text, boolean, select, radios } from '@storybook/addon-knobs'
import ActionButton from '../components/Button/ActionButton'
import Button from '../components/Button/Button'
import { ButtonTheme } from '../components/Button/buttonTheme'
import IconSave from '@src/assets/form/button_save.svg'
import IconPublish from '@src/assets/form/button_publish.svg'

storiesOf('common buttons', module)
  .add('ActionButton', () => (
    <>
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
    </>
  ))
  .add('Button', () => (
    <>
      <Button
        theme={select('theme', { dark: ButtonTheme.DARK, light: ButtonTheme.LIGHT }, ButtonTheme.DARK)}
        buttonText={'CSV登録'}
        onClick={action('button-click')}
        disabled={boolean('disabled', false)}
        icon={radios('icon-img', { save: IconSave, publish: IconPublish }, IconSave)}
      />
    </>
  ))
