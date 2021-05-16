import React from 'react'
import { timestampToDate } from '../../../utils/timestampToDate'
import { DynamicFormProps } from '../../../utils/types/DynamicFrom'
import { Button, Input } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import {
  setLoading,
  updateFormData
} from '../../../store/actions/entityActions'
import { useParams } from 'react-router-dom'
import { RouteParams } from '../../../utils/types/RouteParams'
import { RootState } from '../../../store'
import TextArea from 'antd/lib/input/TextArea'

import './DynamicForm.scss'

const DynamicForm: React.FC<DynamicFormProps> = ({ fields, values }) => {
  const dispatch = useDispatch()
  const { entityName, identifier } = useParams<RouteParams>()
  const { loading } = useSelector((state: RootState) => state.entity)

  const onSubmit = (e: any) => {
    e.preventDefault()

    const fieldsValue: Record<string, any> = {}
    const formFields = e.target.elements

    Object.keys(fields).map((field: any) => {
      if (formFields[field].type === 'checkbox')
        fieldsValue[field] = formFields[field]
          ? formFields[field].checked
          : false
      else if (formFields[field].type === 'textarea')
        fieldsValue[field] = formFields[field]
          ? JSON.parse(formFields[field].value)
          : ''
      else fieldsValue[field] = formFields[field] ? formFields[field].value : ''
    })
    dispatch(
      updateFormData(fieldsValue, entityName, identifier, () =>
        setLoading(false)
      )
    )
  }

  if (loading) return <div>Loading...</div>
  return (
    <form onSubmit={onSubmit}>
      {Object.keys(fields).map((field: any, index: number) => {
        const type = fields[field] ? fields[field].type : 'String'
        return (
          <div className="input-wrapper" key={index}>
            <label htmlFor={field}>{field}: </label>
            <GetInputType
              name={field}
              type={type}
              value={values ? values[field] : undefined}
            />
          </div>
        )
      })}
      <Button style={{ margin: '1em 0' }} htmlType="submit">
        Submit
      </Button>
    </form>
  )
}

interface InputType {
  name: string
  type: string
  value: string | number | undefined
}

const GetInputType: React.FC<InputType> = ({ name, type, value }) => {
  switch (type.toLowerCase()) {
    case 'string':
      return (
        <Input
          placeholder={name}
          name={name}
          type="text"
          defaultValue={value}
        />
      )
    case 'number':
      return (
        <Input
          placeholder={name}
          name={name}
          type="number"
          defaultValue={value}
        />
      )
    case 'boolean':
      const formattedValue = value ? true : false
      return (
        <Input
          placeholder={name}
          name={name}
          type="checkbox"
          defaultChecked={formattedValue}
        />
      )
    case 'json':
    case 'array':
      const stringifiedValue = JSON.stringify(value, undefined, 4)
      return (
        <TextArea
          placeholder={name}
          name={name}
          defaultValue={stringifiedValue}
          autoSize={{ minRows: 2, maxRows: 6 }}
        />
      )
    case 'date':
      let dateValue: any = value?.toString()
      if (value) {
        dateValue = Date.parse(dateValue)
        dateValue = timestampToDate(dateValue)
      }
      return (
        <Input
          placeholder={name}
          name={name}
          type="date"
          defaultValue={dateValue}
        />
      )
    default:
      return null
  }
}

export default DynamicForm
