import { useState } from 'react'
import { HiPlus, HiTrash, HiCalculator, HiAcademicCap } from 'react-icons/hi'

const GRADES = [
  { label: 'O (Outstanding)', value: 10 },
  { label: 'A+ (Excellent)', value: 9 },
  { label: 'A (Very Good)', value: 8 },
  { label: 'B+ (Good)', value: 7 },
  { label: 'B (Above Average)', value: 6 },
  { label: 'C (Average)', value: 5 },
  { label: 'F (Fail)', value: 0 },
]

const createSubject = () => ({
  id: Date.now() + Math.random(),
  name: '',
  credits: '',
  grade: '',
})

export default function SGPACalculator({ onSgpaChange }) {
  const [subjects, setSubjects] = useState([createSubject(), createSubject(), createSubject()])
  const [result, setResult] = useState(null)

  const addSubject = () => {
    setSubjects([...subjects, createSubject()])
  }

  const removeSubject = (id) => {
    if (subjects.length > 1) {
      setSubjects(subjects.filter((s) => s.id !== id))
    }
  }

  const updateSubject = (id, field, value) => {
    setSubjects(subjects.map((s) => (s.id === id ? { ...s, [field]: value } : s)))
  }

  const calculateSGPA = () => {
    let totalCredits = 0
    let totalGradePoints = 0
    let valid = true

    for (const subject of subjects) {
      const credits = parseFloat(subject.credits)
      const grade = parseFloat(subject.grade)

      if (isNaN(credits) || credits <= 0 || subject.grade === '') {
        valid = false
        break
      }

      totalCredits += credits
      totalGradePoints += credits * grade
    }

    if (!valid || totalCredits === 0) {
      setResult({ error: true })
      return
    }

    const sgpa = totalGradePoints / totalCredits

    setResult({
      error: false,
      totalCredits,
      totalGradePoints,
      sgpa,
    })

    onSgpaChange(sgpa)
  }

  const resetAll = () => {
    setSubjects([createSubject(), createSubject(), createSubject()])
    setResult(null)
    onSgpaChange(0)
  }

  return (
    <section id="sgpa" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary-500/20 bg-primary-500/5 mb-4">
            <HiCalculator className="w-4 h-4 text-primary-400" />
            <span className="text-sm font-medium text-primary-300">Semester Performance</span>
          </div>
          <h2 className="section-title">SGPA Calculator</h2>
          <p className="section-subtitle">
            Add your subjects with credits and grades to calculate your Semester Grade Point Average.
          </p>
        </div>

        {/* Calculator Card */}
        <div className="glass-card p-6 md:p-8">
          {/* Subjects List */}
          <div className="space-y-4 mb-6">
            {subjects.map((subject, index) => (
              <div
                key={subject.id}
                className="flex flex-col sm:flex-row gap-3 p-4 rounded-xl bg-dark-950/50 border border-dark-800/50 animate-fade-in"
              >
                {/* Subject Number Badge */}
                <div className="flex items-center justify-center sm:justify-start">
                  <span className="w-8 h-8 rounded-lg bg-primary-500/10 border border-primary-500/20 flex items-center justify-center text-sm font-bold text-primary-400">
                    {index + 1}
                  </span>
                </div>

                {/* Subject Name */}
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Subject Name"
                    value={subject.name}
                    onChange={(e) => updateSubject(subject.id, 'name', e.target.value)}
                    className="input-field"
                    id={`subject-name-${index}`}
                  />
                </div>

                {/* Credits */}
                <div className="w-full sm:w-28">
                  <input
                    type="number"
                    placeholder="Credits"
                    min="1"
                    max="10"
                    value={subject.credits}
                    onChange={(e) => updateSubject(subject.id, 'credits', e.target.value)}
                    className="input-field"
                    id={`subject-credits-${index}`}
                  />
                </div>

                {/* Grade */}
                <div className="w-full sm:w-48">
                  <select
                    value={subject.grade}
                    onChange={(e) => updateSubject(subject.id, 'grade', e.target.value)}
                    className="select-field"
                    id={`subject-grade-${index}`}
                  >
                    <option value="">Select Grade</option>
                    {GRADES.map((g) => (
                      <option key={g.value} value={g.value}>
                        {g.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Remove Button */}
                <button
                  onClick={() => removeSubject(subject.id)}
                  className="btn-danger flex items-center justify-center gap-1 sm:w-auto"
                  disabled={subjects.length <= 1}
                  id={`remove-subject-${index}`}
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
              onClick={addSubject}
              className="btn-secondary flex items-center justify-center gap-2"
              id="add-subject-btn"
            >
              <HiPlus className="w-5 h-5" />
              Add Subject
            </button>
            <button
              onClick={calculateSGPA}
              className="btn-primary flex items-center justify-center gap-2 flex-1"
              id="calculate-sgpa-btn"
            >
              <HiCalculator className="w-5 h-5" />
              Calculate SGPA
            </button>
            <button
              onClick={resetAll}
              className="btn-danger px-6 py-3 text-base flex items-center justify-center gap-2"
              id="reset-sgpa-btn"
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
                  <p className="text-sm mt-1 text-dark-400">Please fill in all credits and select grades for each subject.</p>
                </div>
              ) : (
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-primary-500/20">
                      <HiAcademicCap className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">SGPA Result</h3>
                      <p className="text-sm text-dark-400">Semester Grade Point Average</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-dark-950/50 rounded-xl p-4 text-center border border-dark-800/50">
                      <div className="text-2xl font-bold text-primary-400">{result.totalCredits}</div>
                      <div className="text-xs text-dark-400 mt-1 uppercase tracking-wider">Total Credits</div>
                    </div>
                    <div className="bg-dark-950/50 rounded-xl p-4 text-center border border-dark-800/50">
                      <div className="text-2xl font-bold text-blue-400">{result.totalGradePoints.toFixed(1)}</div>
                      <div className="text-xs text-dark-400 mt-1 uppercase tracking-wider">Total Grade Points</div>
                    </div>
                    <div className="bg-dark-950/50 rounded-xl p-4 text-center border border-primary-500/30">
                      <div className="text-3xl font-extrabold gradient-text">{result.sgpa.toFixed(2)}</div>
                      <div className="text-xs text-dark-400 mt-1 uppercase tracking-wider">Your SGPA</div>
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
