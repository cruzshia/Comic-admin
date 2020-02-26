import React from 'react'
import { storiesOf } from '@storybook/react'
import { select } from '@storybook/addon-knobs'
import LayoutContext from '@src/containers/Layout/context'
import SideBar from '@src/containers/Layout/components/SideBar'
import Header from '@src/containers/Layout/components/Header'
import HeaderTabMenu from '@src/containers/Layout/components/HeaderTabMenu'

storiesOf('Layout components', module)
  .addDecorator(storyFn => (
    <LayoutContext.Provider
      value={{
        headTab: select(
          'headTab',
          {
            comics: 'comics',
            home: '/'
          },
          'comics'
        )
      }}
    >
      {storyFn()}
    </LayoutContext.Provider>
  ))
  .add('Header', () => <Header />)
  .add('HeaderTabMenu', () => <HeaderTabMenu />)
  .add('Sidebar', () => <SideBar />)
