import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { deleteOneByIdentifier } from '../../api/routes/entities'
import { reinitializeFormData, setLoading } from '../../store/actions/entityActions'
import { RouteParams } from '../../utils/types/RouteParams'

const Actions: React.FC = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    const {entityName, identifier} = useParams<RouteParams>()
    const deleteEntityByIdentifier = async () => {
        try {
            dispatch( reinitializeFormData(entityName, () => setLoading(false) ) )
            await deleteOneByIdentifier(entityName, identifier)
            history.push(`/entity/${entityName}`)
        } catch (error) {
            
        }
    }
    return (
        <div>
            <div>Actions</div>
            <button onClick={deleteEntityByIdentifier}>Delete</button>
            <div>Custom actions</div>
        </div>
    )
}

export default Actions
