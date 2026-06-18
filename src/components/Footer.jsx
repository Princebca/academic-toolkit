import { HiAcademicCap, HiHeart, HiMail } from 'react-icons/hi'

const quickLinks = [
  { name: 'SGPA Calculator', href: '#sgpa' },
  { name: 'CGPA Calculator', href: '#cgpa' },
  { name: 'Percentage Converter', href: '#percentage' },
  { name: 'Grade Predictor', href: '#predictor' },
]

const resourceLinks = [
  { name: 'Dashboard', href: '#dashboard' },
  { name: 'About', href: '#about' },
  { name: 'Home', href: '#home' },
]

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative border-t border-dark-800/50">
      {/* Glow Effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-px bg-gradient-to-r from-transparent via-primary-500/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand Column */}
          <div className="md:col-span-2">
            <a href="#home" className="flex items-center gap-2 mb-4 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-lg shadow-primary-500/20">
                <HiAcademicCap className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold">
                <span className="text-white">Academic</span>
                <span className="gradient-text"> Toolkit</span>
              </span>
            </a>
            <p className="text-dark-400 text-sm leading-relaxed mb-4 max-w-sm">
              A comprehensive academic performance calculator for college students.
              Calculate SGPA, CGPA, convert to percentage, and predict grades — all for free.
            </p>

            {/* Developer Info */}
            <div className="space-y-2 mb-6">
              <p className="text-sm font-semibold text-white">Prince Bishwakarma</p>
              <a
                href="mailto:your-email@example.com"
                className="flex items-center gap-2 text-sm text-dark-400 hover:text-primary-400 transition-colors duration-300"
              >
                <HiMail className="w-4 h-4" />
                your-email@example.com
              </a>
            </div>

            {/* Digital Heroes Button */}
            <a
              href="https://digitalheroesco.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center gap-2 text-sm px-5 py-2.5"
              id="digital-heroes-footer-btn"
            >
              <HiHeart className="w-4 h-4" />
              Built for Digital Heroes
            </a>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Calculators
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-dark-400 hover:text-primary-400 transition-colors duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Resources
            </h3>
            <ul className="space-y-3">
              {resourceLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-dark-400 hover:text-primary-400 transition-colors duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-dark-800/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-dark-500">
            © {currentYear} Academic Toolkit. All rights reserved.
          </p>
          <p className="text-sm text-dark-500 flex items-center gap-1">
            Made with <HiHeart className="w-4 h-4 text-red-400" /> by Prince Bishwakarma
          </p>
        </div>
      </div>
    </footer>
  )
}
