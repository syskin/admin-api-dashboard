import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getTableData, setLoading } from '../../store/actions/entityActions'
import { RootState } from '../../store'

import Filters from '../../components/entity/Filters'
import Table from '../../components/entity/Table'

import getEntityConfiguration from '../../utils/getEntityConfByName'
import { Pagination } from 'antd'

interface Props {
  name: string
}
const Entity: React.FC<Props> = ({ name }) => {
  const dispatch = useDispatch()
  const { error } = useSelector((state: RootState) => state.entity)

  React.useEffect(() => {
    dispatch(getTableData(name, null, () => setLoading(false)))
  }, [dispatch, name])

  return (
    <div>
      <h1>Entity &gt; {name}</h1>
      <div>{error}</div>
      <DataTable name={name} />
    </div>
  )
}

interface DataContentProps {
  name: string
}

const DataTable: React.FC<DataContentProps> = ({ name }) => {
  const dispatch = useDispatch()
  const { entities, loading } = useSelector((state: RootState) => state.entity)
  const configuration = getEntityConfiguration(name)

  let limit = 0,
    count = 0,
    page = 1,
    pagination = false,
    displayedFields = [],
    configurationModel = {}

  if (entities[name]) {
    count = entities[name].count

    if (entities[name].data) limit = entities[name].data.length

    if (entities[name].filter) {
      if (entities[name].filter.limit) limit = entities[name].filter.limit
      if (entities[name].filter.page) page = entities[name].filter.page
    }
  }

  if (configuration) {
    pagination = configuration.endpoints.getAll.pagination
    displayedFields = configuration.displayedFields
    configurationModel = configuration.model
  }

  if (loading || !entities[name]) return <div>Loading...</div>
  if (count === 0)
    return (
      <div>
        <Filters
          name={name}
          filter={entities[name].filter}
          displayedFields={displayedFields}
          model={configurationModel}
        />
        <div>No data found</div>
      </div>
    )
  const model: MapModel = configurationModel
  const identifier =
    Object.keys(model).find((field) => {
      if (model[field].identifier === true) return field
    }) || null

  const handleUpdatePage = (page: number) => {
    dispatch(getTableData(name, { page }, () => setLoading(false)))
  }

  return (
    <div>
      <Filters
        name={name}
        filter={entities[name].filter}
        displayedFields={displayedFields}
        model={configurationModel}
      />
      <Table
        data={entities[name].data}
        displayedFields={displayedFields}
        identifier={identifier}
      />
      <div>
        {pagination ? (
          <Pagination
            current={page}
            total={count}
            pageSize={limit}
            onChange={handleUpdatePage}
            showSizeChanger={false}
            size="small"
            hideOnSinglePage={true}
          />
        ) : null}
      </div>
    </div>
  )
}

interface MapModel {
  [key: string]: string | undefined | boolean | number | any
}
export default Entity
