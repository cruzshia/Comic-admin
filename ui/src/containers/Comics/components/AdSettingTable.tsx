import React from 'react'
import { useIntl } from 'react-intl'
import { makeStyles } from '@material-ui/core'
import DataTable, { DataSet } from '@src/components/table/DataTable'
import commonMessages from '@src/messages'
import { backgroundColorGray } from '@src/common/styles'

const useStyles = makeStyles({
  table: {
    marginBottom: '36px',
    lineHeight: '14px'
  },
  subTitle: {
    padding: '15px 20px',
    backgroundColor: '#FFFFFF',
    '&.gray': {
      backgroundColor: backgroundColorGray
    }
  },
  innerTable: {
    margin: '-20px',
    border: 'none',
    '& .MuiGrid-container .MuiGrid-item:first-child': {
      maxWidth: 120
    }
  }
})

export default function AdSettingTable({ data, onEdit }: { data: { [key: string]: any }; onEdit: () => void }) {
  const { formatMessage } = useIntl()
  const classes = useStyles()

  const genTableData = (id: any, dataSource: any): DataSet => ({
    label: formatMessage(commonMessages[id as keyof typeof commonMessages]),
    content: dataSource[id]
  })

  const genAdvertisementData = (data: any) => {
    switch (data.type) {
      case 'original':
        return {
          label: formatMessage(commonMessages.original),
          content: (
            <DataTable
              tableClass={classes.innerTable}
              dataSet={[
                {
                  label: formatMessage(commonMessages.photo),
                  content: <img src={data.image} alt={data.image} />
                },
                genTableData('link', data),
                genTableData('buttonName', data),
                genTableData('deliveryDuration', data)
              ]}
            />
          )
        }
      default:
        return {
          label: data.type,
          content: data.content
        }
    }
  }

  return (
    <DataTable
      title={formatMessage(commonMessages.advertisementSetting)}
      tableClass={classes.table}
      onEdit={onEdit}
      dataSet={[
        {
          label: '',
          content: formatMessage(commonMessages[data.deviceCategory === 'common' ? 'deviceCommon' : 'deviceCategory']),
          isSubTitle: true,
          classes: classes.subTitle
        },
        genAdvertisementData(data.content),
        {
          label: '',
          content: formatMessage(commonMessages.contents),
          isSubTitle: true,
          classes: `${classes.subTitle} gray`
        },
        ...data.contents.map((ad: any) => genAdvertisementData(ad))
      ]}
    />
  )
}
