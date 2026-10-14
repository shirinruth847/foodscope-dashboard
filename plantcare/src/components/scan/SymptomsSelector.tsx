import { X } from 'lucide-react'

const symptoms = [
  'Yellow/Brown spots',
  'Wilting leaves',
  'Powdery coating',
  'Leaf curling',
  'Premature leaf drop',
  'Stunted growth',
  'Discolored fruit',
  'Rotting',
]

interface SymptomsSelectorProps {
  selected: string[]
  onChange: (symptoms: string[]) => void
}

export default function SymptomsSelector({ selected, onChange }: SymptomsSelectorProps) {
  const toggleSymptom = (symptom: string) => {
    const newSelected = selected.includes(symptom)
      ? selected.filter((s) => s !== symptom)
      : [...selected, symptom]
    onChange(newSelected)
  }

  return (
    <div className="rounded-2xl bg-white dark:bg-gray-800 p-6 shadow-soft dark:shadow-none dark:border dark:border-gray-700">
      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-100 dark:bg-orange-900/30">
          <span className="text-sm font-bold text-[#EA580C]">4</span>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Observed Symptoms <span className="font-normal text-gray-500 dark:text-gray-400">(Optional)</span>
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Select all symptoms you observe on the plant
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {symptoms.map((symptom) => {
          const isSelected = selected.includes(symptom)
          return (
            <button
              key={symptom}
              onClick={() => toggleSymptom(symptom)}
              className={`relative rounded-full px-4 py-2 text-sm font-medium transition-all ${
                isSelected
                  ? 'bg-[#22C55E] text-white border border-[#22C55E] hover:bg-[#16A34A]'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {symptom}
              {isSelected && (
                <X className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-white text-green-500" />
              )}
            </button>
          )
        })}
      </div>

      {selected.length > 0 && (
        <div className="mt-4 flex items-center justify-between">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {selected.length} symptom{selected.length !== 1 ? 's' : ''} selected
          </p>
          <button
            onClick={() => onChange([])}
            className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
          >
            Clear all
          </button>
        </div>
      )}
    </div>
  )
}
