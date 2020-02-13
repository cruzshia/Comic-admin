import React from 'react'
import { storiesOf } from '@storybook/react'
import SideBar from '@src/components/SideBar'
import Header from '@src/components/Header'
import { boolean, text } from '@storybook/addon-knobs'

storiesOf('common components', module)
  .add('Sidebar', () => <SideBar />)
  .add('Header', () => <Header isLogin={boolean('isLogin', true)} title={text('title', 'Raise')} />)
