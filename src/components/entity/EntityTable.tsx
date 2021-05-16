import { Space, Table } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'

interface Props {
  displayedFields: string[]
  data: any[]
  identifier: string | null
}

const EntityTable: React.FC<Props> = ({
  displayedFields,
  data,
  identifier
}) => {
  data = data.map((value, key) => ({ ...value, key }))
  const tableHeaders = displayedFields.map((field): any => ({
    title: field,
    dataIndex: field,
    key: field.toLowerCase()
  }))

  tableHeaders.push({
    title: 'Action',
    key: 'action',
    name: 'test',
    // eslint-disable-next-line react/display-name
    render: (field: any) => (
      <Space size="middle">
        {identifier ? (
          <Link to={window.location.pathname + `/${field[identifier]}`}>
            Display
          </Link>
        ) : null}
      </Space>
    )
  })
  return (
    <div>
      <Table
        columns={tableHeaders}
        dataSource={data}
        size="small"
        pagination={false}
      />
    </div>
  )
}

export default EntityTable
