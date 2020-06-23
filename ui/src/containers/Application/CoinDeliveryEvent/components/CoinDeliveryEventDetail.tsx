import React, { useMemo, useContext, useCallback, useEffect } from 'react'
import { useIntl } from 'react-intl'
import { useHistory, useParams } from 'react-router-dom'
import { styled } from '@material-ui/core'
import { CoinEventKeys, CoinEventRewardKeys, CoinEventReward } from '@src/models/application/coinDeliveryEvent'
import ContentHeader from '@src/components/ContentHeader'
import { ReactComponent as EditIcon } from '@src/assets/common/pen.svg'
import { ReactComponent as CopyIcon } from '@src/assets/header/copy.svg'
import Button, { Theme } from '@src/components/Button/Button'
import { routePath } from '@src/common/appConfig'
import { borderColorLight } from '@src/common/styles'
import DataTable, { toDataSet } from '@src/components/table/DataTable'
import StickyHeader from '@src/components/StickyBar/StickyHeader'
import commonMessages from '@src/messages'
import userMessages from '@src/containers/User/messages'
import CoinDeliveryEventContext, { ActionContext } from '../context/CoinDeliveryEventContext'
import { BREADCRUMBS } from '../utils'
import messages from '../messages'

const ContentRow = styled('div')({
  margin: '0px -20px',
  padding: 20,
  borderBottom: `1px solid ${borderColorLight}`,
  '&:first-child': {
    paddingTop: 0
  },
  '&:last-child': {
    paddingBottom: 0,
    border: 'none'
  }
})

export default function CoinDeliveryEventDetail() {
  const { formatMessage } = useIntl()
  const history = useHistory()
  const { id } = useParams()
  const { currentEvent } = useContext(CoinDeliveryEventContext)
  const { onGetCoinDeliveryEvent, onResetCoinDeliveryEvent } = useContext(ActionContext)

  useEffect(() => {
    onGetCoinDeliveryEvent(id!)
    return () => onResetCoinDeliveryEvent()
  }, [onGetCoinDeliveryEvent, id, onResetCoinDeliveryEvent])

  const titleText = formatMessage(messages.detail)
  const breadcrumbList = useMemo(
    () =>
      BREADCRUMBS.map(({ title, route }) => ({ title: formatMessage(title), route })).concat([
        {
          title: titleText,
          route: undefined
        }
      ]),
    [formatMessage, titleText]
  )

  const handleEdit = useCallback(() => history.push(routePath.application.coinDeliveryEventEdit.replace(':id', id!)), [
    id,
    history
  ])

  const buttonList = useMemo(
    () => [
      <Button
        theme={Theme.DARK_BORDER}
        icon={EditIcon}
        buttonText={formatMessage(messages.editStart)}
        onClick={handleEdit}
      />,
      <Button buttonText={formatMessage(commonMessages.copy)} icon={CopyIcon} />
    ],
    [formatMessage, handleEdit]
  )

  return currentEvent ? (
    <>
      <StickyHeader title={titleText} button={buttonList} />
      <ContentHeader breadcrumbList={breadcrumbList} titleText={titleText} buttonList={buttonList} />
      <DataTable
        title={formatMessage(commonMessages.basicInfo)}
        dataSet={[
          toDataSet(formatMessage(commonMessages.id), currentEvent[CoinEventKeys.ID]),
          toDataSet(formatMessage(messages.eventId), currentEvent[CoinEventKeys.CustomEventIdToken]),
          toDataSet(formatMessage(messages.eventName), currentEvent[CoinEventKeys.Name]),
          toDataSet(formatMessage(messages.eventType), formatMessage(messages[currentEvent[CoinEventKeys.EventType]])),
          toDataSet(
            formatMessage(messages.eventRewardSetting),
            currentEvent[CoinEventKeys.Rewards].map((rewards: CoinEventReward) => (
              <ContentRow key={rewards[CoinEventRewardKeys.ResultCode]}>
                {rewards[CoinEventRewardKeys.ResultCode]}/{formatMessage(messages[rewards[CoinEventRewardKeys.Type]])}/
                {formatMessage(userMessages.amountOfCoins, { num: rewards[CoinEventRewardKeys.Amount] })}/
                {formatMessage(messages[rewards[CoinEventRewardKeys.Restriction]])}
              </ContentRow>
            ))
          ),
          toDataSet(formatMessage(commonMessages.createDateTime), currentEvent[CoinEventKeys.InsertedAt]),
          toDataSet(formatMessage(commonMessages.updateDateTime), currentEvent[CoinEventKeys.UpdatedAt])
        ]}
        marginBottom
        onEdit={handleEdit}
      />
      <DataTable
        title={formatMessage(commonMessages.releaseDuration)}
        dataSet={[
          toDataSet(formatMessage(commonMessages.publicStartTime), currentEvent[CoinEventKeys.PublishEndAt]),
          toDataSet(formatMessage(commonMessages.publicEndTime), currentEvent[CoinEventKeys.PublishEndAt])
        ]}
        onEdit={handleEdit}
      />
    </>
  ) : null
}
