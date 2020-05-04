import React, { useContext, useMemo, useState, useCallback, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Form, Field, FieldRenderProps } from 'react-final-form'
import { useIntl } from 'react-intl'
import { makeStyles } from '@material-ui/core'
import ContentHeader, { Breadcrumb } from '@src/components/ContentHeader/ContentHeader'
import DataTable, { toDataSet } from '@src/components/table/DataTable'
import { SelectAdapter, AmountInputAdapter, SearchInputAdapter, TextInputAdapter } from '@src/components/finalForm'
import Button, { Theme } from '@src/components/Button/Button'
import DetectiveButton from './DetectiveButton'
import { TimeSpanInput } from '@src/components/form'
import { DATE_TIME_PLACEHOLDER } from '@src/common/constants'
import { routePath } from '@src/common/appConfig'
import { ReactComponent as ListIcon } from '@src/assets/form/round_list.svg'
import UserContext, { ActionContext } from '../context/UserContext'
import DeviceDiaLog from './DeviceDiaLog'
import { BREADCRUMBS } from '../constants'
import commonMessages from '@src/messages'
import userMessages from '../../messages'
import messages from '../messages'

const useStyles = makeStyles({
  form: {
    '& > div:nth-child(n+2)': {
      marginTop: '30px'
    },
    '& a': {
      textDecoration: 'underline'
    }
  },
  margin: {
    marginTop: '15px'
  },
  input: {
    display: 'flex',
    alignItems: 'center',
    '& > .content': {
      width: '100px'
    },
    '& .MuiOutlinedInput-root': {
      marginLeft: '40px',
      marginRight: '20px'
    }
  },
  device: {
    alignItems: 'center',
    display: 'flex',
    '& > svg': {
      marginLeft: '15px'
    },
    '& > svg:hover': {
      cursor: 'pointer'
    }
  },
  innerTable: {
    padding: '20px',
    '& > .MuiGrid-container': {
      border: 'none',
      alignItems: 'start'
    },
    '& > .MuiGrid-container:not(:last-child)': {
      marginBottom: '15px'
    },
    '& > .MuiGrid-container > .MuiGrid-item:first-child': {
      paddingTop: '10px',
      flexBasis: '120px'
    },
    '& > .MuiGrid-container > .MuiGrid-item': {
      backgroundColor: '#FFFFFF',
      border: 'none',
      padding: 0
    }
  }
})

