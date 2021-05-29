import responseFormatConfig from '../../formatResponsePath/responseTypes'
import { LOGIN_FORMAT, ENTITY_FORMAT } from '../../formatResponsePath/types'
import { loginResponsePath } from '../../../config/login'
describe('Test response types format response path service', () => {

  it('should return correct result by use case', () => {
      const useCases = [
          {
              responseFormat: null,
              payload: null,
              result: 'response'
          },
          {
              responseFormat: LOGIN_FORMAT,
              payload: {},
              result: loginResponsePath
          },
          {
              responseFormat: ENTITY_FORMAT,
              payload: { responsePath: 'path.to.data'},
              result: 'path.to.data'
          },
          {
              responseFormat: ENTITY_FORMAT,
              result: 'response'
          }
      ]

    useCases.forEach(({responseFormat, payload, result}) => {
        const responseFormatConfigResult = responseFormatConfig(responseFormat, payload)
        expect(responseFormatConfigResult).toBe(result)
    })
  })
})
