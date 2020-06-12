import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { text, radios } from '@storybook/addon-knobs'
import TextArea from '@src/components/form/TextArea'
import TextInput from '@src/components/form/TextInput'
import Select from '@src/components/form/Select'
import DataTableRow from '@src/components/table/DataTableRow'
import DataTable from '@src/components/table/DataTable'
import ListTable, { SortOrder } from '@src/components/table/ListTable'
import Button from '@src/components/Button/Button'
import { ReactComponent as IconSave } from '@src/assets/form/button_save.svg'
import ListTableRow from '@src/components/table/ListTableRow'

storiesOf('Table components', module)
  .add('DataTableRow', () => <DataTableRow content={<TextArea />} title='Email' />)
  .add('DataTable', () => (
    <DataTable
      title={text('title', '基本情報')}
      onEdit={() => {}}
      dataSet={[
        {
          label: 'email',
          content: <TextArea />
        },
        {
          label: 'city',
          content: <Select options={[]} />
        },
        {
          label: '告知設定',
          content: (
            <DataTable
              tableClass='inner_table'
              dataSet={[
                {
                  label: 'email',
                  content: <TextArea />
                },
                {
                  label: 'name',
                  content: <TextInput />
                },
                {
                  label: 'city',
                  content: <Select options={[]} />
                }
              ]}
            />
          )
        }
      ]}
    />
  ))
  .add('ListTableRow', () => {
    const mockDatum = {
      image: <img src='/mockListImg.png' alt='' />,
      workID: 'WORK_ROOKIE000014751',
      title: 'クラスメイトの田中さんはすごく怖い',
      releaseDate: '2020-01-21 16:34',
      category: 'コミックス',
      episodeCategory: 'オリジナル連載',
      updateFrequency: '毎週月月金曜日に更新'
    }
    return (
      <table>
        <thead>
          <ListTableRow
            items={mockDatum}
            onClick={action('list-table-row-click')}
            headers={Object.keys(mockDatum).map(key => ({ id: key }))}
          />
        </thead>
      </table>
    )
  })
  .add('ListTable', () => {
    const mockTitleData = [
      { id: 'image', label: '画像' },
      { id: 'workID', label: '作品ID' },
      { id: 'title', label: '作品タイトル' },
      { id: 'releaseDate', label: '作成日時', onSort: (id: string) => console.log(`sortBy ${id}`) },
      { id: 'category', label: '作品種別', onSort: (id: string) => console.log(`sortBy ${id}`) },
      { id: 'episodeCategory', label: '話作品種別' },
      { id: 'updateFrequency', label: '更新頻度' }
    ]

    const mockData = new Array(3).fill({}).map((_, idx) => ({
      id: `WORK_ROOKIE00001475${idx}`,
      image: <img src='/mockListImg.png' alt='' />,
      workID: 'WORK_ROOKIE000014751',
      title: 'クラスメイトの田中さんはすごく怖い',
      releaseDate: '2020-01-21 16:34',
      category: 'コミックス',
      episodeCategory: 'オリジナル連載',
      updateFrequency: '毎週月月金曜日に更新'
    }))

    return (
      <ListTable
        theadList={mockTitleData}
        dataList={mockData}
        tableClass='widths'
        buttonList={[<Button onClick={action('button-click')} buttonText={'CSV登録'} icon={IconSave} />]}
        pagination={{
          total: 1000,
          start: 1
        }}
        onPageChange={() => {}}
        sortOrder={radios('sortOrder', { asc: SortOrder.Asc, desc: SortOrder.Desc }, SortOrder.Desc)}
        sortBy={radios('sortBy', { 作成日時: mockTitleData[3].id, 作品種別: mockTitleData[4].id }, '作成日時')}
      />
    )
  })
