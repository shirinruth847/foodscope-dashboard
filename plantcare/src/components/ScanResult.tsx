import { Scan, CheckCircle, RefreshCw, ExternalLink } from 'lucide-react'
import type { ScanState } from './ScanPage'

interface ScanResultProps {
  scanState: ScanState
  onReset: () => void
}

interface DiseaseMatch {
  id: string
  name: string
  confidence: number
  description: string
  treatment: string[]
}

const mockResults: DiseaseMatch[] = [
  {
    id: '1',
    name: 'Apple Scab',
    confidence: 92,
    description:
      'A common fungal disease affecting apple trees, characterized by olive-green or black spots on leaves.',
    treatment: [
      'Prune affected branches in late winter',
      'Apply fungicide sprays early in spring',
      'Remove and destroy infected leaves',
    ],
  },
  {
    id: '2',
    name: 'Powdery Mildew',
    confidence: 67,
    description:
      'A fungal disease that appears as white powdery spots on leaves, stems, and flower buds.',
    treatment: [
      'Increase air circulation around plants',
      'Avoid overhead watering',
      'Apply sulfur-based fungicides',
    ],
  },
]

export default function ScanResult({ scanState, onReset }: ScanResultProps) {
  const primaryMatch = mockResults[0]
  const confidenceColor =
    primaryMatch.confidence >= 80
      ? 'text-green-500'
      : primaryMatch.confidence >= 50
        ? 'text-orange-500'
        : 'text-red-500'

  return (
    <div className="mx-auto max-w-3xl px-6 py-8 w-full min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900">
      <div className="mb-6 rounded-2xl bg-white dark:bg-gray-800 p-8 shadow-soft dark:shadow-none dark:border dark:border-gray-700">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Scan Results
          </h2>
          <button
            onClick={onReset}
            className="flex items-center gap-2 rounded-xl bg-gray-100 dark:bg-gray-700 px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            <RefreshCw className="h-4 w-4" />
            New Scan
          </button>
        </div>

        {/* Scan Summary */}
        <div className="mb-6 rounded-xl bg-gray-50 dark:bg-gray-700/50 p-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-500 dark:text-gray-400">Plant:</span>
              <span className="font-medium text-gray-900 dark:text-white">
                {' '}
                {scanState.plantType}
              </span>
            </div>
            <div>
              <span className="text-gray-500 dark:text-gray-400">Part:</span>
              <span className="font-medium text-gray-900 dark:text-white">
                {' '}
                {scanState.affectedPart}
              </span>
            </div>
            {scanState.symptoms.length > 0 && (
              <div className="col-span-2">
                <span className="text-gray-500 dark:text-gray-400">Symptoms:</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {' '}
                  {scanState.symptoms.join(', ')}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Primary Result */}
        <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-6">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900/30">
                <Scan className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  {primaryMatch.name}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Disease detected
                </p>
              </div>
            </div>
            <div className="text-right">
              <span className={`text-3xl font-bold ${confidenceColor}`}>
                {primaryMatch.confidence}%
              </span>
              <p className="text-xs text-gray-500 dark:text-gray-400">Confidence</p>
            </div>
          </div>

          <p className="mb-4 text-sm text-gray-600 dark:text-gray-300">
            {primaryMatch.description}
          </p>

          <div className="mb-4">
            <p className="mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Recommended Treatment:
            </p>
            <ul className="space-y-1">
              {primaryMatch.treatment.map((step, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300"
                >
                  <CheckCircle className="mt-0.5 h-4 w-4 text-green-500 flex-shrink-0" />
                  {step}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex gap-3">
            <button className="flex-1 rounded-xl bg-green-gradient px-4 py-2.5 text-sm font-medium text-white hover:shadow-lg hover:shadow-green-500/25 transition-all">
              Save to Treatment Plan
            </button>
            <button className="flex-1 rounded-xl border border-gray-200 dark:border-gray-700 px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              <ExternalLink className="mr-2 h-4 w-4" />
              More Info
            </button>
          </div>
        </div>

        {/* Other Matches */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Other Possible Matches
          </h4>
          {mockResults.slice(1).map((match) => (
            <div
              key={match.id}
              className="rounded-xl border border-gray-200 dark:border-gray-700 p-4"
            >
              <div className="flex items-center justify-between">
                <h5 className="font-medium text-gray-900 dark:text-white">
                  {match.name}
                </h5>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {match.confidence}% match
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
