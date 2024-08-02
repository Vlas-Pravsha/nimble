import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Loader2, User } from 'lucide-react'

import { useGetContactQuery } from '../redux/contacts/contactsApi'
// import { useAddTagsMutation } from '../redux/tags/tagsApi'

interface ContactResource {
  fields: {
    'first name': Array<{ value: string }>
    'last name': Array<{ value: string }>
    email: Array<{ value: string }>
  }
  tags: Array<{ id: number; tag: string }>
}

interface ContactResponse {
  resources: ContactResource[]
}

const SingleContact: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const { data: contact, isLoading, isError } = useGetContactQuery(id!)
  const [newTags, setNewTags] = useState<string>('')
  // const [addTags] = useAddTagsMutation()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-full h-dvh">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    )
  }
  if (isError) return <div>Error occurred while fetching the contact</div>

  const contactData = contact as ContactResponse
  const firstName =
    contactData?.resources[0]?.fields['first name'][0]?.value || ''
  const lastName =
    contactData?.resources[0]?.fields['last name'][0]?.value || ''
  const email = contactData?.resources[0]?.fields.email[0]?.value || ''
  const tags = contactData?.resources[0]?.tags || []

  console.log(contact)

  return (
    <div className="max-w-[558px] mx-auto mt-10 p-6">
      <div className="flex items-center mb-6">
        <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mr-4">
          <User size={32} className="text-gray-500" />
        </div>
        <div>
          <h2 className="text-xl font-bold">{`${firstName} ${lastName}`}</h2>
          <p className="text-gray-600">{email}</p>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Tags</h3>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-gray-200 rounded-full text-sm"
            >
              {tag.tag}
            </span>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <input
          type="text"
          value={newTags}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setNewTags(e.target.value)
          }
          placeholder="Add new Tags"
          className="w-full p-2 border rounded-lg bg-white"
        />
      </div>
      <div className="flex flex-row justify-between">
        <button className="w-full border border-black text-black py-2 rounded">
          Add Tags
        </button>
        <Link className="w-full" to="/">
          <button className="w-full border bg-black text-white py-2 rounded">
            Back
          </button>
        </Link>
      </div>
    </div>
  )
}

export default SingleContact
