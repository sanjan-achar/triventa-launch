import { useEffect, useRef, useState } from 'react'

export default function WhyUs() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const featureCount = 6
  const featuresContainerRef = useRef(null)

  useEffect(() => {
    const features = document.querySelectorAll('.feature')
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1'
          entry.target.style.transform = 'translateY(0)'
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.1, rootMargin: '0px 0px -100px 0px' })

    features.forEach(feature => {
      feature.style.opacity = '0'
      feature.style.transform = 'translateY(20px)'
      feature.style.transition = 'opacity 0.6s ease, transform 0.6s ease'
      observer.observe(feature)
    })

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const container = featuresContainerRef.current
    if (!container) return

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft
      const scrollWidth = container.scrollWidth - container.clientWidth
      const progress = scrollWidth > 0 ? Math.round((scrollLeft / scrollWidth) * (featureCount - 1)) : 0
      setScrollProgress(progress)
    }

    container.addEventListener('scroll', handleScroll)
    return () => container.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section id="why-us" className="why-us">
      <div className="container">
        <h2>Why Choose Triventa Exports</h2>
        <div className="features-grid" ref={featuresContainerRef}>
          <div className="feature">
            <div className="feature-icon">
              <i className="fas fa-handshake"></i>
            </div>
            <h3>Direct from Farmers</h3>
            <p>We work directly with Karnataka's coffee farmers, ensuring fair prices and sustainable farming practices.</p>
          </div>
          <div className="feature">
            <div className="feature-icon">
              <i className="fas fa-check-circle"></i>
            </div>
            <h3>Quality Assured</h3>
            <p>Every batch undergoes rigorous quality testing and certification to meet international standards.</p>
          </div>
          <div className="feature">
            <div className="feature-icon">
              <i className="fas fa-globe"></i>
            </div>
            <h3>Global Reach</h3>
            <p>Our established network ensures smooth export and delivery to markets worldwide with competitive pricing.</p>
          </div>
          <div className="feature">
            <div className="feature-icon">
              <i className="fas fa-leaf"></i>
            </div>
            <h3>Sustainable Practices</h3>
            <p>We're committed to eco-friendly farming and packaging, supporting environmental conservation.</p>
          </div>
          <div className="feature">
            <div className="feature-icon">
              <i className="fas fa-certificate"></i>
            </div>
            <h3>Certifications</h3>
            <p>Our beans are certified organic, Fair Trade, and meet all international export regulations.</p>
          </div>
          <div className="feature">
            <div className="feature-icon">
              <i className="fas fa-headset"></i>
            </div>
            <h3>24/7 Support</h3>
            <p>Dedicated customer support team ready to assist with inquiries and custom orders anytime.</p>
          </div>
        </div>
        <div className="scroll-dots-container">
          {Array.from({ length: featureCount }).map((_, index) => (
            <button
              key={index}
              className={`scroll-dot ${scrollProgress === index ? 'active' : ''}`}
              onClick={() => {
                const container = featuresContainerRef.current
                if (container) {
                  const targetCard = container.querySelectorAll('.feature')[index]
                  if (!targetCard) return
                  container.scrollTo({
                    left: targetCard.offsetLeft,
                    behavior: 'smooth'
                  })
                }
              }}
              aria-label={`Go to card ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
