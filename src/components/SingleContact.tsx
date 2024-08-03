import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { User } from 'lucide-react'

import { useGetContactQuery } from '../redux/contacts/contactsApi'
import type { Contact } from '../@types/contact'
import { useAddTagsMutation } from '../redux/tags/tagsApi'

import { Button } from './ui/Button'
import { Spinner } from './ui/Spinner'
import { Input } from './ui/Input'

interface ContactResponse {
  resources: Contact[]
}

const ErrorMessage: React.FC = () => (
  <div>Error occurred while fetching the contact</div>
)

const ContactHeader: React.FC<{
  firstName: string
  lastName: string
  email: string
}> = ({ firstName, lastName, email }) => (
  <div className="flex items-center mb-6">
    <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mr-4">
      <User size={32} className="text-gray-500" />
    </div>
    <div>
      <h2 className="text-xl font-bold">{`${firstName} ${lastName}`}</h2>
      <p className="text-gray-600">{email}</p>
    </div>
  </div>
)

const TagList: React.FC<{ tags: Array<{ id: number, tag: string }> }> = ({
  tags,
}) => (
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
)

const AddTagInput: React.FC<{
  newTags: string
  setNewTags: (value: string) => void
}> = ({ newTags, setNewTags }) => (
  <div className="mb-4">
    <Input
      type="text"
      value={newTags}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
        setNewTags(e.target.value)}
      placeholder="Add new Tags"
      className="w-full p-2 border rounded-lg bg-white"
    />
  </div>
)

const SingleContact: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const { data: contact, isLoading, isError } = useGetContactQuery(id!)
  const [newTags, setNewTags] = useState<string>('')
  const [addTags, { isLoading: isAddingTags }] = useAddTagsMutation()

  if (isLoading)
    return <Spinner />
  if (isError)
    return <ErrorMessage />

  const contactData = contact as ContactResponse
  const firstName
    = contactData?.resources[0]?.fields['first name'][0]?.value || ''
  const lastName
    = contactData?.resources[0]?.fields['last name'][0]?.value || ''
  const email = contactData?.resources[0]?.fields.email[0]?.value || ''
  const tags = contactData?.resources[0]?.tags || []

  const handleAddTags = async () => {
    if (newTags.trim()) {
      const newTagsArray = newTags.split(',').map(tag => tag.trim())
      const existingTagNames = tags.map(tag => tag.tag)
      const uniqueNewTags = newTagsArray.filter(
        tag => !existingTagNames.includes(tag),
      )

      const updatedTags = [...existingTagNames, ...uniqueNewTags]

      try {
        await addTags({ id: id!, tags: updatedTags }).unwrap()
        setNewTags('')
      }
      catch (error: unknown) {
        if (error instanceof Error) {
          throw new TypeError(`Failed to add tags: ${error.message}`)
        }
        else {
          throw new TypeError('Failed to add tags: Unknown error')
        }
      }
    }
  }

  return (
    <div className="max-w-[558px] mx-auto mt-10 p-6">
      <ContactHeader firstName={firstName} lastName={lastName} email={email} />
      <TagList tags={tags} />
      <AddTagInput newTags={newTags} setNewTags={setNewTags} />
      <div className="flex flex-row gap-2">
        <Button
          fullWidth
          variant="primary"
          onClick={handleAddTags}
          disabled={isAddingTags}
        >
          {isAddingTags ? 'Adding...' : 'Add tags'}
        </Button>
        <Link className="w-full" to="/">
          <Button fullWidth variant="secondary">
            Back
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default SingleContact
