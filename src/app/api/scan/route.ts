import { NextRequest, NextResponse } from 'next/server'
import { RECIPE_PROMPT } from '@/lib/prompt'
import { Recipe } from '@/lib/types'

export const maxDuration = 30

export async function POST(req: NextRequest) {
  const apiKey = process.env.OPENROUTER_API_KEY
  if (!apiKey) {
    return NextResponse.json({ error: 'API key not configured on server.' }, { status: 500 })
  }

  let body: { image: string; mimeType: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  const { image, mimeType } = body
  if (!image || !mimeType) {
    return NextResponse.json({ error: 'Missing image or mimeType.' }, { status: 400 })
  }

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
        'X-Title': 'SnapRecipe',
      },
      body: JSON.stringify({
        model: 'openrouter/free',
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'image_url',
                image_url: {
                  url: `data:${mimeType};base64,${image}`,
                },
              },
              {
                type: 'text',
                text: RECIPE_PROMPT,
              },
            ],
          },
        ],
        temperature: 0.3,
        max_tokens: 1500,
      }),
    })

    if (!response.ok) {
      const err = await response.json()
      console.error('OpenRouter error:', err)
      return NextResponse.json(
        { error: err.error?.message || 'AI service error. Please try again.' },
        { status: response.status }
      )
    }

    const data = await response.json()
    let raw = data.choices?.[0]?.message?.content || ''
    raw = raw.replace(/```json|```/g, '').trim()

    let recipe: Recipe
    try {
      recipe = JSON.parse(raw)
    } catch {
      console.error('Failed to parse recipe JSON:', raw)
      return NextResponse.json({ error: 'Could not parse recipe from AI response. Try a clearer food photo.' }, { status: 422 })
    }

    return NextResponse.json({ recipe })
  } catch (err) {
    console.error('Scan error:', err)
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 })
  }
}
