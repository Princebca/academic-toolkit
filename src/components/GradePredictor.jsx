import { useState } from 'react'
import { HiCalculator, HiLightningBolt, HiArrowUp, HiArrowDown, HiCheckCircle } from 'react-icons/hi'

export default function GradePredictor() {
  const [targetSGPA, setTargetSGPA] = useState('')
  const [currentSGPA, setCurrentSGPA] = useState('')
  const [creditsCompleted, setCreditsCompleted] = useState('')
  const [upcomingCredits, setUpcomingCredits] = useState('')
  const [result, setResult] = useState(null)

  const predict = () => {
    const target = parseFloat(targetSGPA)
    const current = parseFloat(currentSGPA)
    const completed = parseFloat(creditsCompleted)
    const upcoming = parseFloat(upcomingCredits)

    if (
      isNaN(target) || isNaN(current) || isNaN(completed) || isNaN(upcoming) ||
      target < 0 || target > 10 ||
      current < 0 || current > 10 ||
      completed <= 0 || upcoming <= 0
    ) {
      setResult({ error: true })
      return
    }

    // Target CGPA = (current_total_points + required_points) / (completed + upcoming)
    // target * (completed + upcoming) = current * completed + required_sgpa * upcoming
    // required_sgpa = (target * (completed + upcoming) - current * completed) / upcoming

    const totalCredits = completed + upcoming
    const currentTotalPoints = current * completed
    const targetTotalPoints = target * totalCredits
    const requiredPoints = targetTotalPoints - currentTotalPoints
    const requiredSGPA = requiredPoints / upcoming

    const isAchievable = requiredSGPA <= 10 && requiredSGPA >= 0
    const difficulty = requiredSGPA >= 9 ? 'Very Hard' :
                       requiredSGPA >= 8 ? 'Challenging' :
                       requiredSGPA >= 7 ? 'Moderate' :
                       requiredSGPA >= 5 ? 'Easy' : 'Very Easy'

    const difficultyColor = requiredSGPA >= 9 ? 'text-red-400' :
                            requiredSGPA >= 8 ? 'text-amber-400' :
                            requiredSGPA >= 7 ? 'text-yellow-400' :
                            'text-emerald-400'

    setResult({
      error: false,
      requiredSGPA: Math.max(0, requiredSGPA),
      isAchievable,
      difficulty,
      difficultyColor,
      target,
      current,
      totalCredits,
      gap: target - current,
    })
  }

  const resetAll = () => {
    setTargetSGPA('')
    setCurrentSGPA('')
    setCreditsCompleted('')
    setUpcomingCredits('')
    setResult(null)
  }

  return (
    <section id="predictor" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-amber-500/20 bg-amber-500/5 mb-4">
            <HiLightningBolt className="w-4 h-4 text-amber-400" />
            <span className="text-sm font-medium text-amber-300">Performance Planner</span>
          </div>
          <h2 className="section-title">Grade Predictor</h2>
          <p className="section-subtitle">
            Find out the required SGPA in your upcoming semester to achieve your target CGPA.
          </p>
        </div>

        {/* Calculator Card */}
        <div className="glass-card p-6 md:p-8 max-w-xl mx-auto">
          <div className="space-y-5">
            {/* Target SGPA */}
            <div>
              <label className="block text-sm font-medium text-dark-300 mb-2">
                🎯 Target CGPA
              </label>
              <input
                type="number"
                placeholder="e.g., 8.5"
                min="0"
                max="10"
                step="0.01"
                value={targetSGPA}
                onChange={(e) => setTargetSGPA(e.target.value)}
                className="input-field"
                id="target-sgpa-input"
              />
            </div>

            {/* Current SGPA */}
            <div>
              <label className="block text-sm font-medium text-dark-300 mb-2">
                📊 Current CGPA
              </label>
              <input
                type="number"
                placeholder="e.g., 7.8"
                min="0"
                max="10"
                step="0.01"
                value={currentSGPA}
                onChange={(e) => setCurrentSGPA(e.target.value)}
                className="input-field"
                id="current-sgpa-input"
              />
            </div>

            {/* Credits Completed */}
            <div>
              <label className="block text-sm font-medium text-dark-300 mb-2">
                📚 Credits Completed
              </label>
              <input
                type="number"
                placeholder="e.g., 120"
                min="1"
                value={creditsCompleted}
                onChange={(e) => setCreditsCompleted(e.target.value)}
                className="input-field"
                id="credits-completed-input"
              />
            </div>

            {/* Upcoming Credits */}
            <div>
              <label className="block text-sm font-medium text-dark-300 mb-2">
                📅 Upcoming Semester Credits
              </label>
              <input
                type="number"
                placeholder="e.g., 24"
                min="1"
                value={upcomingCredits}
                onChange={(e) => setUpcomingCredits(e.target.value)}
                className="input-field"
                id="upcoming-credits-input"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mt-6">
            <button
              onClick={predict}
              className="btn-primary flex items-center justify-center gap-2 flex-1"
              id="predict-grade-btn"
            >
              <HiLightningBolt className="w-5 h-5" />
              Predict
            </button>
            <button
              onClick={resetAll}
              className="btn-secondary px-6"
              id="reset-predictor-btn"
            >
              Reset
            </button>
          </div>

          {/* Result */}
          {result && (
            <div className="result-box animate-slide-up mt-6">
              {result.error ? (
                <div className="text-center text-red-400">
                  <p className="text-lg font-semibold">⚠️ Invalid Input</p>
                  <p className="text-sm mt-1 text-dark-400">Please fill in all fields with valid values.</p>
                </div>
              ) : (
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-400 flex items-center justify-center shadow-lg shadow-amber-500/20">
                      <HiLightningBolt className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">Prediction Result</h3>
                      <p className="text-sm text-dark-400">Based on your academic data</p>
                    </div>
                  </div>

                  {/* Main Result */}
                  <div className="bg-dark-950/50 rounded-xl p-6 text-center border border-amber-500/20 mb-4">
                    {result.isAchievable ? (
                      <>
                        <div className="text-sm text-dark-400 mb-2">Required Semester SGPA</div>
                        <div className="text-4xl font-extrabold gradient-text mb-2">
                          {result.requiredSGPA.toFixed(2)}
                        </div>
                        <div className={`text-sm font-semibold ${result.difficultyColor}`}>
                          Difficulty: {result.difficulty}
                        </div>
                      </>
                    ) : (
                      <div className="text-red-400">
                        <p className="text-lg font-semibold">❌ Not Achievable</p>
                        <p className="text-sm mt-1 text-dark-400">
                          The required SGPA of {result.requiredSGPA.toFixed(2)} exceeds the maximum possible (10.0).
                          Consider adjusting your target.
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Details Grid */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-dark-950/50 rounded-xl p-3 text-center border border-dark-800/50">
                      <div className="flex items-center justify-center gap-1 text-sm text-dark-400 mb-1">
                        <HiArrowUp className="w-3 h-3 text-primary-400" />
                        Target
                      </div>
                      <div className="text-lg font-bold text-white">{result.target.toFixed(2)}</div>
                    </div>
                    <div className="bg-dark-950/50 rounded-xl p-3 text-center border border-dark-800/50">
                      <div className="flex items-center justify-center gap-1 text-sm text-dark-400 mb-1">
                        <HiArrowDown className="w-3 h-3 text-blue-400" />
                        Current
                      </div>
                      <div className="text-lg font-bold text-white">{result.current.toFixed(2)}</div>
                    </div>
                    <div className="bg-dark-950/50 rounded-xl p-3 text-center border border-dark-800/50">
                      <div className="flex items-center justify-center gap-1 text-sm text-dark-400 mb-1">
                        <HiCheckCircle className="w-3 h-3 text-emerald-400" />
                        Gap
                      </div>
                      <div className={`text-lg font-bold ${result.gap > 0 ? 'text-amber-400' : 'text-emerald-400'}`}>
                        {result.gap > 0 ? '+' : ''}{result.gap.toFixed(2)}
                      </div>
                    </div>
                    <div className="bg-dark-950/50 rounded-xl p-3 text-center border border-dark-800/50">
                      <div className="flex items-center justify-center gap-1 text-sm text-dark-400 mb-1">
                        <HiCalculator className="w-3 h-3 text-violet-400" />
                        Total Credits
                      </div>
                      <div className="text-lg font-bold text-white">{result.totalCredits}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
