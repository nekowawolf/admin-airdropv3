import { FaLayerGroup, FaUserCircle, FaBitcoin, FaRobot, FaLink } from 'react-icons/fa'
import { HiMiniRocketLaunch } from 'react-icons/hi2'
import { MdImage } from 'react-icons/md'
import BackButton from '@/components/ui/BackButton'
import SessionActivity from './SessionActivity'
import { dashboardMetadata } from '@/constants/metadataTemplates'

export const metadata = dashboardMetadata('Admin Profile', 'Manage your account details and view system information')

export default function ProfilePage() {
  {/* Available Menus in the Admin Dashboard */}
  const menus = [
    { name: 'Airdrop', icon: <HiMiniRocketLaunch className="text-accent" /> },
    { name: 'Community', icon: <FaLayerGroup className="text-accent" /> },
    { name: 'Portfolio', icon: <FaUserCircle className="text-accent" /> },
    { name: 'Link', icon: <FaLink className="text-accent" /> },
    { name: 'Image Resources', icon: <MdImage className="text-accent" /> },
    { name: 'Web3 Tools', icon: <FaBitcoin className="text-accent" /> },
    { name: 'AI', icon: <FaRobot className="text-accent" /> },
  ]

  return (
    <div className="min-h-screen p-6 md:p-8 body-color flex flex-col items-center">
      {/* Page Header */}
      <div className="w-full max-w-4xl mb-8">
        <BackButton />
        <h1 className="text-2xl md:text-3xl font-bold text-primary">Admin Profile</h1>
        <p className="text-sm text-secondary mt-1">Manage your account details and view system information</p>
      </div>

      {/* Main Content Grid */}
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Left Column: User Identity */}
        <div className="col-span-1 flex flex-col gap-6">
          <div className="bg-[var(--fill-color)] rounded-2xl border border-border-divider p-6 flex flex-col items-center text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="relative mb-4">
              <img 
                src="https://avatars.githubusercontent.com/u/113094795?s=400&u=09f3e0e5f27350cd376caa27f7aa65cf46c9384c&v=4" 
                alt="Admin Avatar" 
                className="w-32 h-32 rounded-full object-cover border-4 border-border-divider shadow-md"
              />
              <div className="absolute bottom-1 right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-[var(--fill-color)] shadow"></div>
            </div>
            <h2 className="text-xl font-bold text-primary">nekowawolf</h2>
            <p className="text-sm font-medium text-accent bg-accent/10 px-3 py-1 rounded-full mt-2">Administrator</p>
          </div>

          {/* Session Activity */}
          <SessionActivity />
        </div>

        {/* Right Column: System Information */}
        <div className="col-span-1 md:col-span-2 flex flex-col gap-6">
          <div className="bg-[var(--fill-color)] rounded-2xl border border-border-divider p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 h-full">
            <div className="flex items-center justify-between border-b border-border-divider pb-4 mb-4">
              <div>
                <h3 className="text-lg font-semibold text-primary">System Access Overview</h3>
                <p className="text-sm text-secondary">Modules available for this role</p>
              </div>
              <div className="text-white font-bold">
                Total Menus: {menus.length}
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {menus.map((menu, index) => (
                <div key={index} className="flex items-center gap-3 p-3 rounded-xl border border-border-divider hover:bg-[var(--hover-bg)] transition-colors duration-200">
                  <div className="p-2 rounded-lg bg-[var(--card-color2)] shadow-inner">
                    {menu.icon}
                  </div>
                  <span className="text-sm font-medium text-primary">{menu.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}