import React from 'react'
import SearchInput from '@src/components/form/SearchInput'
import Select from '@src/components/form/Select'
import TimeSpanInput from '@src/components/form/TimeSpanInput'
import { Conditions } from './SearchFilter'

export const mockSearchFilterData: Conditions = {
  left: [
    { label: '作品（ID）', input: <SearchInput icon /> },
    { label: '著者', input: <Select list={[]} /> },
    { label: '作品種別', input: <Select list={[]} /> },
    { label: '配信開始日時', input: <TimeSpanInput /> },
    { label: '配信終了日時', input: <TimeSpanInput /> },
    { label: '広告ユニット', input: <Select list={[]} isShort /> }
  ],
  right: [
    { label: '連載状態', input: <Select list={[]} isShort /> },
    { label: '連載誌名', input: <Select list={[]} /> },
    { label: '連載頻度', input: <Select list={[]} isShort /> },
    { label: '連載曜日', input: <Select list={[]} isShort /> },
    { label: 'ランキング種別', input: <Select list={[]} isShort /> }
  ]
}
