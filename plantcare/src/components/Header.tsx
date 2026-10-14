import { Moon, Bell, ChevronDown, Menu } from 'lucide-react'

interface HeaderProps {
  darkMode: boolean
  toggleDarkMode: () => void
  onMenuClick?: () => void
}

export default function Header({ darkMode: _darkMode, toggleDarkMode, onMenuClick }: HeaderProps) {
  return (
    <header className="flex h-20 items-center justify-between bg-white dark:bg-gray-900 px-8 pt-6 mt-2 border-b border-gray-100 dark:border-gray-800 mb-0 shadow-sm">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="rounded-xl bg-gray-100 dark:bg-gray-800 p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors lg:hidden"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>
        <div className="flex-1 overflow-hidden">
          <p className="text-sm text-gray-500 dark:text-gray-400">Good morning, John</p>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Let's check your plants today
          </h2>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <button
          onClick={toggleDarkMode}
           className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
           aria-label="Toggle dark mode"
        >
          <Moon className="h-5 w-5" />
        </button>

        <button className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
          <Bell className="h-5 w-5" />
          <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
            2
          </span>
        </button>

        <div            className="flex items-center gap-3 rounded-xl bg-gray-50 dark:bg-gray-800 px-4 py-2.5 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#22C55E] to-[#16A34A] text-sm font-semibold text-white">
            JA
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-medium text-gray-900 dark:text-white">John Anderson</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Expert Level 12</p>
          </div>
          <ChevronDown className="h-4 w-4 text-gray-400 dark:text-gray-500" />
        </div>
      </div>
    </header>
  )
}
