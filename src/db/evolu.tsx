import * as S from '@effect/schema/Schema'
import {
  EvoluProvider,
  NonEmptyString1000,
  SqliteBoolean,
  String,
  canUseDom,
  createEvolu,
  database,
  id,
  table,
  useQuery,
} from '@evolu/react'

const TodoId = id('Todo')
type TodoId = S.Schema.To<typeof TodoId>

const TodoCategoryId = id('TodoCategory')
type TodoCategoryId = S.Schema.To<typeof TodoCategoryId>

const NonEmptyString50 = String.pipe(S.minLength(1), S.maxLength(50), S.brand('NonEmptyString50'))
type NonEmptyString50 = S.Schema.To<typeof NonEmptyString50>

const TodoTable = table({
  id: TodoId,
  title: NonEmptyString1000,
  isCompleted: S.nullable(SqliteBoolean),
  categoryId: S.nullable(TodoCategoryId),
})
type TodoTable = S.Schema.To<typeof TodoTable>

const SomeJson = S.struct({ foo: S.string, bar: S.boolean })
type SomeJson = S.Schema.To<typeof SomeJson>

const TodoCategoryTable = table({
  id: TodoCategoryId,
  name: NonEmptyString50,
  json: S.nullable(SomeJson),
})
type TodoCategoryTable = S.Schema.To<typeof TodoCategoryTable>

const Database = database({
  todo: TodoTable,
  todoCategory: TodoCategoryTable,
})
type Database = S.Schema.To<typeof Database>

const evolu = createEvolu(Database)

const createFixtures = (): Promise<void> =>
  Promise.all(
    evolu.loadQueries([
      evolu.createQuery((db) => db.selectFrom('todo').selectAll()),
      evolu.createQuery((db) => db.selectFrom('todoCategory').selectAll()),
    ]),
  ).then(([todos, categories]) => {
    if (todos.row || categories.row) return

    const { id: notUrgentCategoryId } = evolu.create('todoCategory', {
      name: S.parseSync(NonEmptyString50)('Not Urgent'),
    })

    evolu.create('todo', {
      title: S.parseSync(NonEmptyString1000)('Try React Suspense'),
      categoryId: notUrgentCategoryId,
    })
  })

const isRestoringOwner = (isRestoringOwner?: boolean): boolean => {
  if (!canUseDom) return false
  const key = 'evolu:isRestoringOwner"'
  if (isRestoringOwner != null) localStorage.setItem(key, isRestoringOwner.toString())
  return localStorage.getItem(key) === 'true'
}

// Ensure fixtures are not added to the restored owner.
if (!isRestoringOwner()) await createFixtures()
const todos = evolu.createQuery((db) => db.selectFrom('todo').select(['id', 'title', 'isCompleted', 'categoryId']))

export function Evolu() {
  return (
    <EvoluProvider value={evolu}>
      <Acme />
    </EvoluProvider>
  )
}

export function Acme() {
  const acme = useQuery(todos)
  console.log(acme)
  return <div>{acme.row?.title}</div>
}
