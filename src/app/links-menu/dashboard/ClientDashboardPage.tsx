'use client'

import { useAuthGuard } from '@/hooks/auth-guard/useAuthGuard'
import { usePostsData } from '@/hooks/links/usePostsData'
import StatCard from '@/components/airdrops/chart/StatCard'
import LinkCategoryChart from '@/components/links/LinkCategoryChart'
import { FaLink, FaListAlt } from 'react-icons/fa'
import { useMemo } from 'react'

export default function ClientDashboardPage() {
  useAuthGuard()
  const { data, loading } = usePostsData()

  const totalPosts = data.length

  const totalCategories = useMemo(() => {
    return new Set(data.map(item => item.category).filter(Boolean)).size
  }, [data])

  return (
    <div className="space-y-6 mt-6 sm:mt-0">
      <div className="text-center sm:text-left">
        <h2 className="text-lg sm:text-2xl font-semibold text-primary">
          Dashboard Analytics
        </h2>
        <p className="text-xs sm:text-sm text-secondary">
          Overview of your links and posts
        </p>
      </div>

      {/* Link Analytics Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard
          title="Total Posts"
          value={totalPosts}
          icon={<FaLink />}
          loading={loading}
        />
        <StatCard
          title="Total Categories"
          value={totalCategories}
          icon={<FaListAlt />}
          loading={loading}
        />
      </section>

      {/* Link Analytics Charts */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-6">
        <LinkCategoryChart data={data} />
      </section>
    </div>
  )
}