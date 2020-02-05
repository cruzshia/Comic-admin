import React from 'react'
import { storiesOf } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import { HashRouter as Router } from 'react-router-dom'
import { IntlProvider } from 'react-intl'
import SideBar from '@src/components/SideBar'
import Header from '@src/components/Header'
import ja from '@src/translation/ja.json'
import { addDecorator } from '@storybook/react'

addDecorator(withInfo)
addDecorator(storyFn => (
  <Router>
    <IntlProvider locale='ja' messages={ja}>
      {storyFn()}
    </IntlProvider>
  </Router>
))

storiesOf('common components', module)
  .add('Sidebar component', () => <SideBar />)
  .add('Header component', () => <Header isLogin={true} />)
