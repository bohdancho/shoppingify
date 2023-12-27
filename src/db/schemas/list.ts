import {
  type RxJsonSchema,
  toTypedRxJsonSchema,
  type ExtractDocumentTypeFromTypedRxJsonSchema,
  type DeepReadonly,
  type RxDocument,
  type RxCollection,
} from 'rxdb'

export const listSchemaLiteral = {
  title: 'list schema',
  version: 0,
  type: 'object',
  primaryKey: 'id',
  properties: {
    id: {
      type: 'string',
      maxLength: 100,
    },
    name: { type: 'string' },
    state: {
      type: 'string',
      enum: ['active', 'cancelled', 'completed'],
    },
    createdAt: { type: 'number' },
  },
  required: ['id', 'state'],
} as const satisfies DeepReadonly<RxJsonSchema<any>> // eslint-disable-line @typescript-eslint/no-explicit-any
const schemaTyped = toTypedRxJsonSchema(listSchemaLiteral)

export type ListDocType = ExtractDocumentTypeFromTypedRxJsonSchema<typeof schemaTyped>
export type ListDocument = RxDocument<ListDocType>
export type ListCollection = RxCollection<ListDocType>

export const listSchema: RxJsonSchema<ListDocType> = listSchemaLiteral
