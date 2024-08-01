import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

import { Label } from './ui/Label'
import { Input } from './ui/Input'

const schema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  email: z.string().email({ message: 'Invalid email address' }),
})

type FormData = z.infer<typeof schema>

const ContactForm: React.FC<{ createContact: (data: FormData) => void }> = ({
  createContact,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = (data: FormData) => {
    createContact(data)
  }

  return (
    <div className="max-w-md mx-auto mt-10 rounded-lg sticky top-0 bg-white p-4 shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Create Contact</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            {...register('firstName')}
            error={errors.firstName?.message}
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            {...register('lastName')}
            error={errors.lastName?.message}
          />
        </div>
        <div className="mb-6">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            {...register('email')}
            error={errors.email?.message}
          />
        </div>
        <button
          type="submit"
          className="w-full border border-gray-500 bg-white text-xl font-bold text-black py-2 px-4 rounded-md transition duration-300"
        >
          Add Contact
        </button>
      </form>
    </div>
  )
}

export default ContactForm
