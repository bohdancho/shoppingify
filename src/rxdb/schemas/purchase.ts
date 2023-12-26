import {
  type RxJsonSchema,
  toTypedRxJsonSchema,
  type ExtractDocumentTypeFromTypedRxJsonSchema,
  type DeepReadonly,
  type RxDocument,
  type RxCollection,
} from 'rxdb'

export const purchaseSchemaLiteral = {
  title: 'purchase schema',
  version: 0,
  type: 'object',
  primaryKey: 'id',
  properties: {
    id: { type: 'string', maxLength: 100 },
    item: { type: 'string', ref: 'item' },
    list: { type: 'string', ref: 'list' },
    amount: { type: 'number', minimum: 0 },
    isCompleted: { type: 'boolean' },
  },
  required: ['id', 'item', 'list', 'amount', 'isCompleted'],
} as const satisfies DeepReadonly<RxJsonSchema<any>> // eslint-disable-line @typescript-eslint/no-explicit-any
const schemaTyped = toTypedRxJsonSchema(purchaseSchemaLiteral)

export type PurchaseDocType = ExtractDocumentTypeFromTypedRxJsonSchema<typeof schemaTyped>
export type PurchaseDocument = RxDocument<PurchaseDocType>
export type PurchaseCollection = RxCollection<PurchaseDocType>

export const purchaseSchema: RxJsonSchema<PurchaseDocType> = purchaseSchemaLiteral
