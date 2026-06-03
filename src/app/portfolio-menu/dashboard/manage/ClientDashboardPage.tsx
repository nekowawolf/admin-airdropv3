'use client'

import { useState } from 'react'
import { usePortfolio } from '@/hooks/portfolio/usePortfolio'
import { useAuthGuard } from '@/hooks/auth-guard/useAuthGuard'
import HeroProfileForm from '@/components/portfolio/HeroProfileForm'
import CRUDList from '@/components/portfolio/CRUDList'
import { Spinner } from "@/components/ui/shadcn-io/spinner"

export default function PortfolioDashboard() {
  useAuthGuard()
  
  const { 
    portfolio, 
    loading, 
    error,
    isUpdating, 
    sectionLoading,
    refetch,
    updateHeroProfile,
    addCertificate,
    deleteCertificate,
    editCertificate,
    addDesign,
    deleteDesign,
    editDesign,
    addProject,
    deleteProject,
    editProject,
    addExperience,
    deleteExperience,
    editExperience,
    addEducation,
    deleteEducation,
    editEducation,
    addTechSkill,
    deleteTechSkill,
    editTechSkill,
    addDesignSkill,
    deleteDesignSkill,
    editDesignSkill,
  } = usePortfolio()

  const [activeSection, setActiveSection] = useState('hero')

  if (loading && !portfolio) {
    return (
      <div className="flex justify-center items-center min-h-screen pt-[-4rem]">
        <div className="text-center -mt-36">
          <Spinner
            variant="circle"
            size={40}
            className="text-blue-500 mx-auto mb-4"
          />
          <p className="text-secondary">Loading portfolio data...</p>
        </div>
      </div>
    )
  }

  if (error && !portfolio) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="text-red-500 mb-4">⚠️</div>
          <h3 className="text-lg font-semibold text-primary mb-2">Error Loading Portfolio</h3>
          <p className="text-secondary mb-4">{error}</p>
          <button
            onClick={refetch}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  if (!portfolio) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <p className="text-secondary mb-4">No portfolio data found</p>
          <button
            onClick={refetch}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  const sections = [
    { id: 'hero', label: 'Hero Profile' },
    { id: 'certificates', label: 'Certificates' },
    { id: 'designs', label: 'Designs' },
    { id: 'projects', label: 'Projects' },
    { id: 'experience', label: 'Experience' },
    { id: 'education', label: 'Education' },
    { id: 'skills', label: 'Skills' },
  ]

  const handleHeroUpdate = async (data: any) => {
    await updateHeroProfile(data)
  }

  return (
    <div className="min-h-screen body-color p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 text-center sm:text-left">
          <h1 className="text-lg sm:text-2xl font-semibold text-primary">Portfolio Management</h1>
          <p className="text-xs sm:text-sm text-secondary">Manage your portfolio content and sections</p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mb-6 border-b border-border-divider pb-4">
          {sections.map(section => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`px-4 py-2 rounded-lg transition-colors text-sm font-medium ${
                activeSection === section.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-[var(--card-color2)] text-primary hover:bg-[var(--hover-bg)]'
              }`}
            >
              {section.label}
            </button>
          ))}
        </div>

        {/* Error Display */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        {/* Hero Profile Section */}
        {activeSection === 'hero' && (
          <HeroProfileForm
            data={portfolio.hero}
            onSubmit={handleHeroUpdate}
            isSubmitting={isUpdating}
          />
        )}

        {/* Certificates Section */}
        {activeSection === 'certificates' && (
          <CRUDList
            title="Certificates"
            items={portfolio.certificates || []}
            fields={[
              { key: 'title', label: 'Title', type: 'text' },
              { key: 'image_url', label: 'Image URL', type: 'url' },
            ]}
            onAdd={addCertificate}
            onEdit={editCertificate}
            onDelete={deleteCertificate}
            isLoading={sectionLoading === 'certificate'}
            onRefresh={refetch}
          />
        )}

        {/* Designs Section */}
        {activeSection === 'designs' && (
          <CRUDList
            title="Designs"
            items={portfolio.designs || []}
            fields={[
              { key: 'title', label: 'Title', type: 'text' },
              { key: 'description', label: 'Description', type: 'textarea' },
              { key: 'video_url', label: 'Video URL', type: 'url' },
              { key: 'category', label: 'Category', type: 'text' },
              { key: 'tools', label: 'Tools', type: 'array' },
              { key: 'image_url', label: 'Thumbnail URL', type: 'url' },
              { key: 'link', label: 'Link', type: 'url' },
              { key: 'screenshots', label: 'Screenshots', type: 'screenshots', options: { showDescription: false } },
              { key: 'ss_desc', label: 'Screenshots Description', type: 'textarea' },
              { key: 'color_palette', label: 'Color Palette', type: 'nested' },
              { key: 'typography', label: 'Typography', type: 'nested' },
            ]}
            onAdd={addDesign}
            onEdit={editDesign}
            onDelete={deleteDesign}
            isLoading={sectionLoading === 'design'}
            onRefresh={refetch}
          />
        )}

        {/* Projects Section */}
        {activeSection === 'projects' && (
          <CRUDList
            title="Projects"
            items={portfolio.projects || []}
            fields={[
              { key: 'title', label: 'Title', type: 'text' },
              { key: 'description', label: 'Description', type: 'textarea' },
              { key: 'image_url', label: 'Image URL', type: 'url' },
              { key: 'link', label: 'Link', type: 'url' },
              { key: 'github_url', label: 'GitHub URL', type: 'url' },
              { key: 'video_url', label: 'Video URL', type: 'url' },
              { key: 'screenshots', label: 'Screenshots', type: 'screenshots', options: { showDescription: false } },
              { key: 'ss_desc', label: 'Screenshots Description', type: 'textarea' },
              { key: 'stack', label: 'Tech Stack', type: 'array' },
              { key: 'use_case', label: 'Use Case Diagram', type: 'nested' },
              { key: 'activity', label: 'Activity Diagram', type: 'nested' },
              { key: 'erd', label: 'ERD Diagram', type: 'nested' },
              { key: 'flowchart', label: 'Flowchart Diagram', type: 'nested' },
            ]}
            onAdd={addProject}
            onEdit={editProject}
            onDelete={deleteProject}
            isLoading={sectionLoading === 'project'}
            onRefresh={refetch}
          />
        )}

        {/* Experience Section */}
        {activeSection === 'experience' && (
          <CRUDList
            title="Experience"
            items={portfolio.experience || []}
            fields={[
              { key: 'title', label: 'Title', type: 'text' },
              { key: 'description', label: 'Description', type: 'textarea' },
              { key: 'subjects', label: 'Subjects', type: 'array' },
              { key: 'start_year', label: 'Start Year', type: 'number' },
              { key: 'end_year', label: 'End Year', type: 'number' },
            ]}
            onAdd={addExperience}
            onEdit={editExperience}
            onDelete={deleteExperience}
            isLoading={sectionLoading === 'experience'}
            onRefresh={refetch}
          />
        )}

        {/* Education Section */}
        {activeSection === 'education' && (
          <CRUDList
            title="Education"
            items={portfolio.education || []}
            fields={[
              { key: 'title', label: 'Title', type: 'text' },
              { key: 'description', label: 'Description', type: 'textarea' },
              { key: 'subjects', label: 'Subjects', type: 'array' },
              { key: 'start_year', label: 'Start Year', type: 'number' },
              { key: 'end_year', label: 'End Year', type: 'number' },
            ]}
            onAdd={addEducation}
            onEdit={editEducation}
            onDelete={deleteEducation}
            isLoading={sectionLoading === 'education'}
            onRefresh={refetch}
          />
        )}

        {/* Skills Section */}
        {activeSection === 'skills' && (
          <div className="space-y-6">
            <CRUDList
              title="Tech Skills"
              items={portfolio.skills?.tech || []}
              fields={[
                { key: 'name', label: 'Skill Name', type: 'text' },
                { key: 'icon_url', label: 'Icon URL', type: 'url' },
              ]}
              onAdd={addTechSkill}
              onEdit={editTechSkill}
              onDelete={deleteTechSkill}
              isLoading={sectionLoading === 'tech skill'}
              onRefresh={refetch}
            />

            {/* Design Skills */}
            <CRUDList
              title="Design Skills"
              items={portfolio.skills?.design || []}
              fields={[
                { key: 'name', label: 'Skill Name', type: 'text' },
                { key: 'icon_url', label: 'Icon URL', type: 'url' },
              ]}
              onAdd={addDesignSkill}
              onEdit={editDesignSkill}
              onDelete={deleteDesignSkill}
              isLoading={sectionLoading === 'design skill'}
              onRefresh={refetch}
            />
          </div>
        )}
      </div>
    </div>
  )
}
