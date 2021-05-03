import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { getData, setError, setLoading } from '../../store/actions/entityActions';
import { RootState } from '../../store';

import EntityTable from '../../components/entity/EntityTable'

interface Props {
  name: string;
}

const Entity: React.FC<Props> = ({ name }) => {
    const dispatch = useDispatch();
    const { error } = useSelector((state: RootState) => state.auth);
    React.useEffect(() => {
      return () => {
        if(error) {
          dispatch(setError(''));
        }
      }
    }, [error, dispatch]);

    dispatch(getData(name, () => setLoading(false)))

    return (
      <div>
        <h1>Entity &gt; { name }</h1>
        <EntityTable name={name} />
      </div>
    )
}

export default Entity
