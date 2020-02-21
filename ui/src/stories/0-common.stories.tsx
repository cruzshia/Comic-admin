import React from 'react'
import { action } from '@storybook/addon-actions'
import { storiesOf, addDecorator } from '@storybook/react'
import { text } from '@storybook/addon-knobs'
import LayoutContext from '@src/containers/Layout/context'
import SideBar from '@src/containers/Layout/components/SideBar'
import Header from '@src/containers/Layout/components/Header'
import HeaderTabMenu from '@src/containers/Layout/components/HeaderTabMenu'
import DropZone from '@src/components/DropZone'

addDecorator(storyFn => (
  <LayoutContext.Provider value={{ headTab: text('headTab', 'comics') }}>{storyFn()}</LayoutContext.Provider>
))

storiesOf('common components', module)
  .add('Header', () => <Header />)
  .add('HeaderTabMenu', () => <HeaderTabMenu />)
  .add('Sidebar', () => <SideBar />)
  .add('DropZone', () => <DropZone onDropAccepted={action('Drop accepted')} onDropRejected={action('Drop rejected')} />)
