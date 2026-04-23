'use client'

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between px-6 md:px-10 py-4"
      style={{
        background: 'rgba(247,243,236,0.92)',
        backdropFilter: 'blur(12px)',
        borderBottom: '0.5px solid rgba(28,26,23,0.12)',
      }}>
      <div className="font-serif text-xl font-semibold tracking-tight" style={{ color: 'var(--ink)' }}>
        Snap<span style={{ color: 'var(--forest)' }}>Recipe</span>
      </div>
      <div className="flex items-center gap-3">
        <span className="hidden sm:flex items-center gap-1.5 text-xs"
          style={{ color: '#9A9590' }}>
          <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: '#5A9B6E' }} />
          Powered by Gemini Flash
        </span>
        <span className="text-xs font-medium px-3 py-1 rounded-full uppercase tracking-widest"
          style={{ background: '#EAF2EC', color: '#2D5A3D' }}>
          Free Beta
        </span>
      </div>
    </nav>
  )
}
