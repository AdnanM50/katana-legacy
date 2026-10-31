import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './KatanaCollection.css'

gsap.registerPlugin(ScrollTrigger)

const katanas = [
  {
    id: 1,
    name: 'Dragon\'s Fury',
    japaneseName: '龍の怒り',
    price: '€ 249.99',
    description: 'Hand-forged with dragon engravings, this blade carries ancient power.',
    image: '/images/katana-dragon.png',
    color: '#c41e1e',
  },
  {
    id: 2,
    name: 'Shadow Veil',
    japaneseName: '影の帳',
    price: '€ 199.99',
    description: 'Obsidian-dark blade designed for the warrior who moves in silence.',
    image: '/images/katana-shadow.png',
    color: '#2a2a2a',
  },
  {
    id: 3,
    name: 'Crimson Edge',
    japaneseName: '紅の刃',
    price: '€ 179.99',
    description: 'Blood-red accents honor the warrior\'s path of sacrifice.',
    image: '/images/katana-crimson.png',
    color: '#8b1a1a',
  },
  {
    id: 4,
    name: 'Imperial Gold',
    japaneseName: '皇金',
    price: '€ 399.99',
    description: 'A ceremonial masterpiece worthy of an emperor\'s collection.',
    image: '/images/katana-imperial.png',
    color: '#d4a853',
  },
]

export default function KatanaCollection() {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const cardsRef = useRef(null)

  useEffect(() => {
    // Heading reveal
    gsap.fromTo(headingRef.current?.children || [],
      { y: 80, opacity: 0 },
      {
        y: 0, opacity: 1, stagger: 0.15, duration: 1,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: headingRef.current,
          start: 'top 80%',
        }
      }
    )

    // Cards stagger reveal
    const cards = cardsRef.current?.querySelectorAll('.katana-card')
    if (cards) {
      gsap.fromTo(cards,
        { y: 100, opacity: 0, scale: 0.95 },
        {
          y: 0, opacity: 1, scale: 1,
          stagger: 0.15, duration: 1,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 75%',
          }
        }
      )
    }

    return () => ScrollTrigger.getAll().forEach(st => st.kill())
  }, [])

  return (
    <section ref={sectionRef} className="katana-collection" id="collection">
      {/* Section Header */}
      <div ref={headingRef} className="katana-collection__header container">
        <span className="section-label">
          <span className="label-line" />
          Collection
        </span>
        <div className="katana-collection__title-row">
          <span className="kanji collection-kanji">刀</span>
          <h2 className="katana-collection__title">
            SHOP<br/>KATANA
          </h2>
        </div>
        <p className="katana-collection__subtitle">
          explore <span className="arrow">⟶</span>
        </p>
      </div>

      {/* Katana Cards Grid */}
      <div ref={cardsRef} className="katana-collection__grid container">
        {katanas.map((katana) => (
          <KatanaCard key={katana.id} katana={katana} />
        ))}
      </div>
    </section>
  )
}

function KatanaCard({ katana }) {
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef(null)
  const sheathRef = useRef(null)

  const handleMouseEnter = () => {
    setIsHovered(true)
    // Animate sheath sliding off
    gsap.to(sheathRef.current, {
      x: '110%',
      duration: 0.8,
      ease: 'power3.out',
    })
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    // Animate sheath sliding back
    gsap.to(sheathRef.current, {
      x: '0%',
      duration: 0.6,
      ease: 'power3.inOut',
    })
  }

  return (
    <div 
      ref={cardRef}
      className={`katana-card ${isHovered ? 'hovered' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Card glow */}
      <div 
        className="katana-card__glow" 
        style={{ background: `radial-gradient(circle at 50% 80%, ${katana.color}15, transparent 70%)` }}
      />

      {/* Katana Image with Sheath Reveal */}
      <div className="katana-card__visual">
        {/* Unsheathed blade (visible on hover) */}
        <img 
          className="katana-card__blade" 
          src={katana.image} 
          alt={katana.name}
        />
        {/* Sheath overlay (slides away on hover) */}
        <div ref={sheathRef} className="katana-card__sheath">
          <div className="sheath-body" style={{ borderColor: katana.color + '40' }}>
            <div className="sheath-wrap" />
            <div className="sheath-wrap" />
            <div className="sheath-wrap" />
          </div>
        </div>
      </div>

      {/* Card Info */}
      <div className="katana-card__info">
        <span className="katana-card__japanese">{katana.japaneseName}</span>
        <h3 className="katana-card__name">{katana.name}</h3>
        <p className="katana-card__desc">{katana.description}</p>
        <div className="katana-card__footer">
          <span className="katana-card__price">{katana.price}</span>
          <button className="katana-card__btn">
            View Details
          </button>
        </div>
      </div>

      {/* Hover border effect */}
      <div className="katana-card__border" style={{ borderColor: katana.color + '30' }} />
    </div>
  )
}

