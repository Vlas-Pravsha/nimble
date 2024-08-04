interface Contact {
  id: number
  fields: {
    'first name': Field[]
    'last name': Field[]
    'email': Field[]
  }
  tags: Array<{ id: number, tag: string }>
}

interface Field {
  value: string
  modifier?: string
  label?: string
}

type ContactsResponse = Contact[]
type ContactResponse = Contact
