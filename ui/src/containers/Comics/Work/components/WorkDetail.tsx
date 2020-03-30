import React, { useContext, useCallback, useMemo } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useIntl } from 'react-intl'
import { makeStyles } from '@material-ui/core'
import Button, { Theme } from '@src/components/Button/Button'
import DataTable, { DataSet } from '@src/components/table/DataTable'
import { routePath, ANCHOR_QUERY } from '@src/common/appConfig'
import { ReactComponent as penIcon } from '@src/assets/common/pen.svg'
import ContentHeader, { Breadcrumb } from '@src/components/ContentHeader/ContentHeader'
import { ScrollAnchor } from './WorkForm'
import StickyHeader from './StickyHeader'
import workContext from '../context/WorkContext'
import commonMessages from '@src/messages'
import messages from '../messages'
import { IMAGE_NUM, IMAGE_MAX_WIDTH, BREADCRUMBS } from '../constants'
import AdSettingTable from '../../components/AdSettingTable'

const useStyle = makeStyles({
  table: {
    marginBottom: '36px',
    lineHeight: '14px'
  },
  subTitle: {
    padding: '15px 20px'
  },
  innerTable: {
    margin: '-20px',
    border: 'none',
    '& .MuiGrid-container .MuiGrid-item:first-child': {
      maxWidth: 120
    }
  },
  blueText: {
    color: '#1A0DAB'
  },
  image: {
    maxWidth: IMAGE_MAX_WIDTH
  }
})

export default function WorkDetail() {
  const { currentWork: mockWork } = useContext(workContext)
  const { formatMessage } = useIntl()
  const { id } = useParams()
  const classes = useStyle()
  const history = useHistory()

  const titleText = mockWork.title
  const breadcrumbList: Breadcrumb[] = useMemo(
    () =>
      BREADCRUMBS.map(({ title, route }) => ({
        title: formatMessage(title),
        route
      })).concat({ title: formatMessage(messages.detail), route: undefined }),
    [formatMessage]
  )

  const handleRedirect = useCallback(
    (target?: ScrollAnchor) => () =>
      history.push(routePath.comics.workEdit.replace(':id', id!) + (target ? `?${ANCHOR_QUERY}=${target}` : '')),
    [history, id]
  )
  const handleEdit = useMemo(() => handleRedirect(), [handleRedirect])
  const handleEditDelivery = useMemo(() => handleRedirect(ScrollAnchor.Delivery), [handleRedirect])
  const handleEditAdSetting = useMemo(() => handleRedirect(ScrollAnchor.AdSetting), [handleRedirect])

  const EditButton = useMemo(
    () => (
      <Button icon={penIcon} buttonText={formatMessage(messages.edit)} theme={Theme.DARK_BORDER} onClick={handleEdit} />
    ),
    [formatMessage, handleEdit]
  )

  const genTableData = (id: any, dataSource?: any, label?: string): DataSet => ({
    label: formatMessage(messages[id as keyof typeof messages] || commonMessages[id as keyof typeof commonMessages]),
    content: dataSource ? dataSource[id] : mockWork[id]
  })

  return (
    <>
      <StickyHeader title={titleText} button={EditButton} />
      <ContentHeader titleText={titleText} breadcrumbList={breadcrumbList} buttonList={[EditButton]} />
      <DataTable
        title={formatMessage(messages.basicInfo)}
        tableClass={classes.table}
        onEdit={handleEdit}
        dataSet={[
          genTableData('id'),
          genTableData('title'),
          genTableData('titleKana'),
          genTableData('introduction'),
          {
            label: formatMessage(commonMessages.author),
            content: <span className={classes.blueText}>{mockWork.author}</span>
          },
          genTableData('category'),
          genTableData('updateFrequency'),
          genTableData('rensai'),
          genTableData('createDateTime'),
          genTableData('updateDateTime'),
          ...new Array(IMAGE_NUM).fill({}).map((_, i) => {
            const img = mockWork.images[i]
            return {
              label: `${formatMessage(commonMessages.photo)}${i + 1}`,
              content: img ? <img key={`image-${i}`} className={classes.image} src={img} alt={img} /> : ''
            } as DataSet
          })
        ]}
      />
      <DataTable
        title={formatMessage(commonMessages.deliveryDuration)}
        tableClass={classes.table}
        onEdit={handleEditDelivery}
        dataSet={[genTableData('deliveryStartDateTime'), genTableData('deliveryEndDateTime')]}
      />
      <AdSettingTable onEdit={handleEditAdSetting} data={mockWork.advertisement} />
    </>
  )
}
