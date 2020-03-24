import React, { useCallback, useMemo, useContext } from 'react'
import { useIntl } from 'react-intl'
import { useHistory, useParams } from 'react-router-dom'
import { makeStyles } from '@material-ui/core'
import { routePath } from '@src/common/appConfig'
import ContentHeader, { Breadcrumb } from '@src/components/ContentHeader/ContentHeader'
import Button, { Theme } from '@src/components/Button/Button'
import DataTable, { DataSet } from '@src/components/table/DataTable'
import { ReactComponent as penIcon } from '@src/assets/common/pen.svg'
import { backgroundColorGray } from '@src/common/styles'
import commonMessages from '@src/messages'
import messages from '../messages'
import worksCampaignContext from '../context/worksCampaignContext'
import { WORKS_CAMPAIGN_BREADCRUMBS } from '../constants'

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

export default function WorksCampaignDetail() {
  const { formatMessage } = useIntl()
  const classes = useStyles()
  const { currentCampaign: campaign } = useContext(worksCampaignContext)
  const history = useHistory()
  const { id } = useParams()
  const titleText = formatMessage(messages.worksCampaignDetail)

  const handleRedirect = useCallback(() => history.push(routePath.comics.worksCampaignEdit.replace(':id', id!)), [
    history,
    id
  ])

  const breadcrumbList: Breadcrumb[] = useMemo(
    () =>
      WORKS_CAMPAIGN_BREADCRUMBS.map(({ title, route }) => ({
        title: formatMessage(title),
        route
      })).concat([{ title: titleText, route: undefined }]),
    [formatMessage, titleText]
  )

  const buttonList = useMemo(
    () => [
      <Button
        theme={Theme.DARK_BORDER}
        buttonText={formatMessage(messages.worksCampaignEdit)}
        onClick={handleRedirect}
        icon={penIcon}
      />
    ],
    [formatMessage, handleRedirect]
  )

  const genTableData = (id: any, dataSource?: any): DataSet => ({
    label: formatMessage(messages[id as keyof typeof messages] ?? commonMessages[id as keyof typeof commonMessages]),
    content: dataSource ? dataSource[id] : campaign[id]
  })

  const genAdvertisementData = (data: any) => {
    switch (data.type) {
      case 'original':
        return {
          label: formatMessage(messages.original),
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
    <>
      <ContentHeader breadcrumbList={breadcrumbList} titleText={titleText} buttonList={buttonList} />
      <DataTable
        title={formatMessage(commonMessages.deliveryDuration)}
        tableClass={classes.table}
        onEdit={handleRedirect}
        dataSet={[genTableData('startDateTime'), genTableData('endDateTime')]}
      />
      <DataTable
        title={formatMessage(commonMessages.advertisementSetting)}
        tableClass={classes.table}
        onEdit={handleRedirect}
        dataSet={[
          {
            label: '',
            content: formatMessage(messages.deviceCommon),
            isSubTitle: true,
            classes: classes.subTitle
          },
          genAdvertisementData(campaign.advertisement.deviceCommon),
          {
            label: '',
            content: formatMessage(messages.contents),
            isSubTitle: true,
            classes: `${classes.subTitle} gray`
          },
          ...campaign.advertisement.contents.map((ad: any) => genAdvertisementData(ad))
        ]}
      />
    </>
  )
}
