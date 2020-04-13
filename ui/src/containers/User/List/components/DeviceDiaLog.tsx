import React from 'react'
import { useIntl } from 'react-intl'
import { Dialog, makeStyles } from '@material-ui/core'
import DataTable, { toDataSet } from '@src/components/table/DataTable'
import { backgroundColorLightGray } from '@src/common/styles'
import { ReactComponent as CrossIcon } from '@src/assets/form/cross.svg'
import commonMessages from '@src/messages'
import messages from '../messages'
import Button from '@src/components/Button/Button'

interface Props {
  onClose: () => void
  open: boolean
  selectedDevice?: any
}

const useStyles = makeStyles({
  root: {
    '& .MuiDialog-paper': {
      overflowY: 'visible'
    },
    '&  svg': {
      position: 'absolute',
      top: -50,
      left: 760
    },
    '&  svg:hover': {
      cursor: 'pointer'
    }
  },
  dialogTitle: {
    padding: '15px 20px',
    justifyContent: 'start',
    marginBottom: 0,
    backgroundColor: backgroundColorLightGray,
    '& > button': {
      marginLeft: '22px'
    }
  },
  dialogTable: {
    width: 800,
    borderRadius: 0
  }
})

export default function DeviceDiaLog({ onClose, open, selectedDevice }: Props) {
  const { formatMessage } = useIntl()
  const classes = useStyles()
  return (
    <Dialog open={open} maxWidth={false} className={classes.root}>
      <CrossIcon onClick={onClose} />
      <DataTable
        titleClass={classes.dialogTitle}
        title={selectedDevice?.name}
        buttons={<Button buttonText={formatMessage(messages.deleteDevice)} onClick={() => {}} />}
        tableClass={classes.dialogTable}
        dataSet={
          selectedDevice
            ? [
                toDataSet(formatMessage(messages.deviceId), selectedDevice.deviceId),
                toDataSet(formatMessage(messages.model), selectedDevice.model),
                toDataSet(formatMessage(messages.osInfo), selectedDevice.osInfo),
                toDataSet(formatMessage(commonMessages.createDateTime), selectedDevice.createDateTime),
                toDataSet(formatMessage(commonMessages.updateDateTime), selectedDevice.updateDateTime)
              ]
            : []
        }
      />
    </Dialog>
  )
}
