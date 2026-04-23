import { Recipe } from '@/lib/types'
import MacroStrip from './MacroStrip'

interface RecipeCardProps {
  recipe: Recipe
  onReset: () => void
}

export default function RecipeCard({ recipe, onReset }: RecipeCardProps) {
  return (
    <div className="rounded-2xl overflow-hidden animate-fade-up"
      style={{ background: 'white', border: '0.5px solid rgba(28,26,23,0.12)' }}>

      {/* Header */}
      <div className="px-7 pt-6 pb-5" style={{ borderBottom: '0.5px solid rgba(28,26,23,0.12)' }}>
        <h2 className="font-serif font-normal tracking-tight mb-2"
          style={{ fontSize: '30px', color: 'var(--ink)', letterSpacing: '-0.5px' }}>
          {recipe.dish_name}
        </h2>

        <div className="flex flex-wrap gap-2 mb-3">
          {recipe.tags?.map(tag => (
            <span key={tag} className="text-xs px-3 py-1 rounded-full"
              style={{ border: '0.5px solid rgba(28,26,23,0.2)', color: '#4A4640', background: '#F7F3EC' }}>
              {tag}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap gap-4 text-sm" style={{ color: '#9A9590' }}>
          {recipe.servings && <span>Serves {recipe.servings}</span>}
          {recipe.prep_time && <span>{recipe.prep_time} prep</span>}
          {recipe.cook_time && <span>{recipe.cook_time} cook</span>}
          {recipe.difficulty && (
            <span className="px-2 py-0.5 rounded text-xs font-medium"
              style={{
                background: recipe.difficulty === 'Easy' ? '#EAF2EC' : recipe.difficulty === 'Hard' ? '#FEF2F2' : '#FBF0E4',
                color: recipe.difficulty === 'Easy' ? '#2D5A3D' : recipe.difficulty === 'Hard' ? '#991B1B' : '#92400E',
              }}>
              {recipe.difficulty}
            </span>
          )}
        </div>
      </div>

      {/* Macros */}
      {recipe.macros_per_serving && <MacroStrip macros={recipe.macros_per_serving} />}

      {/* Body */}
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Ingredients */}
        <div className="px-7 py-6" style={{ borderRight: '0.5px solid rgba(28,26,23,0.12)' }}>
          <p className="uppercase tracking-widest text-xs font-medium mb-4"
            style={{ color: '#9A9590', letterSpacing: '0.08em' }}>
            Ingredients
          </p>
          <ul className="space-y-0">
            {recipe.ingredients?.map((ing, i) => (
              <li key={i} className="flex justify-between items-baseline py-2.5 text-sm"
                style={{ borderBottom: '0.5px solid rgba(28,26,23,0.08)' }}>
                <span style={{ color: 'var(--ink)' }}>{ing.name}</span>
                <span className="ml-4 shrink-0 font-light" style={{ color: '#9A9590' }}>{ing.amount}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Steps */}
        <div className="px-7 py-6">
          <p className="uppercase tracking-widest text-xs font-medium mb-4"
            style={{ color: '#9A9590', letterSpacing: '0.08em' }}>
            Steps
          </p>
          <ol className="space-y-0">
            {recipe.steps?.map((step, i) => (
              <li key={i} className="flex gap-3 py-2.5 text-sm items-start"
                style={{ borderBottom: '0.5px solid rgba(28,26,23,0.08)', color: '#4A4640', lineHeight: '1.55' }}>
                <span className="shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-medium mt-0.5"
                  style={{ background: '#EAF2EC', color: '#2D5A3D' }}>
                  {i + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* Footer */}
      <div className="px-7 py-4 flex items-center justify-between"
        style={{ borderTop: '0.5px solid rgba(28,26,23,0.12)' }}>
        <button onClick={onReset}
          className="text-sm px-4 py-2 rounded-lg transition-all"
          style={{ border: '0.5px solid rgba(28,26,23,0.2)', color: '#4A4640' }}>
          Scan another dish
        </button>
        <p className="text-xs" style={{ color: '#9A9590' }}>
          Want meal planning?{' '}
          <a href="#" className="font-medium" style={{ color: '#C8762A' }}>
            Upgrade to Pro →
          </a>
        </p>
      </div>
    </div>
  )
}
