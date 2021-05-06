import React from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getData, setError, setLoading } from '../../store/actions/entityActions';
import { RootState } from '../../store';

import EntityTable from '../../components/entity/EntityTable'

import { getEntityConfiguration } from '../../utils/getEntityConfByName'

interface Props {
  name: string;
}
const Entity: React.FC<Props> = ({ name }) => {
    const dispatch = useDispatch();
    const location = useLocation()
    const { error } = useSelector((state: RootState) => state.entity);
    React.useEffect(() => {
      dispatch(getData(name, () => setLoading(false)))
    }, [location]);

    return (
      <div>
        <h1>Entity &gt; { name }</h1>
        <div>{error}</div>
        <EntityTable name={name} />
      </div>
    )
}
export default Entity
