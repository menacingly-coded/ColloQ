export function Features() {
  const features = [
    {
      icon: '🔍',
      title: 'Smart matching',
      description: 'AI-powered algorithm finds teammates that match your skills and goals perfectly.'
    },
    {
      icon: '📅',
      title: 'Seamless scheduling',
      description: 'Built-in calendar and huddle tools to keep your team aligned and productive.'
    },
    {
      icon: '🚀',
      title: 'Instant collaboration',
      description: 'Start working together right away with integrated project management tools.'
    },
    {
      icon: '🎯',
      title: 'Goal tracking',
      description: 'Set milestones and track progress with your team in real-time dashboards.'
    },
    {
      icon: '💬',
      title: 'Team communication',
      description: 'Everything in one place: messaging, calls, and workspace organization.'
    },
    {
      icon: '✅',
      title: 'Accountability built-in',
      description: 'Track tasks, deadlines, and contributions to keep everyone on the same page.'
    }
  ]

  return (
    <section id="features" className="py-20 px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            Everything you need to build great things together
          </h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
            ColloQ combines team discovery, scheduling, and collaboration tools in one elegant platform.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl border border-border hover:border-accent transition-colors"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-foreground/60 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
