import { useState, useCallback } from 'react'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import Dashboard from './components/Dashboard.jsx'
import SGPACalculator from './components/SGPACalculator.jsx'
import CGPACalculator from './components/CGPACalculator.jsx'
import PercentageCalculator from './components/PercentageCalculator.jsx'
import GradePredictor from './components/GradePredictor.jsx'
import About from './components/About.jsx'
import Footer from './components/Footer.jsx'

function App() {
  const [sgpa, setSgpa] = useState(0)
  const [cgpa, setCgpa] = useState(0)
  const [percentage, setPercentage] = useState(0)

  const handleSgpaChange = useCallback((value) => {
    setSgpa(value)
  }, [])

  const handleCgpaChange = useCallback((value) => {
    setCgpa(value)
    const pct = value > 0 ? ((value - 0.75) * 10) : 0
    setPercentage(Math.max(0, pct))
  }, [])

  const handlePercentageChange = useCallback((value) => {
    setPercentage(value)
  }, [])

  return (
    <div className="min-h-screen bg-dark-950 bg-mesh">
      <div className="bg-grid min-h-screen">
        <Navbar />
        <Hero />
        <Dashboard sgpa={sgpa} cgpa={cgpa} percentage={percentage} />
        <SGPACalculator onSgpaChange={handleSgpaChange} />
        <CGPACalculator onCgpaChange={handleCgpaChange} />
        <PercentageCalculator onPercentageChange={handlePercentageChange} />
        <GradePredictor />
        <About />
        <Footer />
      </div>
    </div>
  )
}

export default App
