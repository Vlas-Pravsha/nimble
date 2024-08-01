import { Link } from 'react-router-dom'

import ContactItem from './ContactItem'

const ContactsList = ({ contacts }: any) => {
  return (
    <div className="max-w-2xl mx-auto mt-10 rounded-lg">
      <h2 className="text-2xl font-bold mb-6">Contacts</h2>
      {contacts.map((contact: any) => (
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
