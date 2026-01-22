import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const goal = searchParams.get('goal')
    const skill = searchParams.get('skill')

    let query = supabase
      .from('teams')
      .select(`
        id,
        name,
        description,
        goal,
        created_at,
        creator:users!inner (
          id,
          name
        )
      `)
      .order('created_at', { ascending: false })

    if (goal) {
      query = query.eq('goal', goal)
    }

    if (skill) {
      // Filter teams that require the specified skill
      // This would need a more complex query in a real implementation
      // For MVP, we'll skip skill filtering for simplicity
    }

    const { data, error } = await query

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ teams: data })
  } catch (error) {
    console.error('Get teams error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const { name, description, goal, requiredSkills } = await request.json()

    if (!name || !goal) {
      return NextResponse.json(
        { error: 'Name and goal are required' },
        { status: 400 }
      )
    }

    if (!['startup', 'hackathon', 'learning', 'productivity'].includes(goal)) {
      return NextResponse.json(
        { error: 'Invalid goal' },
        { status: 400 }
      )
    }

    // Get current user
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Create team
    const { data: team, error: teamError } = await supabase
      .from('teams')
      .insert({
        name,
        description,
        goal,
        creator_id: user.id
      })
      .select()
      .single()

    if (teamError) {
      return NextResponse.json({ error: teamError.message }, { status: 500 })
    }

    // Add creator as admin member
    const { error: memberError } = await supabase
      .from('team_members')
      .insert({
        team_id: team.id,
        user_id: user.id,
        role: 'admin'
      })

    if (memberError) {
      return NextResponse.json({ error: memberError.message }, { status: 500 })
    }

    return NextResponse.json({ team }, { status: 201 })
  } catch (error) {
    console.error('Create team error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
