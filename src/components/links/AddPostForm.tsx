'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthGuard } from '@/hooks/auth-guard/useAuthGuard'
import { toast } from 'sonner'
import { createPost } from '@/services/links/linkService'
import { LinkPostRequest } from '@/types/link'
import { IoIosArrowUp } from "react-icons/io"

interface DropdownOption {
  value: string
  label: string
}

interface CustomDropdownProps {
  id: string
  name: string
  value: string
  onChange: (value: string) => void
  options: DropdownOption[]
  placeholder?: string
  required?: boolean
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  id,
  name,
  value,
  onChange,
  options,
  placeholder = "Select an option",
  required = false
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const selectedOption = options.find(option => option.value === value)

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <button
        type="button"
        id={`${id}-button`}
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left card-color2 border border-border-divider rounded-lg px-4 py-3 text-primary text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 inline-flex items-center justify-between"
      >
        <span className={value ? "text-primary" : "text-muted"}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <IoIosArrowUp 
          className={`h-4 w-4 transition-transform duration-200 ${
            isOpen ? 'transform rotate-0' : 'transform rotate-180'
          }`}
        />
      </button>

      {/* Dropdown menu */}
      <div 
        id={id}
        className={`z-10 absolute top-full left-0 right-0 mt-1 dropdown-bg divide-y divide-border-divider rounded-lg shadow-sm border border-border-divider ${
          isOpen ? 'block' : 'hidden'
        }`}
      >
        <ul className="py-2 text-sm text-primary" aria-labelledby={`${id}-button`}>
          {options.map(option => (
            <li key={option.value}>
              <button
                type="button"
                onClick={() => {
                  onChange(option.value)
                  setIsOpen(false)
                }}
                className={`block w-full text-left px-4 py-2 hover:hover-bg ${
                  value === option.value ? 'hover-bg-accent text-accent' : ''
                }`}
              >
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <input
        type="hidden"
        name={name}
        value={value}
        required={required}
      />
    </div>
  )
}

export default function AddPostForm() {
  useAuthGuard()
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState<LinkPostRequest>({
    caption: '',
    url: '',
    category: ''
  })

  const resetForm = () => {
    setFormData({
      caption: '',
      url: '',
      category: ''
    })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ 
      ...prev, 
      [name]: value 
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setLoading(true)
      await createPost(formData)
      toast.success('Post created successfully')
      resetForm()
    } catch (err: any) {
      toast.error(err.message || 'Failed to create post')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6 min-h-screen p-6">
      <div className="text-center sm:text-left">
        <h2 className="text-lg sm:text-2xl font-semibold text-primary">
          Add New Post
        </h2>
        <p className="text-xs sm:text-sm text-secondary">
          Create a new link post
        </p>
      </div>

      <div className="bg-[var(--fill-color)] border border-border-divider rounded-xl p-6 pb-1 shadow-lg w-full sm:w-5/6 mx-auto mb-8">
        <div className="mb-8">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-6">
              
              {/* Caption */}
              <div className="flex flex-col gap-2">
                <label className="text-secondary text-sm font-medium" htmlFor="caption">
                  Caption *
                </label>
                <textarea
                  id="caption"
                  name="caption"
                  value={formData.caption}
                  onChange={handleChange}
                  rows={4}
                  placeholder="What is this post about?"
                  required
                  className="w-full card-color2 border border-border-divider rounded-lg px-4 py-3 text-primary text-sm placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>

              {/* URL */}
              <div className="flex flex-col gap-2">
                <label className="text-secondary text-sm font-medium" htmlFor="url">
                  URL (Optional)
                </label>
                <input
                  type="url"
                  id="url"
                  name="url"
                  value={formData.url || ''}
                  onChange={handleChange}
                  placeholder="https://..."
                  className="w-full card-color2 border border-border-divider rounded-lg px-4 py-3 text-primary text-sm placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Category */}
              <div className="flex flex-col gap-2">
                <label className="text-secondary text-sm font-medium" htmlFor="category">
                  Category *
                </label>
                <CustomDropdown
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={(val) => setFormData(p => ({...p, category: val}))}
                  options={[
                    { value: 'AI Prompts', label: 'AI Prompts' },
                    { value: 'Templates', label: 'Templates' },
                    { value: 'projects', label: 'Projects' }
                  ]}
                  placeholder="Select category"
                  required
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-4 pt-6 border-t border-border-divider">
              <button
                type="button"
                onClick={resetForm}
                className="px-6 py-3 cursor-pointer rounded-lg text-secondary border border-border-divider hover:bg-button-hover text-sm font-medium transition-colors duration-200"
              >
                Reset Form
              </button>
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 cursor-pointer disabled:bg-blue-400 text-white px-6 py-3 rounded-lg text-sm font-medium flex items-center justify-center transition-colors duration-200"
              >
                {loading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                    Creating...
                  </>
                ) : (
                  'Create Post'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}