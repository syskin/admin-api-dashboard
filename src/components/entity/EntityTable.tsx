import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../store';

interface Props {
  name: string;
}

const EntityTable: React.FC<Props> = ({name}) => {
    const { data } = useSelector((state: RootState) => state.entity);
    console.log(`Entity data`, data)
    return (
      <div>
        <h3>Table {name}</h3>
      </div>
    )
}
export default EntityTable
