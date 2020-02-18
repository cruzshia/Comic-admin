import React from 'react'
import { storiesOf } from '@storybook/react'
import { linkTo } from '@storybook/addon-links'
import { action } from '@storybook/addon-actions'

storiesOf('TODO components', module)
  .add('Header Menu Item', () => (
    <>
      <h2 onClick={action('title clicked')}>Expected behavior</h2>
      <ul>
        <li>
          <a
            href='https://www.figma.com/file/sZzBNfUtg6kd3O74AqoJy9/VEARTH?node-id=517%3A0'
            target='_blank'
            rel='noopener noreferrer'
          >
            UI doc
          </a>
        </li>
        <li onClick={linkTo('common components', 'Sidebar')}>display menu tab with icon</li>
        <li>if it's selected, highlight with underline</li>
        <li>
          click can route to specific page
          <p>
            <img alt='Header Menu Item' src='/header-menu-item.png' />
          </p>
        </li>
      </ul>
    </>
  ))
  .add('Menu all', () => (
    <>
      <h2>Expected behavior</h2>
      <ul>
        <li>
          <a
            href='https://www.figma.com/file/sZzBNfUtg6kd3O74AqoJy9/VEARTH?node-id=517%3A0'
            target='_blank'
            rel='noopener noreferrer'
          >
            UI doc
          </a>
        </li>
        <li>control display logic of menu top and left</li>
        <li>
          <p>
            <img alt='Mene' src='/menu.png' />
          </p>
        </li>
      </ul>
    </>
  ))
  .add('Breadcrumb component', () => (
    <>
      <h2>Expected behavior</h2>
      <ul>
        <li>
          <a
            href='https://www.figma.com/file/sZzBNfUtg6kd3O74AqoJy9/VEARTH?node-id=517%3A0'
            target='_blank'
            rel='noopener noreferrer'
          >
            UI doc
          </a>
        </li>
        <li>list breadcrumbs</li>
        <li>
          make breadcrumbs clickable if it has route prop
          <p>
            <img alt='breadcrumb component' src='/breadcrumb-component.png' />
          </p>
        </li>
      </ul>
    </>
  ))
  .add('Common button', () => (
    <>
      <h2>Expected behavior</h2>
      <ul>
        <li>
          <a
            href='https://www.figma.com/file/sZzBNfUtg6kd3O74AqoJy9/VEARTH?node-id=364%3A1031'
            target='_blank'
            rel='noopener noreferrer'
          >
            UI doc
          </a>
        </li>
        <li>display with 2 different theme (black and orange)</li>
        <li>show icon in button or not</li>
        <li>handle click action</li>
        <li>
          onClick: function
          <p>
            <img alt='common button' src='/common-button.png' />
          </p>
        </li>
      </ul>
    </>
  ))
  .add('Common action button', () => (
    <>
      <h2>Expected behavior</h2>
      <ul>
        <li>
          <a
            href='https://www.figma.com/file/sZzBNfUtg6kd3O74AqoJy9/VEARTH?node-id=364%3A1031'
            target='_blank'
            rel='noopener noreferrer'
          >
            UI doc
          </a>
        </li>
        <li>display with 2 different theme (black and orange)</li>
        <li>handle click action</li>
        <li>
          onClick: function
          <p>
            <img alt='action button' src='/action-button.png' />
          </p>
        </li>
      </ul>
    </>
  ))
  .add('Common input (for search) component', () => (
    <>
      <h2>Expected behavior</h2>
      <ul>
        <li>
          <a
            href='https://www.figma.com/file/sZzBNfUtg6kd3O74AqoJy9/VEARTH?node-id=364%3A1031'
            target='_blank'
            rel='noopener noreferrer'
          >
            UI doc
          </a>
        </li>
        <li>show placeholder</li>
        <li>
          accept onchange callback event
          <p>
            <img alt='input component' src='/input-search.png' />
          </p>
        </li>
      </ul>
    </>
  ))
  .add('Common select menu component', () => (
    <>
      <h2>Expected behavior</h2>
      <ul>
        <li>
          <a
            href='https://www.figma.com/file/sZzBNfUtg6kd3O74AqoJy9/VEARTH?node-id=364%3A1031'
            target='_blank'
            rel='noopener noreferrer'
          >
            UI doc
          </a>
        </li>
        <li>display menu options</li>
        <li>show placeholder</li>
        <li>
          accept onchange callback event
          <p>
            <img alt='input component' src='/input-select-menu.png' />
          </p>
        </li>
      </ul>
    </>
  ))
  .add('Work list item', () => (
    <>
      <h2>Expected behavior</h2>
      <ul>
        <li>
          <a
            href='https://www.figma.com/file/sZzBNfUtg6kd3O74AqoJy9/VEARTH?node-id=517%3A0'
            target='_blank'
            rel='noopener noreferrer'
          >
            UI doc
          </a>
        </li>
        <li>display works item info</li>
        <li>handle click action</li>
        <li>
          <p>
            <img alt='Work item' src='/work-item.png' />
          </p>
        </li>
      </ul>
    </>
  ))
  .add('Work list', () => (
    <>
      <h2>Expected behavior</h2>
      <ul>
        <li>
          <a
            href='https://www.figma.com/file/sZzBNfUtg6kd3O74AqoJy9/VEARTH?node-id=517%3A0'
            target='_blank'
            rel='noopener noreferrer'
          >
            UI doc
          </a>
        </li>
        <li>display works list</li>
        <li>show list table header, which can control sort action</li>
        <li>
          <p>
            <img alt='Work list' src='/work-list.png' />
          </p>
        </li>
      </ul>
    </>
  ))
