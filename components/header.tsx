import { Button } from '@/components/ui/button'
import Image from 'next/image'

export function Header() {
  return (
    <header className="fixed top-0 w-full bg-primary z-50">
      <nav className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        <a href="/" className="flex items-center">
          <Image
            src="/colloq-logo.png"
            alt="ColloQ"
            width={120}
            height={40}
            className="h-10 w-auto"
            priority
          />
        </a>
        
        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-white/80 hover:text-white transition-colors text-sm">
            Features
          </a>
          <a href="#how-it-works" className="text-white/80 hover:text-white transition-colors text-sm">
            How it works
          </a>
          <a href="#" className="text-white/80 hover:text-white transition-colors text-sm">
            Pricing
          </a>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" className="hidden sm:inline-flex text-white hover:bg-white/20">
            Log in
          </Button>
          <Button size="sm" className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold">
            Get started free
          </Button>
        </div>
      </nav>
    </header>
  )
}
