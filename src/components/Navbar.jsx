import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import './Navbar.css'

export default function Navbar() {
  const navRef = useRef(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100)
    }
    window.addEventListener('scroll', handleScroll)

    // Animate navbar on load
    gsap.fromTo(navRef.current, 
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, delay: 0.3, ease: 'expo.out' }
    )

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav ref={navRef} className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <a href="#" className="nav-logo">
          <span className="logo-kanji">刀</span>
          <span className="logo-text">KATANA</span>
        </a>

        <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
          <a href="#story" onClick={() => setMenuOpen(false)}>The Way</a>
          <a href="#collection" onClick={() => setMenuOpen(false)}>Collection</a>
          <a href="#craft" onClick={() => setMenuOpen(false)}>Craftsmanship</a>
          <a href="#shop" onClick={() => setMenuOpen(false)}>Shop</a>
        </div>

        <button 
          className={`nav-hamburger ${menuOpen ? 'active' : ''}`} 
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {/* Full screen menu overlay */}
      <div className={`menu-overlay ${menuOpen ? 'open' : ''}`}>
        <div className="menu-bg-kanji">武士道</div>
        <div className="menu-links">
          <a href="#story" onClick={() => setMenuOpen(false)}>
            <span className="menu-number">01</span>
            <span className="menu-label">The Way of the Blade</span>
          </a>
          <a href="#collection" onClick={() => setMenuOpen(false)}>
            <span className="menu-number">02</span>
            <span className="menu-label">Katana Collection</span>
          </a>
          <a href="#craft" onClick={() => setMenuOpen(false)}>
            <span className="menu-number">03</span>
            <span className="menu-label">Craftsmanship</span>
          </a>
          <a href="#shop" onClick={() => setMenuOpen(false)}>
            <span className="menu-number">04</span>
            <span className="menu-label">Shop Katana</span>
          </a>
        </div>
      </div>
    </nav>
  )
}

