import { entities } from '../config/entities'
import { Configuration } from './types/EnitityConfiguration'

const getEntityConfiguration: any = (name: string) => {
  const definedConfigurationEntity = entities
    .filter(
      (entitiyConfig): entitiyConfig is Configuration =>
        entitiyConfig.name.toLowerCase() === name
    )
    .map((entityConfig) => entityConfig)
  return definedConfigurationEntity[0]
}

export default getEntityConfiguration
