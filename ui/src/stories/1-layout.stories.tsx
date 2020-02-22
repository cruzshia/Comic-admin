import React from 'react'
import { storiesOf, addDecorator } from '@storybook/react'
import { text } from '@storybook/addon-knobs'
import LayoutContext from '@src/containers/Layout/context'
import SideBar from '@src/containers/Layout/components/SideBar'
import Header from '@src/containers/Layout/components/Header'
import HeaderTabMenu from '@src/containers/Layout/components/HeaderTabMenu'

addDecorator(storyFn => (
  <LayoutContext.Provider value={{ headTab: text('headTab', 'comics') }}>{storyFn()}</LayoutContext.Provider>
))

storiesOf('Layout components', module)
  .add('Header', () => <Header />)
  .add('HeaderTabMenu', () => <HeaderTabMenu />)
  .add('Sidebar', () => <SideBar />)
