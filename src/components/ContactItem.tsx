import React from 'react'
import { CircleX, User } from 'lucide-react'

import { useDeleteContactMutation } from '../redux/contacts/contactsApi'

interface Field {
  id: string
  value: string
}

type ContactItemProps = {
  contact: any
}

const ContactItem: React.FC<ContactItemProps> = ({ contact }) => {
  const getFirstValue = (field: Field[]) => field?.[0]?.value || ''

  const [deleteContact] = useDeleteContactMutation()

  const handleDelete = async (e: React.MouseEvent, id: number) => {
    e.preventDefault()
    await deleteContact(id.toString())
  }

  const firstName = getFirstValue(contact.fields['first name'])
  const lastName = getFirstValue(contact.fields['last name'])
  const email = getFirstValue(contact.fields.email)

  return (
    <div className="bg-gray-100 p-4 mb-2 rounded-lg flex items-start w-[558px]">
      <div className="mr-4">
        <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
          <User />
        </div>
      </div>
      <div className="flex-grow">
        <h3 className="font-semibold">
          {firstName && <span>{firstName}</span>}
          {lastName && <span> {lastName}</span>}
        </h3>
        {email && <p className="text-sm text-gray-600">{email}</p>}
        <div className="mt-2 flex flex-wrap">
          {contact.tags.map((tag) => (
            <span
              key={tag.id}
              className="bg-gray-300 text-sm px-2 py-1 rounded mr-2 mb-2"
            >
              {tag.tag}
            </span>
          ))}
        </div>
      </div>
      <button
        onClick={(event) => handleDelete(event, contact.id)}
        className="text-gray-500 hover:text-gray-700"
      >
        <CircleX />
      </button>
    </div>
  )
}

export default ContactItem
