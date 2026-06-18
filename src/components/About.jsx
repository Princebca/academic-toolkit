import { HiAcademicCap, HiCode, HiHeart, HiLightningBolt, HiShieldCheck, HiGlobe, HiCalculator } from 'react-icons/hi'

export default function About() {
  const features = [
    {
      icon: HiCalculator,
      title: 'Precise Calculations',
      desc: 'Accurate SGPA and CGPA calculations using standard academic formulas.',
    },
    {
      icon: HiLightningBolt,
      title: 'Instant Results',
      desc: 'Get real-time results without any server calls or API dependencies.',
    },
    {
      icon: HiShieldCheck,
      title: 'Privacy First',
      desc: 'All calculations happen locally. Your data never leaves your browser.',
    },
    {
      icon: HiGlobe,
      title: 'Works Everywhere',
      desc: 'Fully responsive design that works on desktop, tablet, and mobile.',
    },
  ]

  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 mb-4">
            <HiHeart className="w-4 h-4 text-emerald-400" />
            <span className="text-sm font-medium text-emerald-300">About This Tool</span>
          </div>
          <h2 className="section-title">About Academic Toolkit</h2>
          <p className="section-subtitle">
            A free, open-source academic calculator designed to help college students
            track and improve their academic performance.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
          {features.map((feat, i) => (
            <div key={i} className="glass-card-hover p-6 group">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500/20 to-emerald-700/20 flex items-center justify-center mb-4 group-hover:from-emerald-500/30 group-hover:to-emerald-700/30 transition-all duration-300">
                <feat.icon className="w-6 h-6 text-emerald-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{feat.title}</h3>
              <p className="text-sm text-dark-400 leading-relaxed">{feat.desc}</p>
            </div>
          ))}
        </div>

        {/* Developer Info Card */}
        <div className="glass-card p-8 text-center max-w-lg mx-auto">
          <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-primary-500 to-indigo-500 flex items-center justify-center mb-4 shadow-lg shadow-primary-500/20">
            <HiCode className="w-10 h-10 text-white" />
          </div>
          <h3 className="text-xl font-bold text-white mb-1">Developed by</h3>
          <p className="text-lg font-semibold gradient-text mb-1">Prince Biswakarma</p>
          <a
            href="mailto:bishwakarmaprince081@gmail.com"
            className="text-sm text-dark-400 hover:text-primary-400 transition-colors duration-300"
          >
            bishwakarmaprince081@gmail.com
          </a>
          <div className="mt-6 pt-6 border-t border-dark-800/50">
            <a
              href="https://digitalheroesco.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center gap-2 px-6 py-3"
              id="digital-heroes-about-btn"
            >
              <HiAcademicCap className="w-5 h-5" />
              Built for Digital Heroes
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
