import { useEffect, useRef, useState } from 'react'

export default function Products() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const productCount = 3
  const productsContainerRef = useRef(null)

  useEffect(() => {
    const cards = document.querySelectorAll('.product-card')
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1'
          entry.target.style.transform = 'translateY(0)'
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.1, rootMargin: '0px 0px -100px 0px' })

    cards.forEach(card => {
      card.style.opacity = '0'
      card.style.transform = 'translateY(20px)'
      card.style.transition = 'opacity 0.6s ease, transform 0.6s ease'
      observer.observe(card)
    })

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const container = productsContainerRef.current
    if (!container) return

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft
      const scrollWidth = container.scrollWidth - container.clientWidth
      const progress = scrollWidth > 0 ? Math.round((scrollLeft / scrollWidth) * (productCount - 1)) : 0
      setScrollProgress(progress)
    }

    container.addEventListener('scroll', handleScroll)
    return () => container.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section id="products" className="products">
      <div className="container">
        <h2>Our Premium Coffee Beans</h2>
        <div className="products-grid" ref={productsContainerRef}>
          <div className="product-card">
            <div className="product-icon">
              <i className="fas fa-seedling"></i>
            </div>
            <h3>Arabica Beans</h3>
            <p>Premium arabica beans with smooth, balanced flavor profile and low acidity. Sourced from the highlands of Karnataka.</p>
            <span className="product-tag">Most Popular</span>
          </div>
          <div className="product-card">
            <div className="product-icon">
              <i className="fas fa-leaf"></i>
            </div>
            <h3>Robusta Beans</h3>
            <p>Strong, bold robusta beans perfect for espresso blends. High caffeine content and rich, earthy notes.</p>
            <span className="product-tag">Bold & Rich</span>
          </div>
          <div className="product-card">
            <div className="product-icon">
              <i className="fas fa-star"></i>
            </div>
            <h3>Specialty Blends</h3>
            <p>Expertly crafted blends combining the best of our arabica and robusta beans for unique taste experiences.</p>
            <span className="product-tag">Exclusive</span>
          </div>
        </div>
        <div className="scroll-dots-container">
          {Array.from({ length: productCount }).map((_, index) => (
            <button
              key={index}
              className={`scroll-dot ${scrollProgress === index ? 'active' : ''}`}
              onClick={() => {
                const container = productsContainerRef.current
                if (container) {
                  const targetCard = container.querySelectorAll('.product-card')[index]
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
