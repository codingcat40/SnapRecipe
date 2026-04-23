'use client'

import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'

interface UploadZoneProps {
  onFile: (file: File, base64: string) => void
  disabled?: boolean
}

export default function UploadZone({ onFile, disabled }: UploadZoneProps) {
  const [preview, setPreview] = useState<string | null>(null)
  const [filename, setFilename] = useState('')

  const onDrop = useCallback((accepted: File[]) => {
    const file = accepted[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (e) => {
      const result = e.target?.result as string
      setPreview(result)
      setFilename(file.name)
      onFile(file, result.split(',')[1])
    }
    reader.readAsDataURL(file)
  }, [onFile])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpg', '.jpeg', '.png', '.webp', '.heic'] },
    multiple: false,
    disabled,
  })

  const reset = (e: React.MouseEvent) => {
    e.stopPropagation()
    setPreview(null)
    setFilename('')
  }

  if (preview) {
    return (
      <div className="rounded-2xl overflow-hidden animate-fade-up"
        style={{ border: '0.5px solid rgba(28,26,23,0.15)', background: 'white' }}>
        <div className="relative">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={preview} alt="Food preview"
            className="w-full object-cover"
            style={{ maxHeight: '340px' }} />
          <div className="absolute bottom-0 left-0 right-0 px-4 py-3 flex justify-between items-end"
            style={{ background: 'linear-gradient(transparent, rgba(28,26,23,0.65))' }}>
            <span className="text-xs text-white/70 truncate max-w-[60%]">{filename}</span>
            <button onClick={reset}
              className="text-xs text-white px-3 py-1.5 rounded-full transition-all"
              style={{ background: 'rgba(255,255,255,0.2)', border: '0.5px solid rgba(255,255,255,0.4)' }}>
              Change photo
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div {...getRootProps()}
      className="rounded-2xl cursor-pointer transition-all duration-200 text-center py-16 px-8"
      style={{
        border: `1.5px dashed ${isDragActive ? '#5A9B6E' : 'rgba(28,26,23,0.22)'}`,
        background: isDragActive ? '#EAF2EC' : 'white',
      }}>
      <input {...getInputProps()} />

      <div className="w-14 h-14 rounded-full mx-auto mb-4 flex items-center justify-center"
        style={{ background: '#EAF2EC' }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
          stroke="#2D5A3D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"/>
        </svg>
      </div>

      <p className="font-medium mb-1" style={{ color: 'var(--ink)', fontSize: '16px' }}>
        {isDragActive ? 'Drop your food photo here' : 'Drop a food photo here'}
      </p>
      <p className="text-sm" style={{ color: '#9A9590' }}>
        or click to browse — JPG, PNG, WEBP
      </p>
    </div>
  )
}
