import { useState, useCallback } from 'react'
import PlantSelector from './scan/PlantSelector'
import ImageUpload from './scan/ImageUpload'
import PartSelector from './scan/PartSelector'
import SymptomsSelector from './scan/SymptomsSelector'
import ScanResult from './ScanResult'

export interface ScanState {
  plantType: string | null
  images: File[]
  affectedPart: string | null
  symptoms: string[]
}

const initialScanState: ScanState = {
  plantType: null,
  images: [],
  affectedPart: null,
  symptoms: [],
}

export default function ScanPage() {
  const [scanState, setScanState] = useState<ScanState>(initialScanState)
  const [showResult, setShowResult] = useState(false)

  const canAnalyze = scanState.plantType !== null && scanState.images.length > 0

  const handlePlantSelect = useCallback((plant: string) => {
    setScanState((prev) => ({ ...prev, plantType: plant }))
  }, [])

  const handleImagesChange = useCallback((files: File[]) => {
    setScanState((prev) => ({ ...prev, images: files }))
  }, [])

  const handlePartSelect = useCallback((part: string) => {
    setScanState((prev) => ({ ...prev, affectedPart: part }))
  }, [])

  const handleSymptomsChange = useCallback((symptoms: string[]) => {
    setScanState((prev) => ({ ...prev, symptoms }))
  }, [])

  const handleAnalyze = () => {
    if (canAnalyze) {
      setShowResult(true)
    }
  }

  const resetScan = () => {
    setScanState(initialScanState)
    setShowResult(false)
  }

  if (showResult) {
    return <ScanResult scanState={scanState} onReset={resetScan} />
  }

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900">
      <div className="mx-auto max-w-3xl px-8 pt-8 pb-12">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#14532D] dark:text-white">
            Check Disease
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Upload photos or describe symptoms to identify plant diseases
          </p>
        </div>

        {/* Step Cards */}
        <div className="space-y-6">
          <PlantSelector
            selected={scanState.plantType}
            onSelect={handlePlantSelect}
          />

          <ImageUpload
            images={scanState.images}
            onImagesChange={handleImagesChange}
          />

          <PartSelector
            selected={scanState.affectedPart}
            onSelect={handlePartSelect}
          />

          <SymptomsSelector
            selected={scanState.symptoms}
            onChange={handleSymptomsChange}
          />
        </div>

        {/* Bottom Action */}
        <div className="mt-8">
          <button
            onClick={handleAnalyze}
            disabled={!canAnalyze}
            className={`w-full rounded-2xl px-6 py-4 text-base font-semibold transition-all ${
              canAnalyze
                ? 'bg-gradient-to-r from-[#4ADE80] to-[#16A34A] text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5'
                : 'cursor-not-allowed rounded-2xl bg-gray-200 dark:bg-gray-700 text-gray-400'
            }`}
          >
            Analyze Disease
          </button>
        </div>
      </div>
    </div>
  )
}
