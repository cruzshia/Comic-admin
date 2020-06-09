import React, { useMemo } from 'react'
import { useIntl } from 'react-intl'
import { makeStyles } from '@material-ui/core'
import DataTable, { toDataSet } from '@src/components/table/DataTable'
import commonMessages from '@src/messages'
import comicMessages from '../messages'
import { backgroundColorGray } from '@src/common/styles'
import Advertisement, { AdType, AdSetting, AdSettingKeys, AdPosition } from '@src/models/comics/advertisement'

interface Prop {
  hideSubtitle?: boolean
  data?: AdSetting
  onEdit: () => void
}

const useStyles = makeStyles({
  table: {
    marginBottom: '36px',
    lineHeight: '14px'
  },
  grayBg: {
    backgroundColor: backgroundColorGray
  }
})

export default function AdSettingTable({ data, onEdit, hideSubtitle }: Prop) {
  const { formatMessage } = useIntl()
  const classes = useStyles()

  const genAdvertisementData = (data: Advertisement) => {
    switch (data[AdSettingKeys.Type]) {
      case AdType.Original:
        return {
          label: formatMessage(commonMessages.original),
          content: (
            <DataTable
              dataSet={[
                {
                  label: formatMessage(commonMessages.photo),
                  content: <img src={data[AdSettingKeys.ImageUrl]} alt={data[AdSettingKeys.ImageUrl]} />
                },
                toDataSet(formatMessage(commonMessages.link), data[AdSettingKeys.ActionUrl]),
                toDataSet(formatMessage(commonMessages.buttonName), data[AdSettingKeys.Button]),
                toDataSet(
                  formatMessage(commonMessages.deliveryDuration),
                  `${data[AdSettingKeys.BeginAt]} ~ ${data[AdSettingKeys.EndAt]}`
                )
              ]}
              innerTable
            />
          )
        }
      default:
        return {
          label: formatMessage(comicMessages[data[AdSettingKeys.Type] === AdType.Fan ? AdType.Fan : AdType.Map]),
          content: formatMessage(comicMessages.adPositionInfo)
        }
    }
  }

  const initialDataSet = hideSubtitle
    ? []
    : [
        {
          label: '',
          content: formatMessage(
            commonMessages[data?.[AdSettingKeys.AdDevice] === 'common' ? 'deviceCommon' : 'deviceCategory']
          ),
          isSubTitle: true
        }
      ]

  const [openingAd = [], contentAd = []] = useMemo(() => [data?.[AdPosition.Front], data?.[AdPosition.Back]], [data])
  return data ? (
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
          classes: classes.grayBg
        },
        ...contentAd.map((ad: Advertisement) => genAdvertisementData(ad))
      ]}
    />
  ) : null
}
