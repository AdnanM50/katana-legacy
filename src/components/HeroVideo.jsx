import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './HeroVideo.css'

gsap.registerPlugin(ScrollTrigger)

const TOTAL_FRAMES = 123

export default function HeroVideo() {
  const containerRef = useRef(null)
  const canvasRef = useRef(null)
  const [loadProgress, setLoadProgress] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const imagesRef = useRef([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    // High DPI Canvas sizing
    const setCanvasSize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      ctx.scale(dpr, dpr)
    }

    setCanvasSize()
    window.addEventListener('resize', setCanvasSize)

    // Helper: Draw image with cover behavior
    const renderFrame = (img) => {
      if (!img || !img.complete) return
      const w = window.innerWidth
      const h = window.innerHeight
      const imgRatio = img.naturalWidth / img.naturalHeight
      const screenRatio = w / h

      let drawW, drawH, drawX, drawY

      if (screenRatio > imgRatio) {
        drawW = w
        drawH = w / imgRatio
        drawX = 0
        drawY = (h - drawH) / 2
      } else {
        drawH = h
        drawW = h * imgRatio
        drawX = (w - drawW) / 2
        drawY = 0
      }

      ctx.clearRect(0, 0, w, h)
      ctx.drawImage(img, drawX, drawY, drawW, drawH)
    }

    // Preload all 123 frames
    const images = []
    let loadedCount = 0

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const frameNum = String(i).padStart(3, '0')
      const img = new Image()
      img.src = `/frames/frame_${frameNum}.webp`
      img.onload = () => {
        loadedCount++
        setLoadProgress(Math.round((loadedCount / TOTAL_FRAMES) * 100))
        if (loadedCount === 1) {
          renderFrame(img)
        }
        if (loadedCount === TOTAL_FRAMES) {
          setIsLoaded(true)
        }
      }
      images.push(img)
    }
    imagesRef.current = images

    // GSAP ScrollTrigger timeline that controls current frame index
    const frameObj = { frame: 0 }

    const st = ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.35,
      onUpdate: (self) => {
        const targetFrame = Math.min(
          TOTAL_FRAMES - 1,
          Math.floor(self.progress * (TOTAL_FRAMES - 1))
        )
        if (targetFrame !== frameObj.frame) {
          frameObj.frame = targetFrame
          renderFrame(images[targetFrame])
        }
      },
    })

    // Story Text Fade Sequences across Scroll Journey
    const ctxTl = gsap.context(() => {
      // Act 1: Solitude & Sacrifice (0% -> 25%)
      gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '22% top',
          scrub: 1,
        },
      })
      .fromTo('.story-act-1', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.3 })
      .to('.story-act-1', { opacity: 0, y: -40, duration: 0.3, delay: 0.4 })

      // Act 2: Vow Before The Sun (26% -> 52%)
      gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: '25% top',
          end: '50% top',
          scrub: 1,
        },
      })
      .fromTo('.story-act-2', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.3 })
      .to('.story-act-2', { opacity: 0, y: -40, duration: 0.3, delay: 0.4 })

      // Act 3: Living Soul of the Katana (53% -> 78%)
      gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: '52% top',
          end: '76% top',
          scrub: 1,
        },
      })
      .fromTo('.story-act-3', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.3 })
      .to('.story-act-3', { opacity: 0, y: -40, duration: 0.3, delay: 0.4 })

      // Act 4: NINDO Master Climax (79% -> 100%)
      gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: '78% top',
          end: 'bottom bottom',
          scrub: 1,
        },
      })
      .fromTo('.story-act-4', { opacity: 0, scale: 0.9, y: 30 }, { opacity: 1, scale: 1, y: 0, duration: 0.4 })
    }, containerRef)

    return () => {
      window.removeEventListener('resize', setCanvasSize)
      st.kill()
      ctxTl.revert()
    }
  }, [])

  return (
    <section ref={containerRef} className="hero-scroll-container" id="hero">
      {/* Sticky Canvas Viewport */}
      <div className="hero-sticky-stage">
        <canvas ref={canvasRef} className="hero-canvas" />

        {/* Film grain and edge atmospheric vignette */}
        <div className="hero-vignette-overlay" />
        <div className="hero-ink-mist" />

        {/* Loading Indicator */}
        {!isLoaded && (
          <div className="hero-frames-loader">
            <div className="loader-ring-pulse">
              <span className="loader-kanji-sm">刀</span>
            </div>
            <p className="loader-text-status">
              Awakening The Blade ({loadProgress}%)
            </p>
          </div>
        )}

        {/* ── CINEMATIC NARRATIVE OVERLAYS (Syncs with scroll frames) ── */}

        {/* Initial Title (Top of page before scrolling) */}
        <div className="hero-intro-banner">
          <div className="banner-kanji-watermark">忍道</div>
          <span className="banner-tagline">THE WAY OF THE WARRIOR</span>
          <h1 className="banner-headline">
            THE SACRED<br />
            <span>KATANA</span>
          </h1>
          <div className="scroll-invitation">
            <div className="scroll-sword-indicator">
              <div className="blade-streak" />
            </div>
            <span>SCROLL TO WALK THE NINJA'S PATH</span>
          </div>
        </div>

        {/* Act 1: The Sacrifice & Solitude */}
        <div className="story-act-card story-act-1">
          <span className="act-index">壱 // 孤高の道</span>
          <h2 className="act-title">The Path of Solitude</h2>
          <p className="act-description">
            To become a shadow, one must first surrender the light.
            Years in mountain seclusion — enduring biting frost, ceaseless rain,
            and absolute silence — forge the warrior's spirit long before steel is ever drawn.
          </p>
          <div className="act-kanji-seal">修行</div>
        </div>

        {/* Act 2: The Vow Under The Crimson Sun */}
        <div className="story-act-card story-act-2">
          <span className="act-index">弐 // 誓いと血</span>
          <h2 className="act-title">The Vow of Shadows</h2>
          <p className="act-description">
            A ninja abandons personal glory. The burning crimson sun bears witness
            to their solitary oath: to bleed in silence so others may live in peace.
            Every breath is discipline. Every scar a sworn duty.
          </p>
          <div className="act-kanji-seal">忠誠</div>
        </div>

        {/* Act 3: Respect for the Katana */}
        <div className="story-act-card story-act-3">
          <span className="act-index">参 // 刃の魂</span>
          <h2 className="act-title">The Soul of Steel</h2>
          <p className="act-description">
            The Katana is never treated as a mere weapon. It is the living soul of the warrior.
            Never unsheathed in anger. Never returned without reverence.
            Between the quiet draw and the strike lies an eternity of respect.
          </p>
          <div className="act-kanji-seal">敬意</div>
        </div>

        {/* Act 4: Final NINDO Climax (Matching User Reference Image) */}
        <div className="story-act-card story-act-4">
          <div className="nindo-badge">
            <span className="nindo-icon">刃</span>
            <span className="nindo-text">NINDO MARTIAL ARTS</span>
          </div>
          <h2 className="nindo-title">
            <span className="nindo-kanji-big">武道学院</span>
            <br />
            BECOME THE BLADE
          </h2>
          <p className="nindo-quote">
            "The sword does not make the samurai. The samurai's honor breathes life into the steel."
          </p>
          <div className="nindo-cta-group">
            <a href="#collection" className="nindo-btn-primary">
              <span>EXPLORE KATANA COLLECTION</span>
              <span className="btn-arrow">⟶</span>
            </a>
            <a href="#shop" className="nindo-btn-secondary">
              <span>VIEW SHOP</span>
            </a>
          </div>
        </div>

        {/* Fixed Side Japanese Legend */}
        <div className="hero-fixed-side-legend vertical-text">
          武士道精神 // 名誉 // 伝統の刃
        </div>
      </div>
    </section>
  )
}
