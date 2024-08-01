import { Loader2 } from 'lucide-react'

import {
  useGetContactsQuery,
  useCreateContactMutation,
} from './redux/contacts/contactsApi'
import MaxWidthWrapper from './components/MaxWidthWrapper'
import ContactForm from './components/ContactForm'
import ContactsList from './components/ContactList'

function App() {
  const { data, error, isLoading } = useGetContactsQuery('contacts')
  const [createContact] = useCreateContactMutation()

  const handleCreateContact = async (formData: any) => {
    const newContact = {
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
    }

    await createContact(newContact)
  }
  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-full h-dvh">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    )
  }

  if (error) {
    return <h1>Error loading contacts</h1>
  }

  return (
    <MaxWidthWrapper className="flex flex-col gap-10 md:flex-row">
      <ContactForm createContact={handleCreateContact} />
      <ContactsList contacts={data?.resources} />
    </MaxWidthWrapper>
  )
}

export default App