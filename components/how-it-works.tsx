export function HowItWorks() {
  const steps = [
    {
      number: '01',
      title: 'Create your profile',
      description: 'Tell us about your skills, experience level, and what you\'re looking to build.'
    },
    {
      number: '02',
      title: 'Get matched',
      description: 'Our algorithm finds teammates who share your vision and complement your skills.'
    },
    {
      number: '03',
      title: 'Meet and plan',
      description: 'Use ColloQ\'s huddle tools to discuss ideas and outline your project together.'
    },
    {
      number: '04',
      title: 'Build together',
      description: 'Collaborate in real-time with integrated tools, tracking, and communication.'
    }
  ]

  return (
    <section id="how-it-works" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            How ColloQ works
          </h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
            Four simple steps to find your team and start building something great.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-[50%] w-full h-0.5 bg-gradient-to-r from-primary/40 to-transparent" />
              )}

              <div className="relative z-10 bg-background p-8 rounded-2xl border border-border h-full flex flex-col">
                <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center mb-6 flex-shrink-0">
                  <span className="text-primary-foreground font-bold text-lg">{step.number}</span>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {step.title}
                </h3>
                <p className="text-foreground/60 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
