'use client'

import { Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend)

export default function LinkCategoryChart({ data }: { data: any[] }) {
  const categoryCount = data.reduce((acc: any, curr: any) => {
    if (curr.category) {
      acc[curr.category] = (acc[curr.category] || 0) + 1
    }
    return acc
  }, {})

  const chartData = {
    labels: Object.keys(categoryCount),
    datasets: [
      {
        data: Object.values(categoryCount),
        backgroundColor: [
          '#6366f1', '#ec4899', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6', '#f43f5e', '#14b8a6'
        ],
        borderWidth: 0,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          color: '#9ca3af',
          padding: 20
        }
      }
    }
  }

  if (!data || data.length === 0 || Object.keys(categoryCount).length === 0) {
    return (
      <div className="p-4 rounded-2xl shadow-md bg-[var(--fill-color)] border border-border-divider h-80 flex items-center justify-center">
        <p className="text-secondary">No data available</p>
      </div>
    )
  }

  return (
    <div className="p-4 rounded-2xl shadow-md bg-[var(--fill-color)] border border-border-divider h-80">
      <h3 className="text-lg font-semibold text-primary mb-4">Posts by Category</h3>
      <div className="relative h-56">
        <Doughnut data={chartData} options={options} />
      </div>
    </div>
  )
}