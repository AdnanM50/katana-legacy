import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Craftsmanship.css'

gsap.registerPlugin(ScrollTrigger)

const processes = [
  { number: '01', title: 'Tamahagane', kanji: '玉鋼', desc: 'The journey begins with tamahagane — jewel steel — smelted from iron sand in a traditional tatara furnace over 72 hours.' },
  { number: '02', title: 'Folding', kanji: '折返', desc: 'The steel is folded up to 16 times, creating over 65,000 layers that give the blade its legendary strength and flexibility.' },
  { number: '03', title: 'Quenching', kanji: '焼入', desc: 'The blade is coated in clay and quenched in water, creating the iconic hamon — the temper line that defines each katana\'s soul.' },
  { number: '04', title: 'Polishing', kanji: '研磨', desc: 'Master polishers spend weeks with progressively finer stones, revealing the blade\'s true beauty and mirror-sharp edge.' },
]

export default function Craftsmanship() {
  const sectionRef = useRef(null)
  const itemsRef = useRef([])

  useEffect(() => {
    itemsRef.current.forEach((item, i) => {
      if (!item) return

      const elements = item.querySelectorAll('.craft-item__number, .craft-item__title, .craft-item__kanji, .craft-item__desc')

      gsap.fromTo(elements,
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1,
          stagger: 0.1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          }
        }
      )

      // Parallax on the kanji background
      const kanji = item.querySelector('.craft-item__bg-kanji')
      if (kanji) {
        gsap.to(kanji, {
          y: -60,
          scrollTrigger: {
            trigger: item,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 2,
          }
        })
      }
    })

    return () => ScrollTrigger.getAll().forEach(st => st.kill())
  }, [])

  return (
    <section ref={sectionRef} className="craftsmanship" id="craft">
      <div className="container">
        {/* Header */}
        <div className="craftsmanship__header">
          <span className="section-label">
            <span className="label-line" />
            Craftsmanship
          </span>
          <h2 className="craftsmanship__title">
            The Art of the <span className="accent">Swordsmith</span>
          </h2>
          <p className="craftsmanship__intro">
            Each katana undergoes a sacred process passed down through generations. 
            No machine can replicate the soul a master puts into the blade.
          </p>
        </div>

        {/* Process Items */}
        <div className="craftsmanship__grid">
          {processes.map((proc, i) => (
            <div 
              key={proc.number} 
              className="craft-item"
              ref={el => itemsRef.current[i] = el}
            >
              <div className="craft-item__bg-kanji">{proc.kanji}</div>
              <span className="craft-item__number">{proc.number}</span>
              <span className="craft-item__kanji">{proc.kanji}</span>
              <h3 className="craft-item__title">{proc.title}</h3>
              <p className="craft-item__desc">{proc.desc}</p>
              <div className="craft-item__line" />
            </div>
          ))}
        </div>
      </div>

      {/* Decorative horizontal blade */}
      <div className="craftsmanship__deco-blade">
        <div className="deco-line" />
      </div>
    </section>
  )
}

