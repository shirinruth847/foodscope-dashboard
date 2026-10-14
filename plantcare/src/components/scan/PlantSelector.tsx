import { Check } from 'lucide-react'

const plantTypes = [
  { emoji: '🍎', label: 'Apple' },
  { emoji: '☕', label: 'Coffee' },
  { emoji: '🍵', label: 'Tea' },
  { emoji: '🥑', label: 'Avocado' },
  { emoji: '🥭', label: 'Mango' },
  { emoji: '🍊', label: 'Citrus' },
]

interface PlantSelectorProps {
  selected: string | null
  onSelect: (plant: string) => void
}

export default function PlantSelector({ selected, onSelect }: PlantSelectorProps) {
  return (
    <div className="rounded-2xl bg-white dark:bg-gray-800 p-6 shadow-soft dark:shadow-none dark:border dark:border-gray-700">
      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30 text-white">
          <span className="text-sm font-bold text-[#22C55E]">1</span>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Select Plant Type
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Choose the type of plant you want to scan
          </p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
        {plantTypes.map((plant) => {
          const isSelected = selected === plant.label
          return (
            <button
              key={plant.label}
              onClick={() => onSelect(plant.label)}
              className={`group relative flex h-20 flex-col items-center justify-center gap-1 rounded-xl border-2 text-center transition-all ${
                isSelected
                  ? 'border-[#22C55E] bg-white dark:bg-gray-800 text-[#14532D] shadow-lg shadow-green-500/25'
                  : 'border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:border-green-300 hover:bg-green-50 dark:hover:bg-gray-700'
              }`}
            >
              <span className="text-2xl">{plant.emoji}</span>
              <span className="text-xs font-medium">{plant.label}</span>
              {isSelected && (
                <Check className="absolute top-1.5 right-1.5 h-4 w-4 text-[#22C55E]" />
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
