import React from 'react'
import { Form } from 'react-final-form'
import { DndProvider } from 'react-dnd'
import Backend from 'react-dnd-html5-backend'
import { storiesOf } from '@storybook/react'
import Advertisement from '@src/containers/Comics/components/Advertisement'
import { AdCategory } from '@src/reducers/comics/constant'

storiesOf('Comic Advertisement', module)
  .addDecorator(storyFn => <DndProvider backend={Backend}>{storyFn()}</DndProvider>)
  .add('Advertisement', () => (
    <Form initialValues={{}} onSubmit={() => {}} render={() => <Advertisement type={AdCategory.Content} name='' />} />
  ))
