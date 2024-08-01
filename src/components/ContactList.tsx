import { useDeleteContactMutation } from '../redux/contacts/contactsApi'

import ContactItem from './ContactItem'

const ContactsList = ({ contacts }: any) => {
  const [deleteContact] = useDeleteContactMutation()

  const handleDelete = async (id: number) => {
    await deleteContact(id.toString())
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 rounded-lg">
      <h2 className="text-2xl font-bold mb-6">Contacts</h2>
      {contacts.map((contact: any) => (
        <ContactItem
          key={contact.id}
          contact={contact}
          onDelete={handleDelete}
        />
      ))}
    </div>
  )
}

export default ContactsList
