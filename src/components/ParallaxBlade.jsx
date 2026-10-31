import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './ParallaxBlade.css'

gsap.registerPlugin(ScrollTrigger)

export default function ParallaxBlade() {
  const sectionRef = useRef(null)
  const bladeRef = useRef(null)
  const textRef = useRef(null)
  const quoteRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current

    // Parallax blade image
    gsap.to(bladeRef.current, {
      y: -150,
      rotation: -5,
      scrollTrigger: {
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.5,
      }
    })

    // Text parallax (slower)
    gsap.to(textRef.current, {
      y: -80,
      scrollTrigger: {
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 2,
      }
    })

    // Quote reveal
    gsap.fromTo(quoteRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0,
        scrollTrigger: {
          trigger: quoteRef.current,
          start: 'top 85%',
          end: 'top 50%',
          scrub: 1,
        }
      }
    )

    return () => ScrollTrigger.getAll().forEach(st => st.kill())
  }, [])

  return (
    <section ref={sectionRef} className="parallax-blade">
      <div className="parallax-blade__bg-pattern" />
      
      {/* Floating blade with parallax */}
      <div ref={bladeRef} className="parallax-blade__image">
        <img src="/images/katana-unsheathed.png" alt="Katana blade" />
      </div>

      {/* Content */}
      <div ref={textRef} className="parallax-blade__content container">
        <div className="parallax-blade__label">
          <span className="label-line" />
          <span>The Blade Speaks</span>
        </div>
        <h2 className="parallax-blade__heading">
          <span className="kanji">鋼</span> Forged in Fire,<br/>
          Tempered by <em>Honor</em>
        </h2>
      </div>

      <div ref={quoteRef} className="parallax-blade__quote container">
        <blockquote>
          "The sword is the soul of the samurai. Its edge carries the weight 
          of centuries, and its reflection holds the truth of the warrior within."
        </blockquote>
        <cite>— Miyamoto Musashi</cite>
      </div>
    </section>
  )
}

