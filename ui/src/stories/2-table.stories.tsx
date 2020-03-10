import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { text, radios } from '@storybook/addon-knobs'
import TextArea from '@src/components/form/TextArea'
import TextInput from '@src/components/form/TextInput'
import Select from '@src/components/form/Select'
import TableRowContainer from '@src/components/table/TableRowContainer'
import DataTable from '@src/components/table/DataTable'
import ListTable from '@src/components/table/ListTable'
import { mockData, mockTitleData, mockDatum } from '@src/components/table/mockData/mockData'
import Button from '@src/components/Button/Button'
import { ReactComponent as IconSave } from '@src/assets/form/button_save.svg'
import ListTableRow from '@src/components/table/ListTableRow'

storiesOf('Table components', module)
  .add('TableRow', () => <TableRowContainer content={<TextArea />} title='Email' />)
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
          content: <Select list={[]} />
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
                  content: <Select list={[]} />
                }
              ]}
            />
          )
        }
      ]}
    />
  ))
  .add('ListTableRow', () => (
    <table>
      <thead>
        <ListTableRow items={mockDatum} onClick={action('list-table-row-click')} />
      </thead>
    </table>
  ))
  .add('ListTable', () => (
    <ListTable
      titleList={mockTitleData}
      dataList={mockData}
      tableClass='widths'
      buttonList={[<Button onClick={action('button-click')} buttonText={'CSV登録'} icon={IconSave} />]}
      pagination={{
        total: 1000,
        start: 1
      }}
      sortOrder={radios('sortOrder', { asc: 'asc', desc: 'desc' }, 'desc')}
      sortBy={radios('sortBy', { 作成日時: mockTitleData[3].id, 作品種別: mockTitleData[4].id }, '作成日時')}
    />
  ))