import { Loader2 } from 'lucide-react'

import {
  useCreateContactMutation,
  useGetContactsQuery,
} from '../redux/contacts/contactsApi'
import { createContactPayload } from '../lib/utils'

import MaxWidthWrapper from './MaxWidthWrapper'
import ContactForm, { type FormData } from './ContactForm'
import ContactsList from './ContactList'

function Layout() {
  const { data, error, isLoading } = useGetContactsQuery('contacts')
  const [createContact] = useCreateContactMutation()

  const handleCreateContact = async (formData: FormData) => {
    const newContact = createContactPayload(formData)
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

export default Layout
