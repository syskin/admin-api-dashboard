export interface DynamicFormProps {
  fields: Field[]
  values: Record<string, any>
}

interface Field {
  name: string
  type: string
}
