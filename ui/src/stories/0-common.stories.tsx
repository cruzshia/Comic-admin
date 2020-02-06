import React from 'react'
import { storiesOf } from '@storybook/react'
import SideBar from '@src/components/SideBar'
import Header from '@src/components/Header'

storiesOf('common components', module)
  .add('Sidebar component', () => <SideBar />)
  .add('Header component', () => <Header isLogin={true} />)
