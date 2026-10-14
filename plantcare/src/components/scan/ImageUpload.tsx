import { useState, useCallback } from 'react'
import { Upload, Camera } from 'lucide-react'

interface ImageUploadProps {
  images: File[]
    onImagesChange: (files: File[]) => void
}

export default function ImageUpload({ images, onImagesChange }: ImageUploadProps) {
  const [dragOver, setDragOver] = useState(false)

  const onDrop = useCallback(
    (files: FileList | null) => {
      if (files && files.length > 0) {
        const fileArray = Array.from(files).filter((f) => f.type.startsWith('image/'))
        onImagesChange(fileArray)
      }
    },
    [onImagesChange],
  )

  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(true)
  }, [])

  const onDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
  }, [])

  const onDropZone = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setDragOver(false)
      onDrop(e.dataTransfer.files)
    },
    [onDrop],
  )

  const onFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onDrop(e.target.files)
    },
    [onDrop],
  )

  const removeImage = useCallback(
    (index: number) => {
      const newImages = [...images]
      newImages.splice(index, 1)
      onImagesChange(newImages)
    },
    [images, onImagesChange],
  )

  return (
    <div className="rounded-2xl bg-white dark:bg-gray-800 p-6 shadow-soft">
      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
          <span className="text-sm font-bold text-[#2563EB]">2</span>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            2. Upload Image
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Upload a photo or take one with your camera
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {/* Upload Zone */}
        <div
          className={`relative flex h-40 cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed transition-all ${
            dragOver
              ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
              : 'border-gray-300 dark:border-gray-600 hover:border-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800/50'
          }`}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDropZone}
          onClick={() => document.getElementById('image-upload')?.click()}
        >
          <Upload className="h-8 w-8 text-gray-400" />
          <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
            Upload Image
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-500">
            Click or drag and drop
          </p>
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={onFileSelect}
          />
        </div>

        {/* Camera Zone */}
        <div
          className="relative flex h-40 cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all"
        >
          <Camera className="h-8 w-8 text-gray-400" />
          <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
            Take Photo
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-500">
            Use your camera
          </p>
        </div>
      </div>

      {/* Image Preview */}
      {images.length > 0 && (
        <div className="mt-4 flex gap-3 overflow-x-auto">
          {images.map((file, index) => (
            <div key={index} className="relative h-20 w-20 flex-shrink-0">
              <img
                src={URL.createObjectURL(file)}
                alt={`Upload ${index + 1}`}
                className="h-full w-full rounded-lg object-cover"
              />
              <button
                onClick={() => removeImage(index)}
                className="absolute -top-1 -right-1 rounded-full bg-red-500 p-0.5 text-xs text-white opacity-0 hover:opacity-100 transition-opacity"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
