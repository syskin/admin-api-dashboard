import React from 'react'

interface Props {
  displayedFields: string[]
  data: any[]
}

const EntityTable: React.FC<Props> = ({displayedFields, data}) => {
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
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
export default EntityTable
