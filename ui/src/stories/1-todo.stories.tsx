import React from 'react'
import { storiesOf } from '@storybook/react'
import { linkTo } from '@storybook/addon-links'
import { action } from '@storybook/addon-actions'

storiesOf('todo components', module)
  .add('Header Menu Item', () => (
    <>
      <h3 onClick={action('title clicked')}>expected props</h3>
      <ul>
        <li onClick={linkTo('common components', 'Sidebar')}>title</li>
        <li>icon: string</li>
        <li>route path: string</li>
      </ul>
    </>
  ))
  .add('Sidebar Item', () => (
    <>
      <h3>expected props</h3>
      <ul>
        <li>title: string</li>
        <li>route path: string</li>
      </ul>
    </>
  ))
  .add('breadcrumb component', () => (
    <>
      <h3>expected props</h3>
      <ul>
        <li>breads: Array, &#123; route: string, title: string &#125;[]</li>
      </ul>
    </>
  ))
  .add('common button', () => (
    <>
      <h3>expected props</h3>
      <ul>
        <li>text: string</li>
        <li>color: grey or red</li>
        <li>onClick: function</li>
        <li>classes: string</li>
      </ul>
    </>
  ))
  .add('input component', () => (
    <>
      <h3>expected props</h3>
      <ul>
        <li>label?: string</li>
        <li>type?: string</li>
        <li>classes: string</li>
      </ul>
    </>
  ))
