import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../store';

interface Props {
  name: string
  displayedFields: string[]
}

const EntityTable: React.FC<Props> = ({name, displayedFields}) => {
    const { data, count } = useSelector((state: RootState) => state.entity)
    return (
      <div>
        <h3>Table {name}</h3>
        <div>{ count ? `Found ${count} ${name.toLowerCase()}` : null}</div>
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
      </div>
    )
}
export default EntityTable
