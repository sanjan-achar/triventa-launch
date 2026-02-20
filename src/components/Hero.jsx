export default function Hero() {
  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="home" className="hero">
      <div className="hero-content">
        <h1>Triventa Exports</h1>
        <p className="tagline">Your Gateway to Global Market</p>
        <p className="hero-subtitle">Premium Coffee Beans Sourced Directly from Karnataka's Finest Farmers</p>
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
