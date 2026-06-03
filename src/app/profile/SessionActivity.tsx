'use client'

import { useState, useEffect } from 'react'
import { FaClock, FaSignOutAlt } from 'react-icons/fa'

export default function SessionActivity() {
  const [lastLogin, setLastLogin] = useState<string | null>(null)
  const [lastLogout, setLastLogout] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setLastLogin(localStorage.getItem('lastLogin'))
    setLastLogout(localStorage.getItem('lastLogout'))
    setMounted(true)
  }, [])

  const formatDate = (isoString: string | null) => {
    if (!isoString) return null
    const date = new Date(isoString)
    return date.toLocaleString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    })
  }

  return (
    <div className="bg-[var(--fill-color)] rounded-2xl border border-border-divider p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
      <h3 className="text-md font-semibold text-primary mb-4 border-b border-border-divider pb-2">Session Activity</h3>
      <div className="flex flex-col gap-4">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-blue-500/10">
            <FaClock className="text-blue-500" size={18} />
          </div>
          <div>
            <p className="text-xs text-muted">Last Login</p>
            <p className="text-sm text-primary font-medium">
              {!mounted ? 'Loading...' : (lastLogin ? formatDate(lastLogin) : 'Current Session Active')}
            </p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-orange-500/10">
            <FaSignOutAlt className="text-orange-500" size={18} />
          </div>
          <div>
            <p className="text-xs text-muted">Last Logout / Session Expiry</p>
            <p className="text-sm text-primary font-medium">
              {!mounted ? 'Loading...' : (lastLogout ? formatDate(lastLogout) : 'No previous records found')}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}