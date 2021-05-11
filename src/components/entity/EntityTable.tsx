import React from 'react'
import { Link } from 'react-router-dom'

interface Props {
  displayedFields: string[]
  data: any[]
  identifier: string | null
}

const EntityTable: React.FC<Props> = ({displayedFields, data, identifier}) => {
  return (
    <table>
      <thead>
        <tr>
        {displayedFields.map((field, indexCol) => {
            return(
              <th key={`col_${indexCol}`}>
                {field}
              </th>
            )
          })}
          <th>Actions</th>
          </tr>
      </thead>
      <tbody>
        {data.map((entity, indexRow) => {
          return(
            <tr key={`row_${indexRow}`}>
            {displayedFields.map((field, indexCol) => {
                return(
                  <td key={`col_${indexCol}`}>
                    {entity[field]}
                  </td>
                )
              })}
              <td>
                {identifier ? <Link to={window.location.pathname + `/${entity[identifier]}`}>Display</Link> : null}
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}



export default EntityTable
