import React from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getData, setLoading } from '../../store/actions/entityActions';
import { RootState } from '../../store';

import Filters from '../../components/entity/Filters'
import EntityTable from '../../components/entity/EntityTable'
import Pagination from '../../components/entity/Pagination'

import { getEntityConfiguration } from '../../utils/getEntityConfByName'

interface Props {
  name: string
}
const Entity: React.FC<Props> = ({ name }) => {
    const dispatch = useDispatch()
    const location = useLocation()
    const { error } = useSelector((state: RootState) => state.entity)

    React.useEffect(() => {
      dispatch(getData(name, null, () => setLoading(false)))
    }, [location])

    return (
      <div>
        <h1>Entity &gt; { name }</h1>
        <div>{error}</div>
        <DataTable name={name} />
      </div>
    )
}

interface DataContentProps {
  name: string
}

const DataTable: React.FC<DataContentProps> = ({name}) => {
  const { entities, loading } = useSelector((state: RootState) => state.entity)
  const configuration = getEntityConfiguration(name)

  let limit = 0, count = 0, page= 1

  if(entities[name] && entities[name].data) {
    count = entities[name].count
    limit = entities[name].data.length
    if(entities[name].filter.limit) limit = entities[name].filter.limit
    if(entities[name].filter.page) page = entities[name].filter.page
  }

  const pagination = configuration.endpoints.getAll.pagination
  if (loading || !entities[name]) return (<div>Loading...</div>)
  if(count === 0) return (<div>
    <Filters name={name} filter={entities[name].filter} displayedFields={configuration.displayedFields} model={configuration.model} />
    <div>No data found</div>
    </div>
    )
  return (
    <div>
      <Filters name={name} filter={entities[name].filter} displayedFields={configuration.displayedFields} model={configuration.model} />
      <EntityTable data={entities[name].data} displayedFields={configuration.displayedFields} />
      <div>{pagination ? <Pagination name={name} limit={limit} count={count} page={page} /> : null}</div>
    </div>
  )
}
export default Entity
