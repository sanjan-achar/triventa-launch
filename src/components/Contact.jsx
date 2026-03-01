import { useEffect, useRef, useState } from 'react'

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
  const popupTimerRef = useRef(null)

  useEffect(() => {
    return () => {
      if (popupTimerRef.current) {
        window.clearTimeout(popupTimerRef.current)
      }
    }
  }, [])

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
      setSubmitStatus({
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
        setSubmitStatus({
          type: 'success',
          message: 'Thank you! Your message has been sent successfully.'
        })
        setShowPopup(true)
        if (popupTimerRef.current) {
          window.clearTimeout(popupTimerRef.current)
        }
        popupTimerRef.current = window.setTimeout(() => {
          setShowPopup(false)
        }, 3200)
        setFormData({ name: '', email: '', phone: '', company: '', message: '' })
      })
      .catch(() => {
        setSubmitStatus({
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
          </div>
          </div>
          <div className="contact-card contact-form-card">
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
            <button type="submit" className="btn btn-download" disabled={isSubmitting}>
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
            {submitStatus.message && (
              <p className={`form-status ${submitStatus.type}`} role="status" aria-live="polite">
                {submitStatus.message}
              </p>
            )}
            </form>
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
