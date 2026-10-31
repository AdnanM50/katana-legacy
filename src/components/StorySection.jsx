import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './StorySection.css'

gsap.registerPlugin(ScrollTrigger)

const stories = [
  {
    number: '壱',
    numeral: 'I',
    title: 'Born in Shadow',
    text: 'The ninja walked a path hidden from the world. In darkness, they found clarity. In silence, they found strength. Their life was not of glory — but of purpose.',
    kanji: '影',
    videoSrc: '/videos/warrior.mp4',
  },
  {
    number: '弐',
    numeral: 'II',
    title: 'The Bond of Steel',
    text: 'A warrior\'s katana is not a tool — it is an oath. Forged in fire and tempered by honor, the blade becomes an extension of the soul. To carry it is to carry the weight of every ancestor who wielded it before.',
    kanji: '刀',
    videoSrc: '/videos/ninja-pins.mp4',
  },
  {
    number: '参',
    numeral: 'III',
    title: 'Respect of the Blade',
    text: 'The katana demands respect. It is never drawn without reason, never sheathed without reflection. In the quiet moment between unsheathing and striking — that is where the warrior truly lives.',
    kanji: '敬',
    imageSrc: '/images/samurai-hero.png',
  },
]

export default function StorySection() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const blocks = document.querySelectorAll('.story-block')

    blocks.forEach((block, i) => {
      const media = block.querySelector('.story-block__media')
      const content = block.querySelector('.story-block__content')
      const kanji = block.querySelector('.story-block__bg-kanji')
      const line = block.querySelector('.story-block__accent-line')
      const video = block.querySelector('video')

      // ── Parallax on the background kanji ──
      if (kanji) {
        gsap.fromTo(kanji,
          { y: 100, scale: 1.5, opacity: 0 },
          {
            y: -100, scale: 1, opacity: 0.05,
            ease: 'none',
            scrollTrigger: {
              trigger: block,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 2,
            }
          }
        )
      }

      // ── Content reveal ──
      const elements = content?.querySelectorAll('.story-block__number, .story-block__title, .story-block__text, .story-block__accent-line')
      if (elements) {
        gsap.fromTo(elements,
          { y: 60, opacity: 0 },
          {
            y: 0, opacity: 1,
            stagger: 0.12,
            duration: 1,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: block,
              start: 'top 70%',
              toggleActions: 'play none none reverse',
            }
          }
        )
      }

      // ── Media reveal with scale ──
      if (media) {
        gsap.fromTo(media,
          { scale: 1.15, opacity: 0, y: 40 },
          {
            scale: 1, opacity: 1, y: 0,
            duration: 1.4,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: block,
              start: 'top 65%',
              toggleActions: 'play none none reverse',
            }
          }
        )
      }

      // ── Play video when in view ──
      if (video) {
        ScrollTrigger.create({
          trigger: block,
          start: 'top 80%',
          end: 'bottom 20%',
          onEnter: () => video.play(),
          onLeave: () => video.pause(),
          onEnterBack: () => video.play(),
          onLeaveBack: () => video.pause(),
        })
      }
    })

    return () => ScrollTrigger.getAll().forEach(st => st.kill())
  }, [])

  return (
    <section ref={sectionRef} className="story-section" id="story">
      {/* Section header */}
      <div className="story-section__header container">
        <span className="section-tag">
          <span className="tag-line" />
          The Ninja's Path
        </span>
        <h2 className="story-section__heading">
          Life of the <span className="red">Warrior</span>
        </h2>
        <p className="story-section__sub">
          Honor. Discipline. Blade. A story written in steel and silence.
        </p>
      </div>

      {/* Story blocks */}
      {stories.map((story, i) => (
        <div key={i} className={`story-block ${i % 2 === 1 ? 'reversed' : ''}`}>
          <div className="story-block__bg-kanji">{story.kanji}</div>
          
          <div className="story-block__inner container">
            {/* Media side */}
            <div className="story-block__media">
              {story.videoSrc ? (
                <video
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  poster="/images/samurai-hero.png"
                >
                  <source src={story.videoSrc} type="video/mp4" />
                </video>
              ) : (
                <img src={story.imageSrc} alt={story.title} />
              )}
              <div className="media-overlay" />
              <div className="media-border" />
            </div>

            {/* Content side */}
            <div className="story-block__content">
              <div className="story-block__number">
                <span className="num-kanji">{story.number}</span>
                <span className="num-roman">{story.numeral}</span>
              </div>
              <h3 className="story-block__title">{story.title}</h3>
              <p className="story-block__text">{story.text}</p>
              <div className="story-block__accent-line" />
            </div>
          </div>
        </div>
      ))}
    </section>
  )
}
