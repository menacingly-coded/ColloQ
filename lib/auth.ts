import { supabase } from './supabase'

export async function getCurrentUser() {
  const { data: { user }, error } = await supabase.auth.getUser()
  if (error || !user) return null
  return user
}

export async function requireAuth() {
  const user = await getCurrentUser()
  if (!user) {
    throw new Error('Unauthorized')
  }
  return user
}

export async function requireTeamAdmin(teamId: string) {
  const user = await requireAuth()

  const { data, error } = await supabase
    .from('team_members')
    .select('role')
    .eq('team_id', teamId)
    .eq('user_id', user.id)
    .single()

  if (error || !data || data.role !== 'admin') {
    throw new Error('Forbidden: Admin access required')
  }

  return user
}

export async function requireTeamMember(teamId: string) {
  const user = await requireAuth()

  const { data, error } = await supabase
    .from('team_members')
    .select('id')
    .eq('team_id', teamId)
    .eq('user_id', user.id)
    .single()

  if (error || !data) {
    throw new Error('Forbidden: Team membership required')
  }

  return user
}

export async function getUserRole(teamId: string, userId: string) {
  const { data, error } = await supabase
    .from('team_members')
    .select('role')
    .eq('team_id', teamId)
    .eq('user_id', userId)
    .single()

  if (error || !data) return null
  return data.role
}
