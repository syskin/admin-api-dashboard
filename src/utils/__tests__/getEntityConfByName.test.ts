import getEntityConfiguration from '../getEntityConfByName'
import { entities } from '../../config/entities'
import { Configuration } from '../types/EnitityConfiguration'
describe('Get entity configuration by its name utils method', () => {
  it('Test an undefined configruation name', () => {
    const result = getEntityConfiguration()
    expect(result).toBe(undefined)
  })

  it('Test an undefined configruation name', () => {
    entities.forEach((entity: Configuration) => {
      const result = getEntityConfiguration(entity.name.toLocaleLowerCase())
      expect(result).toBe(entity)
    })
  })
})
