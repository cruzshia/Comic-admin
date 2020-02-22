import React from 'react'
import { action } from '@storybook/addon-actions'
import { storiesOf } from '@storybook/react'
import SearchInput from '@src/components/form/SearchInput'
import Select from '@src/components/form/Select'
import TextInput from '@src/components/form/TextInput'
import DropZone from '@src/components/DropZone'

storiesOf('Common components', module)
  .add('SearchInput', () => <SearchInput />)
  .add('Long Select', () => <Select list={[1, 2, 3, 4, 5]} />)
  .add('Short Select', () => <Select isShort list={[1, 2, 3, 4, 5]} />)
  .add('Text Input', () => <TextInput />)
  .add('DropZone', () => <DropZone onDropAccepted={action('Drop accepted')} onDropRejected={action('Drop rejected')} />)
