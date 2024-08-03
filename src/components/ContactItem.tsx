import React from 'react'
import { CircleX, User } from 'lucide-react'

import { useDeleteContactMutation } from '../redux/contacts/contactsApi'
import type { Contact, Field } from '../@types/contact'

import { Button } from './ui/'

interface ContactItemProps {
  contact: Contact
}

const ContactItem: React.FC<ContactItemProps> = ({ contact }) => {
  const [deleteContact] = useDeleteContactMutation()

  const getFirstValue = (field: Field[]): string => field?.[0]?.value || ''

  const handleDelete = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: number,
  ) => {
    event.preventDefault()
    await deleteContact(id)
  }

  const firstName = getFirstValue(contact.fields['first name'])
  const lastName = getFirstValue(contact.fields['last name'])
  const email = getFirstValue(contact.fields.email)

  return (
    <div className="bg-gray-100 p-4 mb-2 rounded-lg flex items-start w-full max-w-[558px]">
      <div className="mr-4">
        <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
          <User />
        </div>
      </div>
      <div className="flex-grow">
        <h3 className="font-semibold">
          {firstName && <span>{firstName}</span>}
          {lastName && (
            <span>
              {' '}
              {lastName}
            </span>
          )}
        </h3>
        {email && <p className="text-sm text-gray-600">{email}</p>}
        <div className="mt-2 flex flex-wrap">
          {contact.tags.map(({ id, tag }) => (
            <span
              key={id}
              className="bg-gray-300 text-sm px-2 py-1 rounded mr-2 mb-2"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      <Button
        variant="icon"
        onClick={event => handleDelete(event, contact.id)}
      >
        <CircleX />
      </Button>
    </div>
  )
}

export default ContactItem
