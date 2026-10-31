import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Footer.css'

gsap.registerPlugin(ScrollTrigger)

export default function Footer() {
  const footerRef = useRef(null)

  useEffect(() => {
    gsap.fromTo(footerRef.current?.querySelectorAll('.footer-col') || [],
      { y: 40, opacity: 0 },
      {
        y: 0, opacity: 1,
        stagger: 0.1, duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 85%',
        }
      }
    )
  }, [])

  return (
    <footer ref={footerRef} className="footer">
      <div className="footer__top container">
        {/* Logo + About */}
        <div className="footer-col">
          <div className="footer-logo">
            <span className="footer-logo__kanji">刀</span>
            <span className="footer-logo__text">KATANA LEGACY</span>
          </div>
          <p className="footer-about">
            Where honor meets steel. Hand-forged katanas carrying 
            centuries of tradition, crafted for the modern warrior.
          </p>
        </div>

        {/* Navigation */}
        <div className="footer-col">
          <h4 className="footer-col__title">Navigate</h4>
          <a href="#hero">Home</a>
          <a href="#story">The Way</a>
          <a href="#collection">Collection</a>
          <a href="#craft">Craftsmanship</a>
          <a href="#shop">Shop</a>
        </div>

        {/* Collection */}
        <div className="footer-col">
          <h4 className="footer-col__title">Collection</h4>
          <a href="#">Dragon's Fury</a>
          <a href="#">Shadow Veil</a>
          <a href="#">Crimson Edge</a>
          <a href="#">Imperial Gold</a>
        </div>

        {/* Contact */}
        <div className="footer-col">
          <h4 className="footer-col__title">Contact</h4>
          <p className="footer-contact">info@katanalegacy.com</p>
          <p className="footer-contact">Tokyo, Japan</p>
          <div className="footer-social">
            <a href="#" aria-label="Instagram">IG</a>
            <a href="#" aria-label="Twitter">TW</a>
            <a href="#" aria-label="Pinterest">PN</a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="footer__bottom container">
        <div className="footer__line" />
        <div className="footer__bottom-inner">
          <span className="footer__copy">
            © 2026 Katana Legacy. All rights reserved.
          </span>
          <span className="footer__kanji-art">武士道</span>
        </div>
      </div>
    </footer>
  )
}

