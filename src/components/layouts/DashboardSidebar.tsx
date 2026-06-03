'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { RxDashboard } from 'react-icons/rx'
import { IoIosAddCircleOutline } from 'react-icons/io'
import { HiMiniRocketLaunch } from 'react-icons/hi2'
import { FaLayerGroup, FaUserCircle, FaBitcoin, FaLink, FaRobot } from 'react-icons/fa'
import { MdImage } from 'react-icons/md'

type SidebarProps = {
    isOpen?: boolean
    onClose?: () => void
}

export default function DashboardSidebar({ isOpen, onClose }: SidebarProps) {
    const pathname = usePathname()

    const [openAirdrop, setOpenAirdrop] = useState(false)
    const [openDashboard, setOpenDashboard] = useState(false)
    const [openCommunity, setOpenCommunity] = useState(false)
    const [openCommunityDashboard, setOpenCommunityDashboard] = useState(false)
    const [openPortfolio, setOpenPortfolio] = useState(false)
    const [openPortfolioDashboard, setOpenPortfolioDashboard] = useState(false)
    const [openImages, setOpenImages] = useState(false)
    const [openImagesDashboard, setOpenImagesDashboard] = useState(false)
    const [openLink, setOpenLink] = useState(false)
    const [openLinkDashboard, setOpenLinkDashboard] = useState(false)

    // === HANDLE ACTIVE SECTIONS ===
    useEffect(() => {
        setOpenAirdrop(false)
        setOpenDashboard(false)
        setOpenCommunity(false)
        setOpenCommunityDashboard(false)
        setOpenPortfolio(false)
        setOpenPortfolioDashboard(false)
        setOpenImages(false)
        setOpenImagesDashboard(false)
        setOpenLink(false)
        setOpenLinkDashboard(false)

        // === AIRDROP PATH ===
        if (pathname.startsWith('/airdrop-menu/dashboard')) {
            setOpenAirdrop(true)
            if (!pathname.includes('/add-airdrop')) {
                setOpenDashboard(true)
            }
        }

        // === COMMUNITY PATH ===
        if (pathname.startsWith('/community-menu/dashboard')) {
            setOpenCommunity(true)
            if (!pathname.includes('/add-community')) {
                setOpenCommunityDashboard(true)
            }
        }

        // === PORTFOLIO PATH ===
        if (pathname.startsWith('/portfolio-menu/dashboard')) {
            setOpenPortfolio(true)
            setOpenPortfolioDashboard(true)
        }

        // === IMAGES PATH ===
        if (pathname.startsWith('/images-menu/dashboard')) {
            setOpenImages(true)
            if (!pathname.includes('/add-image')) {
                setOpenImagesDashboard(true)
            }
        }

        // === LINK PATH ===
        if (pathname.startsWith('/links-menu/dashboard')) {
            setOpenLink(true)
            if (!pathname.includes('/add-post')) {
                setOpenLinkDashboard(true)
            }
        }

    }, [pathname])

    // === HANDLERS ===
    const handleAirdropDropdown = () => {
        setOpenAirdrop((prev) => {
            const next = !prev
            if (next) {
                setOpenCommunity(false)
                setOpenCommunityDashboard(false)
                setOpenPortfolio(false)
                setOpenPortfolioDashboard(false)
                setOpenImages(false)
                setOpenImagesDashboard(false)
                setOpenLink(false)
                setOpenLinkDashboard(false)
            }
            return next
        })
    }

    const handleDashboardDropdown = () => setOpenDashboard((v) => !v)

    const handleCommunityDropdown = () => {
        setOpenCommunity((prev) => {
            const next = !prev
            if (next) {
                setOpenAirdrop(false)
                setOpenDashboard(false)
                setOpenPortfolio(false)
                setOpenPortfolioDashboard(false)
                setOpenImages(false)
                setOpenImagesDashboard(false)
                setOpenLink(false)
                setOpenLinkDashboard(false)
            }
            return next
        })
    }

    const handleCommunityDashboardDropdown = () =>
        setOpenCommunityDashboard((v) => !v)

    const handlePortfolioDropdown = () => {
        setOpenPortfolio((prev) => {
            const next = !prev
            if (next) {
                setOpenAirdrop(false)
                setOpenDashboard(false)
                setOpenCommunity(false)
                setOpenCommunityDashboard(false)
                setOpenImages(false)
                setOpenImagesDashboard(false)
                setOpenLink(false)
                setOpenLinkDashboard(false)
            }
            return next
        })
    }

    const handlePortfolioDashboardDropdown = () =>
        setOpenPortfolioDashboard((v) => !v)

    const handleImagesDropdown = () => {
        setOpenImages(prev => {
            const next = !prev
            if (next) {
                setOpenAirdrop(false)
                setOpenDashboard(false)
                setOpenCommunity(false)
                setOpenCommunityDashboard(false)
                setOpenPortfolio(false)
                setOpenPortfolioDashboard(false)
                setOpenLink(false)
                setOpenLinkDashboard(false)
            }
            return next
        })
    }

    const handleImagesDashboardDropdown = () =>
        setOpenImagesDashboard(v => !v)

    const handleLinkDropdown = () => {
        setOpenLink(prev => {
            const next = !prev
            if (next) {
                setOpenAirdrop(false)
                setOpenDashboard(false)
                setOpenCommunity(false)
                setOpenCommunityDashboard(false)
                setOpenPortfolio(false)
                setOpenPortfolioDashboard(false)
                setOpenImages(false)
                setOpenImagesDashboard(false)
            }
            return next
        })
    }

    const handleLinkDashboardDropdown = () =>
        setOpenLinkDashboard(v => !v)

    // === ACTIVE PATH DETECTION ===
    const isAnalyticsActive = pathname === '/airdrop-menu/dashboard'
    const isFreeActive = pathname === '/airdrop-menu/dashboard/airdrop/free'
    const isPaidActive = pathname === '/airdrop-menu/dashboard/airdrop/paid'
    const isEndedActive = pathname === '/airdrop-menu/dashboard/airdrop/ended'
    const isAddAirdropActive =
        pathname === '/airdrop-menu/dashboard/add-airdrop'
    const isDashboardPathActive =
        pathname.startsWith('/airdrop-menu/dashboard') &&
        !pathname.includes('/add-airdrop')

    const isCommunityAnalyticActive = pathname === '/community-menu/dashboard'
    const isAddCommunityActive =
        pathname === '/community-menu/dashboard/add-community'
    const isCommunityDashboardPathActive =
        pathname.startsWith('/community-menu/dashboard') &&
        !pathname.includes('/add-community')
    const isCommunityListActive =
        pathname === '/community-menu/dashboard/community-list'

    const isPortfolioActive = pathname === '/portfolio-menu/dashboard'
    const isPortfolioManageActive = pathname === '/portfolio-menu/dashboard/manage'
    const isPortfolioDashboardPathActive =
        pathname.startsWith('/portfolio-menu/dashboard')

    const isImagesActive = 
        pathname === '/images-menu/dashboard/images-list'
    const isImagesDashboardActive =
        pathname.startsWith('/images-menu/dashboard') && !pathname.includes('/add-image')
    const isImagesAnalyticActive =
        pathname === '/images-menu/dashboard'
    const isAddImageActive =
        pathname === '/images-menu/dashboard/add-image'

    const isLinkProfileActive = pathname === '/links-menu/dashboard/profile'
    const isLinkPostsActive = pathname === '/links-menu/dashboard/posts'
    const isAddLinkPostActive = pathname === '/links-menu/dashboard/add-post'
    const isLinkDashboardPathActive =
        pathname.startsWith('/links-menu/dashboard') && !pathname.includes('/add-post')
    const isLinkAnalyticActive = pathname === '/links-menu/dashboard'

    // === SIDEBAR CONTENT ===
    const content = (
        <>
            {/* Sidebar Header */}
            <div className="h-16 flex items-center gap-3 px-6 sidebar-border">
                <img
                    src="https://nekowawolf.github.io/delete-later/assets/img/icon_w.png"
                    alt="logo"
                    className="h-9 w-9 rounded-md object-cover"
                />
                <span className="text-xl font-semibold text-primary">
                    Nww Admin
                </span>
            </div>

            {/* Navigation */}
            <nav className="px-4 py-6 space-y-2 overflow-y-auto">
                <p className="px-2 text-xs font-semibold uppercase text-muted tracking-wider">
                    Menu
                </p>

                {/* === Airdrop Group === */}
                <div>
                    <button
                        type="button"
                        onClick={handleAirdropDropdown}
                        className={`group flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors w-full text-left border-l-4 ${
                            pathname.startsWith('/airdrop-menu/dashboard')
                                ? 'border-accent text-accent bg-accent/10'
                                : 'border-transparent text-secondary hover:hover-bg'
                            }`}
                    >
                        <HiMiniRocketLaunch
                            className={`${
                                pathname.startsWith('/airdrop-menu/dashboard')
                                    ? 'text-accent'
                                    : 'text-muted'
                            }`}
                            size={18}
                        />
                        <span>Airdrop</span>
                        <i
                            className={`fa-solid fa-caret-down ml-auto text-xs transition-transform ${
                                openAirdrop ? 'rotate-180' : ''
                            }`}
                        />
                    </button>

                    {openAirdrop && (
                        <div className="pl-8 mt-2 space-y-1">
                            <button
                                type="button"
                                onClick={handleDashboardDropdown}
                                className={`group flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors w-full text-left border-l-4 ${
                                    isDashboardPathActive
                                        ? 'border-accent text-accent bg-accent/10'
                                        : 'border-transparent text-secondary hover:hover-bg'
                                }`}
                            >
                                <RxDashboard
                                    className={`${
                                        isDashboardPathActive
                                            ? 'text-accent'
                                            : 'text-muted'
                                    }`}
                                    size={18}
                                />
                                <span>Dashboard</span>
                                <i
                                    className={`fa-solid fa-caret-down ml-auto text-xs transition-transform ${
                                        openDashboard ? 'rotate-180' : ''
                                    }`}
                                />
                            </button>

                            {openDashboard && (
                                <div className="pl-8 mt-1 space-y-1">
                                    <Link
                                        href="/airdrop-menu/dashboard"
                                        className={`block rounded-lg px-0 py-2 text-sm transition-colors ${
                                            isAnalyticsActive
                                                ? 'text-accent font-semibold'
                                                : 'text-secondary hover:text-accent'
                                        }`}
                                    >
                                        Analytics
                                    </Link>
                                    <Link
                                        href="/airdrop-menu/dashboard/airdrop/free"
                                        className={`block rounded-lg px-0 py-2 text-sm transition-colors ${
                                            isFreeActive
                                                ? 'text-accent font-semibold'
                                                : 'text-secondary hover:text-accent'
                                        }`}
                                    >
                                        Airdrop Free
                                    </Link>
                                    <Link
                                        href="/airdrop-menu/dashboard/airdrop/paid"
                                        className={`block rounded-lg px-0 py-2 text-sm transition-colors ${
                                            isPaidActive
                                                ? 'text-accent font-semibold'
                                                : 'text-secondary hover:text-accent'
                                        }`}
                                    >
                                        Airdrop Paid
                                    </Link>
                                    <Link
                                        href="/airdrop-menu/dashboard/airdrop/ended"
                                        className={`block rounded-lg px-0 py-2 text-sm transition-colors ${
                                            isEndedActive
                                                ? 'text-accent font-semibold'
                                                : 'text-secondary hover:text-accent'
                                        }`}
                                    >
                                        Airdrop Ended
                                    </Link>
                                </div>
                            )}

                            <Link
                                href="/airdrop-menu/dashboard/add-airdrop"
                                className={`group flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors border-l-4 ${
                                    isAddAirdropActive
                                        ? 'border-accent text-accent bg-accent/10'
                                        : 'border-transparent text-secondary hover:hover-bg'
                                }`}
                            >
                                <IoIosAddCircleOutline
                                    className={`${
                                        isAddAirdropActive
                                            ? 'text-accent'
                                            : 'text-muted'
                                    }`}
                                    size={18}
                                />
                                <span>Add Airdrop</span>
                            </Link>
                        </div>
                    )}
                </div>

                {/* === Community Group === */}
                <div>
                    <button
                        type="button"
                        onClick={handleCommunityDropdown}
                        className={`group flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors w-full text-left border-l-4 ${
                            pathname.startsWith('/community-menu/dashboard')
                                ? 'border-accent text-accent bg-accent/10'
                                : 'border-transparent text-secondary hover:hover-bg'

                        }`}
                    >
                        <FaLayerGroup
                            className={`${
                                pathname.startsWith('/community-menu/dashboard')
                                    ? 'text-accent'
                                    : 'text-muted'
                            }`}
                            size={18}
                        />
                        <span>Community</span>
                        <i
                            className={`fa-solid fa-caret-down ml-auto text-xs transition-transform ${
                                openCommunity ? 'rotate-180' : ''
                            }`}
                        />
                    </button>

                    {openCommunity && (
                        <div className="pl-8 mt-2 space-y-1">
                            <button
                                type="button"
                                onClick={handleCommunityDashboardDropdown}
                                className={`group flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors w-full text-left border-l-4 ${
                                    isCommunityDashboardPathActive
                                        ? 'border-accent text-accent bg-accent/10'
                                        : 'border-transparent text-secondary hover:hover-bg'
                                }`}
                            >
                                <RxDashboard
                                    className={`${
                                        isCommunityDashboardPathActive
                                            ? 'text-accent'
                                            : 'text-muted'
                                    }`}
                                    size={18}
                                />
                                <span>Dashboard</span>
                                <i
                                    className={`fa-solid fa-caret-down ml-auto text-xs transition-transform ${
                                        openCommunityDashboard
                                            ? 'rotate-180'
                                            : ''
                                    }`}
                                />
                            </button>

                            {openCommunityDashboard && (
                                <div className="pl-8 mt-1 space-y-1">
                                    <Link
                                        href="/community-menu/dashboard"
                                        className={`block rounded-lg px-0 py-2 text-sm transition-colors ${
                                            isCommunityAnalyticActive
                                                ? 'text-accent font-semibold'
                                                : 'text-secondary hover:text-accent'
                                        }`}
                                    >
                                        Analytic
                                    </Link>
                                    <Link
                                        href="/community-menu/dashboard/community-list"
                                        className={`block rounded-lg px-0 py-2 text-sm transition-colors ${
                                            isCommunityListActive
                                                ? 'text-accent font-semibold'
                                                : 'text-secondary hover:text-accent'
                                        }`}
                                    >
                                        Community List
                                    </Link>
                                </div>
                            )}

                            <Link
                                href="/community-menu/dashboard/add-community"
                                className={`group flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors border-l-4 ${
                                    isAddCommunityActive
                                        ? 'border-accent text-accent bg-accent/10'
                                        : 'border-transparent text-secondary hover:hover-bg'
                                }`}
                            >
                                <IoIosAddCircleOutline
                                    className={`${
                                        isAddCommunityActive
                                            ? 'text-accent'
                                            : 'text-muted'
                                    }`}
                                    size={18}
                                />
                                <span>Add Community</span>
                            </Link>
                        </div>
                    )}
                </div>
                
                {/* === Portfolio Group === */}
                <div>
                    <button
                        type="button"
                        onClick={handlePortfolioDropdown}
                        className={`group flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors w-full text-left border-l-4 ${
                            pathname.startsWith('/portfolio-menu/dashboard')
                                ? 'border-accent text-accent bg-accent/10'
                                : 'border-transparent text-secondary hover:hover-bg'
                        }`}
                    >
                        <FaUserCircle
                            className={`${
                                pathname.startsWith('/portfolio-menu/dashboard')
                                    ? 'text-accent'
                                    : 'text-muted'
                            }`}
                            size={18}
                        />
                        <span>Portfolio</span>
                        <i
                            className={`fa-solid fa-caret-down ml-auto text-xs transition-transform ${
                                openPortfolio ? 'rotate-180' : ''
                            }`}
                        />
                    </button>

                    {openPortfolio && (
                        <div className="pl-8 mt-2 space-y-1">
                            <button
                                type="button"
                                onClick={handlePortfolioDashboardDropdown}
                                className={`group flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors w-full text-left border-l-4 ${
                                    isPortfolioDashboardPathActive
                                        ? 'border-accent text-accent bg-accent/10'
                                        : 'border-transparent text-secondary hover:hover-bg'
                                }`}
                            >
                                <RxDashboard
                                    className={`${
                                        isPortfolioDashboardPathActive
                                            ? 'text-accent'
                                            : 'text-muted'
                                    }`}
                                    size={18}
                                />
                                <span>Dashboard</span>
                                <i
                                    className={`fa-solid fa-caret-down ml-auto text-xs transition-transform ${
                                        openPortfolioDashboard ? 'rotate-180' : ''
                                    }`}
                                />
                            </button>

                            {openPortfolioDashboard && (
                                <div className="pl-8 mt-1 space-y-1">
                                    <Link
                                        href="/portfolio-menu/dashboard"
                                        className={`block rounded-lg px-0 py-2 text-sm transition-colors ${
                                            isPortfolioActive
                                                ? 'text-accent font-semibold'
                                                : 'text-secondary hover:text-accent'
                                        }`}
                                    >
                                        Analytic
                                    </Link>
                                    <Link
                                        href="/portfolio-menu/dashboard/manage"
                                        className={`block rounded-lg px-0 py-2 text-sm transition-colors ${
                                            isPortfolioManageActive
                                                ? 'text-accent font-semibold'
                                                : 'text-secondary hover:text-accent'
                                        }`}
                                    >
                                        Manage Portfolio
                                    </Link>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* === Link Group === */}
                <div>
                    <button
                        type="button"
                        onClick={handleLinkDropdown}
                        className={`group flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors w-full text-left border-l-4 ${
                            pathname.startsWith('/links-menu/dashboard')
                                ? 'border-accent text-accent bg-accent/10'
                                : 'border-transparent text-secondary hover:hover-bg'
                        }`}
                    >
                        <FaLink
                            className={`${
                                pathname.startsWith('/links-menu/dashboard')
                                    ? 'text-accent'
                                    : 'text-muted'
                            }`}
                            size={18}
                        />
                        <span>Link</span>
                        <i
                            className={`fa-solid fa-caret-down ml-auto text-xs transition-transform ${
                                openLink ? 'rotate-180' : ''
                            }`}
                        />
                    </button>

                    {openLink && (
                        <div className="pl-8 mt-2 space-y-1">
                            <button
                                type="button"
                                onClick={handleLinkDashboardDropdown}
                                className={`group flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors w-full text-left border-l-4 ${
                                    isLinkDashboardPathActive
                                        ? 'border-accent text-accent bg-accent/10'
                                        : 'border-transparent text-secondary hover:hover-bg'
                                }`}
                            >
                                <RxDashboard
                                    className={`${
                                        isLinkDashboardPathActive
                                            ? 'text-accent'
                                            : 'text-muted'
                                    }`}
                                    size={18}
                                />
                                <span>Dashboard</span>
                                <i
                                    className={`fa-solid fa-caret-down ml-auto text-xs transition-transform ${
                                        openLinkDashboard ? 'rotate-180' : ''
                                    }`}
                                />
                            </button>

                            {openLinkDashboard && (
                                <div className="pl-8 mt-1 space-y-1">
                                     <Link
                                        href="/links-menu/dashboard"
                                        className={`block rounded-lg px-0 py-2 text-sm transition-colors ${
                                            isLinkAnalyticActive
                                                ? 'text-accent font-semibold'
                                                : 'text-secondary hover:text-accent'
                                        }`}
                                    >
                                        Analytic
                                    </Link>
                                     <Link
                                        href="/links-menu/dashboard/profile"
                                        className={`block rounded-lg px-0 py-2 text-sm transition-colors ${
                                            isLinkProfileActive

                                                ? 'text-accent font-semibold'
                                                : 'text-secondary hover:text-accent'
                                        }`}
                                    >
                                        Profile
                                    </Link>
                                    <Link
                                        href="/links-menu/dashboard/posts"
                                        className={`block rounded-lg px-0 py-2 text-sm transition-colors ${
                                            isLinkPostsActive
                                                ? 'text-accent font-semibold'
                                                : 'text-secondary hover:text-accent'
                                        }`}
                                    >
                                        Posts
                                    </Link>
                                </div>
                            )}

                            <Link
                                href="/links-menu/dashboard/add-post"
                                className={`group flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors border-l-4 ${
                                    isAddLinkPostActive
                                        ? 'border-accent text-accent bg-accent/10'
                                        : 'border-transparent text-secondary hover:hover-bg'
                                }`}
                            >
                                <IoIosAddCircleOutline
                                    className={`${
                                        isAddLinkPostActive ? 'text-accent' : 'text-muted'
                                    }`}
                                    size={18}
                                />
                                <span>Add Post</span>
                            </Link>
                        </div>
                    )}
                </div>

                {/* === Crypto Tools Group === */}
                <div
                    className={`
                        group flex items-center gap-3 rounded-lg px-3 py-2 text-sm w-full text-left
                        border-l-4 border-transparent 
                        text-secondary opacity-60 cursor-not-allowed
                    `}
                >
                    <FaBitcoin className="text-muted" size={18} />
                    <span>Web3 Tools</span>
                </div>

                {/* === AI Group === */}
                <div
                    className={`
                        group flex items-center gap-3 rounded-lg px-3 py-2 text-sm w-full text-left
                        border-l-4 border-transparent 
                        text-secondary opacity-60 cursor-not-allowed
                    `}
                >
                    <FaRobot className="text-muted" size={18} />
                    <span>AI</span>
                </div>

                {/* === Image Resources Group === */}
                <div>
                    <button
                        type="button"
                        onClick={handleImagesDropdown}
                        className={`group flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors w-full text-left border-l-4 ${
                            pathname.startsWith('/images-menu/dashboard')
                                ? 'border-accent text-accent bg-accent/10'
                                : 'border-transparent text-secondary hover:hover-bg'
                        }`}
                    >
                        <MdImage
                            className={`${
                                pathname.startsWith('/images-menu/dashboard')
                                    ? 'text-accent'
                                    : 'text-muted'
                            }`}
                            size={18}
                        />
                        <span>Image Resources</span>
                        <i
                            className={`fa-solid fa-caret-down ml-auto text-xs transition-transform ${
                                openImages ? 'rotate-180' : ''
                            }`}
                        />
                    </button>

                    {openImages && (
                        <div className="pl-8 mt-2 space-y-1">
                            <button
                                type="button"
                                onClick={handleImagesDashboardDropdown}
                                className={`group flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors w-full text-left border-l-4 ${
                                    isImagesDashboardActive
                                        ? 'border-accent text-accent bg-accent/10'
                                        : 'border-transparent text-secondary hover:hover-bg'
                                }`}
                            >
                                <RxDashboard
                                    className={`${
                                        isImagesDashboardActive
                                            ? 'text-accent'
                                            : 'text-muted'
                                    }`}
                                    size={18}
                                />
                                <span>Dashboard</span>
                                <i
                                    className={`fa-solid fa-caret-down ml-auto text-xs transition-transform ${
                                        openImagesDashboard ? 'rotate-180' : ''
                                    }`}
                                />
                            </button>

                            {openImagesDashboard && (
                                <div className="pl-8 mt-1 space-y-1">
                                     <Link
                                        href="/images-menu/dashboard"
                                        className={`block rounded-lg px-0 py-2 text-sm transition-colors ${
                                            isImagesAnalyticActive
                                                ? 'text-accent font-semibold'
                                                : 'text-secondary hover:text-accent'
                                        }`}
                                    >
                                        Analytic
                                    </Link>
                                    <Link
                                        href="/images-menu/dashboard/images-list"
                                        className={`block rounded-lg px-0 py-2 text-sm transition-colors ${
                                            isImagesActive
                                                ? 'text-accent font-semibold'
                                                : 'text-secondary hover:text-accent'
                                        }`}
                                    >
                                        Images
                                    </Link>
                                </div>
                            )}

                            <Link
                                href="/images-menu/dashboard/add-image"
                                className={`group flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors border-l-4 ${
                                    isAddImageActive
                                        ? 'border-accent text-accent bg-accent/10'
                                        : 'border-transparent text-secondary hover:hover-bg'
                                }`}
                            >
                                <IoIosAddCircleOutline
                                    className={`${
                                        isAddImageActive ? 'text-accent' : 'text-muted'
                                    }`}
                                    size={18}
                                />
                                <span>Add Image</span>
                                </Link>
                        </div>
                    )}
                </div>
            </nav>
        </>
    )

    return (
        <>
            {/* Desktop sidebar */}
            <aside className="hidden md:flex md:flex-col fixed inset-y-0 left-0 w-64 sidebar-bg sidebar-border border-r">
                {content}
            </aside>

            {/* Mobile drawer */}
            {isOpen ? (
                <div className="md:hidden fixed inset-0 z-50">
                    <div
                        className="absolute inset-0 overlay-bg"
                        onClick={onClose}
                    />
                    <div className="absolute inset-y-0 left-0 w-64 sidebar-bg sidebar-border border-r animate-[slideIn_.2s_ease-out]">
                        {content}
                    </div>
                    <style jsx global>{`
                        @keyframes slideIn {
                            from {
                                transform: translateX(-100%);
                            }
                            to {
                                transform: translateX(0);
                            }
                        }
                    `}</style>
                </div>
            ) : null}
        </>
    )
}