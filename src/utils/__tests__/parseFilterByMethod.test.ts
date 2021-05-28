import { parseFilterByMethod } from '../parseFilterByMethod'
describe('Get filter parsed by HTTP method', () => {
  it('Test an undefined filter', () => {
    const result = parseFilterByMethod()
    expect(result).toBe(undefined)
  })
  it('Test defined filter with get method', () => {
    const result = parseFilterByMethod('get', { name: 'test' })
    expect(result).toBe('?name=test')
  })
  it('Test defined filter with any other HTTP method', () => {
    const filter = { name: 'test' }
    const result = parseFilterByMethod('post', filter)
    expect(result).toBe(filter)
  })
  it('Test defined filter with any other HTTP method with emptyFields delete', () => {
    const filter = { name: 'test', emptyField: null }
    let result = parseFilterByMethod('post', filter, false)
    expect(result).toBe(filter)
    result = parseFilterByMethod('post', filter, true)
    expect(result).toBe(filter)
  })
})
