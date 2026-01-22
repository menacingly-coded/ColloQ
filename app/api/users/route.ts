import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const skill = searchParams.get('skill')
    const availability = searchParams.get('availability')

    let query = supabase
      .from('users')
      .select(`
        id,
        name,
        bio,
        availability,
        goals,
        user_skills (
          skill_id,
          level,
          skills (
            name
          )
        )
      `)

    if (availability === 'true') {
      query = query.eq('availability', true)
    }

    const { data, error } = await query

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // Transform the data to flatten skills
    let users = data?.map(user => ({
      ...user,
      skills: user.user_skills?.map((us: any) => ({
        id: us.skill_id,
        name: us.skills?.name,
        level: us.level
      })) || []
    })) || []

    // Filter by skill on the client side if specified
    if (skill) {
      users = users.filter(user =>
        user.skills.some((s: any) => s.name && s.name.toLowerCase().includes(skill.toLowerCase()))
      )
    }

    return NextResponse.json({ users })
  } catch (error) {
    console.error('Search users error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
