import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
  try {
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { data, error } = await supabase
      .from('user_skills')
      .select(`
        skill_id,
        level,
        skills (
          name
        )
      `)
      .eq('user_id', user.id)

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    const skills = data?.map(item => ({
      id: item.skill_id,
      name: item.skills?.[0].name,
      level: item.level
    })) || []

    return NextResponse.json({ skills })
  } catch (error) {
    console.error('Get user skills error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const { skillId, level } = await request.json()

    if (!skillId || !level) {
      return NextResponse.json(
        { error: 'Skill ID and level are required' },
        { status: 400 }
      )
    }

    if (!['beginner', 'intermediate', 'advanced'].includes(level)) {
      return NextResponse.json(
        { error: 'Invalid skill level' },
        { status: 400 }
      )
    }

    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { data, error } = await supabase
      .from('user_skills')
      .insert({
        user_id: user.id,
        skill_id: skillId,
        level
      })
      .select(`
        skill_id,
        level,
        skills (
          name
        )
      `)
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({
      skill: {
        id: data.skill_id,
        name: data.skills?.[0].name,
        level: data.level
      }
    }, { status: 201 })
  } catch (error) {
    console.error('Add user skill error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { skillId, level } = await request.json()

    if (!skillId || !level) {
      return NextResponse.json(
        { error: 'Skill ID and level are required' },
        { status: 400 }
      )
    }

    if (!['beginner', 'intermediate', 'advanced'].includes(level)) {
      return NextResponse.json(
        { error: 'Invalid skill level' },
        { status: 400 }
      )
    }

    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { data, error } = await supabase
      .from('user_skills')
      .update({ level })
      .eq('user_id', user.id)
      .eq('skill_id', skillId)
      .select(`
        skill_id,
        level,
        skills (
          name
        )
      `)
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({
      skill: {
        id: data.skill_id,
        name: data.skills?.[0].name,
        level: data.level
      }
    })
  } catch (error) {
    console.error('Update user skill error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const skillId = searchParams.get('skillId')

    if (!skillId) {
      return NextResponse.json(
        { error: 'Skill ID is required' },
        { status: 400 }
      )
    }

    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { error } = await supabase
      .from('user_skills')
      .delete()
      .eq('user_id', user.id)
      .eq('skill_id', skillId)

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ message: 'Skill removed successfully' })
  } catch (error) {
    console.error('Delete user skill error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