export default function UserDetail() {
  const { formatMessage } = useIntl()
  const classes = useStyles()
  const { id } = useParams()
  const { currentUser } = useContext(UserContext)
  const { onGetUser } = useContext(ActionContext)
  const [open, setOpen] = useState<boolean>(false)
  const [selectedDevice, setSelectedDevice] = useState<any>(undefined)

  useEffect(() => {
    onGetUser(id!)
  }, [onGetUser, id])

  const replaceUserId = useCallback((route: string) => route.replace(':userId', id!), [id])
  const handleClose = useCallback(() => {
    setOpen(false)
  }, [setOpen])
  const titleText = formatMessage(userMessages.detail)
  const breadcrumbList = useMemo(
    () =>
      BREADCRUMBS.map(({ title, route }): Breadcrumb => ({ title: formatMessage(title), route })).concat({
        title: titleText
      }),
    [titleText, formatMessage]
  )

  const CoinAdapter = (props: FieldRenderProps<string>) => (
    <>
      <AmountInputAdapter {...props} />
      <Button
        theme={Theme.DARK}
        onClick={() => {}}
        buttonText={formatMessage(messages.giftOrWithdraw)}
        disabled={props.meta.pristine}
      />
    </>
  )

  const SelectButtonAdapter = (props: FieldRenderProps<string>) => (
    <>
      <SelectAdapter {...props} />
      <Button
        classnames={classes.margin}
        theme={Theme.DARK}
        onClick={() => {}}
        buttonText={formatMessage(userMessages.change)}
        disabled={props.meta.pristine}
      />
    </>
  )
  if (!currentUser) return null

  const genCoinContent = (device: string, coin: string) => (
    <div className={classes.input}>
      <div className='content'>{formatMessage(userMessages.amountOfCoins, { num: currentUser[device][coin] })}</div>
      <Field
        name={`${device}.${coin}`}
        placeholder={formatMessage(messages.amountToGift)}
        isShort
        buttonText={formatMessage(messages.giftOrWithdraw)}
        component={CoinAdapter}
      />
    </div>
  )
  const genSelectContent = (key: string) => (
    <>
      <Field
        name={key}
        options={[{ label: currentUser[key], value: currentUser[key] }]}
        initialValue={currentUser[key]}
        component={SelectButtonAdapter}
      />
    </>
  )

  return (
    <>
      <ContentHeader breadcrumbList={breadcrumbList} titleText={titleText} />
      <Form
        onSubmit={() => {}}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit} className={classes.form}>
            <DataTable
              title={formatMessage(commonMessages.basicInfo)}
              dataSet={[
                toDataSet(formatMessage(commonMessages.id), currentUser.id),
                toDataSet(formatMessage(messages.nickName), currentUser.nickName),
                toDataSet(formatMessage(commonMessages.email), currentUser.email),
                toDataSet(formatMessage(messages.birthDate), currentUser.birthDate),
                toDataSet(formatMessage(messages.gender), currentUser.gender),
                toDataSet(
                  formatMessage(messages.favorite),
                  <Link to='#'>{formatMessage(messages.amountOfItems, { num: currentUser.favorite })}</Link>
                ),
                toDataSet(formatMessage(messages.lastLoginTime), currentUser.lastLoginTime),
                toDataSet(formatMessage(messages.hashPassword), currentUser.hashPassword),
                toDataSet(formatMessage(messages.failedLoginTimes), currentUser.failedLoginTimes),
                toDataSet(formatMessage(messages.loginLockedTime), currentUser.loginLockedTime),
                toDataSet(formatMessage(commonMessages.createDateTime), currentUser.createDateTime),
                toDataSet(formatMessage(commonMessages.updateDateTime), currentUser.updateDateTime)
              ]}
            />
            <DataTable
              title={formatMessage(messages.unsubscribeFlag)}
              dataSet={[
                toDataSet(formatMessage(userMessages.status), genSelectContent('status')),
                toDataSet(formatMessage(messages.unsubscribeDateTime), currentUser.unsubscribeDateTime)
              ]}
            />
            <DataTable
              title={formatMessage(messages.coinBalanceIos)}
              dataSet={[
                toDataSet(
                  formatMessage(messages.paidCoins),
                  formatMessage(userMessages.amountOfCoins, { num: currentUser.ios.paidCoins })
                ),
                toDataSet(
                  formatMessage(messages.paidBonusCoins),
                  formatMessage(userMessages.amountOfCoins, { num: currentUser.ios.paidBonusCoins })
                ),
                toDataSet(formatMessage(messages.paidGiftCoins), genCoinContent('ios', 'paidGiftCoins')),
                toDataSet(formatMessage(messages.freeBonusCoin), genCoinContent('ios', 'freeBonusCoin')),
                toDataSet(
                  formatMessage(messages.freeAdCoin),
                  formatMessage(userMessages.amountOfCoins, { num: currentUser.ios.freeAdCoin })
                ),
                toDataSet(
                  formatMessage(messages.freeVideoAdCoin),
                  formatMessage(userMessages.amountOfCoins, { num: currentUser.ios.freeVideoAdCoin })
                )
              ]}
            />
            <DataTable
              title={formatMessage(messages.coinBalanceAndroid)}
              dataSet={[
                toDataSet(
                  formatMessage(messages.paidCoins),
                  formatMessage(userMessages.amountOfCoins, { num: currentUser.android.paidCoins })
                ),
                toDataSet(
                  formatMessage(messages.paidBonusCoins),
                  formatMessage(userMessages.amountOfCoins, { num: currentUser.android.paidBonusCoins })
                ),
                toDataSet(formatMessage(messages.paidGiftCoins), genCoinContent('android', 'paidGiftCoins')),
                toDataSet(formatMessage(messages.freeBonusCoin), genCoinContent('android', 'freeBonusCoin')),
                toDataSet(
                  formatMessage(messages.freeAdCoin),
                  formatMessage(userMessages.amountOfCoins, { num: currentUser.android.freeAdCoin })
                ),
                toDataSet(
                  formatMessage(messages.freeVideoAdCoin),
                  formatMessage(userMessages.amountOfCoins, { num: currentUser.android.freeVideoAdCoin })
                )
              ]}
            />
            <DataTable
              title={formatMessage(messages.comment)}
              dataSet={[
                toDataSet(
                  formatMessage(messages.commentAuthorType),
                  <Field
                    name='commentAuthorType'
                    component={SelectAdapter}
                    defaultValue={currentUser.commentAuthorType}
                    options={[{ label: currentUser.commentAuthorType, value: currentUser.commentAuthorType }]}
                  />
                ),
                toDataSet(
                  formatMessage(messages.amountOfComment),
                  <Link to='#'>{formatMessage(messages.amountOfItems, { num: currentUser.comments })}</Link>
                ),
                toDataSet(formatMessage(messages.commentAuthority), genSelectContent('commentAuthority')),
                toDataSet(
                  formatMessage(messages.commentLimitedTermination),
                  <>
                    <Field
                      name='commentLimitedTermination'
                      component={TextInputAdapter}
                      placeholder={DATE_TIME_PLACEHOLDER}
                    />
                    <div className={classes.margin}>{formatMessage(messages.commentLimitedDescription)}</div>
                  </>
                )
              ]}
            />
            <DataTable
              title={formatMessage(messages.purchaseLogs)}
              dataSet={[
                toDataSet(
                  formatMessage(messages.epicsPurchaseLogs),
                  <Link to={replaceUserId(routePath.user.historyEpisode)}>
                    {formatMessage(messages.amountOfItems, { num: currentUser.epicsPurchaseLogs })}
                  </Link>
                ),
                toDataSet(
                  formatMessage(messages.subscriptionLogs),
                  <Link to={replaceUserId(routePath.user.historySubscription)}>
                    {formatMessage(messages.amountOfItems, { num: currentUser.subscriptionLogs })}
                  </Link>
                ),
                toDataSet(
                  formatMessage(messages.storePurchaseLogs),
                  <Link to={replaceUserId(routePath.user.historyMagazine)}>
                    {formatMessage(messages.amountOfItems, { num: currentUser.storePurchaseLogs })}
                  </Link>
                ),
                toDataSet(
                  formatMessage(messages.bonusCoinsChargeLogs),
                  <Link to={replaceUserId(routePath.user.historyBonusCoin)}>
                    {formatMessage(messages.amountOfItems, { num: currentUser.bonusCoinsChargeLogs })}
                  </Link>
                ),
                toDataSet(
                  formatMessage(messages.paidCoinsChargeLogs),
                  <Link to={replaceUserId(routePath.user.historyPayCoin)}>
                    {formatMessage(messages.amountOfItems, { num: currentUser.paidCoinsChargeLogs })}
                  </Link>
                )
              ]}
            />
            <DataTable
              title={formatMessage(messages.device)}
              dataSet={[
                toDataSet(
                  `${formatMessage(messages.device)}1`,
                  <div className={classes.device}>
                    <div>{currentUser.device1.name}</div>
                    <ListIcon
                      onClick={() => {
                        setOpen(true)
                        setSelectedDevice(currentUser.device1)
                      }}
                    />
                  </div>
                ),
                toDataSet(
                  `${formatMessage(messages.device)}2`,
                  <div className={classes.device}>
                    <div>{currentUser.device2.name}</div>
                    <ListIcon
                      onClick={() => {
                        setOpen(true)
                        setSelectedDevice(currentUser.device2)
                      }}
                    />
                  </div>
                )
              ]}
            />
            <DataTable
              title={formatMessage(messages.contentGift)}
              dataSet={[
                toDataSet(
                  formatMessage(messages.contentGift),
                  <DataTable
                    innerTable
                    tableClass={classes.innerTable}
                    dataSet={[
                      toDataSet(
                        formatMessage(commonMessages.application),
                        <Field name='contentGift.application' component={SelectAdapter} options={[]} />
                      ),
                      toDataSet(
                        formatMessage(commonMessages.contentId),
                        <>
                          <Field name='contentGift.contentId' component={SearchInputAdapter} />
                          <DetectiveButton
                            name='contentGift'
                            validate={value => !!value.application && !!value.contentId}
                            classnames={classes.margin}
                            buttonText={formatMessage(messages.gift)}
                            theme={Theme.DARK}
                            onClick={() => {}}
                          />
                        </>
                      )
                    ]}
                  />
                ),
                toDataSet(
                  formatMessage(messages.subscriptionGift),
                  <DataTable
                    innerTable
                    tableClass={classes.innerTable}
                    dataSet={[
                      toDataSet(
                        formatMessage(commonMessages.application),
                        <Field name='subscriptionGift.application' component={SelectAdapter} options={[]} />
                      ),
                      toDataSet(
                        formatMessage(messages.subscription),
                        <Field name='subscriptionGift.subscription' component={SelectAdapter} options={[]} />
                      ),
                      toDataSet(
                        formatMessage(userMessages.validityPeriod),
                        <>
                          <TimeSpanInput name='subscriptionGift.validityPeriod' />
                          <DetectiveButton
                            name='subscriptionGift'
                            validate={value =>
                              !!value.application &&
                              !!value.subscription &&
                              !!value.validityPeriodStart &&
                              !!value.validityPeriodEnd
                            }
                            classnames={classes.margin}
                            buttonText={formatMessage(messages.gift)}
                            theme={Theme.DARK}
                            onClick={() => {}}
                          />
                        </>
                      )
                    ]}
                  />
                )
              ]}
            />
          </form>
        )}
      />
      <DeviceDiaLog onClose={handleClose} open={open} selectedDevice={selectedDevice} />
    </>
  )
}
