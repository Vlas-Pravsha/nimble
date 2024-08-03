import React from 'react'
import { Link } from 'react-router-dom'

import type { Contact } from '../@types/contact'

import ContactItem from './ContactItem'

interface ContactsListProps {
  contacts: Contact[]
}

const ContactsList: React.FC<ContactsListProps> = ({ contacts }) => {
  return (
    <div className="max-w-2xl mx-auto mt-10 rounded-lg">
      <h2 className="text-2xl font-bold mb-6">Contacts</h2>
      {contacts.map((contact: Contact) => (
        <div key={contact.id}>
          <Link to={`/contacts/${contact.id}`}>
            <ContactItem contact={contact} />
          </Link>
        </div>
      ))}
    </div>
  )
}

export default ContactsList
