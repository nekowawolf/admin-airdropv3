import { dashboardMetadata } from '@/constants/metadataTemplates'
import ClientDashboardPage from './ClientDashboardPage'

export const metadata = dashboardMetadata('Dashboard', 'Manage Portfolio')

export default function Page() {
  return <ClientDashboardPage />
}
