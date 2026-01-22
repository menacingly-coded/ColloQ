import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { requireTeamMember, requireTeamAdmin } from '@/lib/auth'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const teamId = params.id

    // Require team membership
    await requireTeamMember(teamId)

    const { data, error } = await supabase
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
        ),
        team_members (
          user_id,
          role,
          joined_at,
          users (
            id,
            name,
            bio
          )
        )
      `)
      .eq('id', teamId)
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // Transform data
    const team = {
      ...data,
      members: data.team_members?.map((member: any) => ({
        id: member.user_id,
        name: member.users?.name,
        bio: member.users?.bio,
        role: member.role,
        joinedAt: member.joined_at
      })) || []
    }

    delete team.team_members

    return NextResponse.json({ team })
  } catch (error: any) {
    console.error('Get team error:', error)
    if (error.message.includes('Unauthorized')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    if (error.message.includes('Forbidden')) {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 })
    }
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const teamId = params.id
    const { name, description, goal } = await request.json()

    // Require admin access
    await requireTeamAdmin(teamId)

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

    const { data, error } = await supabase
      .from('teams')
      .update({
        name,
        description,
        goal
      })
      .eq('id', teamId)
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ team: data })
  } catch (error: any) {
    console.error('Update team error:', error)
    if (error.message.includes('Unauthorized')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    if (error.message.includes('Forbidden')) {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 })
    }
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
