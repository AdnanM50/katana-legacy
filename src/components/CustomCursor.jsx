import React, { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    const dot = dotRef.current
    const ring = ringRef.current
    let mouseX = 0, mouseY = 0
    let ringX = 0, ringY = 0

    const onMouseMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      if (dot) {
        dot.style.left = mouseX - 4 + 'px'
        dot.style.top = mouseY - 4 + 'px'
      }
    }

    const animate = () => {
      ringX += (mouseX - ringX) * 0.12
      ringY += (mouseY - ringY) * 0.12
      if (ring) {
        ring.style.left = ringX + 'px'
        ring.style.top = ringY + 'px'
      }
      requestAnimationFrame(animate)
    }

    const onMouseEnterLink = () => ring?.classList.add('hover')
    const onMouseLeaveLink = () => ring?.classList.remove('hover')

    document.addEventListener('mousemove', onMouseMove)
    animate()

    // Add hover effect to interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .katana-card, .product-card')
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', onMouseEnterLink)
      el.addEventListener('mouseleave', onMouseLeaveLink)
    })

    return () => {
      document.removeEventListener('mousemove', onMouseMove)
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', onMouseEnterLink)
        el.removeEventListener('mouseleave', onMouseLeaveLink)
      })
    }
  }, [])

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  )
}

