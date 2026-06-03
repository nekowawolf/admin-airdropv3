'use client'

import { useAuthGuard } from '@/hooks/auth-guard/useAuthGuard'
import { useImageData } from '@/hooks/images-resources/useImageData'
import StatCard from '@/components/airdrops/chart/StatCard'
import { FaImage, FaHdd, FaSort } from 'react-icons/fa'
import { useMemo, useState } from 'react'

const formatSize = (bytes: number) => {
  if (!bytes || bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

export default function ClientDashboardPage() {
  useAuthGuard()
  const { data, loading } = useImageData()
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')

  const totalImages = data.length

  const totalSize = useMemo(() => {
    return data.reduce((sum, item) => sum + (item.size || 0), 0)
  }, [data])

  const sortedData = useMemo(() => {
    return [...data].sort((a, b) => {
      const sizeA = a.size || 0
      const sizeB = b.size || 0
      return sortOrder === 'asc' ? sizeA - sizeB : sizeB - sizeA
    })
  }, [data, sortOrder])

  const toggleSort = () => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')

  return (
    <div className="space-y-6 mt-6 sm:mt-0">
      <div className="text-center sm:text-left">
        <h2 className="text-lg sm:text-2xl font-semibold text-primary">
          Dashboard Analytics
        </h2>
        <p className="text-xs sm:text-sm text-secondary">
          Overview of your image resources
        </p>
      </div>

      {/* Image Analytics Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <StatCard
          title="Total Images"
          value={totalImages}
          icon={<FaImage />}
          loading={loading}
        />
        <StatCard
          title="Total Size"
          value={formatSize(totalSize)}
          icon={<FaHdd />}
          loading={loading}
        />
      </section>

      {/* Image Size Table */}
      <section className="bg-[var(--fill-color)] rounded-2xl shadow-md border border-border-divider overflow-hidden">
        <div className="p-4 border-b border-border-divider flex justify-between items-center">
          <h3 className="text-lg font-semibold text-primary">Image Sizes</h3>
          <button 
            onClick={toggleSort}
            className="flex items-center gap-2 text-sm text-secondary hover:text-primary transition-colors"
          >
            <FaSort />
            <span>Sort by Size ({sortOrder === 'desc' ? 'Largest First' : 'Smallest First'})</span>
          </button>
        </div>
        <div className="overflow-x-auto max-h-96">
          <table className="w-full text-left text-sm text-secondary">
            <thead className="text-xs text-muted uppercase bg-gray-600 sticky top-0">
              <tr>
                <th className="px-6 py-3">Filename</th>
                <th className="px-6 py-3">Size</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={2} className="px-6 py-4 text-center">Loading...</td>
                </tr>
              ) : sortedData.length === 0 ? (
                <tr>
                  <td colSpan={2} className="px-6 py-4 text-center">No images found</td>
                </tr>
              ) : (
                sortedData.map((item, index) => (
                  <tr key={index} className="border-b border-border-divider hover:bg-[var(--hover-bg)] transition-colors">
                    <td className="px-6 py-4 font-medium text-primary break-all">
                      {item.filename || 'Unknown'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {formatSize(item.size || 0)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}