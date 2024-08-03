import type { ClassValue } from 'clsx'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

import type { FormData } from '../components/ContactForm'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function createContactPayload(formData: FormData) {
  return {
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
      'email': [{ value: formData.email, modifier: '', label: 'email' }],
    },
  }
}
