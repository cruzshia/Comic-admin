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
import workContext from '../workContext'
import commonMessages from '@src/messages'
import messages from '../messages'
import { IMAGE_NUM, IMAGE_MAX_WIDTH, WORKS_BREADCRUMBS } from '../constants'

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
  const breadcrumbList: Breadcrumb[] = WORKS_BREADCRUMBS.map(({ title, route }) => ({
    title: formatMessage(title),
    route
  })).concat({ title: formatMessage(messages.detail), route: undefined })

  const handleRedirect = useCallback(
    (target?: ScrollAnchor) => () =>
      history.push(routePath.comics.workEdit.replace(':id', id!) + (target ? `?${ANCHOR_QUERY}=${target}` : '')),
    [history, id]
  )
  const handleEdit = useMemo(() => handleRedirect(), [handleRedirect])
  const handleEditDelivery = useMemo(() => handleRedirect(ScrollAnchor.Delivery), [handleRedirect])
  const handleEditNotification = useMemo(() => handleRedirect(ScrollAnchor.Notification), [handleRedirect])

  const EditButton = useMemo(
    () => (
      <Button icon={penIcon} buttonText={formatMessage(messages.edit)} theme={Theme.DARK_BORDER} onClick={handleEdit} />
    ),
    [formatMessage, handleEdit]
  )

  const genTableData = (id: any, dataSource?: any): DataSet => ({
    label: formatMessage(messages[id as keyof typeof messages] ?? commonMessages[id as keyof typeof commonMessages]),
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
        title={formatMessage(messages.deliveryDuration)}
        tableClass={classes.table}
        onEdit={handleEditDelivery}
        dataSet={[genTableData('deliveryStartDateTime'), genTableData('deliveryEndDateTime')]}
      />

      <DataTable
        title={formatMessage(messages.notificationSetting)}
        tableClass={classes.table}
        onEdit={handleEditNotification}
        dataSet={[
          {
            label: '',
            content: mockWork.notifyType,
            isSubTitle: true,
            classes: classes.subTitle
          },
          ...mockWork.notifications.map((notify: any) => {
            const messageKey = notify.type.replace(/_\w/gi, (matched: string) =>
              matched[1].toUpperCase()
            ) as keyof typeof messages

            if (messageKey === 'adsSdk') {
              return {
                label: formatMessage(messages.adsSdk),
                content: (
                  <DataTable
                    tableClass={classes.innerTable}
                    dataSet={[genTableData('adBlock', notify), genTableData('adType', notify)]}
                  />
                )
              }
            }

            return {
              label: formatMessage(messages[messageKey]),
              content: (
                <DataTable
                  tableClass={classes.innerTable}
                  dataSet={[
                    {
                      label: formatMessage(commonMessages.photo),
                      content: <img src={notify.image} alt={notify.image} />
                    },
                    genTableData('link', notify),
                    genTableData('deliveryDateTime', notify)
                  ]}
                />
              )
            }
          })
        ]}
      />
    </>
  )
}
