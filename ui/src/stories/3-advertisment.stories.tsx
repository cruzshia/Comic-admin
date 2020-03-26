import React from 'react'
import { storiesOf } from '@storybook/react'
import { radios } from '@storybook/addon-knobs'
import Advertisement, { AdType } from '@src/containers/Comics/components/Advertisement'

storiesOf('Comic Advertisement', module).add('Advertisement', () => (
  <Advertisement
    type={radios('type', { Original: AdType.Original, Map: AdType.Map, Admob: AdType.Admob }, AdType.Original)}
    initialValue={{}}
    onSubmit={() => {}}
  />
))
