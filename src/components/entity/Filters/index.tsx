import { Button, Input, Select } from 'antd'
import React from 'react'
import { useDispatch } from 'react-redux'
import { getTableData, setLoading } from '../../../store/actions/entityActions'
const { Option } = Select

interface Props {
  name: string
  filter?: any
  model: any
  displayedFields: string[]
}

const Filters: React.FC<Props> = ({ name, filter, displayedFields }) => {
  const dispatch = useDispatch()
  const currentLimit = filter ? filter.limit : undefined

  const submitForm = (e: any) => {
    e.preventDefault()
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
    filter.page = 1
    dispatch(getTableData(name, { ...filter, limit }, () => setLoading(false)))
  }

  return (
    <div>
      <form onSubmit={submitForm}>
        {displayedFields.map((field, index) => {
          return (
            <div
              className="input-wrappper"
              key={index}
              style={{ padding: '0.5em' }}
            >
              <label htmlFor={field}>{field}: </label>
              <Input
                key={index}
                type="text"
                name={field}
                id={field}
                placeholder={field}
                defaultValue={filter && filter[field] ? filter[field] : null}
              />
            </div>
          )
        })}
        <span style={{ width: '100%' }} />
        <Button
          style={{ maxWidth: '10em', margin: '1em auto' }}
          htmlType="submit"
        >
          Submit
        </Button>
      </form>
      <Select
        style={{ float: 'right', margin: '1em 0' }}
        id="limit"
        defaultValue={currentLimit}
        onChange={handleSelect}
      >
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
