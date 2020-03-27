import React, { useCallback, useMemo, useContext } from 'react'
import { useIntl } from 'react-intl'
import { useHistory, useParams } from 'react-router-dom'
import { makeStyles } from '@material-ui/core'
import { routePath } from '@src/common/appConfig'
import ContentHeader, { Breadcrumb } from '@src/components/ContentHeader/ContentHeader'
import Button, { Theme } from '@src/components/Button/Button'
import DataTable, { DataSet } from '@src/components/table/DataTable'
import { ReactComponent as penIcon } from '@src/assets/common/pen.svg'
import commonMessages from '@src/messages'
import messages from '../messages'
import worksCampaignContext from '../context/worksCampaignContext'
import { BREADCRUMBS } from '../constants'
import AdSettingTable from '../../components/AdSettingTable'

const useStyles = makeStyles({
  table: {
    marginBottom: '36px',
    lineHeight: '14px'
  }
})

export default function WorksCampaignDetail() {
  const { formatMessage } = useIntl()
  const classes = useStyles()
  const { currentCampaign: campaign } = useContext(worksCampaignContext)
  const history = useHistory()
  const { id } = useParams()
  const titleText = formatMessage(messages.detail)

  const handleRedirect = useCallback(() => history.push(routePath.comics.worksCampaignEdit.replace(':id', id!)), [
    history,
    id
  ])

  const breadcrumbList: Breadcrumb[] = useMemo(
    () =>
      BREADCRUMBS.map(({ title, route }) => ({
        title: formatMessage(title),
        route
      })).concat([{ title: titleText, route: undefined }]),
    [formatMessage, titleText]
  )

  const buttonList = useMemo(
    () => [
      <Button
        theme={Theme.DARK_BORDER}
        buttonText={formatMessage(messages.edit)}
        onClick={handleRedirect}
        icon={penIcon}
      />
    ],
    [formatMessage, handleRedirect]
  )

  const genTableData = (id: any): DataSet => ({
    label: formatMessage(messages[id as keyof typeof messages]),
    content: campaign[id]
  })

  return (
    <>
      <ContentHeader breadcrumbList={breadcrumbList} titleText={titleText} buttonList={buttonList} />
      <DataTable
        title={formatMessage(commonMessages.deliveryDuration)}
        tableClass={classes.table}
        onEdit={handleRedirect}
        dataSet={[genTableData('startDateTime'), genTableData('endDateTime')]}
      />
      <AdSettingTable data={campaign.advertisement} onEdit={handleRedirect} />
    </>
  )
}
