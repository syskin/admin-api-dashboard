import { entities } from '../config/entities'

export const getEntityConfiguration = (name: string) => {
  return entities.filter((ent) => {
    return ent.name.toLowerCase() === name
  })[0]
}
