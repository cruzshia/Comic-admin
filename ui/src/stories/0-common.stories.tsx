import React from 'react'
import { action } from '@storybook/addon-actions'
import { storiesOf, addDecorator } from '@storybook/react'
import { text } from '@storybook/addon-knobs'
import LayoutContext from '@src/containers/Layout/context'
import SideBar from '@src/containers/Layout/components/SideBar'
import Header from '@src/containers/Layout/components/Header'
import HeaderTabMenu from '@src/containers/Layout/components/HeaderTabMenu'
<<<<<<< HEAD
import SearchInput from '@src/components/form/SearchInput'
import Select from '@src/components/form/Select'
import TextInput from '@src/components/form/TextInput'
=======
import DropZone from '@src/components/DropZone'
>>>>>>> 05cb9f28f2805b9e42b03eb83b6fd7dfcc62beb0

addDecorator(storyFn => (
  <LayoutContext.Provider value={{ headTab: text('headTab', 'comics') }}>{storyFn()}</LayoutContext.Provider>
))

storiesOf('common components', module)
  .add('Header', () => <Header />)
  .add('HeaderTabMenu', () => <HeaderTabMenu />)
  .add('Sidebar', () => <SideBar />)
  .add('SearchInput', () => <SearchInput />)
  .add('Long Select', () => <Select list={[1, 2, 3, 4, 5]} />)
  .add('Short Select', () => <Select isShort list={[1, 2, 3, 4, 5]} />)
  .add('Text Input', () => <TextInput />)
  .add('DropZone', () => <DropZone onDropAccepted={action('Drop accepted')} onDropRejected={action('Drop rejected')} />)
