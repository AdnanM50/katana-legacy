import React, { useEffect, useState, useRef } from 'react'
import './styles/global.css'
import Navbar from './components/Navbar'
import HeroVideo from './components/HeroVideo'
import StorySection from './components/StorySection'
import ParallaxBlade from './components/ParallaxBlade'
import KatanaCollection from './components/KatanaCollection'
import Craftsmanship from './components/Craftsmanship'
import ProductShowcase from './components/ProductShowcase'
import Footer from './components/Footer'
import CustomCursor from './components/CustomCursor'
import { initSmoothScroll } from './hooks/useSmoothScroll'

function App() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2800)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!isLoading) {
      const cleanup = initSmoothScroll()
      return cleanup
    }
  }, [isLoading])

  if (isLoading) {
    return (
      <div className="page-loader">
        <div className="loader-kanji">刀</div>
        <div className="loader-line" />
        <div className="loader-text">Katana Legacy</div>
      </div>
    )
  }

  return (
    <>
      <div className="noise-overlay" />
      <CustomCursor />
      <Navbar />
      <main>
        <HeroVideo />
        <StorySection />
        <ParallaxBlade />
        <KatanaCollection />
        <Craftsmanship />
        <ProductShowcase />
        <Footer />
      </main>
    </>
  )
}

export default App
