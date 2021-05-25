import { Button, Modal } from 'antd'
import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import {
  deleteOneByIdentifier,
  executeAction
} from '../../../api/routes/entities'
import {
  reinitializeFormData,
  setLoading
} from '../../../store/actions/entityActions'
import getEntityConfiguration from '../../../utils/getEntityConfByName'
import { RouteParams } from '../../../utils/types/RouteParams'

interface FormProps {
  values: Record<string, any>
}

const Actions: React.FC<FormProps> = ({ values }) => {
  const dispatch = useDispatch()
  const history = useHistory()

  const { entityName, identifier } = useParams<RouteParams>()
  const configuration = getEntityConfiguration(entityName)

  const [visible, setVisible] = React.useState(false)
  const [confirmLoading, setConfirmLoading] = React.useState(false)
  const [modalText, setModalText] = React.useState('Content of the modal')
  const [modalAction, setModalAction] = React.useState({
    type: 'action-type',
    action: {}
  })

  const showModal = async (payload: any) => {
    setModalText('Are you sure to execute this action ?')
    const { type } = payload
    const action = payload.action ? await getAction(payload.action) : {}
    setModalAction({ type, action })
    setVisible(true)
  }

  const deleteEntityByIdentifier = async () => {
    try {
      dispatch(reinitializeFormData(entityName, () => setLoading(false)))
      await deleteOneByIdentifier(entityName, identifier)
    } catch (err) {
      toast.error(err.message)
    }
  }

  const getAction: any = async (action: any) => {
    if (!action || !Object.keys(action).includes('url')) return
    action.params.forEach((parameter: string) => {
      const pathParameter = `:${parameter}`
      if (action.url.includes(pathParameter) && values[parameter])
        action.url = action.url.replace(pathParameter, values[parameter])
    })
    return action
  }

  const handleModalOk: any = async () => {
    let redirect = false
    try {
      setConfirmLoading(true)
      switch (modalAction.type) {
        case 'delete':
          await deleteEntityByIdentifier()
          redirect = true
          break
        case 'custom-action':
          if (!modalAction.action)
            throw new Error(`Missing custom action configuration`)
          await executeAction(modalAction.action)
          break
        default:
          break
      }
      toast.success(`Action executed successfully !`)
    } catch (err) {
      toast.error(err.message)
    } finally {
      setVisible(false)
      setConfirmLoading(false)
      if (redirect) history.push(`/entity/${entityName}`)
    }
  }
  const handleModalCancel = () => {
    setVisible(false)
  }
  let customActions
  
  if(configuration.actions && configuration.actions.length > 0) {
    customActions = 
    <div>
      <div>Custom actions</div>
      <div>
        {configuration.actions.map((action: any, index: number) => {
          return (
            <Button
              key={index}
              style={{marginRight: '1em'}}
              onClick={() => {
                showModal({ type: 'custom-action', action })
              }}
            >
              {action.name}
            </Button>
          )
        })}
      </div>
    </div>
  }
  return (
    <div>
      <div>Actions</div>
      <Button onClick={() => showModal({ type: 'delete' })}>Delete</Button>  
      {customActions}
      

      <Modal
        title="Are you sure you want to proceed this action ?"
        visible={visible}
        onOk={handleModalOk}
        confirmLoading={confirmLoading}
        onCancel={handleModalCancel}
      >
        <p>{modalText}</p>
      </Modal>
    </div>
  )
}

export default Actions
