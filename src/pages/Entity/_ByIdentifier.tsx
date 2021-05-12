import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import DynamicForm from '../../components/form/DynamicForm';
import { RootState } from '../../store';
import { getFormData, setLoading } from '../../store/actions/entityActions';
import getEntityConfiguration from '../../utils/getEntityConfByName';

interface Props {
    identifierKey: string
}

interface RouteParams {
    entityName: string
    identifier: string
}

const Entity: React.FC<Props> = () => {
    const { entityName, identifier } = useParams<RouteParams>()
    const dispatch = useDispatch()
    const configuration = getEntityConfiguration(entityName)

    React.useEffect(() => {
      dispatch(getFormData(entityName, identifier, () => setLoading(false)))
    }, [dispatch, entityName, identifier])

    const { entities } = useSelector((state: RootState) => state.entity)
    const formEntityValues = entities[entityName] ? entities[entityName].form : {}
    return (
        <div>
            <h1>Entity identifier</h1>
            <DynamicForm fields={configuration.model} values={formEntityValues}/>
        </div>
    )
}

export default Entity
