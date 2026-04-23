export interface Macros {
  calories: number
  protein_g: number
  carbs_g: number
  fat_g: number
}

export interface Ingredient {
  name: string
  amount: string
}

export interface Recipe {
  dish_name: string
  cuisine: string
  difficulty: 'Easy' | 'Medium' | 'Hard'
  prep_time: string
  cook_time: string
  servings: number
  tags: string[]
  macros_per_serving: Macros
  ingredients: Ingredient[]
  steps: string[]
}

export type ScanState = 'idle' | 'uploading' | 'scanning' | 'done' | 'error'
