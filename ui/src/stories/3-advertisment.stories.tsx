import React from 'react'
import { Form } from 'react-final-form'
import { storiesOf } from '@storybook/react'
import Advertisement from '@src/containers/Comics/components/Advertisement'
import { AdType } from '@src/models/comics/advertisement'

storiesOf('Comic Advertisement', module).add('Advertisement', () => (
  <Form initialValues={{}} onSubmit={() => {}} render={() => <Advertisement type={AdType.Original} name='' />} />
))
