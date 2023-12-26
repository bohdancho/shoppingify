import {
  type RxJsonSchema,
  toTypedRxJsonSchema,
  type ExtractDocumentTypeFromTypedRxJsonSchema,
  type DeepReadonly,
  type RxDocument,
  type RxCollection,
} from 'rxdb'

export const categorySchemaLiteral = {
  title: 'category schema',
  version: 0,
  type: 'object',
  primaryKey: 'name',
  properties: {
    name: { type: 'string', maxLength: 100 },
    items: {
      type: 'array',
      ref: 'item',
      items: { type: 'string' },
    },
  },
  required: ['name', 'items'],
} as const satisfies DeepReadonly<RxJsonSchema<any>> // eslint-disable-line @typescript-eslint/no-explicit-any
const schemaTyped = toTypedRxJsonSchema(categorySchemaLiteral)

export type CategoryDocType = ExtractDocumentTypeFromTypedRxJsonSchema<typeof schemaTyped>
export type CategoryDocument = RxDocument<CategoryDocType>
export type CategoryCollection = RxCollection<CategoryDocType>

export const categorySchema: RxJsonSchema<CategoryDocType> = categorySchemaLiteral
