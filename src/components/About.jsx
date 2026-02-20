import { useEffect } from 'react'

export default function About() {
  useEffect(() => {
    const stats = document.querySelectorAll('.stat')
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1'
          entry.target.style.transform = 'translateY(0)'
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.1, rootMargin: '0px 0px -100px 0px' })

    stats.forEach(stat => {
      stat.style.opacity = '0'
      stat.style.transform = 'translateY(20px)'
      stat.style.transition = 'opacity 0.6s ease, transform 0.6s ease'
      observer.observe(stat)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section id="about" className="about about-full">
      <img
        src="https://images.unsplash.com/photo-1493925410384-84f842e616fb?q=80&w=1600&auto=format&fit=crop"
        alt="Premium coffee beans from Karnataka"
        className="about-full-image"
      />
      <div className="about-full-overlay"></div>
      <div className="container">
        <h2>About Triventa Exports</h2>
        <div className="about-content">
          <div className="about-text">
            <p>Triventa Exports is your trusted partner for authentic, high-quality coffee beans sourced directly from the lush plantations of Karnataka, India. We believe in building bridges between premium coffee producers and global markets, ensuring ethical practices and sustainable growth.</p>
            <p>Our mission is to bring the rich flavor and heritage of Karnataka's coffee to coffee lovers around the world, while supporting local farmers and promoting sustainable agriculture.</p>
            <div className="about-stats">
              <div className="stat">
                <h3 style={{ color: '#8C1D2F' }}>500+</h3>
                <p style={{ color: '#8C1D2F' }}>Farmer Partners</p>
              </div>
              <div className="stat">
                <h3 style={{ color: '#8C1D2F' }}>40+</h3>
                <p style={{ color: '#8C1D2F' }}>Countries Served</p>
              </div>
              <div className="stat">
                <h3 style={{ color: '#8C1D2F' }}>100%</h3>
                <p style={{ color: '#8C1D2F' }}>Quality Assured</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
