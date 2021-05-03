import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../store';

interface Props {
  name: string;
}

const EntityTable: React.FC<Props> = ({name}) => {
    const { data } = useSelector((state: RootState) => state.entity);
    return (
      <div>
        <h3>Table {name}</h3>
        {data.map((entity, index) => <div key={index}>{entity.title}</div>)}
      </div>
    )
}
export default EntityTable
