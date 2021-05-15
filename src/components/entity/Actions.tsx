import { Button } from 'antd'
import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { deleteOneByIdentifier, executeAction } from '../../api/routes/entities'
import { reinitializeFormData, setLoading } from '../../store/actions/entityActions'
import getEntityConfiguration from '../../utils/getEntityConfByName'
import { RouteParams } from '../../utils/types/RouteParams'

interface FormProps {
    values: Record<string, any>
}

const Actions: React.FC<FormProps> = ({values}) => {
    const dispatch = useDispatch()
    const history = useHistory()

    const {entityName, identifier} = useParams<RouteParams>()
    const configuration = getEntityConfiguration(entityName)

    const deleteEntityByIdentifier = async () => {
        try {
            dispatch( reinitializeFormData(entityName, () => setLoading(false) ) )
            await deleteOneByIdentifier(entityName, identifier)
            history.push(`/entity/${entityName}`)
            toast.info(`Data deleted successfully`)
        } catch (err) {
            toast.error(err.message)
        }
    }

    const handleAction: any = async (action: any) => {
        try {            
            action.params.forEach((parameter: string) => {
                const pathParameter = `:${parameter}`
                if(action.url.includes(pathParameter) && values[parameter]) action.url = action.url.replace(pathParameter, values[parameter])
            })
            await executeAction(action)
            toast.success(`Action executed successfully !`)
        } catch (err) {
            toast.error(err.message)
        }
    }


    return (
        <div>
            <div>Actions</div>
            <Button onClick={deleteEntityByIdentifier}>Delete</Button>
            <div>Custom actions</div>
            <div>
                {configuration.actions.map((action: any, index: number) => {
                    return (
                        <Button key={index} onClick={ (e) => {handleAction(action)}}>
                            {action.name}
                        </Button>
                        )
                })}
            </div>
        </div>
    )
}

export default Actions
