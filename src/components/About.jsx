import { useRef } from 'react'

export default function About() {
  const statsContainerRef = useRef(null)

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
            <div className="about-stats" ref={statsContainerRef}>
              <div className="about-stat-card">
                <h3>10+</h3>
                <p>Trusted<br />Suppliers</p>
              </div>
              <div className="about-stat-card">
                <h3>5+</h3>
                <p>Global<br />Reach</p>
              </div>
              <div className="about-stat-card">
                <h3>100%</h3>
                <p>Assured<br />Standards</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
