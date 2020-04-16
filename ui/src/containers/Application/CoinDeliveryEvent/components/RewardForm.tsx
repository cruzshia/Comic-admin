import React, { useCallback, useEffect } from 'react'
import { useIntl } from 'react-intl'
import { Mutators } from 'final-form-arrays'
import { Field, useField } from 'react-final-form'
import { FieldArray } from 'react-final-form-arrays'
import { makeStyles } from '@material-ui/core'
import Button, { Theme } from '@src/components/Button/Button'
import { ReactComponent as IconAdd } from '@src/assets/form/add_circle.svg'
import { TextInputAdapter, SelectAdapter } from '@src/components/finalForm'
import { backgroundColorLightGray } from '@src/common/styles'
import { REWARD_NUM } from '../constants'
import applicationMessages from '../../messages'
import messages from '../messages'

const PADDING = '10px'
const REWARD_FIELD = 'reward'

const useStyle = makeStyles({
  table: {
    borderCollapse: 'collapse'
  },
  thead: {
    '& th': {
      paddingLeft: PADDING,
      fontSize: 12,
      textAlign: 'left',
      paddingBottom: '8px'
    }
  },
  tbody: {
    '& td': {
      width: '25%',
      padding: `${PADDING} 12px ${PADDING} 5px`,
      backgroundColor: backgroundColorLightGray,
      '&:first-child': {
        paddingLeft: PADDING
      },
      '&:last-child': {
        paddingRight: PADDING
      }
    },
    '& .MuiSelect-select': {
      padding: '6px 0 6px 15px'
    }
  },
  button: {
    marginTop: '20px'
  }
})

export default function RewardForm({ mutators, name }: { mutators: Mutators; name?: string }) {
  const classes = useStyle()
  const { formatMessage } = useIntl()
  const fieldName = name || REWARD_FIELD
  const handleAdd = useCallback(() => mutators.push(fieldName, {}), [mutators, fieldName])
  const value = useField(fieldName).input.value

  useEffect(() => {
    const addNum = Array.isArray(value) ? REWARD_NUM - value.length : REWARD_NUM
    if (addNum > 0) {
      mutators.concat(fieldName, new Array(addNum).fill({}))
    }
  })

  return (
    <>
      <table className={classes.table}>
        <thead className={classes.thead}>
          <tr>
            <th>{formatMessage(messages.resultCode)}</th>
            <th>{formatMessage(messages.coinReward)}</th>
            <th>{formatMessage(messages.coinRewardNum)}</th>
            <th>{formatMessage(messages.rewardLimitation)}</th>
          </tr>
        </thead>
        <tbody className={classes.tbody}>
          <FieldArray name={fieldName}>
            {({ fields }) =>
              fields.map(name => (
                <tr key={name}>
                  <td>
                    <Field
                      name={`${name}.resultCode`}
                      component={TextInputAdapter}
                      placeholder={formatMessage(applicationMessages.inputCode)}
                      short
                    />
                  </td>
                  <td>
                    <Field name={`${name}.coinReward`} component={SelectAdapter} options={[]} isShort />
                  </td>
                  <td>
                    <Field
                      name={`${name}.coinRewardNum`}
                      component={TextInputAdapter}
                      placeholder={formatMessage(applicationMessages.inputCoinNum)}
                      short
                    />
                  </td>
                  <td>
                    <Field name={`${name}.rewardLimitation`} component={SelectAdapter} options={[]} isShort />
                  </td>
                </tr>
              ))
            }
          </FieldArray>
        </tbody>
      </table>
      <Button
        classnames={classes.button}
        theme={Theme.DARK_BORDER}
        icon={IconAdd}
        buttonText={formatMessage(messages.addReward)}
        onClick={handleAdd}
      />
    </>
  )
}
