import { Button } from '@/components/ui/button'

export function CTA() {
  return (
    <section className="py-20 px-6 bg-background">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
          Ready to find your team?
        </h2>
        <p className="text-lg text-foreground/60 mb-10 max-w-2xl mx-auto">
          Join hundreds of builders, founders, and innovators who are already creating amazing things together on ColloQ.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 font-semibold">
            Get started free
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="border-primary text-primary hover:bg-primary/10 px-8 bg-transparent"
          >
            Schedule a demo
          </Button>
        </div>

        <p className="mt-8 text-sm text-foreground/50">
          No credit card required. Start matching with teammates in minutes.
        </p>
      </div>
    </section>
  )
}
