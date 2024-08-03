import { ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

import { FormData } from '../components/ContactForm'

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}

export const createContactPayload = (formData: FormData) => ({
  record_type: 'person',
  privacy: {
    edit: null,
    read: null,
  },
  owner_id: null,
  fields: {
    'first name': [
      { value: formData.firstName, modifier: '', label: 'first name' },
    ],
    'last name': [
      { value: formData.lastName, modifier: '', label: 'last name' },
    ],
    email: [{ value: formData.email, modifier: '', label: 'email' }],
  },
})
