'use client'

import { usePortfolio } from '@/hooks/portfolio/usePortfolio'
import { useAuthGuard } from '@/hooks/auth-guard/useAuthGuard'
import StatCard from '@/components/airdrops/chart/StatCard'
import { FaProjectDiagram, FaPaintBrush, FaCertificate, FaTools } from 'react-icons/fa'

export default function PortfolioAnalyticsDashboard() {
  useAuthGuard()
  const { portfolio, loading } = usePortfolio()

  return (
    <div className="space-y-6 mt-6 sm:mt-0">
      <div className="text-center sm:text-left">
        <h2 className="text-lg sm:text-2xl font-semibold text-primary">
          Dashboard Analytics
        </h2>
        <p className="text-xs sm:text-sm text-secondary">
          Overview of your portfolio stats
        </p>
      </div>

      {/* Portfolio Analytics Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard
          title="Total Projects"
          value={portfolio?.projects?.length || 0}
          icon={<FaProjectDiagram />}
          loading={loading}
        />
        <StatCard
          title="Total Designs"
          value={portfolio?.designs?.length || 0}
          icon={<FaPaintBrush />}
          loading={loading}
        />
        <StatCard
          title="Total Certificates"
          value={portfolio?.certificates?.length || 0}
          icon={<FaCertificate />}
          loading={loading}
        />
        <StatCard
          title="Total Skills"
          value={(portfolio?.skills?.tech?.length || 0) + (portfolio?.skills?.design?.length || 0)}
          icon={<FaTools />}
          loading={loading}
        />
      </section>
    </div>
  )
}