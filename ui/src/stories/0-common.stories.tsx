import React from 'react'
import { Form } from 'react-final-form'
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
import StickyBar from '@src/components/StickyBar'
import ContentHeader from '@src/components/ContentHeader/ContentHeader'
import { ButtonTheme } from '@src/components/Button/buttonTheme'
import { topOffset } from '@src/common/styles'
import TimeSpanInput from '@src/components/form/TimeSpanInput'
import SearchFilter from '@src/components/SearchFilter'
import { ReactComponent as IconSave } from '@src/assets/form/button_save.svg'
import { mockSearchFilterData } from '@src/components/SearchFilter/mockData'

const setError = () => select('error', ['', 'error', '項目が入力されていません'], '')

storiesOf('Common components', module)
  .add('SearchInput', () => <SearchInput icon={boolean('icon', false)} error={setError()} />)
  .add('Select', () => (
    <Select
      isShort={boolean('isShort', false)}
      options={[
        { label: 1, value: 1 },
        { label: 2, value: 2 }
      ]}
      error={setError()}
    />
  ))
  .add('TextArea', () => <TextArea error={setError()} />)
  .add('TextInput', () => <TextInput error={setError()} />)
  .add('TimeSpanInput', () => (
    <Form
      onSubmit={() => {}}
      render={() => (
        <form>
          <TimeSpanInput isRequired />
        </form>
      )}
    />
  ))
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
  .add('SearchFilter', () => <SearchFilter conditions={mockSearchFilterData} onSubmit={action('submit')} />)
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
  .add('StickyBar', () => (
    <>
      <StickyBar top={10}>
        <ContentHeader
          breadcrumbList={[{ title: 'マンガ管理' }, { title: '作品管理', route: '/comics/work' }]}
          titleText='作品登録'
          buttonList={[
            <Button theme={ButtonTheme.DARK} buttonText='登録する' onClick={action('button-click')} disabled={false} />
          ]}
        />
      </StickyBar>
      {/* Code below is for demo */}
      <p style={{ height: '120vh' }}>
        This is mock page content, once <b>scroll</b> to{' '}
        <b>header height(currently {topOffset}px) + top prop(currently 10px)</b>, stickybar will show up
      </p>
    </>
  ))
