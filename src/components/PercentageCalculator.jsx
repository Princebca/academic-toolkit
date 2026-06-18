import { useState } from 'react'
import { HiCalculator, HiTrendingUp, HiSwitchHorizontal } from 'react-icons/hi'

export default function PercentageCalculator({ onPercentageChange }) {
  const [inputValue, setInputValue] = useState('')
  const [mode, setMode] = useState('cgpa-to-percent')
  const [result, setResult] = useState(null)

  const calculate = () => {
    const val = parseFloat(inputValue)

    if (isNaN(val)) {
      setResult({ error: true })
      return
    }

    if (mode === 'cgpa-to-percent') {
      if (val < 0 || val > 10) {
        setResult({ error: true, message: 'CGPA must be between 0 and 10.' })
        return
      }
      const percentage = (val - 0.75) * 10
      const clampedPercentage = Math.max(0, percentage)
      setResult({
        error: false,
        input: val.toFixed(2),
        inputLabel: 'CGPA/SGPA',
        output: clampedPercentage.toFixed(2),
        outputLabel: 'Percentage',
        suffix: '%',
      })
      onPercentageChange(clampedPercentage)
    } else {
      if (val < 0 || val > 100) {
        setResult({ error: true, message: 'Percentage must be between 0 and 100.' })
        return
      }
      const cgpa = (val / 10) + 0.75
      const clampedCgpa = Math.min(10, Math.max(0, cgpa))
      setResult({
        error: false,
        input: val.toFixed(2),
        inputLabel: 'Percentage',
        output: clampedCgpa.toFixed(2),
        outputLabel: 'CGPA Equivalent',
        suffix: '',
      })
    }
  }

  const toggleMode = () => {
    setMode(mode === 'cgpa-to-percent' ? 'percent-to-cgpa' : 'cgpa-to-percent')
    setInputValue('')
    setResult(null)
  }

  const resetAll = () => {
    setInputValue('')
    setResult(null)
  }

  return (
    <section id="percentage" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-violet-500/20 bg-violet-500/5 mb-4">
            <HiTrendingUp className="w-4 h-4 text-violet-400" />
            <span className="text-sm font-medium text-violet-300">Quick Conversion</span>
          </div>
          <h2 className="section-title">Percentage Converter</h2>
          <p className="section-subtitle">
            Convert between CGPA/SGPA and Percentage using the standard formula: Percentage = (CGPA − 0.75) × 10
          </p>
        </div>

        {/* Calculator Card */}
        <div className="glass-card p-6 md:p-8 max-w-xl mx-auto">
          {/* Mode Toggle */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className={`text-sm font-medium transition-colors ${mode === 'cgpa-to-percent' ? 'text-primary-400' : 'text-dark-500'}`}>
              CGPA → %
            </span>
            <button
              onClick={toggleMode}
              className="w-14 h-8 rounded-full bg-dark-800 border border-dark-700 flex items-center px-1 transition-all duration-300 hover:border-primary-500/30"
              id="toggle-mode-btn"
            >
              <div className={`w-6 h-6 rounded-full bg-gradient-to-br from-primary-500 to-cyan-400 shadow-lg shadow-primary-500/30 transition-transform duration-300 flex items-center justify-center ${
                mode === 'percent-to-cgpa' ? 'translate-x-6' : ''
              }`}>
                <HiSwitchHorizontal className="w-3 h-3 text-white" />
              </div>
            </button>
            <span className={`text-sm font-medium transition-colors ${mode === 'percent-to-cgpa' ? 'text-primary-400' : 'text-dark-500'}`}>
              % → CGPA
            </span>
          </div>

          {/* Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-dark-300 mb-2">
              {mode === 'cgpa-to-percent' ? 'Enter CGPA or SGPA' : 'Enter Percentage'}
            </label>
            <input
              type="number"
              placeholder={mode === 'cgpa-to-percent' ? 'e.g., 8.5' : 'e.g., 78.5'}
              min="0"
              max={mode === 'cgpa-to-percent' ? '10' : '100'}
              step="0.01"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="input-field text-lg"
              id="percentage-input"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={calculate}
              className="btn-primary flex items-center justify-center gap-2 flex-1"
              id="convert-percentage-btn"
            >
              <HiCalculator className="w-5 h-5" />
              Convert
            </button>
            <button
              onClick={resetAll}
              className="btn-secondary px-6"
              id="reset-percentage-btn"
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
                  <p className="text-sm mt-1 text-dark-400">{result.message || 'Please enter a valid number.'}</p>
                </div>
              ) : (
                <div className="text-center">
                  <div className="flex items-center justify-center gap-6">
                    <div>
                      <div className="text-2xl font-bold text-dark-300">{result.input}</div>
                      <div className="text-xs text-dark-500 mt-1 uppercase tracking-wider">{result.inputLabel}</div>
                    </div>
                    <div className="text-primary-500 text-2xl">→</div>
                    <div>
                      <div className="text-3xl font-extrabold gradient-text">
                        {result.output}{result.suffix}
                      </div>
                      <div className="text-xs text-dark-500 mt-1 uppercase tracking-wider">{result.outputLabel}</div>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-dark-800/50">
                    <p className="text-xs text-dark-500">
                      Formula: {mode === 'cgpa-to-percent'
                        ? `(${result.input} − 0.75) × 10 = ${result.output}%`
                        : `(${result.input} ÷ 10) + 0.75 = ${result.output}`
                      }
                    </p>
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
