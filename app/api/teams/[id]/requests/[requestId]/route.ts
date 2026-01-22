import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { requireTeamAdmin } from '@/lib/auth'

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string; requestId: string } }
) {
  try {
    const teamId = params.id
    const requestId = params.requestId
    const { action } = await request.json() // 'accept' or 'reject'

    if (!['accept', 'reject'].includes(action)) {
      return NextResponse.json(
        { error: 'Invalid action. Must be "accept" or "reject"' },
        { status: 400 }
      )
    }

    // Require admin access
    await requireTeamAdmin(teamId)

    // Get the join request
    const { data: joinRequest, error: requestError } = await supabase
      .from('join_requests')
      .select('user_id, status')
      .eq('id', requestId)
      .eq('team_id', teamId)
      .single()

    if (requestError || !joinRequest) {
      return NextResponse.json(
        { error: 'Join request not found' },
        { status: 404 }
      )
    }

    if (joinRequest.status !== 'pending') {
      return NextResponse.json(
        { error: 'Request has already been processed' },
        { status: 400 }
      )
    }

    const newStatus = action === 'accept' ? 'accepted' : 'rejected'

    // Update the join request
    const { error: updateError } = await supabase
      .from('join_requests')
      .update({
        status: newStatus,
        responded_at: new Date().toISOString()
      })
      .eq('id', requestId)

    if (updateError) {
      return NextResponse.json({ error: updateError.message }, { status: 500 })
    }

    // If accepting, add user to team as member
    if (action === 'accept') {
      const { error: memberError } = await supabase
        .from('team_members')
        .insert({
          team_id: teamId,
          user_id: joinRequest.user_id,
          role: 'member'
        })

      if (memberError) {
        return NextResponse.json({ error: memberError.message }, { status: 500 })
      }
    }

    return NextResponse.json({
      message: `Join request ${newStatus} successfully`
    })
  } catch (error: any) {
    console.error('Process join request error:', error)
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
