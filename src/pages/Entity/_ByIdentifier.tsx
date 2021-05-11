import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import { RootState } from '../../store';
import { getFormData, setLoading } from '../../store/actions/entityActions';

interface Props {
    identifierKey: string
}

interface RouteParams {
    entityName: string
    identifier: string
}

const Entity: React.FC<Props> = ({identifierKey}) => {
    const { entityName, identifier } = useParams<RouteParams>()
    const dispatch = useDispatch()
    const location = useLocation()

    React.useEffect(() => {
      dispatch(getFormData(entityName, identifier, () => setLoading(false)))
    }, [location])

    const { entities } = useSelector((state: RootState) => state.entity)
    return (
        <h1>Entity identifier</h1>
    )
}

export default Entity
