import { useState } from 'react'
import { HiPlus, HiTrash, HiCalculator, HiChartBar } from 'react-icons/hi'

const createSemester = () => ({
  id: Date.now() + Math.random(),
  sgpa: '',
})

export default function CGPACalculator({ onCgpaChange }) {
  const [semesters, setSemesters] = useState([createSemester(), createSemester()])
  const [result, setResult] = useState(null)

  const addSemester = () => {
    setSemesters([...semesters, createSemester()])
  }

  const removeSemester = (id) => {
    if (semesters.length > 1) {
      setSemesters(semesters.filter((s) => s.id !== id))
    }
  }

  const updateSemester = (id, value) => {
    setSemesters(semesters.map((s) => (s.id === id ? { ...s, sgpa: value } : s)))
  }

  const calculateCGPA = () => {
    let total = 0
    let count = 0
    let valid = true

    for (const sem of semesters) {
      const val = parseFloat(sem.sgpa)
      if (isNaN(val) || val < 0 || val > 10) {
        valid = false
        break
      }
      total += val
      count++
    }

    if (!valid || count === 0) {
      setResult({ error: true })
      return
    }

    const cgpa = total / count
    setResult({ error: false, semesters: count, cgpa })
    onCgpaChange(cgpa)
  }

  const resetAll = () => {
    setSemesters([createSemester(), createSemester()])
    setResult(null)
    onCgpaChange(0)
  }

  return (
    <section id="cgpa" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/20 bg-blue-500/5 mb-4">
            <HiChartBar className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-medium text-blue-300">Cumulative Performance</span>
          </div>
          <h2 className="section-title">CGPA Calculator</h2>
          <p className="section-subtitle">
            Enter your SGPA for each semester to calculate your Cumulative Grade Point Average.
          </p>
        </div>

        {/* Calculator Card */}
        <div className="glass-card p-6 md:p-8">
          {/* Semester List */}
          <div className="space-y-4 mb-6">
            {semesters.map((sem, index) => (
              <div
                key={sem.id}
                className="flex flex-col sm:flex-row gap-3 items-center p-4 rounded-xl bg-dark-950/50 border border-dark-800/50 animate-fade-in"
              >
                {/* Semester Badge */}
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <span className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-sm font-bold text-blue-400 shrink-0">
                    {index + 1}
                  </span>
                  <span className="text-sm font-medium text-dark-300 sm:hidden">Semester {index + 1}</span>
                </div>

                {/* Semester Label (Desktop) */}
                <span className="hidden sm:block text-sm font-medium text-dark-300 w-28">
                  Semester {index + 1}
                </span>

                {/* SGPA Input */}
                <div className="flex-1 w-full">
                  <input
                    type="number"
                    placeholder="Enter SGPA (0-10)"
                    min="0"
                    max="10"
                    step="0.01"
                    value={sem.sgpa}
                    onChange={(e) => updateSemester(sem.id, e.target.value)}
                    className="input-field"
                    id={`semester-sgpa-${index}`}
                  />
                </div>

                {/* Remove Button */}
                <button
                  onClick={() => removeSemester(sem.id)}
                  className="btn-danger flex items-center justify-center gap-1 w-full sm:w-auto"
                  disabled={semesters.length <= 1}
                  id={`remove-semester-${index}`}
                >
                  <HiTrash className="w-4 h-4" />
                  <span className="sm:hidden">Remove</span>
                </button>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={addSemester}
              className="btn-secondary flex items-center justify-center gap-2"
              id="add-semester-btn"
            >
              <HiPlus className="w-5 h-5" />
              Add Semester
            </button>
            <button
              onClick={calculateCGPA}
              className="btn-primary flex items-center justify-center gap-2 flex-1"
              id="calculate-cgpa-btn"
            >
              <HiCalculator className="w-5 h-5" />
              Calculate CGPA
            </button>
            <button
              onClick={resetAll}
              className="btn-danger px-6 py-3 text-base flex items-center justify-center gap-2"
              id="reset-cgpa-btn"
            >
              <HiTrash className="w-4 h-4" />
              Reset
            </button>
          </div>

          {/* Result */}
          {result && (
            <div className="result-box animate-slide-up">
              {result.error ? (
                <div className="text-center text-red-400">
                  <p className="text-lg font-semibold">⚠️ Invalid Input</p>
                  <p className="text-sm mt-1 text-dark-400">Please enter valid SGPA values (0-10) for all semesters.</p>
                </div>
              ) : (
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-400 flex items-center justify-center shadow-lg shadow-blue-500/20">
                      <HiChartBar className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">CGPA Result</h3>
                      <p className="text-sm text-dark-400">Cumulative Grade Point Average</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-dark-950/50 rounded-xl p-4 text-center border border-dark-800/50">
                      <div className="text-2xl font-bold text-blue-400">{result.semesters}</div>
                      <div className="text-xs text-dark-400 mt-1 uppercase tracking-wider">Number of Semesters</div>
                    </div>
                    <div className="bg-dark-950/50 rounded-xl p-4 text-center border border-blue-500/30">
                      <div className="text-3xl font-extrabold gradient-text">{result.cgpa.toFixed(2)}</div>
                      <div className="text-xs text-dark-400 mt-1 uppercase tracking-wider">Your CGPA</div>
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
