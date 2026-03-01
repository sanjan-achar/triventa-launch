import { useEffect, useMemo, useRef, useState } from 'react'

const countdownTarget = new Date(2026, 2, 6, 7, 30, 0)

const getTimeLeft = () => {
  const difference = countdownTarget.getTime() - Date.now()

  if (difference <= 0) {
    return { totalMs: 0, days: 0, hours: 0, minutes: 0, seconds: 0 }
  }

  return {
    totalMs: difference,
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / (1000 * 60)) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  }
}

export default function Hero() {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft)
  const [showConfetti, setShowConfetti] = useState(false)
  const hasTriggeredConfetti = useRef(false)

  const confettiPieces = useMemo(() => {
    const palette = ['var(--white)', 'var(--accent-color)', 'var(--primary-color)', 'var(--secondary-color)']

    return Array.from({ length: 80 }, (_, index) => ({
      id: index,
      left: Math.random() * 100,
      delay: Math.random() * 0.8,
      duration: 2.4 + Math.random() * 1.8,
      drift: -120 + Math.random() * 240,
      color: palette[Math.floor(Math.random() * palette.length)],
      rotate: Math.random() * 360,
    }))
  }, [])

  useEffect(() => {
    const timer = window.setInterval(() => {
      setTimeLeft(getTimeLeft())
    }, 1000)

    return () => window.clearInterval(timer)
  }, [])

  useEffect(() => {
    if (timeLeft.totalMs === 0 && !hasTriggeredConfetti.current) {
      hasTriggeredConfetti.current = true
      setShowConfetti(true)

      const hideConfetti = window.setTimeout(() => {
        setShowConfetti(false)
      }, 4500)

      return () => window.clearTimeout(hideConfetti)
    }
  }, [timeLeft.totalMs])

  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="home" className="hero">
      {showConfetti && (
        <div className="confetti-layer" aria-hidden="true">
          {confettiPieces.map((piece) => (
            <span
              key={piece.id}
              className="confetti-piece"
              style={{
                '--confetti-left': `${piece.left}%`,
                '--confetti-delay': `${piece.delay}s`,
                '--confetti-duration': `${piece.duration}s`,
                '--confetti-drift': `${piece.drift}px`,
                '--confetti-color': piece.color,
                '--confetti-rotate': `${piece.rotate}deg`,
              }}
            />
          ))}
        </div>
      )}

      <div className="hero-content">
        <h1>Triventa Exports</h1>
        <p className="tagline">Your Gateway to Global Market</p>
        <p className="hero-subtitle">Premium Coffee Beans Sourced Directly from Karnataka's Finest Farmers</p>

        <div className="event-timer" role="status" aria-live="polite">
          <p className="timer-label">Going live in</p>
          {timeLeft.totalMs > 0 ? (
            <div className="timer-grid">
              <div className="timer-cell">
                <span className="timer-value">{String(timeLeft.days).padStart(2, '0')}</span>
                <span className="timer-unit">Days</span>
              </div>
              <div className="timer-cell">
                <span className="timer-value">{String(timeLeft.hours).padStart(2, '0')}</span>
                <span className="timer-unit">Hours</span>
              </div>
              <div className="timer-cell">
                <span className="timer-value">{String(timeLeft.minutes).padStart(2, '0')}</span>
                <span className="timer-unit">Min</span>
              </div>
              <div className="timer-cell">
                <span className="timer-value">{String(timeLeft.seconds).padStart(2, '0')}</span>
                <span className="timer-unit">Sec</span>
              </div>
            </div>
          ) : (
            <p className="timer-ended">Countdown completed 🎉</p>
          )}
        </div>

        <div className="cta-buttons">
          <button className="btn btn-primary" onClick={() => scrollToSection('contact')}>
            Get in Touch
          </button>
          <button className="btn btn-secondary" onClick={() => scrollToSection('products')}>
            Learn More
          </button>
          <a href="/brochure.pdf" download="Triventa-Exports-Brochure.pdf" className="btn btn-download">
            <i className="fas fa-download"></i> Download Brochure
          </a>
        </div>
      </div>
    </section>
  )
}
