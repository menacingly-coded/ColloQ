import Image from 'next/image'

export function Footer() {
  return (
    <footer className="bg-white border-t border-border py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div>
            <a href="/" className="flex items-center mb-4">
              <Image
                src="/colloq-logo.png"
                alt="ColloQ"
                width={100}
                height={33}
                className="h-8 w-auto"
              />
            </a>
            <p className="text-sm text-foreground/60">
              Find your perfect team. Build amazing things together.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Product</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-foreground/60 hover:text-foreground transition-colors">Features</a></li>
              <li><a href="#" className="text-sm text-foreground/60 hover:text-foreground transition-colors">Pricing</a></li>
              <li><a href="#" className="text-sm text-foreground/60 hover:text-foreground transition-colors">Security</a></li>
              <li><a href="#" className="text-sm text-foreground/60 hover:text-foreground transition-colors">Roadmap</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Company</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-foreground/60 hover:text-foreground transition-colors">About</a></li>
              <li><a href="#" className="text-sm text-foreground/60 hover:text-foreground transition-colors">Blog</a></li>
              <li><a href="#" className="text-sm text-foreground/60 hover:text-foreground transition-colors">Careers</a></li>
              <li><a href="#" className="text-sm text-foreground/60 hover:text-foreground transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-foreground/60 hover:text-foreground transition-colors">Privacy</a></li>
              <li><a href="#" className="text-sm text-foreground/60 hover:text-foreground transition-colors">Terms</a></li>
              <li><a href="#" className="text-sm text-foreground/60 hover:text-foreground transition-colors">Cookies</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <p className="text-sm text-foreground/50">
              © 2026 ColloQ. All rights reserved.
            </p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="text-foreground/50 hover:text-foreground transition-colors">
                <span className="text-sm">Twitter</span>
              </a>
              <a href="#" className="text-foreground/50 hover:text-foreground transition-colors">
                <span className="text-sm">LinkedIn</span>
              </a>
              <a href="#" className="text-foreground/50 hover:text-foreground transition-colors">
                <span className="text-sm">GitHub</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
