import React, { useMemo } from 'react'
import { useIntl } from 'react-intl'
import { makeStyles } from '@material-ui/core'
import DataTable, { DataSet } from '@src/components/table/DataTable'
import commonMessages from '@src/messages'
import { backgroundColorGray } from '@src/common/styles'
import Advertisement from '@src/models/comics/advertisement'

interface Prop {
  hideSubtitle?: boolean
  data: { [key: string]: any }
  onEdit: () => void
}

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
  }
})

export default function AdSettingTable({ data, onEdit, hideSubtitle }: Prop) {
  const { formatMessage } = useIntl()
  const classes = useStyles()

  const genTableData = (id: any, dataSource: any): DataSet => ({
    label: formatMessage(commonMessages[id as keyof typeof commonMessages]),
    content: dataSource[id]
  })

  const genAdvertisementData = (data: Advertisement) => {
    switch (data.adCategory) {
      case 'original':
        return {
          label: formatMessage(commonMessages.original),
          content: (
            <DataTable
              dataSet={[
                {
                  label: formatMessage(commonMessages.photo),
                  content: <img src={data.imageUrl} alt={data.imageUrl} />
                },
                genTableData('link', data),
                genTableData('buttonName', data),
                genTableData('deliveryDuration', data)
              ]}
              innerTable
            />
          )
        }
      default:
        return {
          label: data.adCategory,
          content: data.content
        }
    }
  }

  const initialDataSet = hideSubtitle
    ? []
    : [
        {
          label: '',
          content: formatMessage(commonMessages[data.deviceCategory === 'common' ? 'deviceCommon' : 'deviceCategory']),
          isSubTitle: true,
          classes: classes.subTitle
        }
      ]

  const [openingAd, contentAd] = useMemo(
    () =>
      data.reduce(
        (acc: Advertisement[], current: Advertisement) => {
          acc[current.type === 'opening' ? 0 : 1].push(current)
          return acc
        },
        [[], []]
      ),
    [data]
  )
  return (
    <DataTable
      title={formatMessage(commonMessages.advertisementSetting)}
      tableClass={classes.table}
      onEdit={onEdit}
      dataSet={[
        ...initialDataSet,
        ...openingAd.map((ad: Advertisement) => genAdvertisementData(ad)),
        {
          label: '',
          content: formatMessage(commonMessages.contents),
          isSubTitle: true,
          classes: `${classes.subTitle} gray`
        },
        ...contentAd.map((ad: Advertisement) => genAdvertisementData(ad))
      ]}
    />
  )
}
