import { ChevronLeft } from 'lucide-react'

export function Sidebar() {
  return (
    <aside className="fixed left-0 top-16 bottom-0 w-64 bg-black border-r border-gray-800 overflow-y-auto">
      <div className="p-6">
        {/* Back to Home */}
        <div className="flex items-center space-x-2 mb-8">
          <ChevronLeft className="w-4 h-4 text-gray-400" />
          <span className="text-gray-400 text-sm">Home</span>
        </div>

        {/* Research Section */}
        <div className="mb-8">
          <div className="space-y-3">
            <div className="sidebar-item">Research Index</div>
            <div className="sidebar-item">Research Overview</div>
            <div className="sidebar-item">Research Residency</div>
          </div>
        </div>

        {/* Latest Advancements */}
        <div className="mb-8">
          <h3 className="text-gray-500 text-xs uppercase tracking-wide mb-4">Latest Advancements</h3>
          <div className="space-y-3">
            <div className="sidebar-item active">GPT-5</div>
            <div className="sidebar-item">OpenAI o3 and o4-mini</div>
            <div className="sidebar-item">GPT-4.5</div>
            <div className="sidebar-item">OpenAI o1</div>
            <div className="sidebar-item">GPT-4o</div>
            <div className="sidebar-item">Sora</div>
          </div>
        </div>

        {/* Safety Section */}
        <div className="mb-8">
          <h3 className="text-gray-500 text-xs uppercase tracking-wide mb-4">Safety</h3>
          <div className="space-y-3">
            <div className="sidebar-item">Safety Approach</div>
            <div className="sidebar-item">Security & Privacy</div>
            <div className="sidebar-item">Trust & Transparency</div>
          </div>
        </div>
      </div>
    </aside>
  )
}
