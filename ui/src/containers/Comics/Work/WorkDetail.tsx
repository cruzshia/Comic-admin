import React from 'react'
import { useIntl } from 'react-intl'
import { makeStyles } from '@material-ui/core'
import DataTable, { DataSet } from '@src/components/table/DataTable'
import { mockWork } from './mockData/mockWork'
import { IMAGE_NUM, IMAGE_MAX_WIDTH } from './constants'
import messages from './messages'

const useStyle = makeStyles({
  detailTable: {
    '& .author': {
      color: '#1A0DAB'
    },
    '&. image': {
      maxWidth: IMAGE_MAX_WIDTH
    }
  }
})

export default function WorkDetail() {
  const { formatMessage } = useIntl()
  const classes = useStyle()

  const dataSet: DataSet[] = []
  Object.keys(mockWork).forEach(key => {
    if (key === 'images') {
      for (let i = 0; i < IMAGE_NUM; i++) {
        const img = mockWork.images[i]
        dataSet.push({
          label: `${formatMessage(messages.photo)}${i + 1}`,
          content: img ? <img className={key} src={img} alt={img} /> : ''
        })
      }
      return
    }
    dataSet.push({
      label: formatMessage(messages[key as keyof typeof messages]),
      content: <span className={key}>{mockWork[key as keyof typeof mockWork] as string}</span>
    })
  })

  return (
    <DataTable
      tableClass={classes.detailTable}
      title={formatMessage(messages.basicInfo)}
      onEdit={() => {}}
      dataSet={dataSet}
    />
  )
}
