import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Input } from '~/components/ui'
import { Button } from '~/components/ui'
import { type ListDocument } from '~/db'
import { cn, trimString } from '~/utils'

const schema = z
  .object({
    name: z.preprocess(trimString, z.string().min(1)),
  })
  .required()

export function ListNameForm({ list, onSubmit }: { list: ListDocument; onSubmit: (name: string) => void }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof schema>>({ resolver: zodResolver(schema), defaultValues: { name: list.name } })

  return (
    <form onSubmit={handleSubmit(({ name }) => onSubmit(name))} className='flex' noValidate>
      <Input
        placeholder='Enter a name'
        className={cn({ 'border-red-500': errors.name?.message }, '-mr-2 border-r-transparent pr-2')}
        {...register('name', { required: true })}
      />
      <Button type='submit'>Save</Button>
    </form>
  )
}
