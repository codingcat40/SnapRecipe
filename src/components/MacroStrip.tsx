import { Macros } from '@/lib/types'

interface MacroStripProps {
  macros: Macros
}

const items = [
  { key: 'calories', label: 'Calories', accent: '#C8762A' },
  { key: 'protein_g', label: 'Protein (g)', accent: '#2D5A3D' },
  { key: 'carbs_g', label: 'Carbs (g)', accent: '#2D5A3D' },
  { key: 'fat_g', label: 'Fat (g)', accent: '#2D5A3D' },
] as const

export default function MacroStrip({ macros }: MacroStripProps) {
  return (
    <div className="grid grid-cols-4"
      style={{ borderBottom: '0.5px solid rgba(28,26,23,0.12)' }}>
      {items.map((item, i) => (
        <div key={item.key}
          className="py-4 px-3 text-center"
          style={{
            borderRight: i < 3 ? '0.5px solid rgba(28,26,23,0.12)' : 'none',
          }}>
          <div className="font-serif font-light leading-none mb-1"
            style={{ fontSize: '28px', color: item.accent }}>
            {macros[item.key] ?? '—'}
          </div>
          <div className="uppercase tracking-wider"
            style={{ fontSize: '10px', color: '#9A9590', letterSpacing: '0.07em' }}>
            {item.label}
          </div>
        </div>
      ))}
    </div>
  )
}
