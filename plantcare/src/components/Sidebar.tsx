import {
  Home,
  Leaf,
  BookOpen,
  Stethoscope,
  Settings as SettingsIcon,
  X,
} from 'lucide-react'
import { useState } from 'react'

const navItems = [
  { icon: Home, label: 'Dashboard', href: '#' },
  { icon: Leaf, label: 'Plants', href: '#' },
  { icon: BookOpen, label: 'Diseases', href: '#' },
  { icon: Stethoscope, label: 'Scan', href: '#', active: true },
  { icon: SettingsIcon, label: 'Settings', href: '#' },
]

interface SidebarProps {
  mobileOpen?: boolean
  setMobileOpen?: (open: boolean) => void
}

export default function Sidebar({ mobileOpen, setMobileOpen }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <>
      {/* Mobile sidebar overlay */}
      {mobileOpen && setMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex h-screen w-64 flex-col overflow-y-auto bg-white dark:bg-gray-900 shadow-[4px_0_12px_rgba(0,0,0,0.04)] border-r border-gray-100 dark:border-gray-800 transition-transform duration-300 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Logo */}
        <div className="flex h-16 items-center justify-between p-6 border-b border-gray-50 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#4ADE80] to-[#16A34A]">
              <Leaf className="h-7 w-7 text-white" />
            </div>
            <div>
              <span className="text-xl font-bold text-[#14532D] dark:text-white">PlantCare</span>
              <p className="text-xs text-[#22C55E]">Disease Management</p>
            </div>
          </div>
          {(setMobileOpen || collapsed) && (
            <button
              onClick={() => {
                if (setMobileOpen) setMobileOpen(false)
                else setCollapsed(false)
              }}
              className="rounded-lg p-1.5 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 lg:hidden"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-6">
          <ul className="space-y-1.5 px-4">
            {navItems.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-all ${
                    item.active
                      ? 'bg-gradient-to-r from-[#4ADE80] to-[#16A34A] text-white shadow-lg shadow-green-500/25'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-green-50 dark:hover:bg-green-900/20 hover:text-green-700 dark:hover:text-green-300'
                  }`}
                >
                  <item.icon className={`h-5 w-5 flex-shrink-0 ${item.active ? '' : 'opacity-60'}`} />
                  <span>{item.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Bottom: Pro Tip + System Status */}
        <div className="p-4 border-t border-gray-50 dark:border-gray-800">
          <div className="mb-4 rounded-2xl bg-green-50 dark:bg-green-900/20 p-4 text-center">
            <p className="text-xs font-medium text-[#14532D] dark:text-green-300">
              Pro Tip
            </p>
            <p className="mt-1 text-xs text-green-700 dark:text-green-400">
              Regular monitoring helps catch diseases early!
            </p>
          </div>
          <div className="flex items-center justify-center gap-2 rounded-xl bg-gray-50 dark:bg-gray-800 px-3 py-2.5">
            <span className="h-2 w-2 rounded-full bg-[#22C55E] shadow-sm shadow-green-500/30"></span>
            <span className="text-xs text-gray-500 dark:text-gray-400">System online</span>
          </div>
        </div>
      </aside>
    </>
  )
}
