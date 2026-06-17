'use client'

import { useState, useRef, useEffect } from 'react'
import { FaPlus } from 'react-icons/fa'
import { HiEllipsisVertical } from 'react-icons/hi2'
import { MdEdit } from 'react-icons/md'
import { FaTrash } from 'react-icons/fa'
import { toast } from 'sonner'
import { createPortal } from 'react-dom'
import { FallbackNativeImage } from '@/components/ui/FallbackImage'

interface Item {
  id: string
  [key: string]: any
}

type FieldDef = { 
  key: string; 
  label: string; 
  type: 'text' | 'url' | 'textarea' | 'number' | 'array' | 'nested' | 'screenshots';
  options?: { showDescription?: boolean }
}

interface CRUDListProps {
  title: string
  items: Item[]
  fields: FieldDef[]
  onAdd: (data: any) => Promise<void | boolean>
  onEdit: (id: string, data: any) => Promise<void | boolean>
  onDelete: (id: string) => Promise<void | boolean>
  isLoading: boolean
  onRefresh?: () => Promise<void>
}

export default function CRUDList({ 
  title, 
  items, 
  fields, 
  onAdd, 
  onEdit, 
  onDelete, 
  isLoading,
  onRefresh 
}: CRUDListProps) {
  const [isAdding, setIsAdding] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState<any>({})
  const [showConfirm, setShowConfirm] = useState<string | null>(null)
  const [openDropdownIndex, setOpenDropdownIndex] = useState<number | null>(null)
  const [dropdownPosition, setDropdownPosition] = useState<{ top: number; left: number }>({ top: 0, left: 0 })
  const dropdownRef = useRef<HTMLDivElement>(null)
  const [selectedItemName, setSelectedItemName] = useState<string>('')
  const [localItems, setLocalItems] = useState<Item[]>(items)
  const [isProcessing, setIsProcessing] = useState(false)

  useEffect(() => {
    setLocalItems(items)
  }, [items])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdownIndex(null)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev: any) => ({ ...prev, [name]: value }))
  }

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev: any) => ({ ...prev, [name]: parseInt(value) || 0 }))
  }

  const handleArrayChange = (field: string, index: number, value: string) => {
    setFormData((prev: any) => ({
      ...prev,
      [field]: prev[field] ? prev[field].map((item: string, i: number) => 
        i === index ? value : item
      ) : [value]
    }))
  }

  const handleAddArrayItem = (field: string) => {
    setFormData((prev: any) => ({
      ...prev,
      [field]: [...(prev[field] || []), '']
    }))
  }

  const handleRemoveArrayItem = (field: string, index: number) => {
    setFormData((prev: any) => ({
      ...prev,
      [field]: prev[field].filter((_: any, i: number) => i !== index)
    }))
  }

  const handleScreenshotChange = (field: string, index: number, subField: 'image_url' | 'description', value: string) => {
    setFormData((prev: any) => ({
      ...prev,
      [field]: prev[field] ? prev[field].map((item: any, i: number) => 
        i === index ? { ...item, [subField]: value } : item
      ) : [{ [subField]: value }]
    }))
  }

  const handleAddScreenshot = (field: string) => {
    setFormData((prev: any) => ({
      ...prev,
      [field]: [...(prev[field] || []), { image_url: '', description: '' }]
    }))
  }

  const handleRemoveScreenshot = (field: string, index: number) => {
    setFormData((prev: any) => ({
      ...prev,
      [field]: prev[field].filter((_: any, i: number) => i !== index)
    }))
  }

  const reconstructNestedFields = (data: any) => {
    const result = { ...data }
    const diagramFields = ['use_case', 'activity', 'erd', 'flowchart', 'color_palette', 'typography']
    diagramFields.forEach(field => {
      const imageKey = `${field}_image_url`
      const descKey = `${field}_description`
      const imageValue = result[imageKey]
      const descValue = result[descKey]
      const hasImage = imageValue && typeof imageValue === 'string' && imageValue.trim()
      const hasDesc = descValue && typeof descValue === 'string' && descValue.trim()
      if (hasImage || hasDesc) {
        result[field] = {
          image_url: hasImage ? imageValue.trim() : '',
          description: hasDesc ? descValue.trim() : ''
        }
      }
      delete result[imageKey]
      delete result[descKey]
    })
    return result
  }

  const handleAdd = async () => {
    setIsProcessing(true)
    try {
      const reconstructedData = reconstructNestedFields(formData)
      await onAdd(reconstructedData)
      setFormData({})
      setIsAdding(false)
      toast.success(`${title.slice(0, -1)} added successfully!`)
      
      if (onRefresh) {
        await onRefresh()
      }
    } catch (error: any) {
      toast.error(error.message || `Failed to add ${title.slice(0, -1).toLowerCase()}`)
    } finally {
      setIsProcessing(false)
    }
  }

  const handleEdit = async (id: string) => {
    setIsProcessing(true)
    try {
      const reconstructedData = reconstructNestedFields(formData)
      await onEdit(id, reconstructedData)
      setEditingId(null)
      setFormData({})
      toast.success(`${title.slice(0, -1)} updated successfully!`)
      
      setLocalItems(prev => prev.map(item => 
        item.id === id ? { ...item, ...reconstructedData } : item
      ))
      
      if (onRefresh) {
        await onRefresh()
      }
    } catch (error: any) {
      toast.error(error.message || `Failed to update ${title.slice(0, -1).toLowerCase()}`)
    } finally {
      setIsProcessing(false)
    }
  }

  const handleDeleteConfirm = async (id: string) => {
    setIsProcessing(true)
    try {
      await onDelete(id)
      setShowConfirm(null)
      toast.success(`${title.slice(0, -1)} deleted successfully!`)
      
      setLocalItems(prev => prev.filter(item => item.id !== id))
      
      if (onRefresh) {
        await onRefresh()
      }
    } catch (error: any) {
      toast.error(error.message || `Failed to delete ${title.slice(0, -1).toLowerCase()}`)
    } finally {
      setIsProcessing(false)
    }
  }

  const startEditing = (item: Item) => {
    setEditingId(item.id)
    const flattened: any = { ...item }
    
    if (flattened.screenshots && Array.isArray(flattened.screenshots)) {
      flattened.screenshots = flattened.screenshots.map((s: any) => 
        typeof s === 'string' ? { image_url: s, description: '' } : s
      )
    }

    const diagramFields = ['use_case', 'activity', 'erd', 'flowchart', 'color_palette', 'typography']
    diagramFields.forEach(field => {
      if (item[field] && typeof item[field] === 'object') {
        flattened[`${field}_image_url`] = item[field].image_url || ''
        flattened[`${field}_description`] = item[field].description || ''
        delete flattened[field]
      }
    })
    setFormData(flattened)
    setOpenDropdownIndex(null)
  }

  const handleOpenDropdown = (e: React.MouseEvent<HTMLButtonElement>, index: number, item: Item) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setDropdownPosition({
      top: rect.top + window.scrollY,
      left: rect.left + window.scrollX - 144
    })
    setOpenDropdownIndex(index)
    setSelectedItemName(item.title || item.name || 'Unknown')
  }

  const handleDeleteClick = (id: string, name: string) => {
    setShowConfirm(id)
    setSelectedItemName(name)
    setOpenDropdownIndex(null)
  }

  const handleCancel = () => {
    setIsAdding(false)
    setEditingId(null)
    setFormData({})
  }

  const renderFormField = (field: FieldDef) => {
    const value = formData[field.key] || ''
    
    if (field.type === 'screenshots') {
      return (
        <div className="space-y-4">
          {(formData[field.key] || []).map((item: any, index: number) => (
            <div key={index} className="flex flex-col gap-2">
              <div className="flex gap-2">
                <input
                  type="url"
                  value={item.image_url || ''}
                  onChange={(e) => handleScreenshotChange(field.key, index, 'image_url', e.target.value)}
                  className="flex-1 min-w-0 card-color2 border border-border-divider rounded-lg px-4 py-2 text-primary"
                  placeholder={`Img URL ${index + 1}`}
                />
                <button
                  type="button"
                  onClick={() => handleRemoveScreenshot(field.key, index)}
                  className="flex-shrink-0 px-3 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:bg-red-400"
                  disabled={isProcessing}
                >
                  Remove
                </button>
              </div>
              {field.options?.showDescription !== false && (
                <textarea
                  value={item.description || ''}
                  onChange={(e) => handleScreenshotChange(field.key, index, 'description', e.target.value)}
                  className="w-full card-color2 border border-border-divider rounded-lg px-4 py-2 text-primary"
                  rows={2}
                  placeholder="Description (optional)"
                />
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={() => handleAddScreenshot(field.key)}
            className="text-sm text-blue-600 hover:text-blue-700 disabled:text-blue-400"
            disabled={isProcessing}
          >
            + Add Screenshot
          </button>
        </div>
      )
    }

    if (field.type === 'nested') {
      const imageKey = `${field.key}_image_url`
      const descKey = `${field.key}_description`
      return (
        <div className="space-y-3">
          <input
            type="url"
            name={imageKey}
            value={formData[imageKey] || ''}
            onChange={handleInputChange}
            className="w-full card-color2 border border-border-divider rounded-lg px-4 py-2 text-primary"
            placeholder="Image URL"
          />
          <textarea
            name={descKey}
            value={formData[descKey] || ''}
            onChange={handleInputChange}
            className="w-full card-color2 border border-border-divider rounded-lg px-4 py-2 text-primary"
            rows={3}
            placeholder="Description"
          />
        </div>
      )
    }
    
    if (field.type === 'textarea') {
      return (
        <textarea
          name={field.key}
          value={value}
          onChange={handleInputChange}
          className="w-full card-color2 border border-border-divider rounded-lg px-4 py-2 text-primary"
          rows={3}
          placeholder={`Enter ${field.label.toLowerCase()}`}
        />
      )
    }
    
    if (field.type === 'array') {
      return (
        <div className="space-y-2">
          {(formData[field.key] || []).map((item: string, index: number) => (
            <div key={index} className="flex gap-2">
              <input
                type="text"
                value={item}
                onChange={(e) => handleArrayChange(field.key, index, e.target.value)}
                className="flex-1 min-w-0 card-color2 border border-border-divider rounded-lg px-4 py-2 text-primary"
                placeholder={`${field.label} ${index + 1}`}
              />
              <button
                type="button"
                onClick={() => handleRemoveArrayItem(field.key, index)}
                className="flex-shrink-0 px-3 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:bg-red-400"
                disabled={isProcessing}
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => handleAddArrayItem(field.key)}
            className="text-sm text-blue-600 hover:text-blue-700 disabled:text-blue-400"
            disabled={isProcessing}
          >
            + Add {field.label}
          </button>
        </div>
      )
    }
    
    if (field.type === 'number') {
      return (
        <input
          type="number"
          name={field.key}
          value={value}
          onChange={handleNumberChange}
          className="w-full card-color2 border border-border-divider rounded-lg px-4 py-2 text-primary"
          placeholder={`Enter ${field.label.toLowerCase()}`}
        />
      )
    }
    
    return (
      <input
        type={field.type === 'url' ? 'url' : 'text'}
        name={field.key}
        value={value}
        onChange={handleInputChange}
        className="w-full card-color2 border border-border-divider rounded-lg px-4 py-2 text-primary"
        placeholder={`Enter ${field.label.toLowerCase()}`}
      />
    )
  }

  const renderTableCell = (item: Item, field: FieldDef) => {
    const value = item[field.key]

    if (field.key === 'image_url' && value) {
      return (
        <div className="w-24 h-14 rounded-lg overflow-hidden border border-border-divider bg-[var(--card-color2)]">
          <FallbackNativeImage 
            src={value as string} 
            alt="Thumbnail" 
            className="w-full h-full object-cover"
          />
        </div>
      )
    }
    
    if (field.type === 'screenshots') {
      const screenshots = value as ({ image_url: string; description?: string } | string)[] | undefined
      if (screenshots && screenshots.length > 0) {
        return (
          <div className="flex flex-col gap-1">
            <div className="flex gap-1 overflow-hidden">
              {screenshots.slice(0, 3).map((shot, idx) => {
                const imageUrl = typeof shot === 'string' ? shot : shot.image_url
                return (
                  <div key={idx} className="w-8 h-8 rounded bg-gray-200 overflow-hidden relative">
                    <FallbackNativeImage src={imageUrl} alt="thumbnail" className="object-cover w-full h-full" />
                  </div>
                )
              })}
              {screenshots.length > 3 && (
                <div className="w-8 h-8 rounded bg-gray-100 flex items-center justify-center text-xs text-secondary">
                  +{screenshots.length - 3}
                </div>
              )}
            </div>
          </div>
        )
      }
      return <span className="text-secondary">-</span>
    }

    if (field.type === 'nested') {
      const nestedValue = value as { image_url?: string; description?: string } | undefined
      if (nestedValue && (nestedValue.image_url || nestedValue.description)) {
        return (
          <div className="flex flex-col gap-1">
            {nestedValue.image_url && (
              <a 
                href={nestedValue.image_url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline text-xs"
              >
                View Image
              </a>
            )}
            {nestedValue.description && (
              <span className="text-xs text-secondary truncate max-w-[200px]" title={nestedValue.description}>
                {nestedValue.description}
              </span>
            )}
            {!nestedValue.image_url && !nestedValue.description && '-'}
          </div>
        )
      }
      return <span className="text-secondary">-</span>
    }
    
    if (field.type === 'url' && value) {
      return (
        <a 
          href={value} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline truncate max-w-[200px] inline-block"
          title={value}
        >
          Visit
        </a>
      )
    }
    
    if (field.type === 'array') {
      return (
        <div className="flex flex-wrap gap-1.5 min-w-[200px]">
          {Array.isArray(value) && value.map((subitem: string, index: number) => (
            <span 
              key={index} 
              className="bg-blue-100 text-blue-800 px-3 py-1.5 rounded-lg text-xs whitespace-nowrap"
            >
              {subitem}
            </span>
          ))}
          {(!Array.isArray(value) || value.length === 0) && '-'}
        </div>
      )
    }
    
    return (
      <div className="truncate max-w-[200px]" title={String(value || '')}>
        {value || '-'}
      </div>
    )
  }

  return (
    <div className="bg-[var(--fill-color)] border border-border-color rounded-xl p-6 shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-lg font-semibold text-primary">{title}</h3>
          <p className="text-sm text-secondary mt-1">
            {localItems.length} {title.toLowerCase()} found
          </p>
        </div>
        <button
          onClick={() => setIsAdding(true)}
          className="flex items-center gap-1.5 sm:gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm transition-colors whitespace-nowrap"
          disabled={isProcessing}
        >
          <FaPlus className="text-xs sm:text-sm" /> 
          Add {title.slice(0, -1)}
        </button>
      </div>

      {/* Add/Edit Form */}
      {(isAdding || editingId) && (
        <div className="mb-6 p-4 bg-[var(--card-color2)] rounded-lg border border-border-divider">
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-md font-medium text-primary">
              {editingId ? 'Edit' : 'Add New'} {title.slice(0, -1)}
            </h4>
            <button
              onClick={handleCancel}
              className="text-sm text-secondary hover:text-primary"
              disabled={isProcessing}
            >
              ✕ Close
            </button>
          </div>
          <div className="space-y-4">
            {fields.map(field => (
              <div key={field.key}>
                <label className="block text-sm font-medium text-secondary mb-2">
                  {field.label} {field.type !== 'array' && <span className="text-red-500">*</span>}
                </label>
                {renderFormField(field)}
              </div>
            ))}
            <div className="flex gap-3 pt-4 border-t border-border-divider">
              <button
                onClick={editingId ? () => handleEdit(editingId) : handleAdd}
                disabled={isProcessing || isLoading}
                className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white px-4 py-2.5 rounded-lg text-sm font-medium flex items-center justify-center gap-2"
              >
                {isProcessing || isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    {editingId ? 'Updating...' : 'Adding...'}
                  </>
                ) : (
                  editingId ? 'Update' : 'Save'
                )}
              </button>
              <button
                onClick={handleCancel}
                className="flex-1 bg-gray-600 hover:bg-gray-700 disabled:bg-gray-400 text-white px-4 py-2.5 rounded-lg text-sm font-medium"
                disabled={isProcessing || isLoading}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Items List */}
      <div className="overflow-x-auto overflow-y-auto rounded-lg border border-border-divider max-h-[500px]">
        <table className="text-left min-w-max w-full">
          <thead className="bg-[var(--card-color3)]">
            <tr>
              {fields.map(field => (
                <th key={field.key} className="px-4 py-3 text-sm font-medium text-primary">
                  {field.label}
                </th>
              ))}
              <th className="px-4 py-3 text-sm font-medium text-primary">Actions</th>
            </tr>
          </thead>
          <tbody>
            {localItems.length > 0 ? (
              localItems.map((item, index) => (
                <tr key={item.id} className="border-t border-border-divider hover:bg-[var(--hover-bg)]">
                  {fields.map(field => (
                    <td key={field.key} className="px-4 py-3 text-sm text-primary align-top">
                      {renderTableCell(item, field)}
                    </td>
                  ))}
                  <td className="px-4 py-3">
                    <button 
                      onClick={(e) => handleOpenDropdown(e, index, item)}
                      className="p-1.5 hover:bg-[var(--hover-bg)] rounded-lg transition-colors"
                      disabled={isProcessing}
                    >
                      <HiEllipsisVertical size={20} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={fields.length + 1} className="px-4 py-8 text-center">
                  <div className="text-secondary">
                    <p className="mb-2">No {title.toLowerCase()} found</p>
                    {!isAdding && (
                      <button
                        onClick={() => setIsAdding(true)}
                        className="text-blue-600 hover:text-blue-700 text-sm"
                      >
                        Click here to add your first {title.slice(0, -1).toLowerCase()}
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Action Dropdown */}
      {openDropdownIndex !== null && localItems[openDropdownIndex] &&
        createPortal(
          <div
            ref={dropdownRef}
            className="absolute z-50 w-36 dropdown-bg divide-y divide-border-divider rounded-lg shadow-lg border border-border-divider"
            style={{
              top: `${dropdownPosition.top}px`,
              left: `${dropdownPosition.left}px`
            }}
          >
            <ul className="py-1">
              <li>
                <button
                  onClick={() => startEditing(localItems[openDropdownIndex])}
                  className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-primary hover:hover-bg disabled:opacity-50"
                  disabled={isProcessing}
                >
                  <MdEdit size={16} /> Edit
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleDeleteClick(
                    localItems[openDropdownIndex].id, 
                    localItems[openDropdownIndex].title || localItems[openDropdownIndex].name || 'Unknown'
                  )}
                  className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-red-600 hover:hover-bg disabled:opacity-50"
                  disabled={isProcessing}
                >
                  <FaTrash size={16} /> Delete
                </button>
              </li>
            </ul>
          </div>,
          document.body
        )
      }

      {/* Delete Confirmation Modal */}
      {showConfirm && (
        createPortal(
          <div className="fixed inset-0 bg-[var(--overlay-bg)] flex items-center justify-center z-50 p-4">
            <div className="bg-[var(--dropdown-bg)] rounded-lg shadow-xl p-6 max-w-md w-full border border-border-divider">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-red-100 rounded-lg">
                  <FaTrash size={24} className="text-red-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-primary">Delete {title.slice(0, -1)}</h3>
                  <p className="text-sm text-secondary">This action cannot be undone</p>
                </div>
              </div>
              
              <div className="my-4 p-3 bg-[var(--card-color2)] rounded-lg">
                <p className="text-sm text-secondary">
                  Are you sure you want to delete <span className="font-semibold text-primary">{selectedItemName}</span>?
                </p>
                <p className="text-xs text-muted mt-2">
                  This {title.slice(0, -1).toLowerCase()} will be permanently removed.
                </p>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setShowConfirm(null)}
                  className="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors"
                  disabled={isProcessing}
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDeleteConfirm(showConfirm)}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-colors"
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Deleting...
                    </>
                  ) : (
                    'Delete'
                  )}
                </button>
              </div>
            </div>
          </div>,
          document.body
        )
      )}
    </div>
  )
}