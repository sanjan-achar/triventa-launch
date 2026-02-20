import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Products from './components/Products'
import WhyUs from './components/WhyUs'
import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
  useEffect(() => {
    const navbar = document.querySelector('.navbar')
    const handleScroll = () => {
      const navbarHeight = navbar ? navbar.offsetHeight : 0
      document.documentElement.style.setProperty('--navbar-offset', `${navbarHeight}px`)

      const documentHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollProgress = documentHeight > 0 ? (window.scrollY / documentHeight) * 100 : 0
      document.documentElement.style.setProperty('--scroll-progress', `${scrollProgress}%`)

      if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.15)'
      } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)'
      }
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll)
    window.addEventListener('resize', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [])

  return (
    <>
      <div className="scroll-progress" aria-hidden="true" />
      <Navbar />
      <Hero />
      <About />
      <Products />
      <WhyUs />
      <Contact />
      <Footer />
    </>
  )
}

export default App
