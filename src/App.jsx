import { useEffect, useRef } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Products from './components/Products'
import WhyUs from './components/WhyUs'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Chatbot from './components/Chatbot'

function App() {
  const customCursorRef = useRef(null)

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

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 1024px) and (hover: hover) and (pointer: fine)')
    const customCursor = customCursorRef.current
    if (!customCursor) return

    const setDesktopCursorState = (enabled) => {
      if (enabled) {
        document.body.classList.add('desktop-custom-cursor')
      } else {
        document.body.classList.remove('desktop-custom-cursor')
        customCursor.style.opacity = '0'
      }
    }

    const handleMouseMove = (event) => {
      if (!mediaQuery.matches) return
      customCursor.style.left = `${event.clientX}px`
      customCursor.style.top = `${event.clientY}px`
      customCursor.style.opacity = '1'
    }

    const handleMouseLeave = () => {
      customCursor.style.opacity = '0'
    }

    const handleMediaChange = (event) => {
      setDesktopCursorState(event.matches)
    }

    setDesktopCursorState(mediaQuery.matches)
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseleave', handleMouseLeave)
    mediaQuery.addEventListener('change', handleMediaChange)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseleave', handleMouseLeave)
      mediaQuery.removeEventListener('change', handleMediaChange)
      document.body.classList.remove('desktop-custom-cursor')
    }
  }, [])

  return (
    <>
      <div ref={customCursorRef} className="custom-cursor-dot" aria-hidden="true" />
      <div className="scroll-progress" aria-hidden="true" />
      <Navbar />
      <Hero />
      <About />
      <Products />
      <WhyUs />
      <Contact />
      <Footer />
      <Chatbot />
    </>
  )
}

export default App
