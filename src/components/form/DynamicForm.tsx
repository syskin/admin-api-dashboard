import React from 'react';
import { timestampToDate } from '../../utils/timestampToDate';
import { DynamicFormProps } from '../../utils/types/DynamicFrom';

const DynamicForm: React.FC<DynamicFormProps> = ({fields, values}) => {  
  const onSubmit = (e: any) => {
    e.preventDefault();
    const filter: Record<string, any> = {}
    const formFields = e.target.elements
    Object.keys(fields).map((field: string) => {
      filter[field] = formFields[field] ? formFields[field].value : null
    })
  }
  return(
    <form onSubmit={onSubmit}>
      {Object.keys(fields).map((field: any, index: number) => {
        const type = fields[field] ? fields[field].type : 'String'
        return(
          <div key={index}>
            <GetInputType name={field} type={type} value={values ? values[field] : undefined} />
          </div>
        )
      })}
      <input type="submit" value="Submit" />
    </form>
  );
}

interface InputType {
  name: string
  type: string
  value: string | number | undefined
}

const GetInputType: React.FC<InputType> = ({name, type, value}) => {
  switch(type.toLowerCase()) {
    case 'string': 
      return (<input placeholder={name} name={name} type="text" defaultValue={value}/>)
    case 'number': 
      return (<input placeholder={name} name={name} type="number" defaultValue={value}/>)
    case 'boolean': 
      const parseBooleanValue: boolean = value ? true : false
      return (<input placeholder={name} name={name} type="checkbox" checked={parseBooleanValue} onChange={inputHandler}/>)
    case 'date':
      let dateValue: any = value?.toString()
      if( value) {
        dateValue = Date.parse(dateValue)
        dateValue = timestampToDate(dateValue)
      }
      return (<input placeholder={name} name={name} type="date" defaultValue={dateValue}/>)
    default :
      return null
  }
}

const inputHandler = () => {
  console.log()
}

export default DynamicForm;
