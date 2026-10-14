import { Check } from 'lucide-react'

const parts = [
  { icon: '🌿', label: 'Leaves' },
  { icon: '🍎', label: 'Fruit' },
  { icon: '🪵', label: 'Stem/Branches' },
  { icon: '🥕', label: 'Roots' },
]

interface PartSelectorProps {
  selected: string | null
  onSelect: (part: string) => void
}

export default function PartSelector({ selected, onSelect }: PartSelectorProps) {
  return (
    <div className="rounded-2xl bg-white dark:bg-gray-800 p-6 shadow-soft dark:shadow-none dark:border dark:border-gray-700">
      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900/30">
          <span className="text-sm font-bold text-[#7C3AED]">3</span>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Affected Plant Part
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Select the part of the plant showing symptoms
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {parts.map((part) => {
          const isSelected = selected === part.label
          return (
            <button
              key={part.label}
              onClick={() => onSelect(part.label)}
              className={`group relative flex h-20 flex-col items-center justify-center gap-2 rounded-xl border-2 text-center transition-all ${
                isSelected
                  ? 'border-[#7C3AED] bg-white dark:bg-gray-800 text-[#7C3AED] shadow-lg shadow-purple-500/25'
                  : 'border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:border-purple-300 hover:bg-purple-50 dark:hover:bg-gray-700'
              }`}
            >
              <span className="text-2xl">{part.icon}</span>
              <span className="text-xs font-medium">{part.label}</span>
              {isSelected && (
                <Check className="absolute top-1.5 right-1.5 h-4 w-4 text-[#7C3AED]" />
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
