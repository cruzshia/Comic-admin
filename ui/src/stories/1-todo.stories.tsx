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
        <li>route: string</li>
        <li>
          selected: boolean
          <p>
            <img alt='Header Menu Item' src='/storybook-assets/header-menu-item.png' />
          </p>
        </li>
      </ul>
    </>
  ))
  .add('Sidebar Item', () => (
    <>
      <h3>expected props</h3>
      <ul>
        <li>title: string</li>
        <li>route: string</li>
        <li>
          selected: boolean
          <p>
            <img alt='Sidebar Item' src='/storybook-assets/side-bar-menu-item.png' />
          </p>
        </li>
      </ul>
    </>
  ))
  .add('breadcrumb component', () => (
    <>
      <h3>expected props</h3>
      <ul>
        <li>
          breads: Array, &#123; route: string, title: string &#125;[]
          <p>
            <img alt='breadcrumb component' src='/storybook-assets/breadcrumb-component.png' />
          </p>
        </li>
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
        <li>
          classes: string // for customize button class
          <p>
            <img alt='common button' src='/storybook-assets/common-button.png' />
          </p>
        </li>
      </ul>
    </>
  ))
  .add('input component', () => (
    <>
      <h3>expected props</h3>
      <ul>
        <li>label?: string</li>
        <li>type?: string</li>
        <li>
          classes: string
          <p>
            <img alt='input component' src='/storybook-assets/input-component.png' />
          </p>
        </li>
      </ul>
    </>
  ))
