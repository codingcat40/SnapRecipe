'use client'

import { useState } from 'react'
import Navbar from '@/components/Navbar'
import UploadZone from '@/components/UploadZone'
import RecipeCard from '@/components/RecipeCard'
import { Recipe, ScanState } from '@/lib/types'

export default function Home() {
  const [state, setState] = useState<ScanState>('idle')
  const [recipe, setRecipe] = useState<Recipe | null>(null)
  const [error, setError] = useState('')
  const [currentFile, setCurrentFile] = useState<{ base64: string; mimeType: string } | null>(null)

  const handleFile = (file: File, base64: string) => {
    setCurrentFile({ base64, mimeType: file.type })
    setError('')
    setState('idle')
  }

  const handleScan = async () => {
    if (!currentFile) return
    setState('scanning')
    setError('')
    setRecipe(null)

    try {
      const res = await fetch('/api/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: currentFile.base64, mimeType: currentFile.mimeType }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Something went wrong.')
      setRecipe(data.recipe)
      setState('done')
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong.')
      setState('error')
    }
  }

  const handleReset = () => {
    setState('idle')
    setRecipe(null)
    setError('')
    setCurrentFile(null)
  }

  const isScanning = state === 'scanning'
  const showResult = state === 'done' && recipe

  return (
    <div className="min-h-screen" style={{ background: '#F7F3EC' }}>
      <Navbar />

      <main className="max-w-2xl mx-auto px-5 pb-20">

        {/* Hero */}
        {!showResult && (
          <div className="text-center pt-16 pb-10 animate-fade-up">
            <p className="text-xs font-medium uppercase tracking-widest mb-4"
              style={{ color: '#C8762A', letterSpacing: '0.1em' }}>
              AI-powered recipe scanner
            </p>
            <h1 className="font-serif font-light tracking-tight mb-4"
              style={{ fontSize: 'clamp(38px, 7vw, 58px)', lineHeight: '1.08', letterSpacing: '-1.5px', color: '#1C1A17' }}>
              Snap a dish,<br />
              get the{' '}
              <em className="not-italic" style={{ color: '#2D5A3D' }}>full recipe</em>
            </h1>
            <p className="text-base font-light max-w-sm mx-auto" style={{ color: '#4A4640', lineHeight: '1.65' }}>
              Upload any food photo and instantly get ingredients, steps, and macros — for free.
            </p>
          </div>
        )}

        {/* Upload + Scan */}
        {!showResult && (
          <div className="space-y-3 animate-fade-up-delay-1">
            <UploadZone onFile={handleFile} disabled={isScanning} />

            {currentFile && !isScanning && (
              <button onClick={handleScan}
                className="w-full py-3.5 rounded-xl font-medium text-base flex items-center justify-center gap-2 transition-all"
                style={{ background: '#2D5A3D', color: 'white' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"/>
                </svg>
                Scan &amp; extract recipe
              </button>
            )}

            {/* Loading */}
            {isScanning && (
              <div className="text-center py-12 animate-fade-up">
                <div className="spinner mx-auto mb-4" />
                <p className="font-serif font-light text-lg" style={{ color: '#4A4640' }}>
                  Analysing your dish...
                </p>
                <p className="text-sm mt-1" style={{ color: '#9A9590' }}>
                  Identifying ingredients, steps &amp; macros
                </p>
              </div>
            )}

            {/* Error */}
            {state === 'error' && error && (
              <div className="rounded-xl px-4 py-3 text-sm animate-fade-up"
                style={{ background: '#FEF2F2', border: '0.5px solid #FECACA', color: '#991B1B' }}>
                {error}
              </div>
            )}
          </div>
        )}

        {/* Result */}
        {showResult && (
          <div className="pt-8">
            <RecipeCard recipe={recipe} onReset={handleReset} />
          </div>
        )}

        {/* How it works */}
        {!showResult && !isScanning && (
          <div className="mt-20 animate-fade-up-delay-2">
            <h2 className="font-serif font-light text-2xl tracking-tight mb-6"
              style={{ color: '#1C1A17', letterSpacing: '-0.4px' }}>
              How it works
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { n: '01', title: 'Upload any food photo', body: 'Restaurant dish, home cook, menu item — any image works.' },
                { n: '02', title: 'AI extracts the recipe', body: "Gemini's vision model identifies every ingredient and cooking step." },
                { n: '03', title: 'Get macros instantly', body: 'Calories, protein, carbs, and fat — calculated per serving.' },
              ].map(({ n, title, body }) => (
                <div key={n} className="rounded-2xl p-5 animate-fade-up-delay-3"
                  style={{ background: 'white', border: '0.5px solid rgba(28,26,23,0.12)' }}>
                  <div className="font-serif font-light mb-2"
                    style={{ fontSize: '36px', color: 'rgba(28,26,23,0.2)', lineHeight: 1 }}>
                    {n}
                  </div>
                  <h3 className="font-medium text-sm mb-1" style={{ color: '#1C1A17' }}>{title}</h3>
                  <p className="text-sm font-light leading-relaxed" style={{ color: '#9A9590' }}>{body}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      <footer className="text-center py-8 text-xs" style={{ color: '#9A9590', borderTop: '0.5px solid rgba(28,26,23,0.1)' }}>
        SnapRecipe · No data stored · Your images stay private
      </footer>
    </div>
  )
}
