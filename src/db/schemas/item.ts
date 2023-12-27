import {
  type RxJsonSchema,
  toTypedRxJsonSchema,
  type ExtractDocumentTypeFromTypedRxJsonSchema,
  type DeepReadonly,
  type RxDocument,
  type RxCollection,
} from 'rxdb'

export const itemSchemaLiteral = {
  title: 'item schema',
  version: 0,
  type: 'object',
  primaryKey: 'id',
  properties: {
    id: { type: 'string', maxLength: 50 },
    name: { type: 'string', maxLength: 50 },
    categoryId: { type: 'string' },
    note: { type: 'string' },
    imageUrl: { type: 'string' },
  },
  required: ['id', 'categoryId', 'name'],
} as const satisfies DeepReadonly<RxJsonSchema<any>> // eslint-disable-line @typescript-eslint/no-explicit-any
const schemaTyped = toTypedRxJsonSchema(itemSchemaLiteral)

export type ItemDocType = ExtractDocumentTypeFromTypedRxJsonSchema<typeof schemaTyped>
export type ItemDocument = RxDocument<ItemDocType>
export type ItemCollection = RxCollection<ItemDocType>

export const itemSchema: RxJsonSchema<ItemDocType> = itemSchemaLiteral
