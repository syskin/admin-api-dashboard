import React from 'react'
import { useDispatch } from 'react-redux'
import { getData, setLoading } from '../../store/actions/entityActions'

interface Props {
  name: string
  limit: number
  count: number
  page: number
}

const Pagination: React.FC<Props> = ({name, count, limit, page}) => {
  const pages = Math.ceil(count / limit)
  const dispatch = useDispatch()

  const updatePage = (e: any) => {
    const value = e.target.value || 1
    dispatch(getData(name, {page: parseInt(value)}, () => setLoading(false)))
  } 
  return (
    <div>Pagination with {pages} pages
    <ul>
      {
        [...Array(pages)].map((elementInArray, index) => ( 
          <li key={index}>
            <button disabled={page === index + 1} onClick={updatePage} value={index+1}>{index + 1}</button>
          </li>
          ) 
      )
      }
      
    </ul>
    </div>
  )
}
export default Pagination
