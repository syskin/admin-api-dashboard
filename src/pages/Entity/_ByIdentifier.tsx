import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RootState } from '../../store';
import { getFormData, setLoading } from '../../store/actions/entityActions';

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

    React.useEffect(() => {
      dispatch(getFormData(entityName, identifier, () => setLoading(false)))
    }, [dispatch, entityName, identifier])

    const { entities } = useSelector((state: RootState) => state.entity)
    console.log(entities)
    return (
        <h1>Entity identifier</h1>
    )
}

export default Entity
