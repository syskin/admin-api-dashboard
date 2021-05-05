export const LOGIN_FORMAT = 'LOGIN_FORMAT'
export const ENTITY_FORMAT = 'ENTITY_FORMAT'
export interface Payload {
  name: string
  path: string
  responsePath: string
}
export type ResponseFormatType = typeof ENTITY_FORMAT | typeof LOGIN_FORMAT
