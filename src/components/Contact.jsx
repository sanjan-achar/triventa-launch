import { useEffect, useMemo, useRef, useState } from 'react'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  })
  const [submitStatus, setSubmitStatus] = useState({
    type: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPopup, setShowPopup] = useState(false)
  const [showFormConfetti, setShowFormConfetti] = useState(false)
  const [confettiOrigin, setConfettiOrigin] = useState({ x: 0, y: 0 })
  const [confettiBurstId, setConfettiBurstId] = useState(0)
  const popupTimerRef = useRef(null)
  const confettiTimerRef = useRef(null)
  const statusTimerRef = useRef(null)
  const submitButtonRef = useRef(null)
  const formCardRef = useRef(null)

  const confettiPieces = useMemo(() => {
    const palette = ['#FFFFFF', '#F7D9C5', '#8C1D2F', '#6B1F2A', '#E8D4C0']

    return Array.from({ length: 60 }, (_, index) => {
      const horizontalSpread = (Math.random() - 0.5) * 300
      const verticalSpread = (Math.random() - 0.45) * 320

      return {
        id: index,
        x: horizontalSpread,
        y: verticalSpread,
        lift: 90 + Math.random() * 85,
        size: 9 + Math.random() * 10,
        rotate: Math.random() * 360,
        duration: 1300 + Math.random() * 900,
        delay: Math.random() * 160,
        color: palette[Math.floor(Math.random() * palette.length)]
      }
    })
  }, [])

  useEffect(() => {
    return () => {
      if (popupTimerRef.current) {
        window.clearTimeout(popupTimerRef.current)
      }
      if (confettiTimerRef.current) {
        window.clearTimeout(confettiTimerRef.current)
      }
      if (statusTimerRef.current) {
        window.clearTimeout(statusTimerRef.current)
      }
    }
  }, [])

  const showTimedStatus = (status) => {
    setSubmitStatus(status)

    if (statusTimerRef.current) {
      window.clearTimeout(statusTimerRef.current)
    }

    statusTimerRef.current = window.setTimeout(() => {
      setSubmitStatus({ type: '', message: '' })
    }, 5000)
  }

  const launchButtonConfetti = () => {
    const button = submitButtonRef.current
    const card = formCardRef.current

    if (button && card) {
      const cardRect = card.getBoundingClientRect()
      const rect = button.getBoundingClientRect()
      setConfettiOrigin({
        x: rect.left - cardRect.left + rect.width / 2,
        y: rect.top - cardRect.top + rect.height / 2
      })
    } else {
      setConfettiOrigin({ x: 180, y: 280 })
    }

    setConfettiBurstId(prev => prev + 1)
    setShowFormConfetti(true)

    if (confettiTimerRef.current) {
      window.clearTimeout(confettiTimerRef.current)
    }

    confettiTimerRef.current = window.setTimeout(() => {
      setShowFormConfetti(false)
    }, 2600)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const cleanedData = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      company: formData.company.trim(),
      message: formData.message.trim()
    }

    if (!cleanedData.name || !cleanedData.email || !cleanedData.phone || !cleanedData.company || !cleanedData.message) {
      showTimedStatus({
        type: 'error',
        message: 'Please fill all fields before sending your message.'
      })
      return
    }

    setIsSubmitting(true)

    const payload = new URLSearchParams({
      'form-name': 'contact',
      ...cleanedData,
      'bot-field': ''
    }).toString()

    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: payload
    })
      .then(() => {
        showTimedStatus({
          type: 'success',
          message: 'Thank you! Your message has been sent successfully.'
        })
        launchButtonConfetti()
        setShowPopup(true)
        if (popupTimerRef.current) {
          window.clearTimeout(popupTimerRef.current)
        }
        popupTimerRef.current = window.setTimeout(() => {
          setShowPopup(false)
        }, 5000)
        setFormData({ name: '', email: '', phone: '', company: '', message: '' })
      })
      .catch(() => {
        showTimedStatus({
          type: 'error',
          message: 'Submission failed. Please try again or email info@triventaexports.com.'
        })
      })
      .finally(() => {
        setIsSubmitting(false)
      })
  }

  return (
    <section id="contact" className="contact contact-full">
      <img
        src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?q=80&w=1600&auto=format&fit=crop"
        alt="Coffee plantation contact background"
        className="contact-full-image"
      />
      <div className="contact-full-overlay"></div>
      <div className="container">
        <h2>Get in Touch</h2>
        <div className="contact-content">
          <div className="contact-info-section">
            <h3>Contact Information</h3>
            <div className="contact-info">
            <div className="info-item">
              <i className="fas fa-map-marker-alt"></i>
              <div>
                <h4>Address</h4>
                <p>Mangalore Karnataka India</p>
              </div>
            </div>
            <div className="info-item">
              <i className="fas fa-phone"></i>
              <div>
                <h4>Phone</h4>
                <p>+91 91480 25018</p>
              </div>
            </div>
            <div className="info-item">
              <i className="fas fa-envelope"></i>
              <div>
                <h4>Email</h4>
                <p>info@triventaexports.com</p>
              </div>
            </div>
            <div className="info-item">
              <i className="fas fa-clock"></i>
              <div>
                <h4>Business Hours</h4>
                <p>Mon - Fri: 9:00 AM - 6:00 PM IST</p>
              </div>
            </div>
            <div className="info-item">
              <i className="fas fa-id-card"></i>
              <div>
                <h4>Business IDs</h4>
                <p>GSTIN: 29ABCDE1234F1Z5</p>
                <p>CIN: U15490KA2024PTC123456</p>
              </div>
            </div>
          </div>
          </div>
          <div className="contact-card contact-form-card" ref={formCardRef}>
            <h3>Send us a Message</h3>
            <form
              className="contact-form"
              name="contact"
              method="POST"
              data-netlify="true"
              data-netlify-honeypot="bot-field"
              onSubmit={handleSubmit}
            >
            <input type="hidden" name="form-name" value="contact" />
            <input type="hidden" name="bot-field" />
            <input 
              type="text" 
              name="name" 
              placeholder="Your Name" 
              value={formData.name}
              onChange={handleChange}
              required 
            />
            <input 
              type="email" 
              name="email" 
              placeholder="Your Email" 
              value={formData.email}
              onChange={handleChange}
              required 
            />
            <input 
              type="tel" 
              name="phone" 
              placeholder="Phone Number" 
              value={formData.phone}
              onChange={handleChange}
              pattern="[0-9+\-\s()]{7,20}"
              title="Please enter a valid phone number"
              required 
            />
            <input 
              type="text" 
              name="company" 
              placeholder="Company Name" 
              value={formData.company}
              onChange={handleChange}
              required 
            />
            <textarea 
              name="message" 
              placeholder="Your Message" 
              rows="5" 
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
            <button ref={submitButtonRef} type="submit" className="btn btn-download" disabled={isSubmitting}>
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
            {submitStatus.message && (
              <p className={`form-status ${submitStatus.type}`} role="status" aria-live="polite">
                {submitStatus.message}
              </p>
            )}
            </form>

            {showFormConfetti && (
              <div className="form-confetti-overlay" aria-hidden="true" key={confettiBurstId}>
                {confettiPieces.map(piece => (
                  <span
                    key={piece.id}
                    className="form-confetti-piece"
                    style={{
                      '--burst-x': `${confettiOrigin.x}px`,
                      '--burst-y': `${confettiOrigin.y}px`,
                      '--piece-x': `${piece.x}px`,
                      '--piece-y': `${piece.y}px`,
                      '--piece-lift': `${piece.lift}px`,
                      '--piece-size': `${piece.size}px`,
                      '--piece-color': piece.color,
                      '--piece-rotate': `${piece.rotate}deg`,
                      '--piece-duration': `${piece.duration}ms`,
                      '--piece-delay': `${piece.delay}ms`
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {showPopup && (
        <div className="request-popup" role="status" aria-live="polite">
          Your request has been received.
        </div>
      )}
    </section>
  )
}
