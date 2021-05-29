import * as ResponseTypes from '../../formatResponsePath/responseTypes'
import formatResponsePath from '../../formatResponsePath'
import { LOGIN_FORMAT, ENTITY_FORMAT } from '../../formatResponsePath/types'
describe('Test format response path service', () => {

  it('sould return undefined response cause of missing parameters', async () => {
    let result = formatResponsePath()
    expect(result).toBe(undefined)
    result = formatResponsePath({data: {test: 'value'}})
    expect(result).toBe(undefined)
    result = formatResponsePath({data: {test: 'value'}}, ENTITY_FORMAT)
    expect(result).toBe(undefined)
  })

  it('should return incorrect structured response', () => {
    const mockedResponse = 'path.to.data'
    const spyResponseTypes = jest.spyOn(ResponseTypes, 'default')
    spyResponseTypes.mockReturnValue(mockedResponse)

    const result = formatResponsePath({}, 'formatResponse', {})
    expect(result).toStrictEqual({})
  })
  
  it('should return structured response', () => {
    const mockedResponse = 'path.to.data'
    const spyResponseTypes = jest.spyOn(ResponseTypes, 'default')
    spyResponseTypes.mockReturnValue(mockedResponse)

    const result = formatResponsePath({path: {to: {data: 'Hello'}}}, 'formatResponse', {})
    expect(result).toBe("Hello")
  })
})
