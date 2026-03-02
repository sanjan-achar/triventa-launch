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
  const [confettiBurstId, setConfettiBurstId] = useState(0)
  const hasTriggeredConfetti = useRef(false)
  const confettiTimerRef = useRef(null)

  const confettiPieces = useMemo(() => {
    const palette = ['#FF4D6D', '#FFD93D', '#6EEB83', '#00C2FF', '#9B5DE5', '#F15BB5', '#FF8C42', '#2EC4B6', '#FFFFFF']

    return Array.from({ length: 180 }, (_, index) => ({
      id: index,
      left: Math.random() * 100,
      delay: Math.random() * 1,
      duration: 2.8 + Math.random() * 2.4,
      drift: -220 + Math.random() * 440,
      color: palette[Math.floor(Math.random() * palette.length)],
      rotate: Math.random() * 360,
    }))
  }, [confettiBurstId])

  useEffect(() => {
    const timer = window.setInterval(() => {
      setTimeLeft(getTimeLeft())
    }, 1000)

    return () => {
      window.clearInterval(timer)
      if (confettiTimerRef.current) {
        window.clearTimeout(confettiTimerRef.current)
      }
    }
  }, [])

  const triggerConfetti = () => {
    setConfettiBurstId((prev) => prev + 1)
    setShowConfetti(true)

    if (confettiTimerRef.current) {
      window.clearTimeout(confettiTimerRef.current)
    }

    confettiTimerRef.current = window.setTimeout(() => {
      setShowConfetti(false)
    }, 5200)
  }

  useEffect(() => {
    if (timeLeft.totalMs === 0 && !hasTriggeredConfetti.current) {
      hasTriggeredConfetti.current = true
      triggerConfetti()
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
        <h1 className="brand-text">Triventa Exports</h1>
        <p className="tagline">Your Gateway to Global Market</p>
        <p className="hero-subtitle">Premium Coffee Beans Sourced Directly from Karnataka's Finest Farmers</p>

        <div
          className="event-timer"
          role="button"
          tabIndex={0}
          aria-label="Going live countdown. Click to test confetti"
          onClick={triggerConfetti}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault()
              triggerConfetti()
            }
          }}
        >
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
