import React from 'react'
import { storiesOf } from '@storybook/react'
import SideBar from '@src/containers/Layout/components/SideBar'
import Header from '@src/containers/Layout/components/Header'
import HeaderTabMenu from '@src/containers/Layout/components/HeaderTabMenu'

storiesOf('common components', module)
  .add('Header', () => <Header isLogin={true} />)
  .add('HeaderTabMenu', () => <HeaderTabMenu isLogin={true} />)
  .add('Sidebar', () => <SideBar />)
