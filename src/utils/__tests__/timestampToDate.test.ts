import { timestampToDate } from '../timestampToDate'
describe('Convert timestamp to date', () => {
  it('Test with undefined date', () => {
    const result = timestampToDate()
    expect(result).toBe(null)
  })
  it('Test defined date', () => {
    const date = new Date(2021, 10, 17)
    const result = timestampToDate(date)
    expect(result).toBe("2021-11-17")
  })
  it('Test defined date with low month and low date', () => {
    const date = new Date(2021, 1, 1)
    const result = timestampToDate(date)
    expect(result).toBe("2021-02-01")
  })
})