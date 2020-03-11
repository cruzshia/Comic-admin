import React, { useContext, useCallback } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useIntl } from 'react-intl'
import { makeStyles } from '@material-ui/core'
import DataTable, { DataSet } from '@src/components/table/DataTable'
import ContentHeader from '@src/components/ContentHeader/ContentHeader'
import Button from '@src/components/Button/Button'
import { ButtonTheme } from '@src/components/Button/buttonTheme'
import { ReactComponent as IconEdit } from '@src/assets/form/button_edit.svg'
import { routePath, ANCHOR_QUERY } from '@src/common/appConfig'
import { ScrollAnchor } from './WorkForm'
import workContext from '../workContext'
import messages from '../messages'
import { IMAGE_NUM, IMAGE_MAX_WIDTH } from '../constants'
import { WORKS_BREADCRUMBS } from '../constants'

const useStyle = makeStyles({
  table: {
    marginBottom: '36px'
  },
  innerTable: {
    margin: '-20px',
    border: 'none'
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
  const classes = useStyle()
  const history = useHistory()
  const { id } = useParams()

  const titleText = mockWork.title
  const breadcrumbList: { title: string; route?: string }[] = WORKS_BREADCRUMBS.map(({ title, route }) => ({
    title: formatMessage(title),
    route
  }))
  breadcrumbList.push({ title: formatMessage(messages.detail) })
  const detailButtonList = [
    <Button
      theme={ButtonTheme.DARK_BORDER}
      buttonText={formatMessage(messages.detailButton)}
      onClick={() => {}}
      icon={IconEdit}
    />
  ]
  const handleClick = useCallback(
    (target?: ScrollAnchor) => () =>
      history.push(routePath.comics.workEdit.replace(':id', id!) + (target ? `?${ANCHOR_QUERY}=${target}` : '')),
    [history, id]
  )

  const genTableData = (id: keyof typeof messages, dataSource?: any): DataSet => ({
    label: formatMessage(messages[id]),
    content: dataSource ? dataSource[id] : mockWork[id]
  })

  return (
    <>
      <ContentHeader titleText={titleText} breadcrumbList={breadcrumbList} buttonList={detailButtonList} />
      <DataTable
        title={formatMessage(messages.basicInfo)}
        tableClass={classes.table}
        onEdit={handleClick()}
        dataSet={[
          genTableData('id'),
          genTableData('title'),
          genTableData('titleKana'),
          genTableData('introduction'),
          {
            label: formatMessage(messages.author),
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
              label: `${formatMessage(messages.photo)}${i + 1}`,
              content: img ? <img key={`image-${i}`} className={classes.image} src={img} alt={img} /> : ''
            } as DataSet
          })
        ]}
      />

      <DataTable
        title={formatMessage(messages.deliveryDuration)}
        tableClass={classes.table}
        onEdit={handleClick(ScrollAnchor.Delivery)}
        dataSet={[genTableData('deliveryStartDateTime'), genTableData('deliveryEndDateTime')]}
      />

      <DataTable
        title={formatMessage(messages.notificationSetting)}
        tableClass={classes.table}
        onEdit={handleClick(ScrollAnchor.Notification)}
        dataSet={[
          {
            label: '',
            content: mockWork.notifyType,
            isSubTitle: true
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
                      label: formatMessage(messages.photo),
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
