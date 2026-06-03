'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { RxHamburgerMenu } from 'react-icons/rx'
import { toggleDarkMode, isDarkMode } from '@/utils/darkmode'
import { logout } from '@/services/auth/authService'

type HeaderProps = {
	onToggleSidebar?: () => void
}

export default function DashboardHeader({ onToggleSidebar }: HeaderProps) {
	const router = useRouter()
	const [open, setOpen] = useState(false)
	const [isDark, setIsDark] = useState(false)
	const menuRef = useRef<HTMLDivElement>(null)

	const handleLogout = async () => {
		try {
			const result = await logout()
			toast.success(result.message)
			router.push('/login')
		} catch (error) {
			toast.error('Logout failed')
		}
	}

	const handleToggleDarkMode = () => {
		const darkMode = toggleDarkMode()
		setIsDark(darkMode)
	}

	useEffect(() => {
		setIsDark(isDarkMode())
	}, [])

	useEffect(() => {
		function onClickOutside(e: MouseEvent) {
			if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
				setOpen(false)
			}
		}
		document.addEventListener('mousedown', onClickOutside)
		return () => document.removeEventListener('mousedown', onClickOutside)
	}, [])

	return (
		<header className="h-16 body-color flex items-center justify-between px-4 md:px-6">
			<div className="flex items-center gap-3">
				<button onClick={onToggleSidebar} className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-md button-hover">
					<RxHamburgerMenu className="text-secondary" size={20} />
				</button>
			</div>
			<div className="flex items-center gap-4">
				<button 
					onClick={handleToggleDarkMode} 
					className="inline-flex h-9 w-9 items-center justify-center rounded-full button-border border hover:button-hover cursor-pointer"
				>
					{isDark ? (
						<i className="fa-regular fa-sun text-secondary" />
					) : (
						<i className="fa-regular fa-moon text-secondary" />
					)}
				</button>

				<div className="relative" ref={menuRef}>
					<button onClick={() => setOpen((v) => !v)} className="flex items-center gap-2">
						<img src="https://avatars.githubusercontent.com/u/113094795?s=400&u=09f3e0e5f27350cd376caa27f7aa65cf46c9384c&v=4" alt="avatar" className="h-9 w-9 rounded-full object-cover cursor-pointer" />
						<span className="hidden sm:block text-sm font-medium text-primary cursor-pointer">admin</span>
						<i className={`fa-solid fa-caret-down text-muted cursor-pointer transition-transform duration-200 ${open ? 'rotate-0' : 'rotate-180'}`} />
					</button>
					{open && (
						<div className="absolute right-0 mt-2 w-64 rounded-lg dropdown-border border dropdown-bg dropdown-shadow p-2">
							<div className="flex items-center gap-3 px-3 py-2 rounded-md hover:hover-bg cursor-pointer">
								<i className="fa-regular fa-user text-muted" />
								<span className="text-sm text-primary cursor-pointer">Profile</span>
							</div>

							<hr className="my-2 border-border-divider" />
							<button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2 rounded-md hover:hover-bg text-left text-rose-600">
								<i className="fa-solid fa-arrow-right-from-bracket cursor-pointer" />
								<span className="text-sm cursor-pointer">Logout</span>
							</button>
						</div>
					)}
				</div>
			</div>
		</header>
	)
}