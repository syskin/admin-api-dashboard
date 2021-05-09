import React from 'react'
import { useDispatch } from 'react-redux'
import { getData, setLoading } from '../../store/actions/entityActions'

interface Props {
  name: string
  filter?: any
  model: any
  displayedFields: string[]
}

const Filters: React.FC<Props> = ({name, filter, model, displayedFields}) => {
  const dispatch = useDispatch()
  const currentLimit = filter ? filter.limit : undefined
  const [filterLimit, setFilterLimit] = React.useState(currentLimit)

  const handleChange = (e: any) => {
    const value = e.target.value || 0
    setFilterLimit(value)

    if(parseInt(value) === 0) dispatch(getData(name, null, () => setLoading(false)))
    else dispatch(getData(name, {limit: parseInt(value), page: 1}, () => setLoading(false)))
  
  }

  const submitForm = (e: any) => {
    e.preventDefault();
    const fields = e.target.elements
    const filter: {[k: string]: any} = {}

    displayedFields.map((field: string) => {
      filter[field] = fields[field].value
    })
    filter.page = 1
    dispatch(getData(name, filter, () => setLoading(false)))
  }

  return (
    <div>
      <hr></hr>
      Filter fields
      <form onSubmit={submitForm}>
      {displayedFields.map((field, index) => {
        return (
          <input key={index} type="text" name={field} id={field} placeholder={field} defaultValue={filter[field]}/>
        )
      })}
      <input type="submit" value="Submit" />
      </form>
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
