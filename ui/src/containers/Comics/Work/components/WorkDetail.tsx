import React, { useContext } from 'react'
import { useIntl } from 'react-intl'
import { makeStyles } from '@material-ui/core'
import DataTable, { DataSet } from '@src/components/table/DataTable'
import workContext from '../workContext'
import { IMAGE_NUM, IMAGE_MAX_WIDTH } from '../constants'
import messages from '../messages'

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

  const mockClick = () => {}

  return (
    <>
      <DataTable
        title={formatMessage(messages.basicInfo)}
        tableClass={classes.table}
        onEdit={mockClick}
        dataSet={[
          {
            label: formatMessage(messages.id),
            content: mockWork.id
          },
          {
            label: formatMessage(messages.title),
            content: mockWork.title
          },
          {
            label: formatMessage(messages.titleKana),
            content: mockWork.titleKana
          },
          {
            label: formatMessage(messages.introduction),
            content: mockWork.introduction
          },
          {
            label: formatMessage(messages.author),
            content: <span className={classes.blueText}>{mockWork.author}</span>
          },
          {
            label: formatMessage(messages.category),
            content: mockWork.category
          },
          {
            label: formatMessage(messages.updateFrequency),
            content: mockWork.updateFrequency
          },
          {
            label: formatMessage(messages.serial),
            content: mockWork.serial
          },
          {
            label: formatMessage(messages.createDateTime),
            content: mockWork.createDateTime
          },
          {
            label: formatMessage(messages.updateDateTime),
            content: mockWork.updateDateTime
          },
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
        onEdit={mockClick}
        dataSet={[
          {
            label: formatMessage(messages.deliveryStartDateTime),
            content: mockWork.deliveryStartDateTime
          },
          {
            label: formatMessage(messages.deliveryEndDateTime),
            content: mockWork.deliveryEndDateTime
          }
        ]}
      />
      <DataTable
        title={formatMessage(messages.notificationSetting)}
        tableClass={classes.table}
        onEdit={mockClick}
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
                    dataSet={[
                      {
                        label: formatMessage(messages.adBlock),
                        content: notify.adBlock
                      },
                      {
                        label: formatMessage(messages.adType),
                        content: notify.adType
                      }
                    ]}
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
                    {
                      label: formatMessage(messages.linkUrl),
                      content: notify.link
                    },
                    {
                      label: formatMessage(messages.deliveryDateTime),
                      content: notify.deliverDateTime
                    }
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
