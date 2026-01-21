import { Button } from '@/components/ui/button'

export function Hero() {
  return (
    <section className="pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-block mb-6 px-4 py-2 bg-secondary rounded-full border border-border">
          <span className="text-sm text-foreground/70">✨ Welcome to the future of team building</span>
        </div>

        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight mb-6 text-balance">
          Find your perfect team in minutes
        </h1>

        <p className="text-lg md:text-xl text-foreground/60 mb-10 leading-relaxed max-w-2xl mx-auto text-balance">
          ColloQ connects you with the right teammates based on skills, experience, and goals. Start your startup, side project, or productivity journey today.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 font-semibold">
            Start for free
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="border-primary text-primary hover:bg-primary/10 px-8 bg-transparent"
          >
            Watch demo
          </Button>
        </div>

        <div className="mt-16 pt-12 border-t border-border">
          <p className="text-sm text-foreground/50 mb-8">Trusted by innovators from</p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
            <div className="text-foreground/40 font-semibold">Acme</div>
            <div className="text-foreground/40 font-semibold">Stellar</div>
            <div className="text-foreground/40 font-semibold">Nexus</div>
            <div className="text-foreground/40 font-semibold">Forge</div>
            <div className="text-foreground/40 font-semibold">Prime</div>
          </div>
        </div>
      </div>
    </section>
  )
}
