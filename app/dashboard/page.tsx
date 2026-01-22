'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Plus, Users, Search, Settings } from 'lucide-react'

interface User {
  id: string
  name: string
  bio?: string
  availability: boolean
  skills: Array<{
    id: string
    name: string
    level: string
  }>
}

interface Team {
  id: string
  name: string
  description?: string
  goal: string
  creator: {
    id: string
    name: string
  }
}

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null)
  const [teams, setTeams] = useState<Team[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)

  const fetchUserProfile = async () => {
    try {
      const response = await fetch('/api/users/me')
      if (response.ok) {
        const data = await response.json()
        setUser(data.user)
      }
    } catch (error) {
      console.error('Failed to fetch user profile:', error)
    }
  }

  const fetchTeams = async () => {
    try {
      const response = await fetch('/api/teams')
      if (response.ok) {
        const data = await response.json()
        setTeams(data.teams)
      }
    } catch (error) {
      console.error('Failed to fetch teams:', error)
    }
  }

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/users')
      if (response.ok) {
        const data = await response.json()
        setUsers(data.users)
      }
    } catch (error) {
      console.error('Failed to fetch users:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUserProfile()
    fetchTeams()
    fetchUsers()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold text-gray-900">ColloQ Dashboard</h1>
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
              <Button variant="outline" size="sm">
                Log out
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="teams">Teams</TabsTrigger>
            <TabsTrigger value="discover">Discover</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Welcome Section */}
            <Card>
              <CardHeader>
                <CardTitle>Welcome back, {user?.name}!</CardTitle>
                <CardDescription>
                  Ready to find your perfect team or collaborate on exciting projects?
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4">
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Create Team
                  </Button>
                  <Button variant="outline">
                    <Search className="h-4 w-4 mr-2" />
                    Find Teammates
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">My Teams</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">0</div>
                  <p className="text-xs text-muted-foreground">Active teams</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Skills</CardTitle>
                  <Search className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{user?.skills?.length || 0}</div>
                  <p className="text-xs text-muted-foreground">Skills listed</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Availability</CardTitle>
                  <div className={`h-2 w-2 rounded-full ${user?.availability ? 'bg-green-500' : 'bg-red-500'}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {user?.availability ? 'Available' : 'Busy'}
                  </div>
                  <p className="text-xs text-muted-foreground">For new projects</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="teams" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">My Teams</h2>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create New Team
              </Button>
            </div>

            {teams.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Users className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No teams yet</h3>
                  <p className="text-muted-foreground text-center mb-4">
                    Create your first team or join an existing one to get started.
                  </p>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Create Team
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {teams.map((team) => (
                  <Card key={team.id} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        {team.name}
                        <Badge variant="secondary">{team.goal}</Badge>
                      </CardTitle>
                      <CardDescription>{team.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        Created by {team.creator.name}
                      </p>
                      <Button variant="outline" className="w-full">
                        View Team
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="discover" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Discover People</h2>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  Filter by Skills
                </Button>
                <Button variant="outline" size="sm">
                  Available Only
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {users.slice(0, 6).map((person) => (
                <Card key={person.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={`/placeholder-user.jpg`} />
                        <AvatarFallback>{person.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg">{person.name}</CardTitle>
                        <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                          person.availability
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {person.availability ? 'Available' : 'Busy'}
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {person.bio && (
                      <p className="text-sm text-muted-foreground mb-3">{person.bio}</p>
                    )}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {person.skills.slice(0, 3).map((skill) => (
                        <Badge key={skill.id} variant="outline" className="text-xs">
                          {skill.name} ({skill.level})
                        </Badge>
                      ))}
                      {person.skills.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{person.skills.length - 3} more
                        </Badge>
                      )}
                    </div>
                    <Button variant="outline" className="w-full">
                      View Profile
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>My Profile</CardTitle>
                <CardDescription>Manage your profile and skills</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={`/placeholder-user.jpg`} />
                    <AvatarFallback className="text-2xl">{user?.name?.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-xl font-semibold">{user?.name}</h3>
                    <p className="text-muted-foreground">{user?.bio || 'No bio added yet'}</p>
                    <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm mt-2 ${
                      user?.availability
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {user?.availability ? 'Available for projects' : 'Currently busy'}
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Skills ({user?.skills?.length || 0})</h4>
                  <div className="flex flex-wrap gap-2">
                    {user?.skills?.map((skill) => (
                      <Badge key={skill.id} className="px-3 py-1">
                        {skill.name} - {skill.level}
                      </Badge>
                    )) || (
                      <p className="text-muted-foreground">No skills added yet</p>
                    )}
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button>Edit Profile</Button>
                  <Button variant="outline">Manage Skills</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
