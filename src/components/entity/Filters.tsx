import { Input, Select } from 'antd'
import React from 'react'
import { useDispatch } from 'react-redux'
import { getTableData, setLoading } from '../../store/actions/entityActions'
const { Option } = Select;

interface Props {
  name: string
  filter?: any
  model: any
  displayedFields: string[]
}

const Filters: React.FC<Props> = ({name, filter, displayedFields}) => {
  const dispatch = useDispatch()
  const currentLimit = filter ? filter.limit : undefined

  const submitForm = (e: any) => {
    e.preventDefault();
    const fields = e.target.elements
    const filter: Record<string, any> = {}

    displayedFields.map((field: string) => {
      filter[field] = fields[field].value
    })
    filter.page = 1
    dispatch(getTableData(name, filter, () => setLoading(false)))
  }

  const handleSelect = (value: string) => {
    const limit = parseInt(value)
    dispatch(getTableData(name, {...filter, limit }, () => setLoading(false)))
  }

  return (
    <div>
      
      Filter fields
      <form onSubmit={submitForm}>
      {displayedFields.map((field, index) => {
        return (
          <Input key={index} type="text" name={field} id={field} placeholder={field} defaultValue={filter[field]}/>
        )
      })}
      <Input type="submit" value="Submit" />
      </form>
      
      <Select id="limit" defaultValue={currentLimit} onChange={handleSelect}>
        <Option value="0">Define</Option>
        <Option value="5">5</Option>
        <Option value="10">10</Option>
        <Option value="25">25</Option>
        <Option value="50">50</Option>
        <Option value="100">100</Option>
      </Select>
    </div>
  )
}
export default Filters
