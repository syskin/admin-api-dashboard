import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getData, setLoading } from '../../store/actions/entityActions';

interface Props {
  name: string
  filter?: any
}

const Filters: React.FC<Props> = ({name, filter}) => {
  const dispatch = useDispatch()
  const currentLimit = filter ? filter.limit : undefined
  const [filterLimit, setFilterLimit] = React.useState(currentLimit)
  const handleChange = (e: any) => {
    const value = e.target.value || 0
    setFilterLimit(value)

    if(parseInt(value) === 0) dispatch(getData(name, null, () => setLoading(false)))
    else dispatch(getData(name, {limit: parseInt(value)}, () => setLoading(false)))
  
  }

  return (
    <div>Filters list, displayed default filters + display limit
      <div>Limited to {filterLimit} entry</div>
      <hr></hr>
      <select id="limit" name="limit" value={filterLimit} onChange={handleChange}>
        <option value="0">Define</option>
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="25">25</option>
        <option value="50">50</option>
        <option value="100">100</option>
      </select>
    </div>
  )
}
export default Filters
