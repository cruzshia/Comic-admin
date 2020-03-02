import React from 'react'
import { storiesOf } from '@storybook/react'
import { text } from '@storybook/addon-knobs'
import TextArea from '@src/components/form/TextArea'
import TextInput from '@src/components/form/TextInput'
import Select from '@src/components/form/Select'
import TableRowContainer from '@src/components/table/TableRowContainer'
import DataTable from '@src/components/table/DataTable'

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
          content: <Select />
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
                  content: <Select />
                }
              ]}
            />
          )
        }
      ]}
    />
  ))
