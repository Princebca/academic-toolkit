import { HiAcademicCap, HiChartBar, HiTrendingUp, HiStar } from 'react-icons/hi'

function getAcademicStatus(cgpa) {
  if (cgpa >= 9) return { text: 'Excellent', color: 'text-emerald-400', bg: 'from-emerald-500/20 to-emerald-700/20', border: 'border-emerald-500/30' }
  if (cgpa >= 8) return { text: 'Very Good', color: 'text-blue-400', bg: 'from-blue-500/20 to-blue-700/20', border: 'border-blue-500/30' }
  if (cgpa >= 7) return { text: 'Good', color: 'text-primary-400', bg: 'from-primary-500/20 to-primary-700/20', border: 'border-primary-500/30' }
  if (cgpa >= 6) return { text: 'Average', color: 'text-amber-400', bg: 'from-amber-500/20 to-amber-700/20', border: 'border-amber-500/30' }
  return { text: 'Needs Improvement', color: 'text-red-400', bg: 'from-red-500/20 to-red-700/20', border: 'border-red-500/30' }
}

export default function Dashboard({ sgpa, cgpa, percentage }) {
  const status = getAcademicStatus(cgpa)

  const stats = [
    {
      icon: HiAcademicCap,
      label: 'Current SGPA',
      value: sgpa > 0 ? sgpa.toFixed(2) : '—',
      gradient: 'from-primary-500 to-cyan-400',
      shadow: 'shadow-primary-500/20',
    },
    {
      icon: HiChartBar,
      label: 'Current CGPA',
      value: cgpa > 0 ? cgpa.toFixed(2) : '—',
      gradient: 'from-blue-500 to-indigo-400',
      shadow: 'shadow-blue-500/20',
    },
    {
      icon: HiTrendingUp,
      label: 'Percentage',
      value: percentage > 0 ? `${percentage.toFixed(2)}%` : '—',
      gradient: 'from-violet-500 to-purple-400',
      shadow: 'shadow-violet-500/20',
    },
    {
      icon: HiStar,
      label: 'Academic Status',
      value: cgpa > 0 ? status.text : '—',
      gradient: cgpa >= 8 ? 'from-emerald-500 to-green-400' : cgpa >= 6 ? 'from-amber-500 to-yellow-400' : 'from-red-500 to-rose-400',
      shadow: cgpa >= 8 ? 'shadow-emerald-500/20' : cgpa >= 6 ? 'shadow-amber-500/20' : 'shadow-red-500/20',
    },
  ]

  return (
    <section id="dashboard" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="section-title">Academic Dashboard</h2>
          <p className="section-subtitle">
            Your academic performance at a glance. Calculate below to update the dashboard.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <div
              key={i}
              className={`stat-card group`}
            >
              {/* Icon */}
              <div className={`w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center mb-4 shadow-lg ${stat.shadow} group-hover:scale-110 transition-transform duration-300`}>
                <stat.icon className="w-7 h-7 text-white" />
              </div>

              {/* Value */}
              <div className={`text-3xl font-bold mb-2 ${
                stat.label === 'Academic Status' && cgpa > 0 ? status.color : 'text-white'
              }`}>
                {stat.value}
              </div>

              {/* Label */}
              <div className="text-sm font-medium text-dark-400 uppercase tracking-wider">
                {stat.label}
              </div>

              {/* Decorative line */}
              <div className={`mt-4 h-1 w-12 mx-auto rounded-full bg-gradient-to-r ${stat.gradient} opacity-50 group-hover:w-20 group-hover:opacity-100 transition-all duration-500`} />
            </div>
          ))}
        </div>

        {/* Info Banner */}
        {cgpa === 0 && (
          <div className="mt-8 glass-card p-4 text-center border-primary-500/20">
            <p className="text-dark-400 text-sm">
              <span className="text-primary-400 font-medium">💡 Tip:</span> Use the calculators below to compute your SGPA and CGPA. The dashboard will update automatically.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
