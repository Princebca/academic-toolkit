import { HiAcademicCap, HiCalculator, HiChartBar, HiLightningBolt } from 'react-icons/hi'

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary-500/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/8 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-600/5 rounded-full blur-3xl animate-pulse-slow" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary-500/20 bg-primary-500/5 mb-8 animate-fade-in">
          <div className="w-2 h-2 rounded-full bg-primary-400 animate-pulse" />
          <span className="text-sm font-medium text-primary-300">Free Academic Calculator for Students</span>
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold leading-tight mb-6 animate-slide-up">
          <span className="text-white">Your Complete</span>
          <br />
          <span className="gradient-text">Academic Toolkit</span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl text-dark-400 max-w-2xl mx-auto mb-10 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          Calculate SGPA, CGPA, convert to percentage, and predict your academic performance — 
          all in one powerful, free tool designed for college students.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <a href="#sgpa" className="btn-primary text-lg px-8 py-4 flex items-center gap-2">
            <HiCalculator className="w-5 h-5" />
            Start Calculating
          </a>
          <a href="#dashboard" className="btn-secondary text-lg px-8 py-4 flex items-center gap-2">
            <HiChartBar className="w-5 h-5" />
            View Dashboard
          </a>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-slide-up" style={{ animationDelay: '0.3s' }}>
          {[
            { icon: HiCalculator, label: 'SGPA Calculator', desc: 'Semester GPA' },
            { icon: HiChartBar, label: 'CGPA Calculator', desc: 'Cumulative GPA' },
            { icon: HiLightningBolt, label: 'Percentage', desc: 'Quick Convert' },
            { icon: HiAcademicCap, label: 'Grade Predictor', desc: 'Target Planner' },
          ].map((item, i) => (
            <div
              key={i}
              className="glass-card-hover p-4 md:p-6 group cursor-pointer"
            >
              <div className="w-12 h-12 mx-auto rounded-xl bg-gradient-to-br from-primary-500/20 to-primary-700/20 flex items-center justify-center mb-3 group-hover:from-primary-500/30 group-hover:to-primary-700/30 transition-all duration-300">
                <item.icon className="w-6 h-6 text-primary-400" />
              </div>
              <h3 className="text-sm md:text-base font-semibold text-white mb-1">{item.label}</h3>
              <p className="text-xs md:text-sm text-dark-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-dark-950 to-transparent pointer-events-none" />
    </section>
  )
}
