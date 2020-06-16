import React, { useMemo } from 'react'
import { useIntl } from 'react-intl'
import { makeStyles } from '@material-ui/core'
import DataTable, { toDataSet } from '@src/components/table/DataTable'
import commonMessages from '@src/messages'
import comicMessages from '../messages'
import { backgroundColorGray } from '@src/common/styles'
import Advertisement, { AdType, AdSetting, AdSettingKeys, AdPosition } from '@src/models/comics/advertisement'

interface Prop {
  data?: AdSetting
  onEdit: () => void
  hideTitle?: boolean
}

const useStyles = makeStyles(() => ({
  table: {
    marginBottom: ({ hideTitle }: { hideTitle?: boolean }) => (!hideTitle ? '-2px' : '36px'),
    lineHeight: '14px'
  },
  grayBg: {
    backgroundColor: backgroundColorGray
  }
}))

export default function AdSettingTable({ data, onEdit, hideTitle }: Prop) {
  const { formatMessage } = useIntl()
  const classes = useStyles({ hideTitle })

  const genAdvertisementData = (data: Advertisement) => {
    const type = data[AdSettingKeys.Type]
    return {
      label: formatMessage(comicMessages[type!]),
      content:
        type === AdType.Original ? (
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
        ) : (
          formatMessage(comicMessages.adPositionInfo)
        )
    }
  }

  const [frontAd = [], backAd = []] = useMemo(() => [data?.[AdPosition.Front], data?.[AdPosition.Back]], [data])
  return data && data[AdSettingKeys.AdDevice] ? (
    <DataTable
      title={hideTitle ? '' : formatMessage(commonMessages.advertisementSetting)}
      tableClass={classes.table}
      onEdit={hideTitle ? undefined : onEdit}
      dataSet={[
        {
          label: '',
          content: formatMessage(
            comicMessages[`${data![AdSettingKeys.AdDevice]}AdSetting` as keyof typeof comicMessages]
          ),
          isSubTitle: true
        },
        ...frontAd.map((ad: Advertisement) => genAdvertisementData(ad)),
        {
          label: '',
          content: formatMessage(commonMessages.contents),
          isSubTitle: true,
          classes: classes.grayBg
        },
        ...backAd.map((ad: Advertisement) => genAdvertisementData(ad))
      ]}
    />
  ) : null
}
